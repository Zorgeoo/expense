"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TransactionContext } from "@/components/utils/context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext } from "react";

const chartConfig = {
  desktop: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
};

export function Chart() {
  const { accounts } = useContext(TransactionContext);
  console.log(accounts);

  // const incomes = accounts.filter((account) => account.type === "inc");
  // const expenses = accounts.filter((account) => account.type === "exp");

  // console.log(expenses);
  // console.log(incomes);

  const getMonth = (date) => {
    const accountDate = new Date(date);
    return accountDate.getMonth(); // 0 for January, 11 for December
  };

  // Function to filter by type and month
  const getTotalAmountByTypeAndMonth = (accounts, type, month) => {
    return accounts
      .filter(
        (account) => account.type === type && getMonth(account.date) === month
      )
      .reduce((total, account) => total + account.amount, 0);
  };
  const MarchExpenses = getTotalAmountByTypeAndMonth(accounts, "exp", 2); // March (2 because January is 0)
  const AprilExpenses = getTotalAmountByTypeAndMonth(accounts, "exp", 3); // April
  const MayExpenses = getTotalAmountByTypeAndMonth(accounts, "exp", 4); // May
  const JuneExpenses = getTotalAmountByTypeAndMonth(accounts, "exp", 5); // June
  const JulyExpenses = getTotalAmountByTypeAndMonth(accounts, "exp", 6); // July
  const AugustExpenses = getTotalAmountByTypeAndMonth(accounts, "exp", 7); // August

  const MarchIncomes = getTotalAmountByTypeAndMonth(accounts, "inc", 2); // March income
  const AprilIncomes = getTotalAmountByTypeAndMonth(accounts, "inc", 3); // April income
  const MayIncomes = getTotalAmountByTypeAndMonth(accounts, "inc", 4); // May income
  const JuneIncomes = getTotalAmountByTypeAndMonth(accounts, "inc", 5); // June income
  const JulyIncomes = getTotalAmountByTypeAndMonth(accounts, "inc", 6); // July income
  const AugustIncomes = getTotalAmountByTypeAndMonth(accounts, "inc", 7); // August income

  const chartData = [
    { month: "March", expense: MarchExpenses, income: MarchIncomes },
    { month: "April", expense: AprilExpenses, income: AprilIncomes },
    { month: "May", expense: MayExpenses, income: MayIncomes },
    { month: "June", expense: JuneExpenses, income: JuneIncomes },
    { month: "July", expense: JulyExpenses, income: JulyIncomes },
    { month: "August", expense: AugustExpenses, income: AugustIncomes },
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>INCOME CHART</CardTitle>
        <CardDescription>March - August 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expense" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="income" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
