import FavouritesClient from "@/components/favourites/favourites-client";
import PageLayout from "@/layouts/page-layout";
import React from "react";

interface FavouritesProps {}

const Favourites: React.FC<FavouritesProps> = ({}) => {
  return (
    <PageLayout>
      <FavouritesClient />
    </PageLayout>
  );
};

export default Favourites;
