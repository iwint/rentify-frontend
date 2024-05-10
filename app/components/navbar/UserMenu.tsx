"use client";
import Avatar from "@components/common/Avatar";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";

//custom-hooks
import useRegisterModal from "hooks/useRegisterModal";
import useLoginModal from "hooks/useLoginModal";
import useRendModal from "hooks/useRentModal";

interface Props {}

const UserMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRendModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const token = localStorage.getItem("token");
  console.log(token);

  const handleLogOut = async () => {
    await localStorage.clear();
    setIsOpen(false);
  };

  const onRent = useCallback(() => {
    if (token === null) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [token, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Redotel your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {token === null ? (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            ) : (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Rent my home" onClick={onRent} />
                <hr />
                <MenuItem label="Logout" onClick={handleLogOut} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
