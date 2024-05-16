import { PUT_API } from "api/api";
import { User } from "models/user";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./use-login-modal";
import { useQueryClient } from "@tanstack/react-query";

interface useFavouriteProps {
    currentUser?: User | null;
    listingId: string;
}

const useFavourite = ({
    listingId,
    currentUser,
}: useFavouriteProps) => {
    const query = useQueryClient().getQueryCache();
    const refetchUser = () =>
        query
            .find({
                queryKey: ["user"],
            })?.observers[0]?.refetch();

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