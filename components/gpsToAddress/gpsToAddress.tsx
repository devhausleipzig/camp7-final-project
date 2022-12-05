import React from "react";
import { useGpsLocation } from "../../hooks/useLocation";

type LocationSearchProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export default function GPSToAddress({}: LocationSearchProps) {
  const { data } = useGpsLocation();

  return (
    <div className="mt-8 mx-auto flex justify-center h-8 w-80">
      {data && <p>{data[0].place_name}</p>}
    </div>
  );
}
