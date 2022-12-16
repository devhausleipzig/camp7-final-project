import { useState } from "react";
import Image from "next/image";
import { LifebuoyIcon, XMarkIcon } from "@heroicons/react/24/solid";
const db = [
  {
    id: 1,
    gender: "male",
    age: 22,
    name: "Richard",
    imageUrl: "/../public/avatars/1.jpg",
  },
  {
    id: 2,
    gender: "diverse",
    age: 25,
    name: "Erlich",
    imageUrl: "/../public/avatars/2.jpg",
  },
  {
    id: 3,
    gender: "female",
    age: 34,
    name: "Monica",
    imageUrl: "/../public/avatars/3.jpg",
  },
  {
    id: 4,
    gender: "male",
    age: 52,
    name: "Jared",
    imageUrl: "/../public/avatars/4.jpg",
  },
  {
    id: 5,
    gender: "no answer",
    age: 20,
    name: "Dinesh",
    imageUrl: "/../public/avatars/5.jpg",
  },
];
export default function BackCard() {
  const [cardIndex, setCardIndex] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="w-80 h-[364px] bg-white border border-black shadow-bottomRightCard m-5 px-5 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex m-1 font-bold text-lg text-purple ">
            <p>{db[cardIndex].name},</p>
            <p>{db[cardIndex].age}</p>
          </div>
          <p className="text-purple">{db[cardIndex].gender}</p>
        </div>
        <div className="w-72 h-72 overflow-clip border-4 border-purple rounded-md mt-1">
          <Image
            width={300}
            height={300}
            src={db[cardIndex].imageUrl}
            alt={db[cardIndex].name}
          />
        </div>
      </div>
      <div className="flex justify-evenly">
        <button
          className="w-20 h-20 rounded-full flex justify-center items-center bg-white"
          onClick={event => {
            event.preventDefault();
            console.log("clicked");
            setCardIndex(prev => prev - 1);
          }}
        >
          <XMarkIcon className="w-16 h-16 text-purple" />
        </button>
        <button
          className="w-20 h-20 rounded-full bg-white flex justify-center items-center"
          onClick={event => {
            event.preventDefault();
            console.log("clicked");
            setCardIndex(prev => prev + 1);
          }}
        >
          <LifebuoyIcon className="w-16 h-16 text-purple" />
        </button>
      </div>
    </div>
  );
}
