import useProtectedPage from "../hooks/useProtectedPage";

export default function Search() {
	const authContext = useProtectedPage();

	return <div>search page</div>;
}
