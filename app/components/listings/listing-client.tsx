"use client";
import Container from "@components/common/container";
import { categories } from "@components/navbar/categories";
import { Listing } from "models/listing";
import { User } from "models/user";
import React, { useMemo } from "react";
import ListingHeader from "./listing-header";

interface ListingClientProps {
  listing: Listing & {
    user: any;
  };
  currentUser?: User | null;
  reservations?: Array<any>;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
            <ListingHeader
            title={listing.title}
            imageSrc={listing.image_src}
            location={listing.location}
            id={listing.listing_id}
            currentUser={currentUser}
            />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
