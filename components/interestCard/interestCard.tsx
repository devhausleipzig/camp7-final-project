import { BoltIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { CakeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";

interface CardMultiSelectProps {
  selected: Array<string>;
  setSelected: Dispatch<SetStateAction<Array<string>>>;
}

const maxSelectable = 2;

export default function CardMultiSelect({
  selected,
  setSelected,
}: CardMultiSelectProps) {
  const { user } = useAuthStore();
  // const interests = [
  //   { id: "1", svg: <BoltIcon />, name: "DANCING" },
  //   { id: "2", svg: <BookOpenIcon />, name: "BOOKS" },
  //   { id: "3", svg: <MusicalNoteIcon />, name: "MUSIC" },
  //   { id: "4", svg: <GlobeAsiaAustraliaIcon />, name: "TRAVEL" },
  //   { id: "5", svg: <PencilIcon />, name: "WRITING" },
  //   { id: "6", svg: <CakeIcon />, name: "BAKING" },
  // ];
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
        {user &&
          user.interests.map((item, key) => (
            <CheckBox
              item={{
                id: item.id,
                name: item.name,
                svg: <BoltIcon />,
              }}
              key={key}
              selected={selected}
              setSelected={setSelected}
              maximumSelected={maximumSelected}
              setMaximumSelected={setMaximumSelected}
            />
          ))}
      </div>
      <p className="text-center text-violet-800">
        <span className="font-bold">{selected.length}</span> of 2 interests
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
          value={item.name}
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
