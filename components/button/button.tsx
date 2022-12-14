import Link from "next/link";
import clsx from "clsx";
import { Route } from "nextjs-routes";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export enum ButtonVariant {
  transparent = "transparent",
  fill = "fill",
}

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  link?: Route;
  variant: ButtonVariant;
  type?: "submit" | "button" | "reset";
}

export default function Button({
  label,
  link,
  variant,
  type = "button",
}: ButtonProps) {
  return link ? (
    <Link href={link}>
      <button
        type={type}
        className={clsx(
          "w-11/12 mt-4 h-10 text-xl font-bold rounded-full",
          variant == ButtonVariant.transparent
            ? "bg-transparent text-purple"
            : variant == ButtonVariant.fill
            ? "bg-purple text-white"
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
        "w-full mt-4 h-10 text-xl font-bold rounded-full",
        variant == ButtonVariant.transparent
          ? "bg-transparent text-purple"
          : variant == ButtonVariant.fill
          ? "bg-purple text-white"
          : ""
      )}
    >
      {label}
    </button>
  );
}
