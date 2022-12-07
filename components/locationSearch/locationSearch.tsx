import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useGpsLocation, useLocation } from "../../hooks/useLocation";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { DistanceFilter } from "../../components/distanceFilter/distanceFilter";
import DistanceSelect from "../distanceFilter/distanceSelect";

export default function LocationSearch() {
	const [selected, setSelected] = useState("");
	const { data: gps } = useGpsLocation();
	const [query, setQuery] = useState("");
	const { data } = useLocation(query);

	return (
		<div>
			<div className="mt-8 mx-auto flex justify-center h-8 w-80  bg-white border border-black">
				<Combobox value={selected} onChange={setSelected}>
					<MapPinIcon
						onClick={(event) => {
							gps && setSelected(gps[0].place_name.toString());
						}}
						className="h-6 w-6"
					/>
					<Combobox.Input
						placeholder="Location"
						className={"w-80  p-1 relative"}
						onChange={(event) => setQuery(event.target.value)}
						value={query}
					/>
					<Combobox.Options
						className={
							"bg-white w-80 absolute my-9 border border-black border-t-0"
						}
					>
						{data &&
							data.map((address, index) => {
								return (
									<Combobox.Option
										className={"cursor-pointer max-w-80 px-1"}
										key={index}
										value={address.place_name}
									>
										{address.place_name}
									</Combobox.Option>
								);
							})}
					</Combobox.Options>
				</Combobox>
				<DistanceFilter />
			</div>
		</div>
	);
}
