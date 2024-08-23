const { Router } = require("express");

const {
  getAllCategories,
  createCategory,
  deleteCategory,
  deleteAllCategory,
} = require("../controllers/category.controller");

const categoryRouter = Router();

categoryRouter
  .get("/", getAllCategories)
  .post("/", createCategory)
  .delete("/:id", deleteCategory);

module.exports = { categoryRouter };
