"use client";
import Container from "@components/common/container";
import { categories } from "@components/navbar/categories";
import { Listing } from "models/listing";
import { User } from "models/user";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListingHeader from "./listing-header";
import ListingInfo from "./lisiting-info";
import useLoginModal from "hooks/use-login-modal";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: Listing & {
    user: any;
  };
  currentUser?: User | null;
  reservations?: Array<any>;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservations) => {
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(parseInt(listing.price));
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
    setIsLoading(true);
  }, [
    totalPrice,
    dateRange,
    listing.listing_id,
    router,
    currentUser,
    loginModal,
  ]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * parseInt(listing.price));
      } else {
        setTotalPrice(parseInt(listing.price));
      }
    }
  }, []);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing.title}
            imageSrc={listing.image_src}
            location={listing.location}
            id={listing.listing_id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.room_count}
              guestCount={listing.guest_count}
              bathroomCount={listing.bathroom_count}
              location={listing.location}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
