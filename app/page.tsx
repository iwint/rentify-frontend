import Listings from "@components/listings/listings";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GET_API } from "api/api";

export default async function Home() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Listings />
    </HydrationBoundary>
  );
}
