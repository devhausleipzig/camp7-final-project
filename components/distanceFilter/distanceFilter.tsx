import { useState, Fragment, Dispatch, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";

const distances = [1, 2, 5, 8, 10];

type Props = {
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
};

export function DistanceFilter({ distance, setDistance }: Props) {
  // const [selectedDistance, setSelectedDistance] = useState(distance[0]);

  return (
    <div className="self-stretch relative pt-[1.5px] pr-[2px]">
      <Listbox value={distance} onChange={setDistance}>
        <Listbox.Button className="cursor-default bg-white pl-2 pr-2 h-[36px] text-left shadow-md border border-purple text-purple rounded-md sm:text-sm">
          <span className="block truncate">{`${distance}km`}</span>
        </Listbox.Button>

        <Listbox.Options className="mt-1 z-10 max-h-60 bg-white absolute right-0 shadow-lg text-purple ring-1 ring-purpleDark ring-opacity-5 sm:text-sm">
          {distances.map(d => (
            <Listbox.Option
              key={d}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-violet-800 text-white" : "text-purple"
                }`
              }
              value={d}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {`${d}km`}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-"></span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
