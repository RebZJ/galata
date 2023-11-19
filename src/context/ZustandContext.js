import { create } from 'zustand';

export const useContractStore = create((set) => ({
    contract: "0x1",
    setContractAddress: (newContract) => set({ contract: newContract }), // Return a new state object
}));