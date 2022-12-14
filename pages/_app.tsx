import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "@prisma/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AuthUser = Omit<User, "saltAndHash">;

export const AuthContext = createContext(
  {} as {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    user: AuthUser;
    setUser: Dispatch<SetStateAction<AuthUser>>;
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [user, setUser] = useState({} as AuthUser);
  const [token, setToken] = useState("");

  return (
    <>
      <Head>
        <title>Task App</title>
        <meta content="Friend-zone Tinder App"></meta>
        <link rel="icon" href="../public/images/silly.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            token,
            setToken,
            user,
            setUser,
          }}
        >
          <Component {...pageProps} />
        </AuthContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
