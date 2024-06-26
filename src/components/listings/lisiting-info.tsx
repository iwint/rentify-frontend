import React from "react";
import { IconType } from "react-icons";
import ListingCategory from "./listing-category";
import Avatar from "../common/avatar";
import Map from "../common/Map";

interface ListingInfoProps {
  user: any;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  location: any;
  bathroomCount: number;
  guestCount: number;
  roomCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  location,
  roomCount,
  user,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Posted by {user.name}</div>
          <Avatar />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={location.latlng} />
    </div>
  );
};

export default ListingInfo;
