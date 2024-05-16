"use client";
import Button from "@components/buttons/button";
import HeartButton from "@components/buttons/heart-button";
import { format } from "date-fns";
import { Listing } from "models/listing";
import { User } from "models/user";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface ListingCardProps {
  currentUser?: User | null;
  data: Listing;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  actionId = "",
  actionLabel,
  currentUser,
  data,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.total_price;
    }
    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.start_date);
    const end = new Date(reservation.end_date);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data?.listing_id}`)}
      className="
        col-span-1 
        cursor-pointer
        group
       "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            src={data?.image_src}
            alt="listing image"
            className=" object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data?.listing_id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data?.location?.region}, {data?.location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data?.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold ">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
