const request = require("supertest");
const app = require("./app");

describe("Node.js Demo App", () => {
  test("GET / returns the welcome message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });

  test("GET /health returns healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
  });
});
