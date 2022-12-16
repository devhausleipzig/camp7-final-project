import { BoltIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FaBicycle,
  FaBirthdayCake,
  FaBookReader,
  FaCampground,
  FaChess,
  FaDumbbell,
  FaFilm,
  FaFutbol,
  FaGamepad,
  FaGlobeAmericas,
  FaHeadphones,
  FaPalette,
  FaPaw,
  FaPenFancy,
  FaRunning,
  FaSeedling,
  FaSwimmer,
  FaUtensils,
} from "react-icons/fa";

interface CardMultiSelectProps {
  selected: Array<string>;
  setSelected: Dispatch<SetStateAction<Array<string>>>;
}

const maxSelectable = 6;

export default function CardMultiSelect({
  selected,
  setSelected,
}: CardMultiSelectProps) {
  const interests = [
    { id: "1", name: "art", svg: <FaPalette size={24} /> },
    { id: "2", name: "baking", svg: <FaBirthdayCake size={24} /> },
    { id: "3", name: "biking", svg: <FaBicycle size={24} /> },
    { id: "4", name: "chess", svg: <FaChess size={24} /> },
    { id: "5", name: "food", svg: <FaUtensils size={24} /> },
    { id: "6", name: "futbol", svg: <FaFutbol size={24} /> },
    { id: "7", name: "gaming", svg: <FaGamepad size={24} /> },
    { id: "8", name: "gardening", svg: <FaSeedling size={24} /> },
    { id: "9", name: "gym", svg: <FaDumbbell size={24} /> },
    { id: "10", name: "movies", svg: <FaFilm size={24} /> },
    { id: "11", name: "music", svg: <FaHeadphones size={24} /> },
    { id: "12", name: "outdoors", svg: <FaCampground size={24} /> },
    { id: "13", name: "pets", svg: <FaPaw size={24} /> },
    { id: "14", name: "running", svg: <FaRunning size={24} /> },
    { id: "15", name: "swimming", svg: <FaSwimmer size={24} /> },
    { id: "16", name: "travel", svg: <FaGlobeAmericas size={24} /> },
    { id: "17", name: "writing", svg: <FaPenFancy size={24} /> },
    { id: "18", name: "books", svg: <FaBookReader size={24} /> },
  ];
  const [maximumSelected, setMaximumSelected] = useState(false);
  useEffect(() => {
    if (selected.length >= maxSelectable) {
      setMaximumSelected(true);
    } else {
      setMaximumSelected(false);
    }
  }, [selected]);
  return (
    <div>
      <div className="h-full w-full grid grid-cols-3 place-items-center">
        {interests.map((item, key) => (
          <CheckBox
            item={item}
            key={key}
            selected={selected}
            setSelected={setSelected}
            maximumSelected={maximumSelected}
            setMaximumSelected={setMaximumSelected}
          />
        ))}
      </div>
      <p className="text-center text-violet-800">
        <span className="font-bold">{selected.length}</span> of 6 interests
        chosen!
      </p>
    </div>
  );
}

type CheckBoxProps = {
  item: {
    id: string;
    svg: JSX.Element;
    name: string;
  };
  selected: Array<string>;
  setSelected: Dispatch<SetStateAction<Array<string>>>;
  maximumSelected: boolean;
  setMaximumSelected: (value: React.SetStateAction<boolean>) => void;
};

export function CheckBox({
  item,
  selected,
  setSelected,
  maximumSelected,
  setMaximumSelected,
}: CheckBoxProps) {
  const isSelected = selected.find(el => el === item.id);
  const [checked, setChecked] = useState(!!isSelected);

  const isDisabled = checked ? false : maximumSelected;

  return (
    <div className="group w-full">
      <label
        className={clsx(
          "w-auto border border-green-800 m-4 mt flex flex-col items-center rounded-lg",
          isDisabled ? "opacity-50" : "shadow-bottomRight",
          checked && "bg-green-500 shadow-bottomRightDarker"
        )}
      >
        <div
          className={clsx(
            "w-8 h-8 m-2 my-4",
            checked ? "text-white" : "text-green-500"
          )}
        >
          {item.svg}
        </div>
        <p
          className={clsx(
            "my-2 font-bold",
            checked ? "text-white" : "text-green-500"
          )}
        >
          {item.name}
        </p>

        <input
          type="checkbox"
          checked={checked}
          className="leading-normal hidden"
          value={item.id}
          disabled={isDisabled}
          onChange={event => {
            const element = event.target;

            if (element.checked) {
              setSelected(prev => [...prev, element.value]);
            } else {
              setSelected(prev => prev.filter(el => el !== element.value));
            }
            setChecked(!checked);
          }}
        />
      </label>
    </div>
  );
}
