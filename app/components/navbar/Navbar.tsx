"use client";

import React from "react";
import { Logo } from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";
import Categories from "./categories";
import Container from "../common/container";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="fixed w-full shadow-sm z-10 bg-white">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row gap-3 items-center justify-between md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
