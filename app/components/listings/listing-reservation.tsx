import React from "react";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDateRange: (dateRange: any) => void;
  dateRange: any;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({}) => {
  return <div>ListingReservation</div>;
};

export default ListingReservation;
