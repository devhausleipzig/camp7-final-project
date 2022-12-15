import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export default function () {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.replace({ pathname: "/login" });
    }
  });
}
