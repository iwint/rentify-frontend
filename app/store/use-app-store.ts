import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_API, POST_API, PUT_API } from "api/api";
import { Routes } from "api/request.type";

const useGetAllData = (endpoint: Routes, key: string) => {
    return useQuery({
        queryKey: [key],
        queryFn: async () => await GET_API(endpoint),
        refetchOnWindowFocus: true,
        staleTime: 30000,
        gcTime: 60000
    });
}

const useAddData = (endpoint: Routes, key: string, data: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await POST_API(endpoint, data).then(res => res)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [key]
            })
        }
    })
}

const useUpdateData = (endpoint: Routes, key: string, data: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await PUT_API(endpoint, data).then(res => res)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [key]
            })
        }
    })
}




export {
    useGetAllData,
    useAddData,
    useUpdateData
}