const { Router } = require("express");
const { getMe } = require("../controllers/users.controller");

const userRouter = Router();

userRouter.get("/me", getMe);

module.exports = { userRouter };
