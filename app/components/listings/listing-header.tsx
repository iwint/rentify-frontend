"use client";
import HeartButton from "@components/buttons/heart-button";
import Header from "@components/common/header";
import { User } from "models/user";
import React from "react";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  location: any;
  id: string;
  currentUser?: User | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  id,
  imageSrc,
  location,
  title,
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
