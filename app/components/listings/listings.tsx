"use client";

import ClientOnly from "@components/client-only";
import Container from "@components/common/container";
import EmptyState from "@components/common/empty-state";
import React from "react";
import { useAppStore } from "store/use-app-store";
import ListingCard from "./listing-card";
import { User } from "models/user";
import { Listing } from "models/listing";

type Props = {};

const Listings = (props: Props) => {
  const { useGetAllData } = useAppStore();
  const { data: user, isError } = useGetAllData("user", "user");
  const listings = useGetAllData("listings", "listings");
  const data = listings.data as Array<Listing>;

  if (listings.isError || listings.data === undefined || data?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset={data?.length === 0} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-[10%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {data?.map((item) => (
            <ListingCard
              key={item?.listing_id}
              currentUser={isError ? null : (user as User)}
              data={item}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Listings;
