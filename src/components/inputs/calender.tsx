"use client";

import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  value: Range;
  onChangeDateRange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calender: React.FC<CalenderProps> = ({
  onChangeDateRange,
  value,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChangeDateRange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calender;
