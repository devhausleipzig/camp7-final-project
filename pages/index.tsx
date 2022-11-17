import Head from "next/head";
import Test from "../components/test/test";
import useProtectedPage from "../hooks/useProtectedPage";

export default function Home() {
	const authContext = useProtectedPage();

	return (
		<div>
			<main>
				<h1 className="text-3xl text-red-600">Camp #7 Final Project</h1>
			</main>
			<Test />
		</div>
	);
}
