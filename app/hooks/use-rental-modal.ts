import { create } from 'zustand'

interface RendModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useRendModal = create<RendModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useRendModal