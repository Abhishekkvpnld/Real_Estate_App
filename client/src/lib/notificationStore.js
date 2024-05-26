import { create } from 'zustand'
import axiosRequest from './apiRequest';

export const useNotificationStore = create((set) => ({
    number: 0,
    fetch: async () => {
        const res = await axiosRequest("/users/notification");
        set({ number: res.data });
    },
    decrease: () => {
        set((prev) => ({ number: prev.number - 1 }));
    },
    reset: () => {
        set({ number: 0 });
    }
}));