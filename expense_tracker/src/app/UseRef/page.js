"use client";

import { Logo } from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export const Box = () => {
  const [value, setValue] = useState(0);

  const ref = useRef(0);

  const handleState = () => {
    setValue((boy) => boy + 1);
  };
  const handleRef = () => {
    ref.current += 1;
  };
  return (
    <div className="flex gap-5 m-auto w-fit">
      <div className="w-[200px] h-[200px] border">{ref.current}</div>
      <button onClick={handleRef}>Increase</button>
      <div className="w-[200px] h-[200px] border">{value}</div>
      <button onClick={handleState}> Increase</button>
    </div>
  );
};
export default Box;
