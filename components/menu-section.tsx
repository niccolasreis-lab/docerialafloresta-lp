"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { menuCategories } from "@/data/menu";
import type { MenuCategoryId } from "@/data/menu";
import { createMenuInquiryUrl } from "@/lib/whatsapp";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { findMenuItems } from "@/lib/menu-search";
import { ProductDetails } from "@/components/product-details";
import { ArrowIcon } from "@/components/icons";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("bolos");
  const [searchQuery, setSearchQuery] = useState("");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const currentCategory = menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];

  useEffect(() => {
    const selectCategoryFromHash = () => {
      const categoryId = window.location.hash.replace("#tab-", "") as MenuCategoryId;
      if (menuCategories.some((category) => category.id === categoryId)) {
        setActiveCategory(categoryId);
        setSearchQuery("");
      }
    };

    selectCategoryFromHash();
    window.addEventListener("hashchange", selectCategoryFromHash);
    return () => window.removeEventListener("hashchange", selectCategoryFromHash);
  }, []);

  const filteredItems = useMemo(() => findMenuItems(menuCategories, activeCategory, searchQuery), [activeCategory, searchQuery]);

  const selectCategory = (categoryId: MenuCategoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const lastIndex = menuCategories.length - 1;
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? lastIndex
        : (index + (event.key === "ArrowRight" ? 1 : -1) + menuCategories.length) % menuCategories.length;
    const nextCategory = menuCategories[nextIndex];
    selectCategory(nextCategory.id);
    tabRefs.current[nextCategory.id]?.focus();
    tabRefs.current[nextCategory.id]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="section menu-full-section" id="cardapio">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Cardápio completo</p>
            <h2>Explore o cardápio</h2>
          </div>
          <p>Navegue pelas categorias ou busque um item. Veja os detalhes e consulte disponibilidade pelo WhatsApp.</p>
        </div>

        <div className="menu-controls">
          <div className="menu-tabs-wrapper">
            <div className="menu-tabs" role="tablist" aria-label="Categorias de produtos">
              {menuCategories.map((category, index) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    ref={(element) => { tabRefs.current[category.id] = element; }}
                    type="button"
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-controls="menu-products"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`menu-tab ${isActive ? "active" : ""}`}
                    onClick={() => selectCategory(category.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span className="menu-tab-image" aria-hidden="true">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="96px"
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    <span>{category.name}</span>
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
              placeholder="Buscar em todo o cardápio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {!searchQuery.trim() && currentCategory.servingNote && (
          <p className="menu-serving-note">{currentCategory.servingNote}</p>
        )}

        <p className="menu-result-count" role="status">{filteredItems.length} {filteredItems.length === 1 ? "produto encontrado" : "produtos encontrados"}{searchQuery.trim() ? " em todo o cardápio" : ` em ${currentCategory.name}`}</p>
        {filteredItems.length === 0 ? (
          <div id="menu-products" className="menu-empty" role="region" aria-label="Resultados da busca">
            <p>Nenhum item encontrado para &ldquo;{searchQuery}&rdquo; no cardápio.</p>
            <button className="button button-outline" onClick={() => setSearchQuery("")}>Limpar busca</button>
          </div>
        ) : (
          <div
            id="menu-products"
            className="full-menu-grid menu-enter"
            key={`${activeCategory}-${searchQuery.trim() ? "search" : "browse"}`}
            role={searchQuery.trim() ? "region" : "tabpanel"}
            aria-label={searchQuery.trim() ? "Resultados em todo o cardápio" : undefined}
            aria-labelledby={searchQuery.trim() ? undefined : `tab-${activeCategory}`}
          >
            {filteredItems.map((item) => (
              <div className="product-card full-menu-card" key={`${item.categoryId}-${item.slug}`}>
                <ProductDetails item={item} servingNote={item.servingNote}>
                <ProductPlaceholder
                  image={item.image}
                  label={item.name}
                  context="menu"
                  position={item.imagePosition}
                  fit={item.imageFit}
                  kind={item.imageKind}
                />
                <span className="photo-details-label">Ver de perto ↗</span>
                </ProductDetails>
                <div className="product-copy">
                  {searchQuery.trim() && <span className="result-category">{item.categoryName}</span>}
                  {item.availabilityNote && <span className="availability-badge">{item.availabilityNote}</span>}
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <a
                    href={createMenuInquiryUrl(item.name)}
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar disponibilidade <ArrowIcon />
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
