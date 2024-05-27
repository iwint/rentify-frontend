import { requestActions } from "@/api/request-actions";
import { Endpoints } from "@/api/request.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAppStore = () => {
    const queryClient = useQueryClient();
    const { DELETE_API, GET_API, POST_API, PUT_API } = requestActions
    const useGetAllData = (endpoint: Endpoints, key: string) => {
        return useQuery({
            queryKey: [key],
            queryFn: async () => await GET_API(endpoint),
            refetchOnWindowFocus: true,
            staleTime: 30000,
            gcTime: 60000
        });
    }

    const useAddData = (endpoint: Endpoints, key: string, data: any) => {
        useMutation({
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

    const useUpdateData = (endpoint: Endpoints, key: string, data: any) => {
        useMutation({
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

    return {
        useGetAllData,
        useAddData,
        useUpdateData
    }
}




