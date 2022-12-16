import { BoltIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import { CakeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function FrontCard() {
  const interests = [
    { id: "1", svg: <BoltIcon /> },
    { id: "2", svg: <BookOpenIcon /> },
    { id: "3", svg: <MusicalNoteIcon /> },
    { id: "4", svg: <GlobeAsiaAustraliaIcon /> },
    { id: "5", svg: <PencilIcon /> },
    { id: "6", svg: <CakeIcon /> },
  ];

  const languages = [
    { value: "en,", desc: "English" },
    { value: "es,", desc: "Spanish" },
    { value: "de,", desc: "German" },
    { value: "it,", desc: "Italian" },
    { value: "fr", desc: "French" },
  ];
  return (
    <div className="absolute w-80 h-[364px] bg-white border border-black shadow-bottomRightCard m-5 px-5">
      <div className="h-auto w-auto flex justify-center my-2">
        {interests.map(({ id, svg }) => (
          <div
            className="h-8 w-12 bg-white border border-green-500 m-1 flex justify-center items-center rounded-lg"
            key={id}
          >
            <div className={clsx("h-6 w-6 text-green-500")}>{svg}</div>
          </div>
        ))}
      </div>
      <div className="flex align justify-between mb-8 pt-3">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec.
      </div>
      <div className="w-full h-[1px] bg-purpleDark"></div>
      <div className="flex items-center justify-between">
        <div className="h-auto w-auto flex justify-start">
          {languages.map(({ value, desc }) => (
            <div>
              <p className="m-[2px] pt-3">{value}</p>
            </div>
          ))}
        </div>
        <p className="pt-3">27</p>
        <p className="pt-3">3 kms away</p>
      </div>
    </div>
  );
}
