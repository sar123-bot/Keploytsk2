const db = require("../../db");

describe("Integration: DB connection", () => {
  it("should fetch tasks from DB", async () => {
    const result = await db.query("SELECT * FROM tasks");
    expect(Array.isArray(result.rows)).toBe(true);
  });
});
afterAll(async () => {
  await db.end(); 
});
