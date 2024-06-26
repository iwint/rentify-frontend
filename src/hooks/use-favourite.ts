import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./use-login-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/store/use-app-store";
import { User } from "@/models/user";
import { requestActions } from "@/api/request-actions";

interface useFavouriteProps {
    currentUser?: User | null;
    listingId: string;
}

const useFavourite = ({
    listingId,
    currentUser,
}: useFavouriteProps) => {
    const query = useQueryClient().getQueryCache();
    const { useGetAllData } = useAppStore()
    const { refetch: refetchUser } = useGetAllData("user", "user");
    const { PUT_API } = requestActions;
    const loginModal = useLoginModal();
    const hasFavourited = useMemo(() => {
        return currentUser?.favorite_ids.includes(listingId);
    }, [currentUser, listingId])

    const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }
        let updatedUser = { ...currentUser };
        try {
            const response = await PUT_API(`user/favorite/${listingId}`);
            if (response) {
                if (hasFavourited) {
                    updatedUser["favorite_ids"] = currentUser?.favorite_ids.filter(
                        (id) => id !== listingId
                    );
                } else {
                    updatedUser["favorite_ids"] = [
                        ...(currentUser?.favorite_ids || []),
                        listingId,
                    ];
                }
                await localStorage.setItem("user", JSON.stringify(updatedUser));
                await refetchUser();
            }
        } catch (e) {
            toast.error("An error occurred");
            console.log(e);
        }
    }, [loginModal, currentUser, listingId, hasFavourited, refetchUser]);


    return {
        hasFavourited,
        toggleFavourite
    }


}

export default useFavourite;