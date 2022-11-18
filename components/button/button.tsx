import Link from "next/link";
import clsx from "clsx";

export enum ButtonSizes {
	default = "default",
	wide = "wide",
}

interface ButtonProps {
	label?: string;
	link?: string;
	size: ButtonSizes;
}

export default function Button({ label, link, size }: ButtonProps) {
	return (
		<Link href={`${link}`}>
			<button
				className={clsx(
					"w-11/12 h-10 rounded-lg text-white text-lg mb-4",
					size == ButtonSizes.default
						? "bg-purple-400 w-24"
						: size == ButtonSizes.wide
						? "bg-purple-600 w-52"
						: ""
				)}
			>
				{label}
			</button>
		</Link>
	);
}
