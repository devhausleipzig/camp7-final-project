import { useEffect } from "react";
import { useMatches } from "../hooks/useMatches";
import { getInterestImages } from "../utils/interests";

export default function Matches() {
  const { data } = useMatches();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) {
    return null;
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      {data.map(user => (
        <>
          <div key={user.id} className="flex items-center justify-between">
            <p key={user.id} className="text-purpleDark font-medium">
              {user.name}
            </p>
            {getInterestImages(user.interests)}
          </div>
          <div className="h-px bg-purple" />
        </>
      ))}
    </div>
  );
}
