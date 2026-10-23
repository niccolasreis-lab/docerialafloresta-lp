"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { getSaoPauloDate, createOrderMessage } from "@/lib/orders";
import { WhatsAppIcon } from "@/components/icons";

export function OrderBuilder() {
  const [error, setError] = useState("");
  const [minimumDate, setMinimumDate] = useState("");
  useEffect(() => { setMinimumDate(getSaoPauloDate()); }, []);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const date = String(fields.get("date") || "");
    if (date < getSaoPauloDate()) {
      setError("Escolha hoje ou uma data futura para consultar sua encomenda.");
      form.querySelector<HTMLInputElement>("#order-date")?.focus();
      return;
    }
    setError("");
    const message = createOrderMessage({
      occasion: String(fields.get("occasion")), date,
      guests: Number(fields.get("guests")), product: String(fields.get("product")),
      fulfillment: String(fields.get("fulfillment")), notes: String(fields.get("notes") || ""),
    });
    window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }
  return <section className="section order-builder-section" id="monte-sua-encomenda" aria-labelledby="order-builder-title">
    <div className="container builder-grid">
      <div><p className="eyebrow">Do seu jeito</p><h2 id="order-builder-title">Vamos planejar seu próximo momento?</h2><p className="builder-intro">Conte o que você tem em mente. Levamos os detalhes para o WhatsApp e nossa equipe ajuda com as opções.</p><p className="detail-note">Este formulário prepara uma consulta. A encomenda só fica confirmada após o atendimento da loja.</p></div>
      <form className="order-form" onSubmit={handleSubmit}>
        <noscript><p>Para montar a consulta, ative o JavaScript ou <a className="text-link" href={createWhatsAppUrl("Olá! Gostaria de consultar uma encomenda.")}>fale diretamente pelo WhatsApp</a>.</p></noscript>
        <div className="form-grid">
          <label htmlFor="order-occasion">Qual é a ocasião?<select name="occasion" id="order-occasion" required defaultValue=""><option value="" disabled>Selecione</option><option>Aniversário</option><option>Encontro em família</option><option>Evento ou reunião</option><option>Outra ocasião</option></select></label>
          <label htmlFor="order-date">Para qual data?<input type="date" name="date" id="order-date" required min={minimumDate} onFocus={() => setMinimumDate(getSaoPauloDate())} onChange={() => setError("")} aria-describedby={error ? "order-error" : undefined} aria-invalid={Boolean(error)} /></label>
          <label htmlFor="order-guests">Quantidade de pessoas<input type="number" name="guests" id="order-guests" min="1" max="10000" step="1" required placeholder="Ex.: 12" /></label>
          <label htmlFor="order-product">O que você procura?<select name="product" id="order-product" required defaultValue=""><option value="" disabled>Selecione</option><option>Bolo inteiro</option><option>Torta inteira</option><option>Mini salgados</option><option>Docinhos</option><option>Quero combinar opções</option></select></label>
          <label htmlFor="order-fulfillment" className="form-wide">Como pretende receber?<select name="fulfillment" id="order-fulfillment" defaultValue="Retirada na loja"><option>Retirada na loja</option><option>Consultar possibilidade de entrega</option><option>A combinar</option></select></label>
          <label htmlFor="order-notes" className="form-wide">Sabores e observações (opcional)<textarea name="notes" id="order-notes" rows={3} maxLength={600} placeholder="Preferências de sabor, quantidades ou dúvidas..." /></label>
        </div>
        {error && <p id="order-error" className="form-error" role="alert">{error}</p>}
        <button type="submit" className="button button-primary"><WhatsAppIcon /> Continuar no WhatsApp</button>
        <p className="detail-note form-disclaimer">Você revisa e envia a mensagem no WhatsApp. Disponibilidade, antecedência, entrega e valores serão confirmados pela equipe.</p>
      </form>
    </div>
  </section>;
}
