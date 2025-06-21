jest.mock("../../db", () => ({
  query: jest.fn(),
}));

const db = require("../../db");

describe("Unit Test: Task logic", () => {
  it("should fetch tasks", async () => {
    db.query.mockResolvedValue({ rows: [{ id: 1, title: "Mock Task" }] });
    const result = await db.query("SELECT * FROM tasks");
    expect(result.rows[0].title).toBe("Mock Task");
  });
  it("should add a task", async () => {
        db.query.mockResolvedValue({ rows: [] });
        await db.query("INSERT INTO tasks (title, description) VALUES ($1, $2)", ["New Task", "Task Description"]);
        expect(db.query).toHaveBeenCalledWith("INSERT INTO tasks (title, description) VALUES ($1, $2)", ["New Task", "Task Description"]);
    });
    
    it("should update a task", async () => {
        db.query.mockResolvedValue({ rows: [] });
        await db.query("UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4", ["Updated Task", "Updated Description", "in-progress", 1]);
        expect(db.query).toHaveBeenCalledWith("UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4", ["Updated Task", "Updated Description", "in-progress", 1]);
    });
    
    it("should delete a task", async () => {
        db.query.mockResolvedValue({ rows: [] });
        await db.query("DELETE FROM tasks WHERE id=$1", [1]);
        expect(db.query).toHaveBeenCalledWith("DELETE FROM tasks WHERE id=$1", [1]);
    });
    });
    