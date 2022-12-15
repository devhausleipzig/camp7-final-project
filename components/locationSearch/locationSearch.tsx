import { Combobox } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { DistanceFilter } from "../../components/distanceFilter/distanceFilter";
import { Address, useGpsLocation, useLocation } from "../../hooks/useLocation";

interface AddressProps {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
}

export default function LocationSearch({ address, setAddress }: AddressProps) {
  const [selected, setSelected] = useState<Address | null>(null);
  const { data: gps } = useGpsLocation();
  const [query, setQuery] = useState("");
  const { data } = useLocation(query);

  return (
    <div className="p-4">
      <div className="mt-8 relative mx-auto flex justify-between bg-white border border-black">
        <Combobox value={selected} onChange={setSelected}>
          <MapPinIcon
            onClick={() => {
              gps && setSelected(gps[0]);
            }}
            className="h-8 w-8 p-1 bg-purple-700 text-white bg-purple m-1 rounded-sm"
          />
          <Combobox.Input
            placeholder="Location"
            className={"px-1 flex-1 relative"}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={() => selected?.place_name ?? ""}
          />
          <Combobox.Options
            className={
              "bg-white absolute my-9 border inset-x-0 border-black border-t-0"
            }
          >
            <Combobox.Option
              className={"cursor-pointer w-full px-1"}
              value={""}
            >
              ❌ Clear
            </Combobox.Option>
            {data &&
              data.map((address, index) => {
                return (
                  <Combobox.Option
                    className={"cursor-pointer w-full px-1"}
                    key={index}
                    value={address}
                  >
                    {address.place_name}
                  </Combobox.Option>
                );
              })}
          </Combobox.Options>
        </Combobox>
        <DistanceFilter />
      </div>
    </div>
  );
}
