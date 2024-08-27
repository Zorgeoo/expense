import {
  createCategories,
  deleteCategory,
  getCategories,
} from "../controllers/categories.controller.js";
import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter
  .get("/", getCategories)
  .post("/", createCategories)
  .delete("/:id", deleteCategory);

export { categoriesRouter };
