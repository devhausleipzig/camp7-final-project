import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Notifications } from "../components/notifications/notifications";
import { useAuthStore } from "../stores/authStore";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
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
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
