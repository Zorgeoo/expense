import axios from "axios";

export const api = axios.create({
  baseURL: "https://expense-1-kaeu.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
