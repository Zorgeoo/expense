"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useContext } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import * as Icons from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategory from "@/assets/AddCategory";
import { useFormik } from "formik";
import { DialogClose } from "@radix-ui/react-dialog";
import { TransactionContext } from "./utils/context";

export const AddRecord = ({ title, addClick }) => {
  const [buttonColor, setButtonColor] = useState("expense");

  const handleButtonColor = (button) => {
    setButtonColor(button);
  };
  const {
    categories,
    setCategories,
    transInfo,
    setTransInfo,
    categoriez,
    setCategoriez,
  } = useContext(TransactionContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      category: "",
    },
    onSubmit: (values) => {
      alert(`hello ${formik.values}`);
    },
  });

  const createCategory = async () => {
    const response = await axios.post(
      "http://localhost:3003/categories",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      categoriez
    );
    setCategories([...categories, response.data]);
  };

  return (
    <div className="flex">
      <form onSubmit={formik.handleSubmit}>
        <Dialog className="">
          <DialogTrigger className="w-full">
            <div className="bg-[#0166FF] px-12 text-white py-1 rounded-[20px] flex gap-[5px] items-center justify-center">
              <div className="font-semibold">{title}</div>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0">
            <div className="">
              <div className="border-b px-6 py-5 font-semibold text-xl">
                Add Record
              </div>
              <div className="flex">
                <div className="w-1/2 py-5 px-6 flex flex-col gap-5 border">
                  <div className="flex rounded-[20px] bg-[#F3F4F6] w-full">
                    <Button
                      className={`"px-5 py-2 w-1/2 rounded-[20px] text-black  ${
                        buttonColor === "expense"
                          ? "bg-[#0166FF] text-white"
                          : "bg-transparent"
                      } `}
                      onClick={() =>
                        setTransInfo(
                          { ...transInfo, type: "exp" },
                          handleButtonColor("expense")
                        )
                      }
                    >
                      Expense
                    </Button>
                    <Button
                      className={`"px-5 py-2 w-1/2 rounded-[20px] text-black  ${
                        buttonColor === "income"
                          ? "bg-[#16A34A] text-white"
                          : "bg-transparent"
                      } `}
                      onClick={() =>
                        setTransInfo(
                          { ...transInfo, type: "inc" },
                          handleButtonColor("income")
                        )
                      }
                    >
                      Income
                    </Button>
                  </div>
                  <div>
                    <div>Amount</div>
                    <Input
                      type="number"
                      name="amount"
                      value={transInfo.amount}
                      onChange={(event) =>
                        setTransInfo({
                          ...transInfo,
                          amount: event.target.value,
                        })
                      }
                      placeholder="₮ 000.00"
                    />
                  </div>
                  <div>
                    <div>Category</div>
                    <Select
                      onValueChange={(event) => {
                        setTransInfo({ ...transInfo, category: event });
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <AddCategory onclick={createCategory} />
                        {categories.map((item, index) => {
                          const Icon = Icons[item.icon];
                          return (
                            <SelectItem value={item} key={index}>
                              <div className="flex gap-3 justify-center items-center">
                                <Icon color={item.color} />
                                <div>{item.name}</div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 border items-center">
                    <div className="w-1/2 flex flex-col justify-between">
                      <div>Date</div>
                      <input
                        placeholder="date"
                        type="Date"
                        onChange={(event) =>
                          setTransInfo({
                            ...transInfo,
                            date: event.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <div>Time</div>
                      <input
                        type="time"
                        onChange={(event) =>
                          setTransInfo({
                            ...transInfo,
                            time: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogClose>
                    <Button
                      type="submit"
                      className={`bg-[#0166FF]"  ${
                        buttonColor === "income"
                          ? "bg-[#16A34A] text-white"
                          : "bg-[#0166FF] text-white"
                      }`}
                      onClick={addClick}
                    >
                      Add Record
                    </Button>
                  </DialogClose>
                </div>
                <div className="w-1/2 py-5 px-6 border">
                  <div>
                    <div>Payee</div>
                    <Input type="text" placeholder="Write here" />
                  </div>
                  <div>
                    <div className="mt-[19px]">Note</div>
                    <Textarea
                      onChange={(event) =>
                        setTransInfo({
                          ...transInfo,
                          note: event.target.value,
                        })
                      }
                      className="h-[246px]"
                      placeholder="Write here"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};
export default AddRecord;
