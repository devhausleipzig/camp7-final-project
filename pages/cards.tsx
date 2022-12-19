import { Interest, Location, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import FrontCard from "../components/userCard/frontCard";
import { useAuthStore } from "../stores/authStore";
import { RiAnchorLine, RiCloseLine, RiImage2Line } from "react-icons/ri";

export default function Cards() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const { location, distance, interests } = router.query;
  const { token, user } = useAuthStore();
  const [acting, setActing] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<
    | (Omit<User, "saltAndHash"> & {
        location: Location;
        interests: Interest[];
      })
    | null
  >(null);
  const [matches, setMatches] = useState<
    Array<
      Omit<User, "saltAndHash"> & {
        location: Location;
        interests: Interest[];
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

  async function act(action: "like" | "reject") {
    setActing(true);
    await axios.get(
      `http://localhost:3000/api/action/${currentMatch?.id}?action=${action}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    await getUsers(location as string);
    cardRef.current?.classList.remove("flipping");
    setActing(false);
  }

  useEffect(() => {
    if (location) {
      getUsers(location as string);
    }
  }, [router]);

  useEffect(() => {
    setCurrentMatch(matches[0]);
  }, [matches]);

  if (!matches.length && !currentMatch)
    return (
      <div className="flex h-screen w-full justify-center items-center">
        No Matches found
      </div>
    );

  return (
    <div className="p-5 flex flex-col gap-12">
      {currentMatch && (
        <FrontCard cardRef={cardRef} match={currentMatch} user={user!} />
      )}
      <div className="flex justify-between">
        <button
          disabled={acting}
          onClick={() => {
            act("reject");
          }}
          className="rounded-full bg-white shadow-md p-4 text-purple"
        >
          <RiCloseLine size={28} />
        </button>

        <button
          onClick={() => {
            cardRef.current?.classList.toggle("flipping");
          }}
          className="rounded-full bg-white shadow-md p-4 text-purple"
        >
          <RiImage2Line size={28} />
        </button>
        <button
          disabled={acting}
          onClick={() => {
            act("like");
          }}
          className="rounded-full bg-white shadow-md p-4 text-purple"
        >
          <RiAnchorLine size={28} />
        </button>
      </div>
    </div>
  );
}
