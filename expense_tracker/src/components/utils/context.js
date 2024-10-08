"use client";

const { createContext, useState, useEffect } = require("react");

import axios from "axios";
import { api } from "../library/axios";

export const TransactionContext = createContext(null);

export const TransactionContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [sortType, setSortType] = useState("all");
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [categoriez, setCategoriez] = useState({
    name: "",
    icon: null,
    color: null,
  });

  const [transInfo, setTransInfo] = useState({
    type: "exp",
    amount: null,
    date: "",
    time: "",
    categoryId: null,
  });

  const getRecords = async () => {
    const response = await api.get("/records", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setAccounts(response.data);
  };
  const getCategories = async () => {
    const response = await api.get("/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCategories(response.data);
  };

  useEffect(() => {
    getRecords();
    getCategories;
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transInfo,
        setTransInfo,
        categoriez,
        setCategoriez,
        categories,
        setCategories,
        getRecords,
        accounts,
        setAccounts,
        sortType,
        setSortType,
        getCategories,
        filteredAccounts,
        setFilteredAccounts,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
