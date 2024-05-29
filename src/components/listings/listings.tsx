import React, { useEffect } from "react";
import ListingCard from "./listing-card";
import qs from "query-string";
import ClientOnly from "../client-only";
import { Listing } from "@/models/listing";
import EmptyState from "../common/empty-state";
import Container from "../common/container";
import { User } from "@/models/user";
import { useAppStore } from "@/store/use-app-store";
import { useLocation } from "react-router-dom";
import Loader from "../common/loader";
type Props = {};

const Listings = (props: Props) => {
  const { useGetAllData } = useAppStore();
  const { data: user, isError } = useGetAllData("user", "user");
  const listings = useGetAllData("listings", "listings");
  const location = useLocation();
  const category = qs.parse(location.search).category as string;
  console.log(category);

  const data = () => {
    if (category) {
      console.log("CAT", category);

      return (listings.data as Array<Listing>)?.filter(
        (item: Listing) => item.category === category
      );
    } else {
      return listings.data as Array<Listing>;
    }
  };

  useEffect(() => {
    listings.refetch();
  }, [category]);

  if (listings.isError || listings.data === undefined || data()?.length === 0) {
    return <EmptyState showReset={data()?.length === 0} />;
  }

  return (
    <Container>
      <Loader isLoading={listings.isLoading} />
      <div className="pt-[10%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
        {data()?.map((item) => (
          <ListingCard
            key={item?.listing_id}
            currentUser={isError ? null : (user as User)}
            data={item}
          />
        ))}
      </div>
    </Container>
  );
};

export default Listings;
