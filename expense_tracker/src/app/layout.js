"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { TransactionContextProvider } from "@/components/utils/context";
import { AuthProvider } from "@/components/utils/AuthProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TransactionContextProvider className={inter.className}>
            {children}
            <ToastContainer />
          </TransactionContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
