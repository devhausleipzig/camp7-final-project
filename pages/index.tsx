import { FormEvent, useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import Interest from "../components/interestCard/interestCard";
import CardComponent from "../components/interestCard/interestCard";
import InterestCard from "../components/interestCard/interestCard";
import LocationSearch from "../components/locationSearch/locationSearch";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Home() {
	const authContext = useProtectedPage();
	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const target = event.currentTarget as HTMLFormElement;
	}

	const [address, setAddress] = useState("");
	const [distance, setDistance] = useState(0);
	const [interests, setInterests] = useState([]);
	const [selectedInterests, setSelectedInterests] = useState([]);

	return (
		<div>
			<main>
				<form onSubmit={handleSubmit}>
					<LocationSearch />
					<CardComponent />
					<div className="flex justify-center">
						<div className="w-full mx-4">
							<Button
								label={"SEARCH"}
								link={{ pathname: "/cards" }}
								variant={ButtonVariant.fill}
								type="submit"
							/>
						</div>
					</div>
				</form>
			</main>
		</div>
	);
}
