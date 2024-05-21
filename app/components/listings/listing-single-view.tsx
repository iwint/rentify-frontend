"use client";
import ClientOnly from "@components/client-only";
import EmptyState from "@components/common/empty-state";
import { User } from "models/user";
import { useParams } from "next/navigation";
import ListingClient from "./listing-client";
import { useAppStore } from "store/use-app-store";

const ListingSingleView = () => {
  const { listingId } = useParams();
  const { useGetAllData } = useAppStore();
  const { data: userDetails } = useGetAllData("user", "user");
  const { data, isError, isLoading } = useGetAllData(
    `listings/${listingId}`,
    listingId.toString()
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
      <ListingClient listing={data as any} currentUser={userDetails as User} />
    </ClientOnly>
  );
};

export default ListingSingleView;
