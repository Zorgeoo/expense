"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export const Apii = () => {
  // API
  const [accounts, setAccounts] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3007/accounts");
      setAccounts(response.data);
    };
    getData();
  }, []);
  const createAccount = async () => {
    const newAccount = { title, amount };
    const response = await axios.post(
      "http://localhost:3007/accounts",
      newAccount
    );
    setAccounts([...accounts, response.data]);
  };

  const deleteAccount = async (id) => {
    const response = await axios.delete(`http://localhost:3007/accounts/${id}`);
    setAccounts(accounts.filter((account) => account.id !== id));
  };
  const deleteAllAccount = async () => {
    const response = await axios.delete("http://localhost:3007/accounts/");
    setAccounts([]);
    console.log(response.data);
  };
  return (
    <div>
      <div>
        {accounts.map((item) => {
          return (
            <div key={item.title}>
              {item.title}-{item.amount}
              <button
                onClick={() => {
                  deleteAccount(item.id);
                }}
                className="border"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex gap-5">
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="border"
        />
        <input
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
          className="border"
        />

        <button className="border" onClick={createAccount}>
          Create
        </button>
        <button onClick={deleteAllAccount}>Delete all</button>
      </div>
    </div>
  );
};
export default Apii;
