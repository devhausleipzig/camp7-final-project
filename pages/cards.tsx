import useProtectedPage from "../hooks/useProtectedPage";

export default function Cards() {
	const authContext = useProtectedPage();

	return <div>cards</div>;
}
