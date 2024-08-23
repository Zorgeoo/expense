"use client";
import { Navbar } from "@/components";
import { UpArrow } from "../../../public/UpArrow";
import { Chart } from "../../../public/Chart";
import { PieChartt } from "../../../public/PieChart";
import { useAuth } from "@/components/utils/AuthProvider";
import { useContext } from "react";
import { TransactionContext } from "@/components/utils/context";
export const Dashboard = () => {
  // const { user } = useAuth();
  const { accounts } = useContext(TransactionContext);
  console.log(accounts);

  const calculateTotalAmount = (accounts) => {
    return accounts.reduce((total, account) => {
      const amount = parseFloat(account.amount); // Convert the amount to a number
      return total + (account.type === "exp" ? -amount : amount);
    }, 0);
  };
  const totalAmount = calculateTotalAmount(accounts);

  return (
    <div>
      <Navbar />
      <div className="bg-[#e6e7eb] h-screen">
        <div className="w-[1440px] m-auto">
          <div className="flex gap-6 pt-8">
            <div className="w-1/3 h-[216px] border bg-[#0166FF] rounded-[18px]">
              <div
                className={`text-xl ${
                  totalAmount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {totalAmount}$
              </div>
            </div>
            <div className="w-1/3 h-[216px] border rounded-[18px] bg-white">
              <div className="flex items-center py-4 px-6 gap-2 border-b">
                <div className="w-2 h-2 rounded-full bg-[#84CC16]"></div>
                <div>Your income</div>
              </div>
              <div className="py-5 px-6 flex flex-col gap-4  ">
                <div>
                  <div className="text-4xl font-semibold">1,200,000₮</div>
                  <div className="text-[#64748B]">Your Income Amount</div>
                </div>
                <div className="flex items-center gap-2">
                  <UpArrow />
                  <div>32% from last month</div>
                </div>
              </div>
            </div>
            <div className="w-1/3 h-[216px] border rounded-[18px] bg-white">
              <div className="flex items-center py-4 px-6 gap-2 border-b">
                <div className="w-2 h-2 rounded-full bg-[#84CC16]"></div>
                <div>Your income</div>
              </div>
              <div className="py-5 px-6 flex flex-col gap-4">
                <div>
                  <div className="text-4xl font-semibold">-1,200,000₮</div>
                  <div className="text-[#64748B]">Your Income Amount</div>
                </div>
                <div className="flex items-center gap-2">
                  <UpArrow />
                  <div>32% from last month</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-6">
            <div className="w-1/2 border border-green-50 h-[284px] rounded-xl bg-white">
              <div className="py-4 px-6 font-semibold">Income - Expense</div>
              <Chart />
            </div>
            <div className="w-1/2 border border-green-50 h-[284px] rounded-xl bg-white">
              <div className="py-4 px-6 font-semibold">Income - Expense</div>
              <div className="h-[228px]">
                <PieChartt className="h-[50px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
