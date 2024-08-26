import {
  createRecords,
  getRecords,
} from "../controllers/records.controller.js";
import { Router } from "express";

const recordsRouter = Router();

recordsRouter.get("/", getRecords).post("/", createRecords);

export { recordsRouter };
