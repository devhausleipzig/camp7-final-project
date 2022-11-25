import useProtectedPage from "../hooks/useProtectedPage";
import styled from "styled-components";
import InputField from "../components/inputField/inputField";

export default function Home() {
	const authContext = useProtectedPage();

	return (
		<div>
			<main>
				<InputField />
			</main>
		</div>
	);
}
