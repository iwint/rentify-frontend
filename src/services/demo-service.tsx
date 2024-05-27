import { requestActions } from "@/api/request-actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDemoService = () => {
  return {
    getAllDemoData: () =>
      useQuery({
        queryKey: ["demos"],
        queryFn: () => {
          return requestActions.GET_API("auth/login");
        },
      }),

    addDemoData: (data: any) =>
      useMutation({
        mutationFn: () => requestActions.POST_API("auth/login", data),
        onSuccess: () => {
          toast.success("Data added successfully");
        },
        onError: () => {
          toast.error("Failed to add data");
        },
      }),
  };
};
