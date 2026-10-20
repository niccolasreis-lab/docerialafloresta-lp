import { business } from "@/data/business";

export default function Home() {
  return (
    <main className="site-shell">
      <p className="eyebrow">Scaffold em construção</p>
      <h1>{business.name}</h1>
      <p>{business.descriptor}</p>
      <p className="placeholder">{business.hours.openingTime}</p>
    </main>
  );
}
