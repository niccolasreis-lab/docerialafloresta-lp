"use client";

import { useRef, type ReactNode } from "react";
import type { MenuItem } from "@/data/menu";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { createMenuInquiryUrl } from "@/lib/whatsapp";

export function ProductDetails({ item, servingNote, children, className = "product-details-trigger" }: {
  item: MenuItem; servingNote?: string; children: ReactNode; className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <button ref={trigger} type="button" className={className} aria-haspopup="dialog" aria-label={`Ver detalhes de ${item.name}`} onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} className="product-dialog" aria-label={item.name} onClose={() => trigger.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="product-dialog-content">
        <button type="button" className="dialog-close" aria-label="Fechar detalhes" onClick={() => dialog.current?.close()}>×</button>
        <ProductPlaceholder image={item.image} label={item.name} kind={item.imageKind} position={item.imagePosition} fit="contain" context="detail" />
        <div className="product-dialog-copy">
          <p className="eyebrow">Conheça de perto</p><h2>{item.name}</h2>
          <p>{item.description}</p>
          {servingNote && !item.availabilityNote && <p className="detail-note">{servingNote}</p>}
          {item.availabilityNote && <p className="detail-note">{item.availabilityNote}</p>}
          <p className="detail-note">Consulte valores, tamanhos e disponibilidade com a equipe. Informe alergias e restrições antes de pedir.</p>
          <a className="button button-primary" href={createMenuInquiryUrl(item.name)} target="_blank" rel="noopener noreferrer">Quero consultar este produto →</a>
        </div>
      </div>
    </dialog>
  </>;
}
