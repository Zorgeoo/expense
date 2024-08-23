import { Check } from "@/assets/Check";
import { Coin } from "@/assets/Coin";
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

export const Created = () => {
  return (
    <div className="h-screen">
      <div className="flex items-center w-fit m-auto pt-10">
        <Logo width="60" />
        <div className="text-4xl font-semibold">Geld</div>
      </div>
      <div className=" w-fit h-full m-auto flex flex-col items-center justify-center pb-[360px]">
        <div className="flex  flex-col items-center gap-4">
          <Check />
          <div className="font-semibold text-2xl">Good Job!</div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-6">
          <div className="text-[12px] w-[384px] text-center">
            Your very first account has been created. Now continue to dashboard
            and start tracking
          </div>
        </div>
        <Link href="/">
          <Button className="mt-8 w-full bg-[#0166FF]">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
export default Created;
