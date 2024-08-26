import { db } from "../database/index.js";
import { categories } from "../database/schema.js";

export const getCategories = async (_, res) => {
  const categories = await db.query.categories.findMany({
    with: {
      records: true,
    },
  });

  res.json(categories);
};

export const createCategories = async (req, res) => {
  const { id, name, description, icon, color } = req.body;

  const category = await db
    .insert(categories)
    .values({ id, name, description, icon, color })
    .returning();

  res.json(category);
};
