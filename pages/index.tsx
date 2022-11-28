import useProtectedPage from "../hooks/useProtectedPage";
import LocationSearch from "../components/locationSearch/locationSearch";
import { useState } from "react";

export default function Home() {
	const authContext = useProtectedPage();
	const [selected, setSelected] = useState("");

	return (
		<div>
			<main>
				<LocationSearch selected={selected} setSelected={setSelected} />
			</main>
		</div>
	);
}
