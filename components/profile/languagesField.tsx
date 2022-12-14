import { useState } from "react";

const languages = [
  { value: "english", desc: "English" },
  { value: "spanish", desc: "Spanish" },
  { value: "german", desc: "German" },
  { value: "italian", desc: "Italian" },
  { value: "french", desc: "French" },
  { value: "dutch", desc: "Dutch" },
  { value: "russian", desc: "Russian" },
  { value: "danish", desc: "Danish" },
  { value: "turkish", desc: "Turkish" },
  { value: "polish", desc: "Polish" },
  { value: "arabic", desc: "Arabic" },
];
export default function LanguagesField() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  return (
    <div className="items-center w-11/12 flex flex-col pl-8">
      <h3 className="block mb-2 text-xl font-quicksand font-bold text-purple text-left pb-4">
        Languages I know
      </h3>
      <form className="w-full font-quicksand grid gap-6 grid-cols-2">
        {languages.map((language) => (
          <label
            htmlFor={language.value}
            className="relative flex justify-between items-center bg-white p-4 rounded-lg"
            key={language.value}
          >
            <span className="font-semibold text-purple text-left outline-purple">
              {language.desc}
            </span>

            <input
              type="checkbox"
              name="languages"
              id={language.value}
              checked={selectedLanguages.includes(language.value)}
              value={language.value}
              className="absolute h-0 w-0 appearance-none"
              onChange={(event) => {
                event.target.checked
                  ? setSelectedLanguages((prev) => [...prev, language.value])
                  : setSelectedLanguages(
                      selectedLanguages.filter((l) => l !== language.value)
                    );
              }}
            />
            {selectedLanguages.includes(language.value) && (
              <span className="h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
