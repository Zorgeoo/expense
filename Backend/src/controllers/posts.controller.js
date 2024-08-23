import { db } from "../database/index.js";
import { posts } from "../database/schema.js";

export const getPosts = async (_, res) => {
  const posts = await db.query.posts.findMany();

  res.json(posts);
};

export const createPost = async (req, res) => {
  const { name, content, userId, amount, description, categoryId } = req.body;

  const post = await db
    .insert(posts)
    .values({ name, content, userId, amount, description, categoryId })
    .returning();

  res.json(post);
};
