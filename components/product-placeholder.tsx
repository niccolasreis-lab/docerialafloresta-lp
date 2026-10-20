import Image from "next/image";

export function ProductPlaceholder({
  image,
  label,
  priority = false,
}: {
  image?: string | null;
  label: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <div className="product-placeholder">
        <Image
          src={image}
          alt={`Foto de ${label}`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 28vw"
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
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 28vw"
      />
      <span>Foto em breve</span>
    </div>
  );
}
