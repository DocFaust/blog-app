const request = require("supertest");

jest.mock("mongoose");

const app = require("../app");
const { __mockPost: MockPost } = require("mongoose");

describe("blog app routes", () => {
  beforeEach(() => {
    MockPost.__setFindResult([
      { title: "Hello World", content: "Welcome to the blog." },
    ]);
    MockPost.__setFindOneResult({
      title: "Sample Post",
      content: "This is a sample post.",
    });
    MockPost.__setSaveError(null);
  });

  it("renders the home page with posts", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Lacus vel facilisis");
    expect(response.text).toContain("Hello World");
  });

  it("renders the about page", async () => {
    const response = await request(app).get("/about");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Hac habitasse platea");
  });

  it("renders the contact page", async () => {
    const response = await request(app).get("/contact");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Scelerisque eleifend");
  });

  it("renders the compose page", async () => {
    const response = await request(app).get("/compose");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Compose");
    expect(response.text).toContain("Publish");
  });

  it("creates a post and redirects to home", async () => {
    const response = await request(app)
      .post("/compose")
      .type("form")
      .send({ postTitle: "New Post", postBody: "New content" });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/");
  });

  it("renders an individual post", async () => {
    const response = await request(app).get("/posts/123");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Sample Post");
    expect(response.text).toContain("This is a sample post.");
  });
});
