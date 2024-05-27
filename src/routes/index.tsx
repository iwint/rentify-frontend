import Favourites from "@/pages/favourites/page";
import Home from "@/pages/home";
import ListingPage from "@/pages/listing/[listingId]/page";
import Properties from "@/pages/properties/page";
import Reservations from "@/pages/reservations/page";
import Trips from "@/pages/trips/page";

export const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/listing/:listingId",
    element: <ListingPage />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/reservations",
    element: <Reservations />,
  },
  {
    path: "/trips",
    element: <Trips />,
  },
  {
    path: "/properties",
    element: <Properties />,
  },
];
