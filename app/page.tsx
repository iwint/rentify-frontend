"use client";
import ClientOnly from "@components/client-only";
import Container from "@components/common/container";
import EmptyState from "@components/common/empty-state";
import { useGetAllData } from "store/use-app-store";

export default function Home() {
  const isEmpty = true;
  const { data } = useGetAllData("listings", "listings");
  console.log(data);

  if (isEmpty) {
    return (
      <ClientOnly>
        <EmptyState showReset={isEmpty} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8
        "
        >
          My FUtute
        </div>
      </Container>
    </ClientOnly>
  );
}
