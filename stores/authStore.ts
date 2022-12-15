import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@prisma/client";

type AuthUser = Omit<User, "saltAndHash">;

type AuthState = {
  token: string;
  user: AuthUser | null;
  setToken: (newToken: string) => void;
  setUser: (newUser: AuthUser) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: "",
      user: null,
      setToken: (newToken: string) => set(() => ({ token: newToken })),
      setUser: (newUser: AuthUser) => set(() => ({ user: newUser })),
      clear: () => set(() => ({ user: null, token: "" })),
    }),
    {
      name: "auth-store",
    }
  )
);
