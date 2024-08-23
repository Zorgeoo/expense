import { Currency } from "@/assets/Currency";
import { Logo } from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export const SelectCurrency = () => {
  return (
    <div className="h-screen">
      <div className="flex items-center w-fit m-auto pt-10">
        <Logo width="60" />
        <div className="text-4xl font-semibold">Geld</div>
      </div>
      <div className=" w-fit h-full m-auto flex flex-col items-center justify-center pb-[360px]">
        <div className="flex  flex-col items-center gap-4">
          <Currency />
          <div className="font-semibold text-2xl">Select base currency</div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-6">
          <Select>
            <SelectTrigger className="w-[384px]">
              <SelectValue
                placeholder="MNT-Mongolian tugrik"
                className="font-semibold"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mnt" className="font-semibold">
                MNT-Mongolian tugrik
              </SelectItem>
              <SelectItem value="euro" className="font-semibold">
                EUR-EURO
              </SelectItem>
              <SelectItem value="usd" className="font-semibold">
                USD-US Dollar
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="text-[12px] w-[384px]">
            Your base currency should be the one you use most often. All
            transaction in other currencies will be calculated based on this one
          </div>
        </div>
        <Link href="./Balance">
          <Button className="mt-8  bg-[#0166FF] w-full">Confirm</Button>
        </Link>
      </div>
    </div>
  );
};
export default SelectCurrency;
