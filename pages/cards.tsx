import { Interest, Location, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

export default function Cards() {
  const router = useRouter();
  const { location, distance, interests } = router.query;
  const { token } = useAuthStore();
  const [matches, setMatches] = useState<
    Array<
      Omit<User, "saltAndHash"> & {
        location: Location;
        interests: Interest;
      }
    >
  >([]);

  async function getUsers(loc: string) {
    const parsedLocation = JSON.parse(loc);
    const matches = await axios
      .get<{ id: string; name: string }[]>(
        `http://localhost:3000/api/user/?location=${parsedLocation}&radius=${distance}&interests=${interests}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => res.data);
    const users = await axios
      .get(
        `http://localhost:3000/api/user/match?ids=${matches.map(m => m.id)}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => res.data);
    setMatches(users);
  }

  useEffect(() => {
    if (location) {
      getUsers(location as string);
    }
  }, [router]);

  return (
    <div>
      {matches.map(match => (
        <p key={match.id}>{match.name}</p>
      ))}
    </div>
  );
}
