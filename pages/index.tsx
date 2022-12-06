import Head from "next/head";
import Button, { ButtonVariant } from "../components/button/button";
import useProtectedPage from "../hooks/useProtectedPage";
import LocationSearch from "../components/locationSearch/locationSearch";

export default function Home() {
	const authContext = useProtectedPage();

	return (
		<div>
			<main>
				<div>
					<LocationSearch />
					<div className="flex justify-center">
						<div className="w-80">
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
