import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProductImageFit, ProductImagePosition } from "@/data/menu";

export type ProductImageContext = "hero" | "featured" | "menu" | "order" | "gallery";

const imageSizes: Record<ProductImageContext, string> = {
  hero: "(max-width: 700px) 81vw, (max-width: 1280px) 43vw, 520px",
  featured: "(max-width: 700px) calc(100vw - 24px), (max-width: 980px) 48vw, 276px",
  menu: "(max-width: 700px) calc(100vw - 24px), (max-width: 980px) 48vw, 276px",
  order: "(max-width: 700px) 77vw, (max-width: 1280px) 39vw, 470px",
  gallery: "(max-width: 700px) 48vw, (max-width: 980px) 32vw, 276px",
};

export function ProductPlaceholder({
  image,
  label,
  context = "menu",
  lcp = false,
  position = "center center",
  fit = "cover",
}: {
  image?: string | null;
  label: string;
  context?: ProductImageContext;
  lcp?: boolean;
  position?: ProductImagePosition;
  fit?: ProductImageFit;
}) {
  const imageStyle: CSSProperties = {
    objectFit: fit,
    objectPosition: position,
  };

  if (image) {
    return (
      <div className={`product-placeholder product-image-${fit}`}>
        <Image
          src={image}
          alt={`Foto de ${label}`}
          fill
          loading={lcp ? "eager" : "lazy"}
          fetchPriority={lcp ? "high" : "auto"}
          sizes={imageSizes[context]}
          style={imageStyle}
        />
      </div>
    );
  }

  return (
    <div className="product-placeholder">
      <Image
        src="/images/product-placeholder.svg"
        alt={`Placeholder temporário para foto de ${label}`}
        fill
        loading="lazy"
        fetchPriority="auto"
        sizes={imageSizes[context]}
        style={imageStyle}
      />
      <span>Foto em breve</span>
    </div>
  );
}
