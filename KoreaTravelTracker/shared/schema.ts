import { 
  pgTable, 
  text, 
  serial, 
  date,
  varchar,
  timestamp,
  jsonb,
  index
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stays = pgTable("stays", {
  id: serial("id").primaryKey(),
  entryDate: date("entry_date").notNull(),
  exitDate: date("exit_date").notNull(),
});

export const insertStaySchema = createInsertSchema(stays, {
  entryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid entry date",
  }),
  exitDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid exit date",
  }),
}).omit({ id: true }).refine((data) => {
  const entryDate = new Date(data.entryDate);
  const exitDate = new Date(data.exitDate);
  return exitDate >= entryDate;
}, {
  message: "Exit date must be after or equal to entry date",
  path: ["exitDate"],
});

export const updateStaySchema = createInsertSchema(stays, {
  entryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid entry date",
  }),
  exitDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid exit date",
  }),
}).refine((data) => {
  const entryDate = new Date(data.entryDate);
  const exitDate = new Date(data.exitDate);
  return exitDate >= entryDate;
}, {
  message: "Exit date must be after or equal to entry date",
  path: ["exitDate"],
});

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertStay = z.infer<typeof insertStaySchema>;
export type UpdateStay = z.infer<typeof updateStaySchema>;
export type Stay = typeof stays.$inferSelect;
