"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

export const Logo = (props: Props) => {
  const router = useNavigate();
  return (
    <div
      onClick={() => router("/")}
      className="md:block hidden cursor-pointer font-bold"
    >
      Rentify
    </div>
  );
};
