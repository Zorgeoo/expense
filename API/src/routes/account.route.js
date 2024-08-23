const { Router } = require("express");

const {
  getAllAccounts,
  createAccount,
  deleteAccount,
  deleteAllAccount,
} = require("../controllers/account.controller");

const accountRouter = Router();

accountRouter
  .get("/", getAllAccounts)
  .post("/", createAccount)
  .delete("/:id", deleteAccount);

module.exports = { accountRouter };
