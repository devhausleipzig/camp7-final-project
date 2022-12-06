import AppIcon from "../../public/logo_small.svg";
import BackBottn from "../../public/go_back.svg";
import router from "next/router";

export default function ChatHeader() {
  return (
    <>
      <div className="flex justify-around items-center h-[10%] w-full px-2">
        {/* <HamMenu className="h-8 w-8" /> */}
        <button
          onClick={() => router.back()}
          className="h-6 w-6 rounded-full flex items-center"
        >
          {""}
          <BackBottn className="h-6 w-6" />
        </button>
        <AppIcon className="h-10 w-full pr-5" />
      </div>
    </>
  );
}
