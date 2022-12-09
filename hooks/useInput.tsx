import React from "react";

interface InputProps {
	className: string;
	value: string;
	onFocus: () => void;
	onChange: () => void;
	onClick: () => void;
}

export function Input(
	{ className, value, onClick, onFocus, onChange }: InputProps,
	ref: React.LegacyRef<HTMLInputElement> | undefined
) {
	return (
		<input
			className={className}
			type="text"
			value={value}
			ref={ref}
			onFocus={onFocus}
			onChange={onChange}
			onClick={onClick}
		/>
	);
}
