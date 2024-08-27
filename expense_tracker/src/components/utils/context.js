"use client";

const { createContext, useState, useEffect } = require("react");

import axios from "axios";

export const TransactionContext = createContext(null);

export const TransactionContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [sortType, setSortType] = useState("all");

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

  const getData = async () => {
    const response = await axios?.get("http://localhost:3003/records", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setAccounts(response.data);
  };
  const getCategories = async () => {
    const response = await axios?.get("http://localhost:3003/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCategories(response.data);
  };

  useEffect(() => {
    getData();
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
        getData,
        accounts,
        setAccounts,
        sortType,
        setSortType,
        getCategories,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
