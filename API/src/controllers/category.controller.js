const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const getAllCategories = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "category.json");

    const rawData = fs.readFileSync(filePath);

    const categories = JSON.parse(rawData);

    const userCategories = categories.filter(
      (category) => category.userId === req.user.id
    );

    res.json(userCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const createCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "category.json");

    const rawData = fs.readFileSync(filePath);

    const categories = JSON.parse(rawData);

    const newCategory = { ...req.body, id: v4(), userId: req.user.id };

    categories.push(newCategory);

    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "category.json");
    const { id } = req.params;

    const rawData = fs.readFileSync(filePath);
    let categories = JSON.parse(rawData);

    categories = categories.filter((category) => category.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const deleteAllCategory = async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, "..", "data", "accounts.json");

//     const rawData = fs.readFileSync(filePath);

//     const categories = JSON.parse(rawData);

//     categories.splice(0, categories.length);

//     fs.writeFileSync(filePath, JSON.stringify(categories));
//     console.log(req.body);
//     res.json({ message: "Success" });
//   } catch (error) {
//     console.error("Error deleting account:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
