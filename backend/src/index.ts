import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { sign, decode, verify } from "hono/jwt";
// import { Jwt } from "hono/utils/jwt";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.get("/", (c) => {
  return c.json({
    message: "hello",
  });
});

export default app;

// it the url to the main database
//

//url to the connection pool
//
