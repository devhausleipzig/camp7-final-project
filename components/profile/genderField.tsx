import clsx from "clsx";
import { useState } from "react";

const genders = [
  { value: "noanswer", desc: "No Answer" },
  { value: "diverse", desc: "Diverse" },
  { value: "woman", desc: "Woman" },
  { value: "man", desc: "Man" },
];

export default function GenderField() {
  const [selectedGender, setSelectedGender] = useState("noanswer");
  return (
    <div className="items-center w-11/12 flex flex-col pl-8">
      <h3 className="block mb-2 text-xl font-quicksand font-bold text-purple text-left pb-4">
        What's your Gender?
      </h3>
      <form className="w-full font-quicksand grid gap-6">
        {genders.map((gender) => (
          <label
            htmlFor={gender.value}
            key={gender.value}
            className={clsx(
              "relative flex justify-between p-4 rounded-lg",
              gender.value === selectedGender
                ? "bg-purple text-white"
                : "bg-white text-purple"
            )}
          >
            <span className="font-semibold text-left">{gender.desc}</span>

            <input
              type="radio"
              name="gender"
              id={gender.value}
              value={gender.value}
              className="absolute h-0 w-0 appearance-none"
              onChange={(event) => setSelectedGender(event.target.value)}
            />
            {selectedGender === gender.value && (
              <span className=" h-6 w-6 flex items-center justify-center rounded-full bg-lightpurple">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-white"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            )}
          </label>
        ))}
      </form>
    </div>
  );
}
