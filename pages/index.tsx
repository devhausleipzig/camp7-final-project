import Head from "next/head";
import Button, { ButtonVariant } from "../components/button/button";
import Test from "../components/test/test";
import useProtectedPage from "../hooks/useProtectedPage";
import LocationSearch from "../components/locationSearch/locationSearch";
import { useState } from "react";
import GPSToAddress from "../components/gpsToAddress/gpsToAddress";

export default function Home() {
	const authContext = useProtectedPage();
	const [selected, setSelected] = useState("");

	return (
		<div>
			<main>
				<div>
					{/* <GPSToAddress selected={selected} setSelected={setSelected} /> */}
					<LocationSearch selected={selected} setSelected={setSelected} />
				</div>
			</main>
			<Button
				label={"SEARCH"}
				link={{ pathname: "/cards" }}
				variant={ButtonVariant.fill}
			/>
		</div>
	);
}
