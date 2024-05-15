"use client";
import ClientOnly from "@components/client-only";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useGetAllData } from "store/use-app-store";

const ListingSingleView = () => {
  const { listingId } = useParams();
  console.log(listingId);

  const { data } = useGetAllData(`listings/${listingId}`, listingId.toString());
  console.log(data);

  return <ClientOnly>ListingSingleView</ClientOnly>;
};

export default ListingSingleView;
