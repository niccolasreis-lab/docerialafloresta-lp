"use client";

import { useMemo, useState } from "react";
import { menuCategories } from "@/data/menu";
import type { MenuCategoryId } from "@/data/menu";
import { createMenuInquiryUrl } from "@/lib/whatsapp";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { ArrowIcon } from "@/components/icons";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("bolos");
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

    if (!normalizedQuery) return currentCategory.items;

    const normalize = (value: string) =>
      value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return currentCategory.items.filter(
      (item) =>
        normalize(item.name).includes(normalizedQuery) ||
        (item.description && normalize(item.description).includes(normalizedQuery)) ||
        (item.availabilityNote && normalize(item.availabilityNote).includes(normalizedQuery))
    );
  }, [currentCategory, searchQuery]);

  return (
    <section className="section menu-full-section" id="cardapio">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Cardápio completo</p>
            <h2>Explore todas as delícias</h2>
          </div>
          <p>Navegue pelas categorias ou busque pelo seu doce favorito. Clique em consultar para fazer seu pedido ou tirar dúvidas pelo WhatsApp.</p>
        </div>

        <div className="menu-controls">
          <div className="menu-tabs-wrapper">
            <div className="menu-tabs" role="tablist" aria-label="Categorias de produtos">
              {menuCategories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-controls="menu-products"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`menu-tab ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery("");
                    }}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="menu-search-wrapper">
            <label htmlFor="menu-search" className="sr-only">Buscar no cardápio</label>
            <input
              id="menu-search"
              type="search"
              className="menu-search-input"
              placeholder={`Buscar em ${currentCategory.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {currentCategory.servingNote && (
          <p className="menu-serving-note">{currentCategory.servingNote}</p>
        )}

        {filteredItems.length === 0 ? (
          <div className="menu-empty">
            <p>Nenhum item encontrado para &ldquo;{searchQuery}&rdquo; em {currentCategory.name}.</p>
            <button className="button button-outline" onClick={() => setSearchQuery("")}>Limpar busca</button>
          </div>
        ) : (
          <div
            id="menu-products"
            className="full-menu-grid"
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
            aria-live="polite"
          >
            {filteredItems.map((item) => (
              <div className="product-card full-menu-card" key={item.slug}>
                <ProductPlaceholder
                  image={item.image}
                  label={item.name}
                  context="menu"
                  position={item.imagePosition}
                  fit={item.imageFit}
                />
                <div className="product-copy">
                  {item.availabilityNote && <span className="availability-badge">{item.availabilityNote}</span>}
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <a
                    href={createMenuInquiryUrl(item.name)}
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar <ArrowIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
