import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

type MapboxAddress = Record<string, any> & { place_name: string };

async function getMapboxSuggestions(
	setter: React.Dispatch<React.SetStateAction<Array<MapboxAddress>>>,
	query: string
) {
	const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoicmVhbGx5Ym9hcmQiLCJhIjoiY2xhdXd6Yzd4MDA2ZTNvbHR5dGlrbzlhZyJ9.-VLPpmZjVi5zq_eeM-Q5yA&autocomplete=true`;
	const response = await fetch(endpoint);
	const results = await response.json();
	setter(results?.features ?? []);
}

type LocationSearchProps = {
	selected: string;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export default function LocationSearch({}: LocationSearchProps) {
	const [addressList, setAddressList] = useState([] as Array<MapboxAddress>);
	const [selected, setSelected] = useState("");
	const [query, setQuery] = useState("");

	useEffect(() => {
		getMapboxSuggestions(setAddressList, query);
	}, [query]);

	return (
		<div className="mt-8 mx-auto flex justify-center h-8 w-1/4">
			<Combobox value={selected} onChange={setSelected}>
				<Combobox.Input
					className={
						"w-80  bg-white border border-black p-1 relative"
					}
					onChange={(event) => setQuery(event.target.value)}
					value={query}
				/>
				<Combobox.Options
					className={
						"bg-white absolute w-1/4 my-9 border border-black border-t-0"
					}
				>
					{addressList.map((address, index) => {
						console.log(address);
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
		</div>
	);
}
