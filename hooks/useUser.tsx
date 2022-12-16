import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { Interest, Location, User } from "@prisma/client";

export type UserProfile = User & {
  interests: Interest[];
  location: Location;
};

export function useUsers() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      axios
        .get<UserProfile[]>("http://localhost:3000/api/user", {
          headers: {
            Authorization: token,
          },
        })
        .then(res => res.data),
    onError: err => console.log("Error in Profile Query", err),
  });
}

export function useUser(userId: string) {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () =>
      axios
        .get<UserProfile>(`http://localhost:3000/api/user/${userId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(res => res.data),
    onError: err => console.log("Error in Profile Query", err),
    enabled: !!userId,
  });
}
