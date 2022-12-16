import { User } from "@prisma/client";
import clsx from "clsx";

export function getAvatar(
  user: Partial<User>,
  size: "default" | "large" | "full" = "default"
) {
  if (user?.image) {
    return (
      <img
        src={user.image}
        className={clsx(
          "object-cover ",
          size === "default"
            ? "h-8 w-8 rounded-full"
            : size === "large"
            ? "aspect-square w-24 rounded-full"
            : "w-full h-full aspect-auto"
        )}
      />
    );
  } else {
    return (
      <div
        className={clsx(
          "flex items-center justify-center rounded-full bg-slate-500",
          size === "default"
            ? "h-8 w-8"
            : size === "large"
            ? "h-36 w-36"
            : "w-full h-full aspect-auto rounded-none"
        )}
      >
        {user?.name ? user.name[0].toUpperCase() : "U"}
      </div>
    );
  }
}
