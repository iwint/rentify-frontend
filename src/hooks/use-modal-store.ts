import { createStore } from "zustand";

interface ModalStore {
  open: boolean;
  setOpen: () => void;
  onClose: () => void;
}

const useModalStore = createStore<ModalStore>((set) => ({
  open: false,
  setOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
export default useModalStore;
