import { User } from "@prisma/client";
import clsx from "clsx";

export function getAvatar(
  user: Partial<User>,
  size: "default" | "large" = "default"
) {
  if (user.image) {
    return (
      <img
        src={user.image}
        className={clsx(
          "object-cover rounded-full",
          size === "default" ? "h-8 w-8" : "aspect-square w-24"
        )}
      />
    );
  } else {
    return (
      <div
        className={clsx(
          "flex items-center justify-center rounded-full bg-slate-500",
          size === "default" ? "h-8 w-8" : "h-36 w-36"
        )}
      >
        {user.name ? user.name[0].toUpperCase() : "U"}
      </div>
    );
  }
}
