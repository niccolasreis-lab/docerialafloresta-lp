"use client";

import { useEffect, useState } from "react";
import { business } from "@/data/business";

type BusinessStatus = "checking" | "open" | "closed";

const TIME_ZONE = "America/Sao_Paulo";
const OPENING_MINUTES = 10 * 60;
const CLOSING_MINUTES = 2 * 60;

function getSaoPauloMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);

  return hour * 60 + minute;
}

export function isBusinessOpen(date: Date): boolean {
  const currentMinutes = getSaoPauloMinutes(date);
  return currentMinutes >= OPENING_MINUTES || currentMinutes < CLOSING_MINUTES;
}

export function BusinessStatusBadge() {
  const [status, setStatus] = useState<BusinessStatus>("checking");

  useEffect(() => {
    const updateStatus = () => setStatus(isBusinessOpen(new Date()) ? "open" : "closed");
    updateStatus();
    const interval = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const statusText = status === "open" ? "Aberto agora" : status === "closed" ? "Fechado agora" : "Verificando horário";
  const title = `Todos os dias, das ${business.hours.openingTime} às ${business.hours.closingTime} (horário de São Paulo)`;

  return (
    <span className={`status-badge status-${status}`} title={title} aria-live="polite">
      <span aria-hidden="true" /> {statusText}
    </span>
  );
}
