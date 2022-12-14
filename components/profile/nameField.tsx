export default function NameField() {
	return (
		<div>
			<input
				type="text"
				placeholder="Your Name"
				className="w-10/12 h-10 pl-2 font-quicksand placeholder:font-quicksand placeholder-lightpurple outline-purple rounded-md border-lightpurple border text-purple"
				required
			></input>
		</div>
	);
}
