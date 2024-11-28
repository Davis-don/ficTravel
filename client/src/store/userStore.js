import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define the store logic
const userStore = (set) => ({
  user: null, // Assuming you're managing a single user; use {} if you need a default structure

  addUser: (data) => {
    // Update user state with the new data
    set(() => ({ user: data }));
  },

  logout: () => {
    // Clear user state
    set(() => ({ user: null }));
  },
});

// Create the store with middleware
const useUserStore = create(
  devtools(
    persist(userStore, {
      name: 'user', // Key for localStorage or sessionStorage
    })
  )
);

export default useUserStore;
