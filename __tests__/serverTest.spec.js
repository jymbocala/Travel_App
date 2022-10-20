const request = require("supertest");
const app = require("../src/server/app");

describe("Test the root path", () => {
    test("It should respond the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});