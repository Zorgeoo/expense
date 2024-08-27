"use client";
import { Logo } from "@/assets/Logo";
import AddRecord from "./AddRecord";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./utils/AuthProvider";
export const Navbar = () => {
  const { logOut, user } = useAuth();
  console.log(user);

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
        <AddRecord title="+Record" />
        <div className="text-xl font-bold text-blue-600">{user?.username}</div>
        <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
          <img src="/admin.jpeg" />
        </div>
        <Link href={"/LogIn"}>
          <div className=" text-blue-600 font-bold text-xl" onClick={logOut}>
            Log Out
          </div>
        </Link>
      </div>
    </div>
  );
};
