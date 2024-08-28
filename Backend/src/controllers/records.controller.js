import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { records } from "../database/schema.js";

export const getRecords = async (req, res) => {
  try {
    const Allrecords = await db.query.records.findMany({
      with: {
        category: true,
      },
      where: eq(records.userId, req.user.id), //records data dund user.id-tai tentsuu bgaa recordsiig shuune
    });
    res.json(Allrecords); //user.id-tai tentssen recordsoo RES-r butsaana
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params; //req-r irsen path

    const existingRecord = await db.query.records.findFirst({
      //recordsoos adilhan idtai record haina
      where: eq(records.id, id),
    });

    if (!existingRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    await db.delete(records).where(eq(records.id, id)); //records-s id taarsan elementee ustgana

    res.json({
      message: "Record successfully deleted",
      deletedRecord: existingRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRecords = async (req, res) => {
  const { name, content, amount, description, categoryId, date, time, type } =
    req.body; //req.body-s edgeer medeelliig avna

  const record = await db //database-n records table nemeed hariu butsaana
    .insert(records)
    .values({
      name,
      content,
      userId: req.user.id,
      amount,
      description,
      categoryId,
      date,
      time,
      type,
    })
    .returning();

  res.json(record);
};
