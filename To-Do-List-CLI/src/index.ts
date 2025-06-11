#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";

type Task = { id: number; title: string; done: boolean };
const FILE = "tasks.json";

const load = (): Task[] => {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8")) as Task[];
};

const save = (tasks: Task[]) =>
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));

const program = new Command();

program
  .command("list")
  .description("Mostra tutte le attività")
  .action(() => {
    const tasks = load();
    if (!tasks.length) return console.log("Nessuna attività trovata.");
    tasks.forEach(t => {
      console.log(`${t.id}. [${t.done ? "x" : " "}] ${t.title}`);
    });
  });

program
  .command("add <title>")
  .description("Aggiunge una nuova attività")
  .action(title => {
    const tasks = load();
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    tasks.push({ id, title, done: false });
    save(tasks);
    console.log(`Attività #${id} aggiunta.`);
  });

program
  .command("done <id>")
  .description("Segna un'attività come completata")
  .action(id => {
    const tasks = load();
    const idx = tasks.findIndex(t => t.id === +id);
    if (idx < 0) return console.error("ID non trovato.");
    tasks[idx].done = true;
    save(tasks);
    console.log(`Attività #${id} completata.`);
  });

program
  .command("rm <id>")
  .description("Rimuove un'attività")
  .action(id => {
    let tasks = load();
    const before = tasks.length;
    tasks = tasks.filter(t => t.id !== +id);
    if (tasks.length === before) return console.error("ID non trovato.");
    save(tasks);
    console.log(`Attività #${id} rimossa.`);
  });

program.parse();
