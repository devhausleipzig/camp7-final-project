import { MutableRefObject, useRef, useState } from "react";
import Image from "next/image";
import Cards from "../../pages/cards";

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
  const [card, setCard] = useState(db[0]);
  return (
    <div className="absolute w-80 h-[364px] bg-white border border-black shadow-bottomRightCard m-5 px-5">
      <p>{card.name}</p>
      <p>{card.age}</p>
      <p>{card.gender}</p>
      <Image width={300} height={300} src={card.imageUrl} alt={card.name} />
    </div>
  );
}
