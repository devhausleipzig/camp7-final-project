import AppIcon from "../../public/app-icon.svg";
import HamMenu from "../../public/Ham-Menu.svg";
import BackBottn from "../../public/Back-Bottn.svg";
import router from "next/router";

export default function ChatHeader() {
  return (
    <>
      <div className="flex justify-around items-center h-[10%] w-full px-5">
        <HamMenu className="h-8 w-8" />
        <AppIcon className="h-8 w-[80%]" />
        <button
          onClick={() => router.back()}
          className=" text-lg h-6 w-6 rounded-full border-solid border-[1px] border-slate-600 flex items-center"
        >
          {""}
          <BackBottn className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
