import { createPost, getPosts } from "../controllers/posts.controller.js";
import { Router } from "express";

const postsRouter = Router();

postsRouter.get("/", getPosts).post("/", createPost);

export { postsRouter };
