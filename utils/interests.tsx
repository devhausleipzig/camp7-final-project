import {
  FaPalette,
  FaBirthdayCake,
  FaBicycle,
  FaChess,
  FaUtensils,
  FaFutbol,
  FaGamepad,
  FaSeedling,
  FaDumbbell,
  FaFilm,
  FaHeadphones,
  FaCampground,
  FaPaw,
  FaRunning,
  FaSwimmer,
  FaGlobeAmericas,
  FaPenFancy,
  FaBookReader,
} from "react-icons/fa";
import { Interest } from "@prisma/client";

const interestsMap: Record<string, JSX.Element> = {
  art: <FaPalette size={24} />,
  baking: <FaBirthdayCake size={24} />,
  biking: <FaBicycle size={24} />,
  chess: <FaChess size={24} />,
  food: <FaUtensils size={24} />,
  futbol: <FaFutbol size={24} />,
  gaming: <FaGamepad size={24} />,
  gardening: <FaSeedling size={24} />,
  gym: <FaDumbbell size={24} />,
  movies: <FaFilm size={24} />,
  music: <FaHeadphones size={24} />,
  outdoors: <FaCampground size={24} />,
  pets: <FaPaw size={24} />,
  running: <FaRunning size={24} />,
  swimming: <FaSwimmer size={24} />,
  travel: <FaGlobeAmericas size={24} />,
  writing: <FaPenFancy size={24} />,
  books: <FaBookReader size={24} />,
};

export function getInterestImages(interests: Interest[]) {
  return (
    <div className="text-green-600 flex gap-2">
      {interests.map(i => (
        <div className="w-8 h-8 text-green-600 border border-green-600 flex items-center justify-center p-1 rounded-md">
          {interestsMap[i.name.toLowerCase()]}
        </div>
      ))}
    </div>
  );
}

export function getInterestIcon(interest: Interest) {
  return interestsMap[interest.name.toLowerCase()];
}
