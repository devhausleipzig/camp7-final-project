import { getAvatar } from "../../../utils/avatar";
import BackButton from "../../../public/go_back_white.svg";
import { useAuthStore } from "../../../stores/authStore";
import { useUser, useUsers } from "../../../hooks/useUser";
import { useRouter } from "next/router";

export default function ParticipantProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuthStore();
  const { data: profile } = useUser(userId as string);
  if (!profile) return null;
  return (
    <div className="h-screen w-screen">
      <header className="flex flex-col items-center h-1/3 w-full justify-between bg-[#603BAD] py-3 px-5">
        <button
          onClick={() => router.back()}
          className="h-6 w-6 rounded-full flex items-center self-start"
        >
          <BackButton className="h-6 w-6 rounded-full" />
        </button>

        <div className="flex flex-col items-center flex-1 justify-center gap-2 ">
          {getAvatar(profile, "large")}
          <h2 className="text-white font-medium">{profile.name}</h2>
        </div>
        <div />
      </header>
    </div>
  );
}
