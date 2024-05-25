import FavouritesClient from "@components/favourites/FavouritesClient";
import React from "react";

interface FavouritesProps {}

const Favourites: React.FC<FavouritesProps> = ({}) => {
  return <FavouritesClient />;
};

export default Favourites;
