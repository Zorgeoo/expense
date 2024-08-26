import { db } from "../database/index.js";
import { records } from "../database/schema.js";

export const getRecords = async (_, res) => {
  const records = await db.query.records.findMany({
    with: {
      category: true,
    },
  });
  res.json(records);
};

export const deleteAccount = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const { id } = req.params;

    const rawData = fs.readFileSync(filePath);
    let accounts = JSON.parse(rawData);

    accounts = accounts.filter((account) => account.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createRecords = async (req, res) => {
  const { name, content, userId, amount, description, categoryId, date, time } =
    req.body;

  const record = await db
    .insert(records)
    .values({
      name,
      content,
      userId,
      amount,
      description,
      categoryId,
      date,
      time,
    })
    .returning();

  res.json(record);
};
