import * as React from "react";

import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface Props {
  interested: boolean;
  clickHandler: (event: any) => Promise<void>;
}

export default function No({ interested, clickHandler }: Props) {
  return (
    <button className="h-5 w-5" onClick={clickHandler}>
      <FaceFrownIcon
        className={
          interested
            ? "fill-green-700 stroke-white"
            : "fill-white stroke-green-700"
        }
      />
    </button>
  );
}
