"use client";

import { Logo } from "@/assets/Logo";

export const LoadingPage = () => {
  return (
    <div className="h-screen border">
      <div className="h-full flex  items-center justify-center">
        <div className="border border-green-500 flex flex-col items-center justify-center gap-12">
          <div className="flex items-center">
            <Logo width="60" />
            <div className="text-4xl font-semibold">Geld</div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full h-7 w-7 border-2 border-t-[#0166FF] animate-spin"></div>
            <div>Түр хүлээнэ үү ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoadingPage;
