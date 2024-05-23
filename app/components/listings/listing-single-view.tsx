"use client";

import { useParams } from "next/navigation";
import ListingClient from "./listing-client";
import ClientOnly from "../client-only";
import EmptyState from "../common/empty-state";
import { useAppStore } from "@/app/store/use-app-store";
import { User } from "@/app/models/user";

const ListingSingleView = () => {
  const { listingId } = useParams();
  const { useGetAllData } = useAppStore();
  const { data: userDetails } = useGetAllData("user", "user");
  const { data, isError, isLoading } = useGetAllData(
    `listings/${listingId}`,
    listingId.toString()
  );

  const { data: reservationDetails, isError: reservationError } = useGetAllData(
    `reservations/listing/${listingId}`,
    "reservations"
  );

  if (isError || isLoading) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        reservations={
          reservationDetails != null ? (reservationDetails as Array<any>) : []
        }
        listing={data as any}
        currentUser={userDetails as User}
      />
    </ClientOnly>
  );
};

export default ListingSingleView;
