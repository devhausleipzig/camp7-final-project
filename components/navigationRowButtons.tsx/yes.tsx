import * as React from "react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface Props {
  interested: boolean;
  clickHandler: (event: any) => Promise<void>;
}

export default function Yes({ interested, clickHandler }: Props) {
  return (
    <button className="h-5 w-5" onClick={clickHandler}>
      <FaceSmileIcon
        className={
          interested
            ? "fill-green-700 stroke-white"
            : "fill-white stroke-green-700"
        }
      />
    </button>
  );
}
