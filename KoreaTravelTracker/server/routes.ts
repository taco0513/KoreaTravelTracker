import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStaySchema, updateStaySchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Stay routes - no authentication required
  app.get("/api/stays", async (_req, res) => {
    try {
      const stays = await storage.getAllStays();
      res.json(stays);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stays" });
    }
  });

  // Get specific stay
  app.get("/api/stays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid stay ID" });
      }

      const stay = await storage.getStay(id);
      if (!stay) {
        return res.status(404).json({ message: "Stay not found" });
      }

      res.json(stay);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stay" });
    }
  });

  // Create new stay
  app.post("/api/stays", async (req, res) => {
    try {
      const validatedData = insertStaySchema.parse(req.body);
      const stay = await storage.createStay(validatedData);
      res.status(201).json(stay);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create stay" });
    }
  });

  // Update stay
  app.put("/api/stays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid stay ID" });
      }

      const validatedData = updateStaySchema.parse(req.body);
      const stay = await storage.updateStay(id, validatedData);
      
      if (!stay) {
        return res.status(404).json({ message: "Stay not found" });
      }

      res.json(stay);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update stay" });
    }
  });

  // Delete stay
  app.delete("/api/stays/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid stay ID" });
      }

      const deleted = await storage.deleteStay(id);
      if (!deleted) {
        return res.status(404).json({ message: "Stay not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete stay" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
