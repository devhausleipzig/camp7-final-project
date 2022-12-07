import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const distance = [
	{ distance: "1km" },
	{ distance: "2km" },
	{ distance: "5km" },
	{ distance: "8km" },
	{ distance: "10km" },
];

export function DistanceFilter() {
	const [selectedDistance, setSelectedDistance] = useState(distance[0]);

	return (
		<Listbox value={selectedDistance} onChange={setSelectedDistance}>
			<Listbox.Button className="cursor-default bg-white pl-2 pr-2 text-left shadow-md border border-black sm:text-sm">
				<span className="block truncate">{selectedDistance.distance}</span>
			</Listbox.Button>

			<Listbox.Options className="mt-1 max-h-60 bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
				{distance.map((distance, distanceIdx) => (
					<Listbox.Option
						key={distanceIdx}
						className={({ active }) =>
							`relative cursor-default select-none py-2 pl-10 pr-4 ${
								active ? "bg-violet-800 text-white" : "text-gray-900"
							}`
						}
						value={distance}
					>
						{({ selected }) => (
							<>
								<span
									className={`block truncate ${
										selected ? "font-medium" : "font-normal"
									}`}
								>
									{distance.distance}
								</span>
								{selected ? (
									<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-"></span>
								) : null}
							</>
						)}
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
}
