"use client";
import { Navbar } from "@/components";
import { UpArrow } from "../../../public/UpArrow";
import { Chart } from "../../../public/Chart";
import { PieChartt } from "../../../public/PieChart";
import { useContext, useEffect } from "react";
import { TransactionContext } from "@/components/utils/context";
export const Dashboard = () => {
  const { accounts } = useContext(TransactionContext);

  const getTotalAmountByTypeAndMonth = (accounts, type) => {
    return accounts
      .filter((account) => account.type === type)
      .reduce((total, account) => total + account.amount, 0);
  };
  const netIncome = getTotalAmountByTypeAndMonth(accounts, "inc");

  const netExpense = getTotalAmountByTypeAndMonth(accounts, "exp");

  return (
    <div>
      <Navbar />
      <div className="bg-[#e6e7eb] h-screen">
        <div className="w-[1440px] m-auto">
          <div className="flex gap-6 pt-8">
            <div className="w-1/3 h-[216px] border bg-[#0166FF] rounded-[18px]"></div>
            <div className="w-1/3 h-[216px] border rounded-[18px] bg-white">
              <div className="flex items-center py-4 px-6 gap-2 border-b">
                <div className="w-2 h-2 rounded-full bg-[#84CC16]"></div>
                <div>Your income</div>
              </div>
              <div className="py-5 px-6 flex flex-col gap-4  ">
                <div>
                  <div className="text-4xl font-semibold">{netIncome}$</div>
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
                <div>Total expenses</div>
              </div>
              <div className="py-5 px-6 flex flex-col gap-4">
                <div>
                  <div className="text-4xl font-semibold">-{netExpense}$</div>
                  <div className="text-[#64748B]">Your Expense Amount</div>
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
              {/* <div className="h-[228px]">
                <PieChartt className="h-[50px]" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
