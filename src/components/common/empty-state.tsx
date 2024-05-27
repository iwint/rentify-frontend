import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Button from "../buttons/button";

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
  const navigate = useNavigate();
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
          <Button
            outline
            label="Remove all filters"
            onClick={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
