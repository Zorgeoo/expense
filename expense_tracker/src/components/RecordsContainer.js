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
import { isToday, isYesterday } from "date-fns";
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

const maxValue = 100000;
const minValue = 0;

export const RecordContainer = () => {
  const [sliderValue, setSliderValue] = useState([minValue, maxValue]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("highest");
  const handleNewValues = (index, newValue) => {
    const newValues = [...sliderValue];
    newValues[index] = Number(newValue);
    setSliderValue(newValues);
  };

  const {
    transInfo,
    setTransInfo,
    categoriez,
    setCategoriez,
    getRecords,
    categories,
    setCategories,
    accounts,
    setAccounts,
    sortType,
    setSortType,
    getCategories,
  } = useContext(TransactionContext);

  useEffect(() => {
    getRecords();
  }, []);

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

  const deleteAccount = async (id) => {
    const response = await axios?.delete(
      `http://localhost:3003/records/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setAccounts(accounts.filter((account) => account.id !== id));
    getRecords();
  };

  useEffect(() => {
    getCategories();
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
    getCategories();
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

  //CHATGPT FILTER
  // const filterRecordsByDate = () => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const yesterday = new Date(today);
  //   yesterday.setDate(today.getDate() - 1);

  //   const isToday = (date) => {
  //     const recordDate = new Date(date);
  //     return (
  //       recordDate.getFullYear() === today.getFullYear() &&
  //       recordDate.getMonth() === today.getMonth() &&
  //       recordDate.getDate() === today.getDate()
  //     );
  //   };

  //   const isYesterday = (date) => {
  //     const recordDate = new Date(date);
  //     return (
  //       recordDate.getFullYear() === yesterday.getFullYear() &&
  //       recordDate.getMonth() === yesterday.getMonth() &&
  //       recordDate.getDate() === yesterday.getDate()
  //     );
  //   };

  //   const todayRecords = accounts.filter(
  //     (account) =>
  //       isToday(account.date) &&
  //       account.amount >= sliderValue[0] &&
  //       account.amount <= sliderValue[1]
  //   );

  //   const yesterdayRecords = accounts.filter(
  //     (account) =>
  //       isYesterday(account.date) &&
  //       account.amount >= sliderValue[0] &&
  //       account.amount <= sliderValue[1]
  //   );

  //   const otherRecords = accounts.filter(
  //     (account) =>
  //       !isToday(account.date) &&
  //       !isYesterday(account.date) &&
  //       account.amount >= sliderValue[0] &&
  //       account.amount <= sliderValue[1]
  //   );

  //   setFilteredAccounts({
  //     today: todayRecords,
  //     yesterday: yesterdayRecords,
  //     others: otherRecords,
  //   });
  // };

  // useEffect(() => {
  //   filterRecordsByDate();
  // }, [accounts, sortType, selectedCategories, sliderValue, sortOrder]);
  // console.log(filteredAccounts);

  //CHATGPT FILTER

  const todayRecords = filteredAccounts.filter((record) =>
    isToday(record.date)
  );

  const yesterdayRecords = filteredAccounts.filter((record) =>
    isYesterday(record.date)
  );

  const otherRecords = filteredAccounts.filter(
    (record) => !isToday(record.date) && !isYesterday(record.date)
  );

  const records = [
    { record: todayRecords, text: "Today" },
    { record: yesterdayRecords, text: "Yesterday" },
    { record: otherRecords, text: "Other" },
  ];
  console.log(records);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  //Filtering and sorting

  const filterAccountsByType = () => {
    setFilteredAccounts(
      accounts
        .filter(
          (account) =>
            account.amount >= sliderValue[0] && account.amount <= sliderValue[1]
        )
        .filter((account) => {
          if (sortType === "all") return true;
          if (sortType === "inc" && account.type === "inc") return true;
          if (sortType === "exp" && account.type === "exp") return true;
          return false;
        })
        .filter((account) => !selectedCategories.includes(account.categoryId))
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (sortOrder === "highest") {
            return b.amount - a.amount; // Highest to lowest
          }
          if (sortOrder === "lowest") {
            return a.amount - b.amount; // Lowest to highest
          }
          if (sortOrder === "newest") {
            return dateB - dateA; // Newest to oldest
          }
          if (sortOrder === "oldest") {
            return dateA - dateB; // Oldest to newest
          } else {
            return 0;
          }
        })
    );
  };

  useEffect(() => {
    filterAccountsByType();
  }, [accounts, sortType, selectedCategories, sliderValue, sortOrder]);

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
                step={5000}
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
              <Select
                onValueChange={(value) => {
                  setSortOrder(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest">Highest to lowest</SelectItem>
                  <SelectItem value="lowest">Lowest to highest</SelectItem>
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
            <div className="flex flex-col gap-[12px] ">
              {/* {filteredAccounts.map((item, index) => {
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
              })} */}
              {records.map((group, index) => {
                return (
                  <div key={index}>
                    <div>
                      {group.text}
                      <div>
                        {group.record.map((record, i) => {
                          return (
                            <div key={i}>
                              <div>
                                <RecordCard
                                  key={index}
                                  amount={record.amount}
                                  date={record.date}
                                  time={record.time}
                                  categ={record.category?.name}
                                  icon={record.category?.icon}
                                  color={record.category?.color}
                                  type={record.type}
                                />
                                <button
                                  onClick={() => {
                                    deleteAccount(record.id);
                                  }}
                                  className="border"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pl-[30px]">
            <div className="flex flex-col gap-[12px] "></div>
          </div>
        </div>
      </div>
    </div>
  );
};
