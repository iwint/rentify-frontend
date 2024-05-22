"use client";

import ClientOnly from "@components/client-only";
import Container from "@components/common/container";
import EmptyState from "@components/common/empty-state";
import Header from "@components/common/header";
import ListingCard from "@components/listings/listing-card";
import { Listing } from "models/listing";
import { User } from "models/user";
import React, { useEffect } from "react";
import { useAppStore } from "store/use-app-store";

interface PropertiesClientProps {}

const PropertiesClient: React.FC<PropertiesClientProps> = ({}) => {
  const { useGetAllData } = useAppStore();
  const { data: properties, refetch } = useGetAllData(
    "user/properties",
    "properties"
  );
  const { data: currentUser } = useGetAllData("user", "user");

  useEffect(() => {
    refetch();
  }, [currentUser]);

  if ((properties as Array<Listing>)?.length === 0 || !properties) {
    return (
      <ClientOnly>
        <EmptyState
          subtitle="You haven't added any properties yet."
          title="No Properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <Header title="Properties" subtitle="Your properties." />
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {(properties as Array<Listing>)?.map((listing) => (
            <ListingCard data={listing} currentUser={currentUser as User} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default PropertiesClient;
