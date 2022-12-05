import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useLocation } from "../../hooks/useLocation";

type LocationSearchProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export default function LocationSearch({}: LocationSearchProps) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const { data } = useLocation(query);

  return (
    <div className="mt-8 mx-auto flex justify-center h-8 w-80">
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Input
          className={"w-80  bg-white border border-black p-1 relative"}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <Combobox.Options
          className={
            "bg-white w-80 absolute my-9 border border-black border-t-0"
          }
        >
          {data &&
            data.map((address, index) => {
              return (
                <Combobox.Option
                  className={"cursor-pointer max-w-80 px-1"}
                  key={index}
                  value={address.place_name}
                >
                  {address.place_name}
                </Combobox.Option>
              );
            })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
