"use client";

import { useState } from "react";

const links = [
  ["Cardápio", "#cardapio"],
  ["Encomendas", "#encomendas"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
] as const;

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-navigation">
      <button
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
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </div>
  );
}
