"use client";

import ClientOnly from "@components/ClientOnly";
import Container from "@components/common/Container";
import React from "react";
import { useAppStore } from "store/useAppStore";
import ListingCard from "./ListingCard";
import { User } from "models/user";
import { Listing } from "models/listing";
import { useParams, useSearchParams } from "next/navigation";
import qs from "query-string";
import EmptyState from "@components/common/EmptyState";
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
