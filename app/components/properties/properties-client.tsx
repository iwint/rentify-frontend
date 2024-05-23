"use client";

import ClientOnly from "@components/client-only";
import Container from "@components/common/container";
import EmptyState from "@components/common/empty-state";
import Header from "@components/common/header";
import ListingCard from "@components/listings/listing-card";
import { DELETE_API } from "api/api";
import { Listing } from "models/listing";
import { User } from "models/user";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppStore } from "store/use-app-store";

interface PropertiesClientProps {}

const PropertiesClient: React.FC<PropertiesClientProps> = ({}) => {
  const { useGetAllData } = useAppStore();
  const { data: properties, refetch } = useGetAllData(
    "user/properties",
    "properties"
  );
  const { data: currentUser } = useGetAllData("user", "user");
  const handleDeleteProperty = useCallback((id: string) => {
    DELETE_API(`listings/${id}`)
      .then(() => {
        toast.success("Property deleted successfully");
        refetch();
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    refetch();
  }, []);

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
            <ListingCard
              isEditable
              data={listing}
              currentUser={currentUser as User}
              actionId={listing.listing_id}
              actionLabel="Delete property"
              onAction={handleDeleteProperty}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default PropertiesClient;
