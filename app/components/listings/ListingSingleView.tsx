"use client";
import ClientOnly from "@components/ClientOnly";
import EmptyState from "@components/common/EmptyState";
import { User } from "models/user";
import { useParams } from "next/navigation";
import ListingClient from "./ListingClient";
import { useAppStore } from "store/useAppStore";

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
