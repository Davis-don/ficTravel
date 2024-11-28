import { create } from 'zustand';

const usePayStore = create((set) => ({
  status: false,  // Initialize status as false
  price: 0.00,    // Initialize price as 0.00
  
  toggleStore: (receivedPrice) => {
    set((state) => ({
      status: !state.status, // Toggle the status
      price: state.status ? 0.00 : receivedPrice, // Set price based on status
    }));
  },
}));

export default usePayStore;
