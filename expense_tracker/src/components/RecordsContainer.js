"use client";
import { Arrow } from "@/assets/Arrow";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecordCard } from "@/assets/RecordCard";
import { useState, useEffect, useContext } from "react";
import AddRecord from "./AddRecord";
import AddCategory from "@/assets/AddCategory";
import { TransactionContext } from "./utils/context";
import { useAuth } from "./utils/AuthProvider";

const maxValue = 1000;
const minValue = 0;

export const RecordContainer = () => {
  const [sliderValue, setSliderValue] = useState([minValue, maxValue]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user } = useAuth();
  const handleNewValues = (index, newValue) => {
    const newValues = [...sliderValue];
    newValues[index] = Number(newValue);
    setSliderValue(newValues);
  };

  console.log(user);

  const {
    transInfo,
    setTransInfo,
    categoriez,
    setCategoriez,
    getData,
    categories,
    setCategories,
    accounts,
    setAccounts,
    sortType,
    setSortType,
  } = useContext(TransactionContext);

  useEffect(() => {
    const getData = async () => {
      const response = await axios?.get("http://localhost:3003/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAccounts(response.data);
    };
    getData();
  }, []);

  const createAccount = async () => {
    const response = await axios.post(
      "http://localhost:3003/posts",
      transInfo,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getData();
  };

  const deleteAccount = async (id) => {
    const response = await axios?.delete(`http://localhost:3003/posts${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/categories/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(response.data);
      } catch (error) {}
    };
    getData();
  }, []);

  const createCategory = async () => {
    const response = await axios?.post(
      "http://localhost:3003/categories",
      categoriez,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setCategories([...categories, response.data]);
  };

  const deleteCategory = async (id) => {
    const response = await axios?.delete(
      `http://localhost:3003/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setCategories(categories.filter((category) => category.id !== id));
  };

  //Calculating net amount

  const calculateTotalAmount = (accounts) => {
    return accounts.reduce((total, account) => {
      const amount = parseFloat(account.amount); // Convert the amount to a number
      return total + (account.type === "exp" ? -amount : amount);
    }, 0);
  };

  const totalAmount = calculateTotalAmount(accounts);

  //Filtering and sorting

  const filterAccountsByType = () => {
    setFilteredAccounts(
      accounts.filter((account) => {
        if (sortType === "all") return true;
        if (sortType === "inc" && account.type === "inc") return true;
        if (sortType === "exp" && account.type === "exp") return true;
        return false;
      })
    );
  };

  useEffect(() => {
    filterAccountsByType();
  }, [accounts, sortType]);
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  // const filterAccountsByCategory = (accounts, selectedCategories) => {
  //   return accounts
  //     .filter((account) => !selectedCategories.includes(account.category.id))
  //     .sort((a, b) => {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);
  //       return dateB - dateA; // Ascending order; use dateB - dateA for descending order
  //     });
  // };

  // useEffect(() => {
  //   setFilteredAccounts(filterAccountsByCategory(accounts, selectedCategories));
  // }, [accounts, selectedCategories]);

  return (
    <div className="bg-[#f6f6f6] h-svh py-6">
      <div className="w-[1440px] m-auto flex">
        <div className="flex py-[24px] px-[16px] w-[282px] ">
          <div className="flex flex-col gap-[24px] w-full ">
            <div className="flex flex-col gap-[24px]">
              <div className="font-semibold text-[24px]">Record</div>
              <AddRecord title="+Add" addClick={createAccount} />
              <input
                placeholder="Search"
                type="search"
                className="block pl-[10px] rounded-sm"
              ></input>
            </div>
            <div>
              <div className="pb-[16px] font-semibold">Types</div>
              <RadioGroup
                defaultValue="all"
                onValueChange={(value) => {
                  setSortType(value);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inc" id="option-two" />
                  <Label htmlFor="option-two">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exp" id="option-three" />
                  <Label htmlFor="option-three">Expense</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="font-semibold">Category</div>
                <div
                  className="text-gray-400"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear
                </div>
              </div>
              <div>
                {categories.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between w-full"
                      onClick={() => handleCategoryChange(item.id)}
                    >
                      <div className="flex gap-[8px] items-center ">
                        {selectedCategories.includes(item.id) ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                        <div className="py-[8px]">{item.name}</div>
                      </div>
                      <Arrow />
                      <button
                        onClick={() => {
                          deleteCategory(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
              <AddCategory onclick={createCategory} />
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="font-semibold">Amount range</div>
              <div className="flex gap-[16px]">
                <Input
                  className="border"
                  type="number"
                  placeholder={sliderValue[0]}
                  onChange={(e) => handleNewValues(0, e.target.value)}
                />
                <Input
                  className="border"
                  type="number"
                  placeholder={sliderValue[1]}
                  onChange={(e) => handleNewValues(1, e.target.value)}
                />
              </div>
              <Slider
                defaultValue={[1000]}
                max={maxValue}
                min={minValue}
                onValueChange={(newValues) => setSliderValue(newValues)}
                step={1}
                value={sliderValue}
              />
              <div className="flex justify-between">
                <div>{sliderValue[0]}</div>
                <div>{sliderValue[1]}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between pt-8">
            <div className="pl-[80px]  w-[180px]">
              <Carousel>
                <CarouselContent>
                  <CarouselItem>Last 10 Days</CarouselItem>
                  <CarouselItem>Last 20 Days</CarouselItem>
                  <CarouselItem>Last 30 Days</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-[full-30px] m-auto rounded-md py-[12px] px-[24px] flex bg-white justify-between items-center mt-[16px] ml-[30px]">
            <div className="flex items-center gap-[15px]">
              <Checkbox className="w-[20px] h-[20px]" />
              <div>Select all</div>
              <div className="flex flex-col">
                <div></div>
                <div></div>
              </div>
            </div>
            <div
              className={`text-xl ${
                totalAmount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {totalAmount}$
            </div>
          </div>
          <div className="pl-[30px]">
            <div className="pb-3 pt-6 font-semibold">Today</div>
            <div className="flex flex-col gap-[12px] ">
              {filteredAccounts.map((item, index) => {
                return (
                  <div>
                    <RecordCard
                      key={index}
                      amount={item.amount}
                      date={item.date}
                      time={item.time}
                      categ={item.category?.name}
                      icon={item.category?.icon}
                      color={item.category?.color}
                      type={item.type}
                    />
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
          </div>
          <div className="pl-[30px]">
            <div className="pb-3 pt-6 font-semibold">Yesterday</div>
            <div className="flex flex-col gap-[12px] "></div>
          </div>
        </div>
      </div>
    </div>
  );
};
