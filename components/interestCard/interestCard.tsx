import { BoltIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { CakeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useState } from "react";

interface CardMultiSelectProps {
	selected: Array<string>;
	setSelected: Dispatch<SetStateAction<Array<string>>>;
}

export default function CardMultiSelect({
	selected,
	setSelected,
}: CardMultiSelectProps) {
	const interests = [
		{ id: "1", svg: <BoltIcon />, name: "DANCING" },
		{ id: "2", svg: <BookOpenIcon />, name: "BOOKS" },
		{ id: "3", svg: <MusicalNoteIcon />, name: "MUSIC" },
		{ id: "4", svg: <GlobeAsiaAustraliaIcon />, name: "TRAVEL" },
		{ id: "5", svg: <PencilIcon />, name: "WRITING" },
		{ id: "6", svg: <CakeIcon />, name: "BAKING" },
	];
	return (
		<div className="h-full w-full grid grid-cols-3 place-items-center">
			{interests.map((items, key) => (
				<CheckBox
					items={items}
					key={key}
					selected={selected}
					setSelected={setSelected}
				/>
			))}
		</div>
	);
}

type CheckBoxProps = {
	items: {
		id: string;
		svg: JSX.Element;
		name: string;
	};
	selected: Array<string>;
	setSelected: Dispatch<SetStateAction<Array<string>>>;
};

export function CheckBox({ items, selected, setSelected }: CheckBoxProps) {
	const [checked, setChecked] = useState(
		!!selected.find((el) => el === items.id)
	);

	return (
		<div className="group w-full">
			<label
				className={clsx(
					"w-auto border border-green-800 m-4 mt flex flex-col items-center rounded-lg shadow-bottomRight",
					checked && "bg-green-500 shadow-bottomRightDarker"
				)}
			>
				<div
					className={clsx(
						"w-8 h-8 m-2 my-4",
						checked ? "text-white" : "text-green-500"
					)}
				>
					{items.svg}
				</div>
				<p
					className={clsx(
						"my-2 font-bold",
						checked ? "text-white" : "text-green-500"
					)}
				>
					{items.name}
				</p>
				<input
					type="checkbox"
					checked={checked}
					className="leading-normal hidden"
					value={items.id}
					onChange={(event) => {
						const element = event.target;

						if (element.checked) {
							setSelected((prev) => [...prev, element.value]);
						} else {
							setSelected((prev) => prev.filter((el) => el !== element.value));
						}
						setChecked(!checked);
					}}
				/>
			</label>
		</div>
	);
}
