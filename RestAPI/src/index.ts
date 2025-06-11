import express, { Request, Response } from "express";
import cors from "cors";

type Task = { id: number; title: string; completed: boolean };
const app = express();
app.use(cors(), express.json());

let data: Task[] = [];
let nextId = 1;

// GET /tasks
app.get("/tasks", (req, res: Response) => {
  res.json(data);
});

// POST /tasks
app.post("/tasks", (req: Request, res: Response) => {
  const task = { id: nextId++, title: req.body.title, completed: false };
  data.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const task = data.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Not found" });
  task.completed = req.body.completed ?? task.completed;
  res.json(task);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  data = data.filter(t => t.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
