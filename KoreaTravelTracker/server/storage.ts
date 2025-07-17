import { 
  stays, 
  users,
  type Stay, 
  type InsertStay, 
  type UpdateStay,
  type User,
  type UpsertUser 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Stay operations
  getStay(id: number): Promise<Stay | undefined>;
  getAllStays(): Promise<Stay[]>;
  createStay(stay: InsertStay): Promise<Stay>;
  updateStay(id: number, stay: UpdateStay): Promise<Stay | undefined>;
  deleteStay(id: number): Promise<boolean>;
  
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getStay(id: number): Promise<Stay | undefined> {
    const [stay] = await db.select().from(stays).where(eq(stays.id, id));
    return stay || undefined;
  }

  async getAllStays(): Promise<Stay[]> {
    const allStays = await db.select().from(stays);
    return allStays.sort((a, b) => 
      new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );
  }

  async createStay(insertStay: InsertStay): Promise<Stay> {
    const [stay] = await db
      .insert(stays)
      .values(insertStay)
      .returning();
    return stay;
  }

  async updateStay(id: number, updateStay: UpdateStay): Promise<Stay | undefined> {
    const [updatedStay] = await db
      .update(stays)
      .set(updateStay)
      .where(eq(stays.id, id))
      .returning();
    return updatedStay || undefined;
  }

  async deleteStay(id: number): Promise<boolean> {
    const result = await db
      .delete(stays)
      .where(eq(stays.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
