import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../pages/_app";

export default function useProtectedChat() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.token) {
      router.replace({ pathname: "/login" });
    }
  });

  return authContext;
}
