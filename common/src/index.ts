import z from "zod";

// signupInput schema and type
export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

// signinInput schema and type
export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

// createBlogInput schema and type
export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});
export type updateBlogInput = z.infer<typeof updateBlogInput>;
export type signupInput = z.infer<typeof signupInput>;
export type signinInput = z.infer<typeof signinInput>;
export type createBlogInput = z.infer<typeof createBlogInput>;
