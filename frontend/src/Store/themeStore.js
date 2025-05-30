import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useThemeStore = create(
  persist((set) =>({
     theme:  "winter",
 setTheme: (theme) => set({theme: theme})
  }),
  {
    name: "chat-theme"
  }
 

  )
);

