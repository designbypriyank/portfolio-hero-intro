"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WORK = [
  { title: "Twig", tag: "Product design · Fintech/Edtech", blurb: "Financial literacy learning for kids and families.", tone: "from-[#e4a560] to-[#b9783f]" },
  { title: "Learning onboarding", tag: "UX · Sign-in systems", blurb: "Playful onboarding inspired by Brilliant and Prodigy.", tone: "from-[#7fa8d8] to-[#c9d6e0]" },
  { title: "Craft × Interaction", tag: "Research · Indian craft", blurb: "Bringing traditional making into digital experiences.", tone: "from-[#cfcbc5] to-[#8f5b30]" },
];

/** Soft landing: blends the scrub section's final tone into the home page, then reveals content. */
export function HomeLanding() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 48, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* tone bridge: matches HeroScrub's darkened room tone → page background */}
      <div aria-hidden className="h-[45vh] w-full bg-gradient-to-b from-[#7d7a76] via-[#c9c5bf] to-[#f3f0eb]" />

      <main id="home" className="mx-auto max-w-6xl px-6 pb-32 md:px-10">
        <nav data-reveal className="flex items-center justify-between py-6 text-sm">
          <span className="font-semibold tracking-tight">Priyank</span>
          <div className="flex gap-6 text-neutral-600">
            <a href="#work" className="hover:text-black">Work</a>
            <a href="#about" className="hover:text-black">About</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </div>
        </nav>

        <section className="pt-16 md:pt-28">
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">It’s not the view. It’s how you frame it.</p>
          <h1 data-reveal className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Interaction &amp; product designer framing everyday learning.
          </h1>
          <p data-reveal className="mt-8 max-w-xl text-lg text-neutral-600">
            M.Des at IIT Roorkee. Designing at Twig Labs. Working where UX, educational technology and Indian craft meet.
          </p>
        </section>

        <section id="work" className="mt-32 grid gap-6 md:grid-cols-3">
          {WORK.map((w) => (
            <a data-reveal key={w.title} href="#" className="group block">
              <div className={`aspect-[4/5] w-full rounded-2xl bg-gradient-to-br ${w.tone} transition-transform duration-500 group-hover:scale-[0.98]`} />
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{w.title}</h3>
                  <p className="text-sm text-neutral-500">{w.tag}</p>
                  <p className="mt-2 text-sm text-neutral-700">{w.blurb}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </section>

        <section id="about" data-reveal className="mt-32 max-w-2xl text-2xl leading-snug tracking-tight">
          I frame problems before I solve them — research first, then motion, prototypes and systems that make complex ideas feel simple.
        </section>

        <footer id="contact" data-reveal className="mt-32 flex flex-col justify-between gap-6 border-t border-black/10 pt-8 text-sm md:flex-row">
          <span>Open to internships &amp; collaborations</span>
          <a href="mailto:hello@example.com" className="underline underline-offset-4">Say hello →</a>
        </footer>
      </main>
    </div>
  );
}
