"use client";
import useFavourite from "@/app/hooks/useFavourites";
import { User } from "@/app/models/user";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  currentUser?: User | null;
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourited, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <button
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavourited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </button>
  );
};

export default HeartButton;
