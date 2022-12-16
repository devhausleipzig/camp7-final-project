import { Interest, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

export function useMatches() {
  const { token } = useAuthStore();
  return useQuery<Array<User & { interests: Interest[] }>>({
    queryKey: ["matches"],
    queryFn: () => {
      const endpoint = `http://localhost:3000/api/user/matches`;
      return axios
        .get(endpoint, {
          headers: {
            Authorization: token,
          },
        })
        .then(res => res.data);
    },
  });
}
