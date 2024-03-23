"use client";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, center, subtitle }) => {
  return <div></div>;
};

export default Header;
