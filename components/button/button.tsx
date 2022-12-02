import Link from "next/link";
import clsx from "clsx";
import { Route } from "nextjs-routes";

export enum ButtonVariant {
	transparent = "transparent",
	fill = "fill",
}

interface ButtonProps {
	label?: string;
	link?: Route;
	variant: ButtonVariant;
	type?: "submit" | "button" | "reset";
}

export default function Button({ label, link, variant, type }: ButtonProps) {
	return link ? (
		<Link href={link}>
			<button
				type={type}
				className={clsx(
					"w-full mt-4 h-10 text-xl font-bold",
					variant == ButtonVariant.transparent
						? "bg-transparent text-violet-800"
						: variant == ButtonVariant.fill
						? "bg-violet-800 text-white"
						: ""
				)}
			>
				{label}
			</button>
		</Link>
	) : (
		<button
			type={type}
			className={clsx(
				"w-full mt-4 h-10 text-xl font-bold",
				variant == ButtonVariant.transparent
					? "bg-transparent text-violet-800"
					: variant == ButtonVariant.fill
					? "bg-violet-800 text-white"
					: ""
			)}
		>
			{label}
		</button>
	);
}
