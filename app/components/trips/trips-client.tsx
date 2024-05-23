"use client";
import { DELETE_API } from "@/app/api/api";
import { User } from "@/app/models/user";
import { useAppStore } from "@/app/store/use-app-store";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClientOnly from "../client-only";
import EmptyState from "../common/empty-state";
import Container from "../common/container";
import Header from "../common/header";
import ListingCard from "../listings/listing-card";

interface TripsClientProps {}

const TripsClient: React.FC<TripsClientProps> = () => {
  const { useGetAllData } = useAppStore();
  const { data: currentUser } = useGetAllData("user", "user");
  const { data: reservations, refetch } = useGetAllData(
    `reservations/user/${(currentUser as User)?.user_id}`,
    "reservations"
  );
  useEffect(() => {
    refetch();
  }, []);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      DELETE_API(`reservations/${id}`)
        .then((res: any) => {
          if (res.status === 200) {
            refetch();
            toast.success("Reservation cancelled successfully.");
          }
        })
        .catch((err) => {
          toast.error("Failed to cancel reservation.");
        });
    },
    [router]
  );

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You need to be logged in to view this page."
        />
      </ClientOnly>
    );
  }

  if ((reservations as Array<any>)?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips"
          subtitle="You haven't reserved any trips yet."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <Header title="Trips" subtitle="Here are your upcoming trips." />
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {(reservations as Array<any>)?.map((reservation) => {
            return (
              <ListingCard
                key={reservation.reservation_id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.reservation_id}
                onAction={onCancel}
                disabled={deletingId === reservation.reservation_id}
                actionLabel="Cancel reservation"
                currentUser={currentUser as User}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default TripsClient;
