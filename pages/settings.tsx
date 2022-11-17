import useProtectedPage from "../hooks/useProtectedPage";

export default function Settings() {
	const authContext = useProtectedPage();

	return <div>settings page</div>;
}
