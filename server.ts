import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Configure multer for local storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });

  app.use(express.json());
  app.use('/uploads', express.static(uploadsDir));

  // API Routes
  app.get("/api/projects", (req, res) => {
    try {
      const projects = db.prepare("SELECT * FROM projects").all();
      // Parse tools from string back to array
      const parsedProjects = projects.map((p: any) => ({
        ...p,
        tools: JSON.parse(p.tools)
      }));
      res.json(parsedProjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", (req, res) => {
    const { title, category, role, tools, description, image, problem, process, outcome } = req.body;
    const id = Math.random().toString(36).substring(2, 11); // Simple ID
    try {
      db.prepare(`
        INSERT INTO projects (id, title, category, role, tools, description, image, problem, process, outcome)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, title, category, role, JSON.stringify(tools), description, image, problem, process, outcome);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const { title, category, role, tools, description, image, problem, process, outcome } = req.body;
    try {
      db.prepare(`
        UPDATE projects 
        SET title = ?, category = ?, role = ?, tools = ?, description = ?, image = ?, problem = ?, process = ?, outcome = ?
        WHERE id = ?
      `).run(title, category, role, JSON.stringify(tools), description, image, problem, process, outcome, id);
      res.json({ id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete project with ID: ${id}`);
    try {
      const result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);
      console.log(`Delete result:`, result);
      if (result.changes === 0) {
        console.warn(`No project found with ID: ${id}`);
      }
      res.status(204).send();
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Image Upload Route
  app.post("/api/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
