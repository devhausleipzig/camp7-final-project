import { useState } from "react";
import LocationSearch from "../components/locationSearch/locationSearch";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Search() {
	// const authContext = useProtectedPage();
	const [selected, setSelected] = useState("");

	return (
		<>
			<div>search page</div>
			<LocationSearch selected={selected} setSelected={setSelected} />
		</>
	);
}
