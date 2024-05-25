"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Header from "./Header";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches found",
  subtitle = "Try changing or removing filters to get more results.",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
    h-[60vh]
    flex
    flex-col
    gap-2
    items-center
    justify-center
    "
    >
      <Header title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          // <Button
          //   outline
          //   label="Remove all filters"
          //   onClick={() => router.push("/")}
          // />
          <button>Remove all filters</button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
