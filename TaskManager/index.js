const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const pool = require("./db");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// API: Get all tasks
app.get("/api/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  res.json(result.rows);
});

// API: Add a new task
app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;
  await pool.query("INSERT INTO tasks (title, description) VALUES ($1, $2)", [title, description]);
  res.json({ message: "Task added" });
});

// API: Update a task
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  await pool.query(
    "UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4",
    [title, description, status, id]
  );
  res.json({ message: "Task updated" });
});

// API: Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  res.json({ message: "Task deleted" });
});

// Frontend: Render home
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  res.render("index", { tasks: result.rows });
});

// Frontend: Form to create
app.get("/add", (req, res) => res.render("form"));

// Frontend: Form to update
app.get("/update/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Task not found");
    }

    res.render("update", { task: result.rows[0] });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
