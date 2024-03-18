"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {}

export const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <div className="md:block hidden cursor-pointer font-bold">Red Hotel</div>
  );
};
