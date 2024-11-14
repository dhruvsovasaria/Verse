import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
// import { Hono } from "hono";
import { sign, decode, verify } from "hono/jwt";
import { signupInput } from "@dhruvsovasaria/medium-common";
import { signinInput } from "@dhruvsovasaria/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    console.log("error");
    return c.json({
      error: "Invalid input",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // const users = await prisma.user.findMany();

  //zod , hashed password
  try {
    //duplicate
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log("user created" + user.username + user.password);
    return c.text(jwt);
  } catch (e) {
    console.log(e + "error");
    return c.json({ error: e });
  }
});
userRouter.post("/api/v1/user/signin", async (c) => {
  // return c.text("Hello Hono !");
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({
      error: "Invalid input",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // const users = await prisma.user.findMany();

  //zod , hashed password
  try {
    //duplicate
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "Invalid username or password" });
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    console.log("user signed in " + user.username + user.password);
    return c.text(jwt);
  } catch (e) {
    console.log(e + "error");
    return c.json({ error: e });
  }
});
