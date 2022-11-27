import useProtectedPage from "../hooks/useProtectedPage";

export default function Settings() {
	// const authContext = useProtectedPage();
	return (
		<div className="w-screen grid grid-cols-3 gap-x-8 gap-y-4 mx-4 text-center sans text-2xl">
			<h1 className="col-span-3">Profile Pictures</h1>
			<div className="col-span-3"></div>
			<h1 className="text-right col-span-1">Birthday</h1>
			<div className="col-span-2 text-sm">Birthday Placeholder</div>
			<h1 className="col-span-3">Age Range of Friends</h1>
			<div className="col-span-3 text-sm">Slider Placeholder</div>
			<h1 className="text-right col-span-1">Languages</h1>
			<div className="col-span-2"></div>
			<h1>Interests</h1>
			<div className="col-span-2"></div>
		</div>
	);
}
