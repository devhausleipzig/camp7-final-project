import { BoltIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { CakeIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function CardComponent({}) {
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
				<div className="group w-full">
					<label
						className="w-auto border border-green-800 m-4 mt flex flex-col items-center rounded-lg shadow-bottomRight group-hover:bg-green-500 group-hover:shadow-bottomRightDarker"
						key={key}
					>
						<div className="w-8 h-8 m-2 my-4 text-green-500 group-hover:text-white">
							{" "}
							{items.svg}{" "}
						</div>
						<p className="my-2  text-green-500 font-bold group-hover:text-white">
							{items.name}
						</p>
						<input
							type="checkbox"
							className="leading-normal hidden"
							value={items.id}
							onChange={(event) => console.log(event?.target.value!)}
						/>
					</label>
				</div>
			))}
		</div>
	);
}
