"use client";

import { DELETE_API } from "@/app/api/api";
import { User } from "@/app/models/user";
import { useAppStore } from "@/app/store/useAppStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ClientOnly from "../ClientOnly";
import EmptyState from "../common/EmptyState";
import Container from "../common/Container";
import Header from "../common/Header";
import ListingCard from "../listings/ListingCard";

interface ReservationsClientProps {}

const ReservationsClient: React.FC<ReservationsClientProps> = ({}) => {
  const { useGetAllData } = useAppStore();
  const { data: currentUser } = useGetAllData("user", "user");
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: reservations, refetch } = useGetAllData(
    `reservations/author/${(currentUser as User)?.user_id}`,
    "reservations"
  );

  useEffect(() => {
    if (currentUser) {
      refetch();
    }
  }, [currentUser]);

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
        })
        .finally(() => {
          setDeletingId(null);
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

  if ((reservations as Array<any>)?.length === 0 || !reservations) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations"
          subtitle="You have no reservations."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <Header title="Reservations" subtitle="Booking on your properties" />
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {(reservations as Array<any>)?.map((reservation) => {
            return (
              <ListingCard
                key={reservation.reservation_id}
                data={reservation.listing}
                reservation={reservation}
                onAction={onCancel}
                actionId={reservation.reservation_id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser as User}
                disabled={deletingId === reservation.reservation_id}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default ReservationsClient;
