import { Interest } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type InterestWithoutId = Omit<Interest, "id">;

type InterestFormProps = {
	onSubmit: (interest: InterestWithoutId) => void;
	buttonText: string;
	updateField: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Interest
	) => void;
	interest: InterestWithoutId;
	setInterest: Dispatch<SetStateAction<InterestWithoutId>>;
};
