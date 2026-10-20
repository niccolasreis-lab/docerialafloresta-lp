import Image from "next/image";

export function ProductPlaceholder({ label, priority = false }: { label: string; priority?: boolean }) {
  return (
    <div className="product-placeholder">
      <Image
        src="/images/product-placeholder.svg"
        alt={`Placeholder temporário para foto de ${label}`}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 28vw"
      />
      <span>Foto em breve</span>
    </div>
  );
}
