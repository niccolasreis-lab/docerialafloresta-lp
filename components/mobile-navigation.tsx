"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  ["Cardápio", "#cardapio"],
  ["Encomendas", "#encomendas"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
] as const;

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Navegação móvel">
          {links.map(([label, href], index) => (
            <a ref={index === 0 ? firstLinkRef : undefined} key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </div>
  );
}
