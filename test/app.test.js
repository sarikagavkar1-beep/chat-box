const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../server");

describe("Real-Time Chat API", function () {
  describe("GET /api", function () {
    it("should return API status", async function () {
      const response = await request(app).get("/api");
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Real-Time Chat API is running");
    });
  });

  describe("POST /api/register", function () {
    it("should reject missing username and password", async function () {
      const response = await request(app).post("/api/register").send({});
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("Username and password are required");
    });

    it("should reject short passwords", async function () {
      const response = await request(app).post("/api/register")
        .send({ username: "testuser", password: "123" });
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("Password must contain at least 6 characters");
    });
  });

  describe("POST /api/login", function () {
    it("should reject missing credentials", async function () {
      const response = await request(app).post("/api/login").send({});
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("Username and password are required");
    });
  });
});