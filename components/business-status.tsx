"use client";

import { useEffect, useState } from "react";
import { isOpenAt } from "@/lib/business-hours";
import { business } from "@/data/business";

type BusinessStatus = "checking" | "open" | "closed";

export function isBusinessOpen(date: Date): boolean {
  return isOpenAt(date, business.hours);
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
