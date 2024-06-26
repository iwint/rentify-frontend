"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./menu-item";
import { useNavigate } from "react-router-dom";
import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import useRendModal from "@/hooks/use-rental-modal";
import { useAppStore } from "@/store/use-app-store";
import { User } from "@/models/user";
import Avatar from "../common/avatar";

//custom-hooks

interface Props {}

const UserMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useNavigate();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRendModal();
  const { useGetAllData } = useAppStore();
  const { data: currentUser, refetch } = useGetAllData("user", "user");
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
        {(currentUser as User)?.role === "admin" && (
          <div
            onClick={onRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Create your home
          </div>
        )}
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
        <div className="absolute rounded-xl shadow-md bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer w-auto">
            {token === null ? (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            ) : (
              <>
                <MenuItem label="My trips" onClick={() => router("/trips")} />
                <MenuItem
                  label="My favorites"
                  onClick={() => router("/favourites")}
                />
                {(currentUser as User)?.role === "admin" && (
                  <>
                    <MenuItem
                      label="My reservations"
                      onClick={() => router("/reservations")}
                    />
                    <MenuItem
                      label="My properties"
                      onClick={() => router("/properties")}
                    />
                    <MenuItem label="Create my home" onClick={onRent} />
                  </>
                )}
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
