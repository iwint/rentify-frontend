import React from "react";
import PageLayout from "@/layouts/page-layout";
import ReservationsClient from "@/components/reservations/reservations-client";

const Reservations = () => {
  return (
    <PageLayout>
      <ReservationsClient />
    </PageLayout>
  );
};

export default Reservations;
