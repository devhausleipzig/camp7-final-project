import { SetStateAction, useState } from "react";

const useInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);
	const [suggestions, setSuggestions] = useState([]);

	const handleChange = async (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setValue(event.target.value);

		try {
			const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoicmVhbGx5Ym9hcmQiLCJhIjoiY2xhdXd6Yzd4MDA2ZTNvbHR5dGlrbzlhZyJ9.-VLPpmZjVi5zq_eeM-Q5yA&autocomplete=true`;
			const response = await fetch(endpoint);
			const results = await response.json();
			setSuggestions(results?.features);
		} catch (error) {
			console.log("Error fetching data, ", error);
		}
	};

	return {
		value,
		onChange: handleChange,
		setValue,
		suggestions,
		setSuggestions,
	};
};

export default useInput;
