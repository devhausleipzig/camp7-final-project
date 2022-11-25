import React from "react";
import useInput from "../../hooks/useInput";

export default function InputField() {
	const address = useInput("");

	return (
		<div className="mt-8 mx-auto flex justify-center ">
			<input
				className="w-80  bg-white border border-black p-1 relative"
				placeholder="Address"
				{...address}
				isTyping={address.value !== ""}
			/>
			{address.suggestions?.length > 0 && (
				<div className="bg-white absolute w-80 my-9 border border-black border-t-0">
					{address.suggestions.map((suggestion, index) => {
						return (
							<div
								className="cursor-pointer max-w-80 px-1"
								key={index}
								onClick={() => {
									address.setValue(suggestion.place_name);
									address.setSuggestions([]);
								}}
							>
								{suggestion.place_name}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
