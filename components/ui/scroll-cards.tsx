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

interface iCardProps extends Omit<iCardItem, "link" | "tag"> {
  i: number;
}

const Card: FC<iCardProps> = ({ title, description, color, textColor, i, src }) => (
  <article className="sticky top-0 flex h-dvh items-center justify-center px-4 py-8 md:px-0" aria-label={`${title}: ${description}`}>
    <div
      className="relative mx-auto flex h-[min(62vh,31rem)] w-full max-w-[44rem] items-end overflow-hidden rounded-[2rem] border border-white/30 p-7 shadow-[0_24px_70px_rgba(63,38,31,.25)] md:h-[min(68vh,35rem)] md:p-12"
      style={{ backgroundColor: color, zIndex: i + 1 }}
    >
      <Image
        className="object-cover"
        src={src}
        alt=""
        fill
        sizes="(max-width: 700px) calc(100vw - 2rem), 700px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" aria-hidden="true" />
      <div className="relative z-10 max-w-xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em]" style={{ color: textColor }}>{String(i + 1).padStart(2, "0")} · {title}</p>
        <h3 className="font-serif text-4xl font-black leading-none tracking-tight md:text-6xl" style={{ color: textColor }}>{title}</h3>
        <p className="mt-4 max-w-lg text-base font-medium leading-relaxed md:text-xl" style={{ color: textColor }}>{description}</p>
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
