"use client";
import React from "react";
import { LayoutGrid } from "./ui/layout-grid";

import FROM from '@/public/1.png'
import RAVEN from '@/public/2.png'
import KYOTO from '@/public/3.png'
import ALONE from '@/public/4.png'

export function HeroImages() {
  return (
    <div className="h-screen w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        FOREST OF MIST
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A JOURNEY INTO THE UNKNOWN
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Raven : The Majestic Hunter
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Witness the grace and power of the raven as it soars through the sky.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Kyoto: The Land of the Rising Sun
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Explore the ancient streets of Kyoto and immerse yourself in the rich culture and history of Japan.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
      <i>The Killer</i>&nbsp;&nbsp;<i>2023</i>
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A stoic and methodical assassin finds his unwavering code of precision unraveling after a botched mission. As betrayal and vengeance intertwine, he embarks on a harrowing journey that blurs the line between cold calculation and existential reckoning.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2 rounded-xl border",
    thumbnail: FROM
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1 rounded-xl border",
    thumbnail: RAVEN
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1 rounded-xl border",
    thumbnail: KYOTO
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2 rounded-xl border",
    thumbnail: ALONE
  },
];