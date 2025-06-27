const request = require("supertest");
const app = require("../../index"); // assuming app is exported from index.js

describe("API: /api/tasks", () => {
  let newTaskId;

  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test task", description: "Test description" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task added");

    // Get latest task
    const tasks = await request(app).get("/api/tasks");
    newTaskId = tasks.body[tasks.body.length - 1].id;
  });

  it("should update the created task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${newTaskId}`)
      .send({ title: "Updated task", description: "Updated desc", status: "completed" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task updated");
  });

  it("should delete the task", async () => {
    const res = await request(app).delete(`/api/tasks/${newTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted");
  });
});

