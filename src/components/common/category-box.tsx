"use client";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { useNavigate, useParams } from "react-router-dom";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useNavigate();
  const params = useParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.category === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    router(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`
    flex 
    flex-col 
    items-center 
    justify-center 
    gap-2 
    p-3 
    border-b-2 
    hover:text-neutral-800 
    transition 
    cursor-pointer
    ${
      selected
        ? "border-b-neutral-800 text-neutral-800"
        : "border-transparent text-neutral-500"
    }
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
