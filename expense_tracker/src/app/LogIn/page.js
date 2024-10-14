"use client";

import { Logo } from "@/assets/Logo";
import Link from "next/link";
import { useAuth } from "@/components/utils/AuthProvider";
import { useState } from "react";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  return (
    <div className="h-screen w-screen">
      <div className="flex w-full h-full">
        <div className="flex-1 m-auto flex flex-col items-center">
          <div className="flex h-fit items-center">
            <Logo width="40" />
            <div>Gold</div>
          </div>
          <div className="flex flex-col items-center py-10">
            <div className="text-2xl font-semibold pb-2">Welcome back</div>
            <div>Welcome back, Please enter your details</div>
          </div>
          <div className="flex flex-col gap-4 w-2/5">
            <input
              type="email"
              placeholder="Email"
              className="pl-4 border rounded-lg bg-[#F3F4F6] p-1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="pl-4 border rounded-lg bg-[#F3F4F6] p-1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              className="rounded-[20px] w-full bg-[#0166FF]"
              onClick={() => login(email, password)}
            >
              Log In
            </button>
          </div>
          <div className="flex gap-3 pt-10">
            <div>Don’t have account?</div>
            <Link href="./SignUp">
              <div className="text-[#0166FF] cursor-pointer ">Sign up</div>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-[#0166FF] w-full h-full"></div>
      </div>
    </div>
  );
};
export default LogIn;
