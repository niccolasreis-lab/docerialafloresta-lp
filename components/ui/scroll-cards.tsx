"use client";

import Image from "next/image";
import type { FC } from "react";

export interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
}

interface iCardProps extends iCardItem {
  i: number;
}

const Card: FC<iCardProps> = ({ title, description, color, textColor, i, src, link, tag }) => (
  <article className="relative flex min-h-[27rem] items-center justify-center px-4 py-5 md:sticky md:top-[5.5rem] md:h-[calc(100dvh-5.5rem)] md:px-0 md:py-8">
    <div
      className="relative mx-auto flex min-h-[25rem] w-full max-w-[44rem] items-end overflow-hidden rounded-[2rem] border border-white/30 p-5 shadow-[0_24px_70px_rgba(63,38,31,.25)] md:h-[min(68vh,35rem)] md:min-h-0 md:p-12"
      style={{ backgroundColor: color, zIndex: i + 1 }}
    >
      <Image className="object-cover" src={src} alt="" fill sizes="(max-width: 700px) calc(100vw - 2rem), 700px" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2d1712]/95 via-[#3f261f]/70 to-[#3f261f]/20" aria-hidden="true" />
      <div className="relative z-10 max-w-xl rounded-2xl bg-[#3f261f]/85 p-5 shadow-lg backdrop-blur-sm md:p-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em]" style={{ color: textColor }}>
          {String(i + 1).padStart(2, "0")} · {tag}
        </p>
        <h3 className="font-serif text-4xl font-black leading-none tracking-tight md:text-6xl" style={{ color: textColor }}>{title}</h3>
        <p className="mt-4 max-w-lg text-base font-medium leading-relaxed md:text-xl" style={{ color: textColor }}>{description}</p>
        <a className="mt-5 inline-flex min-h-11 items-center border border-white/60 px-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#3f261f]" href={link}>
          Ver no cardápio <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </article>
);

interface iCardSlideProps {
  items: iCardItem[];
}

/** A vertical, sticky sequence of visual menu highlights. */
const CardsParallax: FC<iCardSlideProps> = ({ items }) => (
  <div className="min-h-screen">
    {items.map((project, i) => <Card key={project.title} {...project} i={i} />)}
  </div>
);

export { CardsParallax };
