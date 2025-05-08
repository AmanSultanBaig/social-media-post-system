const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const User = require("../models/User");
const Post = require("../models/Post");
const { hashPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

let mongoServer;
let token;
let userId;

jest.setTimeout(20000); // 20 seconds

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const hashedPassword = await hashPassword("password123");

  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
  });

  userId = user._id;
  token = generateToken({ id: user._id, email: user.email });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Post.deleteMany();
});

describe("POST /api/posts/create-post", () => {
  it("should allow an authenticated user to create a post", async () => {
    const res = await request(app)
      .post("/api/posts/create-post") 
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "This is a test post",
        platform: "facebook",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.content).toBe("This is a test post");
  });

  it("should NOT allow unauthenticated users to create a post", async () => {
    const res = await request(app).post("/api/posts/create-post").send({
      content: "Unauthenticated post",
      platform: "twitter",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Access denied: Authorization token is missing or improperly formatted");
  });

  it("should return 400 for invalid platform", async () => {
    const res = await request(app)
      .post("/api/posts/create-post")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Invalid platform post",
        platform: "myspace",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toMatch(/validation/i);
  });
});
