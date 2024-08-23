const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const getAllAccounts = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);

    const accounts = JSON.parse(rawData);

    const userAccounts = accounts.filter(
      (account) => account.userId === req.user.id
    );
    res.json(userAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const createAccount = async (req, res) => {
  console.log(req.body, "Henlo");
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);

    const accounts = JSON.parse(rawData);

    const newAccount = { ...req.body, id: v4(), userId: req.user.id };

    console.log(newAccount);
    accounts.push(newAccount);
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));
    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteAccount = async (req, res) => {
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

module.exports = {
  getAllAccounts,
  createAccount,
  deleteAccount,
};
