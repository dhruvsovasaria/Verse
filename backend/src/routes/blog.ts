import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
} from "@dhruvsovasaria/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>();

//middleware for checking whether the user is logged in or not
blogRouter.use("/*", async (c, next) => {
  //   check whether they are logged in , and if they are logged in then
  {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    console.log(user);
    if (user) {
      console.log(user);
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "You are not authorized" });
    }
  }
});

//  route for creating the blog
blogRouter.post("/", async (c) => {
  // console.log(user.id);
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return c.json({
      error: "invalid type validation",
    });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Blog not created" });

    //   return c.text("Hello Hono pagal!");
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    console.log("input validaiton  failed");
    return c.json({
      error: "Invalid input",
    });
  }
  // this is the route for updating the blog
  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    console.log("blog updated", blog);
    return c.json(blog);
  } catch (e) {
    c.status(404);
    return c.json({ error: "Blog not found" });
  }
});

//todo : pagination is to be added here

blogRouter.get("/bulk", async (c) => {
  // const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // this is the route for updating theblog

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(blogs);
  } catch (e) {
    // c.status(404);
    c.status(404);
    return c.json({ message: "Blog not found" });
  }
});

blogRouter.get("/:id", async (c) => {
  // const body = await c.req.json();
  const id = c.req.param("id");
  console.log(id);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // this is the route for updating theblog

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    // c.status(404);
    c.status(404);
    console.log(e);
    return c.json({ message: "Blog not found" });
  }
});
