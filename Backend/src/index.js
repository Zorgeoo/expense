import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { usersRouter, postsRouter } from "./routes/index.js";
import { categoriesRouter } from "./routes/categories.route.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
