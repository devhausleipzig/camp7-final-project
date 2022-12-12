import { User } from "@prisma/client";

export function getAvatar(user: Partial<User>) {
  if (user.avatar) {
    return (
      <img src={user.avatar} className="h-8 w-8 object-cover rounded-full" />
    );
  } else {
    return (
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-500">
        {user.name ? user.name[0].toUpperCase() : "U"}
      </div>
    );
  }
}
