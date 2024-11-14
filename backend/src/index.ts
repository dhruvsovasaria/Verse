import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { sign, decode, verify } from "hono/jwt";
// import { Jwt } from "hono/utils/jwt";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.post("/api/v1/user/", (c) => {
  return c.text("Hello Hono!");
});
app.post("/api/v1/user/sign", (c) => {
  return c.text("Hello Hono!");
});
app.put("/api/v1/user/signi", (c) => {
  return c.text("Hello Hono!");
});
app.put("/api/v1/user/sig", (c) => {
  return c.text("Hello Hono!");
});

export default app;

// it the url to the main database
//

//url to the connection pool
//
