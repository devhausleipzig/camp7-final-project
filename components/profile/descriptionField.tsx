import { useState } from "react";

export default function DescriptionField() {
  const [characterCount, setCharacterCount] = useState(440);
  return (
    <div className="w-11/12 pl-8">
      <label
        htmlFor="description"
        className="block mb-2 text-xl font-quicksand font-bold text-purple text-left pb-4"
      >
        Introduce Yourself
      </label>
      <textarea
        onChange={e => setCharacterCount(440 - e.target.value.length)}
        id="description"
        rows={8}
        className="p-2 w-[100%] text-lg font-nunito placeholder:font-nunito text-purple bg-white rounded-lg border border-lightpurple outline-purple placeholder:text-lightpurple"
        placeholder="Express yourself in max. 440 characters and share what's important to you. What should others know about you?"
        maxLength={440}
      ></textarea>
      <p className="text-right text-purple text-sm pr-1">
        {characterCount} characters left
      </p>
    </div>
  );
}
