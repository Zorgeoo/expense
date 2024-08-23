import {
  createCategories,
  getCategories,
} from "../controllers/categories.controller.js";
import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories).post("/", createCategories);

export { categoriesRouter };
