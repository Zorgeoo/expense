import {
  createRecords,
  getRecords,
  deleteRecord,
} from "../controllers/records.controller.js";
import { Router } from "express";

const recordsRouter = Router();

recordsRouter
  .get("/", getRecords)
  .post("/", createRecords)
  .delete("/:id", deleteRecord);

export { recordsRouter };
