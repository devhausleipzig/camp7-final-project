import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { Notifications } from "../components/notifications/notifications";
import { useAuthStore } from "../stores/authStore";
import "../styles/globals.css";
import { getAvatar } from "../utils/avatar";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { token, user, clear } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("registration")) {
      return;
    }
    if (router.pathname === "/login") return;
    if (!token) {
      router.replace({ pathname: "/login" });
    }
  }, []);

  return (
    <div className="relative w-full ">
      <Head>
        <title>Task App</title>
        <meta content="Friend-zone Tinder App"></meta>
        <link rel="icon" href="../public/images/silly.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Notifications />
        {!router.pathname.includes("registration") && (
          <header className="flex py-3 px-4">
            <div
              onClick={() => {
                router.replace({ pathname: "/login" });
                clear();
              }}
            >
              {getAvatar(user!)}
            </div>
            <span
              onClick={() => router.push({ pathname: "/" })}
              className="text-purple flex-1 text-center font-bold text-2xl"
            >
              frndship
            </span>
            <div
              onClick={() => router.push({ pathname: "/chat" })}
              className="text-purple"
            >
              <HiOutlineChatAlt2 size={24} />
            </div>
          </header>
        )}
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </div>
  );
}
