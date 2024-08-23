"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as Icons from "react-icons/fa";

export const RecordCard = ({
  type,
  icon,
  date,
  amount,
  time,
  categ,
  color,
}) => {
  const Icon = Icons[icon];
  const displayAmount = type === "exp" ? -amount : amount;
  return (
    <div className="w-full m-auto rounded-md py-[12px] px-[24px] flex bg-white justify-between items-center">
      <div className="flex items-center gap-[15px]">
        <Checkbox className="w-[20px] h-[20px]" />
        {Icon ? <Icon color={color} /> : <div>CATEGORY OBSOO</div>}
        <div className="flex flex-col">
          <div className="text-lg">{categ}</div>
          <div className="flex text-xs gap-2">
            <div>{date}</div>
            <div>{time}</div>
          </div>
        </div>
      </div>
      <div
        className={`${displayAmount < 0 ? "text-red-600" : "text-green-600"}`}
      >
        {displayAmount}$
      </div>
    </div>
  );
};
