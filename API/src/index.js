const express = require("express");
const cors = require("cors");
const { accountRouter } = require("./routes/account.route");
const { categoryRouter } = require("./routes/category.route");
const { authRouter } = require("./routes/auth.route");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { userRouter } = require("./routes/users.route");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 3007;

app.get("", (req, res) => {
  res.send("Heelo beetches");
});
app.use(authMiddleware);
app.use("/accounts", accountRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
