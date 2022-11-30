import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

type GPSAddress = Record<string, any> & { place_name: string };

async function getGPSAddressSuggestions(
	setter: React.Dispatch<React.SetStateAction<Array<GPSAddress>>>,
	query: string
) {
	let lat = 0;
	let lon = 0;
	if ("geolocation" in navigator) {
		console.log("Available");
	} else {
		console.log("Not Available");
	}
	navigator.geolocation.getCurrentPosition(async function (position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		// console.log(lon, lat);
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1IjoicmVhbGx5Ym9hcmQiLCJhIjoiY2xhdXd6Yzd4MDA2ZTNvbHR5dGlrbzlhZyJ9.-VLPpmZjVi5zq_eeM-Q5yA`;
		const response = await fetch(endpoint);
		const results = await response.json();
		setter(results?.features ?? []);
	});
}

type LocationSearchProps = {
	selected: string;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export default function GPSToAddress({}: LocationSearchProps) {
	const [addressList, setAddressList] = useState([] as Array<GPSAddress>);
	const [selected, setSelected] = useState("");
	const [query, setQuery] = useState("");

	useEffect(() => {
		getGPSAddressSuggestions(setAddressList, query);
	}, [query]);

	return (
		<div className="mt-8 mx-auto flex justify-center h-8 w-80">
			<Combobox value={selected} onChange={setSelected}>
				<Combobox.Input
					className={"w-80  bg-white border border-black p-1 relative"}
					onChange={(event) => setQuery(event.target.value)}
					value={query}
				/>
				<Combobox.Options
					className={
						"bg-white w-80 absolute my-9 border border-black border-t-0"
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
