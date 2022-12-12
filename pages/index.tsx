import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Button, { ButtonVariant } from "../components/button/button";
import LocationSearch from "../components/locationSearch/locationSearch";
import useProtectedPage from "../hooks/useProtectedPage";

async function queryUsers() {}

export default function Home() {
	const authContext = useProtectedPage();

	const {} = useQuery([], queryUsers);

	return (
		<div>
			<main>
				<div>
					<LocationSearch />
					<div className="flex justify-center">
						<div className="w-full mx-4">
							<Button
								label={"SEARCH"}
								link={{ pathname: "/cards" }}
								variant={ButtonVariant.fill}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
