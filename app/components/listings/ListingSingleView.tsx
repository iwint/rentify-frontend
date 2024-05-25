"use client";
import { useParams } from "next/navigation";
import ListingClient from "./ListingClient";
import { useAppStore } from "@/app/store/useAppStore";
import ClientOnly from "../ClientOnly";
import EmptyState from "../common/EmptyState";
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
