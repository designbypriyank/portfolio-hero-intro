"use client";

import { HeroScrub } from "@/components/ui/hero-scrub";
import { HomeLanding } from "@/components/home-landing";

const FRAME_COUNT = 141;
const frameUrl = (i: number) => `/frames/${String(i + 1).padStart(4, "0")}.webp`;

export default function Page() {
  return (
    <>
      <HeroScrub
        frameCount={FRAME_COUNT}
        frameUrl={frameUrl}
        titleTop="Frame"
        titleBottom="the view"
        accentHex="#b4afa8"
        bgClassName="bg-[#b4afa8]"
      />
      <HomeLanding />
    </>
  );
}
