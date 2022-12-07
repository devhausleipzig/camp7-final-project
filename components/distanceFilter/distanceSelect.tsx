import React, { useState } from "react";
import Select from "react-select";

const options = [
	{ value: "1 km", label: "1 km" },
	{ value: "2 kms", label: "2 kms" },
	{ value: "5 kms", label: "5 kms" },
	{ value: "8 kms", label: "8 kms" },
	{ value: "10 kms", label: "10 kms" },
];

export default function DistanceSelect() {
	const [selectedOption, setSelectedOption] = useState(null);

	return (
		<Select
			defaultValue={selectedOption}
			onChange={setSelectedOption}
			options={options}
		/>
	);
}
