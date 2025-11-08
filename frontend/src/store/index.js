import { create } from "zustand";

const initialTheme = localStorage.getItem("theme") ?? "light";

const useStore = create((set, get) => ({
    theme: initialTheme,
    user: JSON.parse(localStorage.getItem("user") || "null") ?? null,

    setTheme: (value) => { 
        localStorage.setItem("theme", value);
        set({ theme: value }); 
    },
    toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        set({ theme: newTheme });
    },
    setCredential: (user) => set({user}),
    signOut: () => set({user: null}) 
}))

export default useStore;