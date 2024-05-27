import { create } from 'zustand'

interface RendModalStore {
    data: any,
    isOpen: boolean
    onOpen: () => void
    onClose: () => void,
    setData: (data: any) => void
}

const useRendModal = create<RendModalStore>((set) => ({
    data: null,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setData: async (data) => {
        await set({
            data: data
        })
    }
}))

export default useRendModal