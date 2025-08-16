// stores/useHandleSelectedUser.js
import { create } from "zustand";

export const useHandleSelectedUser = create((set) => ({
  selectedUser: null,
  setSelectedUser: (userData) => set({ selectedUser: userData }),
  clearSelectedUser: () => set({ selectedUser: null }),
}));