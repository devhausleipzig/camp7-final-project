import useProtectedPage from "../hooks/useProtectedPage";
import AgePicker from "../components/agePicker/agePicker";

export default function AgeAndLocation() {
	const authContext = useProtectedPage();

	return (
		<div>
			<AgePicker />
		</div>
	);
}
