"use client";
const { createContext, useState, useEffect } = require("react");
import axios from "axios";

export const TransactionContext = createContext(null);

export const TransactionContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [sortType, setSortType] = useState("all");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [categoriez, setCategoriez] = useState({
    name: "",
    icon: null,
    color: null,
    userId: null,
  });

  const [transInfo, setTransInfo] = useState({
    type: "exp",
    amount: null,
    category: { name: "", icon: null, color: null, userId: null },
    date: null,
    time: "",
    note: "",
  });
  const getData = async () => {
    const response = await axios?.get("http://localhost:3007/accounts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setAccounts(response.data);
  };

  useEffect(() => {
    getData();
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
