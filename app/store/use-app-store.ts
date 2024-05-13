import { User } from "models/user";
import { create } from "zustand";



interface useAppStoreProps {
    user: User | null;
    setUser: (user: any) => void;
    logout: () => void;
}

export const useAppStore = create<useAppStoreProps>((set, get) => ({
    user: {} as User,
    setUser: (user) => set({ user: user }),
    logout: () => set({ user: null })
}))