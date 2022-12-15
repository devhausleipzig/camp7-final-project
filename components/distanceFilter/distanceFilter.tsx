import { useState, Fragment, Dispatch, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";

const distance = ["1km", "2km", "5km", "8km", "10km"];

export function DistanceFilter() {
  const [selectedDistance, setSelectedDistance] = useState(distance[0]);

  return (
    <div className="self-stretch relative">
      <Listbox value={selectedDistance} onChange={setSelectedDistance}>
        <Listbox.Button className="cursor-default bg-white pl-2 pr-2 h-full text-left shadow-md border border-black sm:text-sm">
          <span className="block truncate">{selectedDistance}</span>
        </Listbox.Button>

        <Listbox.Options className="mt-1 max-h-60 bg-white absolute right-0 shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
          {distance.map((distance, distanceIdx) => (
            <Listbox.Option
              key={distanceIdx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-violet-800 text-white" : "text-gray-900"
                }`
              }
              value={distance}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {distance}
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
