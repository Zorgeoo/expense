"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as Icons from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { TransactionContext } from "@/components/utils/context";

const iconData = [
  { icon: "FaBus" },
  { icon: "FaApple" },
  { icon: "FaAmazonPay" },
  { icon: "FaBattleNet" },
  { icon: "FaVolleyballBall" },
  { icon: "FaBus" },
  { icon: "FaApple" },
  { icon: "FaAmazonPay" },
  { icon: "FaBattleNet" },
  { icon: "FaVolleyballBall" },
  { icon: "FaBus" },
  { icon: "FaApple" },
  { icon: "FaAmazonPay" },
  { icon: "FaBattleNet" },
  { icon: "FaVolleyballBall" },
  { icon: "FaBus" },
  { icon: "FaApple" },
  { icon: "FaAmazonPay" },
  { icon: "FaBattleNet" },
  { icon: "FaVolleyballBall" },
  { icon: "FaBus" },
  { icon: "FaApple" },
  { icon: "FaAmazonPay" },
  { icon: "FaBattleNet" },
  { icon: "FaVolleyballBall" },
  { icon: "FaBus" },
  { icon: "FaApple" },
  { icon: "FaAmazonPay" },
  { icon: "FaBattleNet" },
  { icon: "FaVolleyballBall" },
];

const colors = [
  { color: "#0166FF" },
  { color: "#00b3fe" },
  { color: "#41CC00" },
  { color: "#F9D100" },
  { color: "#FF7B01" },
  { color: "#AE01FF" },
  { color: "#FF0101" },
];

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
export const AddCategory = ({ onclick }) => {
  const [bgColor, setBgColor] = useState(null);
  const { categoriez, setCategoriez, transInfo, setTransInfo } =
    useContext(TransactionContext);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="hover:bg-[#0166FF] hover:text-white w-full rounded-[20px] text-black bg-transparent flex gap-[5px] justify-start items-center px-10">
          <div className="text-[24px] font-thin">+</div>
          <div className="">Add Category</div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <div className="py-5 px-6 border-b text-xl font-semibold">
          Add Category
        </div>
        <div className="p-6 flex flex-col gap-8">
          <div className="flex justify-around gap-3">
            <Select
              className="w-1/2"
              onValueChange={(value) =>
                setCategoriez({
                  ...categoriez,
                  icon: value.icon,
                })
              }
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <div className="grid grid-cols-5 p-6 gap-3 border-b-2">
                  {iconData.map((item, index) => {
                    const Icon = Icons[item.icon];
                    return (
                      <SelectItem
                        className={`w-fit h-fit flex justify-center items-center cursor-pointer`}
                        key={index}
                        value={item}
                      >
                        <div className="self-center p-0">
                          <Icon style={{ color: bgColor }} />
                        </div>
                      </SelectItem>
                    );
                  })}
                </div>
                <div className="flex p-6 gap-2">
                  {/* <div onClick={() => setBgColor("blue")}>
                    <DarkBlue />
                  </div> */}
                  {colors.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setBgColor(item.color);
                          setCategoriez({
                            ...categoriez,
                            color: item.color,
                          });
                        }}
                        className="h-6 w-6 border rounded-full cursor-pointer"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    );
                  })}
                </div>
              </SelectContent>
            </Select>
            <Input
              className="w-[300px]"
              placeholder="name"
              onChange={(event) =>
                setCategoriez({
                  ...categoriez,
                  name: event.target.value,
                })
              }
            />
          </div>
          <DialogClose>
            <Button
              className="rounded-[20px] w-full bg-[#16A34A]"
              onClick={onclick}
            >
              Add Category
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddCategory;
