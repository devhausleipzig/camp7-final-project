import React, { useState, useRef, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Input } from "../../hooks/useInput";

const CustomInput = forwardRef((props: any, ref) => {
	return <Input {...props} ref={ref} />;
});

export default function AgePicker() {
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const inputRef = useRef(null);
	const handleChangeRaw = (
		date: React.FocusEvent<HTMLInputElement, Element>
	) => {
		const newRaw = new Date(date.currentTarget.value);
		if (newRaw instanceof Date && !isNaN(newRaw)) {
			setStartDate(newRaw);
		}
	};
	return (
		<DatePicker
			selected={startDate}
			customInput={<CustomInput inputRef={inputRef} />}
			onChangeRaw={(e) => handleChangeRaw(e)}
			onChange={(date: Date | null) => {
				setStartDate(date);
			}}
		/>
	);
}
