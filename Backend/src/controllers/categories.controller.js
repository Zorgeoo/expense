import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { categories } from "../database/schema.js";

export const getCategories = async (req, res) => {
  const allCategories = await db.query.categories.findMany({
    with: {
      records: true,
    },
    where: eq(categories.userId, req.user.id),
  });

  res.json(allCategories);
};

export const createCategories = async (req, res) => {
  const { id, name, userId, description, icon, color } = req.body;

  const category = await db
    .insert(categories)
    .values({ id, name, description, icon, color, userId: req.user.id })
    .returning();

  res.json(category);
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategories = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!existingCategories) {
      return res.status(404).json({ error: "Record not found" });
    }

    await db.delete(categories).where(eq(categories.id, id));

    res.json({
      message: "Category successfully deleted",
      deletedCategoires: existingCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
