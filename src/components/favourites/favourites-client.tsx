"use client";

import { Listing } from "@/app/models/listing";
import { useAppStore } from "@/app/store/use-app-store";
import React, { useEffect } from "react";
import ClientOnly from "../client-only";
import EmptyState from "../common/empty-state";
import Container from "../common/container";
import Header from "../common/header";
import ListingCard from "../listings/listing-card";
import { User } from "@/app/models/user";

interface FavouritesClientProps {}

const FavouritesClient: React.FC<FavouritesClientProps> = ({}) => {
  const { useGetAllData } = useAppStore();
  const { data: favourites, refetch } = useGetAllData(
    "user/favourites",
    "favourites"
  );
  const { data: currentUser } = useGetAllData("user", "user");

  useEffect(() => {
    refetch();
  }, [currentUser]);

  if ((favourites as Array<Listing>)?.length === 0 || !favourites) {
    return (
      <ClientOnly>
        <EmptyState
          subtitle="You haven't added any favourites yet."
          title="No Favourites"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <Header title="Favourites" subtitle="Your favourite listings." />
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {(favourites as Array<Listing>)?.map((listing) => (
            <ListingCard data={listing} currentUser={currentUser as User} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default FavouritesClient;
