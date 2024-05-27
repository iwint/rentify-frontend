"use client";

import { User } from "@/models/user";
import React from "react";
import Header from "../common/header";
import HeartButton from "../buttons/heart-button";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  location: any;
  id: string;
  currentUser?: User | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  id,
  title,
  imageSrc,
  location,
  currentUser,
}) => {
  return (
    <>
      <Header
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <img src={imageSrc} alt={title} className="w-full object-cover" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHeader;
