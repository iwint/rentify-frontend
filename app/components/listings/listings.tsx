"use client";

import React from "react";
import ListingCard from "./listing-card";
import { useParams, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useAppStore } from "@/app/store/use-app-store";
import { Listing } from "@/app/models/listing";
import ClientOnly from "../client-only";
import EmptyState from "../common/empty-state";
import Container from "../common/container";
import { User } from "@/app/models/user";
type Props = {};

const Listings = (props: Props) => {
  const { useGetAllData } = useAppStore();
  const { data: user, isError } = useGetAllData("user", "user");
  const listings = useGetAllData("listings", "listings");
  const params = useSearchParams();
  const category = qs.parse(params.toString())?.category;

  const data = () => {
    if (category) {
      return (listings.data as Array<Listing>)?.filter(
        (item: Listing) => item.category === category
      );
    } else {
      return listings.data as Array<Listing>;
    }
  };

  if (listings.isError || listings.data === undefined || data()?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset={data()?.length === 0} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-[10%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {data()?.map((item) => (
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
