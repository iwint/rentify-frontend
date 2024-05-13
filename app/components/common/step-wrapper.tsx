import React from "react";
import Header from "./header";

interface StepWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const StepWrapper: React.FC<StepWrapperProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Header title={title} subtitle={subtitle} />
      {children}
    </div>
  );
};

export default StepWrapper;
