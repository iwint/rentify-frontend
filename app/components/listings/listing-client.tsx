"use client";
import Container from "@components/common/container";
import { categories } from "@components/navbar/categories";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import useLoginModal from "hooks/use-login-modal";
import { Listing } from "models/listing";
import { User } from "models/user";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppStore } from "store/use-app-store";
import ListingInfo from "./lisiting-info";
import ListingHeader from "./listing-header";
import ListingReservation from "./listing-reservation";
import { Range } from "react-date-range";
import { POST_API } from "api/api";

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
  const { useAddData } = useAppStore();
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
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
    const payload = {
      listing_id: listing.listing_id,
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
      total_price: totalPrice,
    };
    const response = POST_API("reservations", payload);
    response
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
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
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * parseInt(listing.price));
      } else {
        setTotalPrice(parseInt(listing.price));
      }
    }
  }, [dateRange, listing.price]);

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={parseInt(listing.price)}
                totalPrice={totalPrice}
                onChangeDateRange={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
