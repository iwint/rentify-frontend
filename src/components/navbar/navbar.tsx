import React from "react";
import UserMenu from "./user-menu";
import Container from "../common/container";
import { Logo } from "./Logo";
import Search from "./Search";
import Categories from "./categories";

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
