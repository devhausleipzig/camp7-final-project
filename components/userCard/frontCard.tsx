import { LifebuoyIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Interest, User, Location } from "@prisma/client";
import clsx from "clsx";
import { RefObject, useRef } from "react";
import { AuthUser } from "../../stores/authStore";
import { getAvatar } from "../../utils/avatar";
import { getInterestIcon } from "../../utils/interests";

type Props = {
  match: Omit<User, "saltAndHash"> & {
    location: Location;
    interests: Interest[];
  };
  user: AuthUser;
  cardRef: RefObject<HTMLDivElement>;
};

export default function FrontCard({ match, user, cardRef }: Props) {
  const languages = [
    { value: "en,", desc: "English" },
    { value: "es,", desc: "Spanish" },
    { value: "de,", desc: "German" },
    { value: "it,", desc: "Italian" },
    { value: "fr", desc: "French" },
  ];

  console.log(match);

  return (
    <div className="flip w-full h-[60vh]">
      <div
        ref={cardRef}
        className="bg-white border border-black shadow-bottomRightCard  flip-content"
      >
        <div className="flip-front flex flex-col justify-between px-5 py-2">
          <div>
            <div className="flex justify-center">
              {match.interests.map(i => (
                <div
                  className={clsx(
                    "h-8 w-12 bg-white border border-green-500 m-1 flex justify-center items-center rounded-lg",
                    user.interests.map(i => i.name).includes(i.name)
                      ? "text-white bg-green-500"
                      : "text-green-500 bg-transparent"
                  )}
                  key={i.id}
                >
                  <div className={clsx("h-6 w-6")}>{getInterestIcon(i)}</div>
                </div>
              ))}
            </div>
            <div className="flex align justify-between mb-8 pt-3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec.
            </div>
          </div>
          <div>
            <div className="w-full h-[1px] bg-purpleDark"></div>
            <div className="flex items-center justify-between">
              <div className="flex justify-start">
                {languages.map(({ value, desc }) => (
                  <div key={value}>
                    <p className="m-[2px] pt-3">{value}</p>
                  </div>
                ))}
              </div>
              <p className="pt-3">27</p>
              <p className="pt-3">3 kms away</p>
            </div>
          </div>
        </div>
        <div className="flip-back">
          <div className="flex flex-col items-center px-5 py-2">
            <div className="flex justify-between items-center w-full">
              <div className="flex m-1 font-bold text-lg text-purple ">
                <p>{match.name},</p>
                <p>{match.bornAt?.toLocaleString() ?? "23"}</p>
              </div>
              <p className="text-purple">diverse</p>
            </div>
            <div className="w-72 h-72 overflow-clip border-4 border-purple rounded-md mt-1">
              {getAvatar(match, "full")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
