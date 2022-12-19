import { Combobox } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { DistanceFilter } from "../../components/distanceFilter/distanceFilter";
import { Address, useGpsLocation, useLocation } from "../../hooks/useLocation";

type DistanceProps =
  | { withRadius?: false; setDistance?: never; distance?: never }
  | {
      withRadius: true;
      distance: number;
      setDistance: Dispatch<SetStateAction<number>>;
    };

type AddressProps = {
  location: Address | null;
  setLocation: Dispatch<SetStateAction<Address | null>>;
} & DistanceProps;

export default function LocationSearch({
  location,
  setLocation,
  distance,
  setDistance,
  withRadius = false,
}: AddressProps) {
  // const [selected, setSelected] = useState<Address | null>(null);
  const { data: gps } = useGpsLocation();
  const [query, setQuery] = useState("");
  const { data } = useLocation(query);

  return (
    <div className="p-4">
      <div className="mt-8 relative z-10 mx-auto flex justify-between bg-white border border-purple rounded-md">
        <Combobox value={location} onChange={setLocation}>
          {withRadius && (
            <MapPinIcon
              onClick={() => {
                gps && setLocation(gps[0]);
              }}
              className="h-8 w-8 p-1 text-purple m-1"
            />
          )}
          <Combobox.Input
            placeholder="Location"
            className={clsx(
              "px-1 flex-1 relative text-purple rounded-md",
              !withRadius && "pl-3"
            )}
            onChange={event => setQuery(event.target.value)}
            displayValue={() => location?.place_name ?? ""}
          />
          <Combobox.Options
            className={
              "bg-white absolute my-9 border text-purple inset-x-0 border-purple border-t-0"
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
        {withRadius ? (
          <DistanceFilter distance={distance!} setDistance={setDistance!} />
        ) : (
          <MapPinIcon
            onClick={() => {
              gps && setLocation(gps[0]);
            }}
            className="h-8 w-8 p-1 text-purple m-1"
          />
        )}
      </div>
    </div>
  );
}
