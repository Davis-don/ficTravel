import { create } from 'zustand';

const useRecommendedStore = create((set) => ({
    // Initial state
    recommended: [],

    // Method to reset and add new data
    setRecommendedStore: (data) => {
        set({ recommended: data });
    },
}));

export default useRecommendedStore;
