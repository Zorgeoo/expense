"use client";
import { Logo } from "@/assets/Logo";
import AddRecord from "./AddRecord";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./utils/AuthProvider";
import { TransactionContext } from "./utils/context";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const Navbar = () => {
  const { logOut, user } = useAuth();
  const { transInfo, getRecords } = useContext(TransactionContext);
  const createAccount = async () => {
    const response = await axios.post(
      "http://localhost:3003/records",
      transInfo,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getRecords();
  };
  return (
    <div className="w-[1440px] m-auto flex justify-between bg-white py-[16px]">
      <div className="flex items-center gap-[24px]">
        <Logo width="50" />
        <Link
          href={"/Dashboard"}
          style={{
            color: usePathname() === "/Dashboard" ? "blue" : "",
            fontWeight: usePathname() === "/Dashboard" ? "bold" : "",
          }}
        >
          <div>Dashboard</div>
        </Link>
        <Link
          href={"/"}
          style={{
            color: usePathname() === "/" ? "blue" : "",
            fontWeight: usePathname() === "/" ? "bold" : "",
          }}
        >
          <div>Records</div>
        </Link>
      </div>
      <div className="flex items-center gap-[24px] w-fit">
        <AddRecord title="+Record" addClick={createAccount} />
        <div className="text-xl font-bold text-blue-600">{user?.username}</div>
        <HoverCard>
          <HoverCardTrigger>
            <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
              <img src="/admin.jpeg" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col px-10 justify-center text-blue-600">
            <div className="flex gap-2">
              <div>Username:</div>
              <div className="font-semibold">{user?.username}</div>
            </div>
            <div className="flex gap-2">
              <div>Email:</div>
              <div className="font-semibold">{user?.email}</div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <Link href={"/LogIn"}>
          <div className=" text-blue-600 font-bold text-xl" onClick={logOut}>
            Log Out
          </div>
        </Link>
      </div>
    </div>
  );
};
