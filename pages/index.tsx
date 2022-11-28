import useProtectedPage from "../hooks/useProtectedPage";
import LocationSearch from "../components/locationSearch/locationSearch";

export default function Home() {
	const authContext = useProtectedPage();

	return (
		<div>
			<main>Home page</main>
		</div>
	);
}
