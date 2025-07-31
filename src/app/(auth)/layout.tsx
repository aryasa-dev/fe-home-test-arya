import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white md:bg-gray-100 md:flex md:flex-col md:items-center md:justify-center md:place-content-center min-h-screen">
        <div className="bg-white px-4 py-10 rounded-xl w-[400px]">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={200}
            height={100}
            className="h-auto w-auto mx-auto"
          />
          <div className="mt-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
