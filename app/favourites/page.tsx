import FavouritesClient from "@components/favourites/favourites-client";
import React from "react";

interface FavouritesProps {}

const Favourites: React.FC<FavouritesProps> = ({}) => {
  return <FavouritesClient />;
};

export default Favourites;
