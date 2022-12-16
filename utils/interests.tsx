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
  art: <FaPalette />,
  baking: <FaBirthdayCake />,
  biking: <FaBicycle />,
  chess: <FaChess />,
  food: <FaUtensils />,
  futbol: <FaFutbol />,
  gaming: <FaGamepad />,
  gardening: <FaSeedling />,
  gym: <FaDumbbell />,
  movies: <FaFilm />,
  music: <FaHeadphones />,
  outdoors: <FaCampground />,
  pets: <FaPaw />,
  running: <FaRunning />,
  swimming: <FaSwimmer />,
  travel: <FaGlobeAmericas />,
  writing: <FaPenFancy />,
  books: <FaBookReader />,
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
