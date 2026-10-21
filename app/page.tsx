import Image from "next/image";
import { business } from "@/data/business";
import { menuCategories } from "@/data/menu";
import { createMenuInquiryUrl, createWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowIcon, ClockIcon, InstagramIcon, LocationIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { BusinessStatusBadge } from "@/components/business-status";
import { MobileNavigation } from "@/components/mobile-navigation";
import { MotionReveal } from "@/components/motion-reveal";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { MenuSection } from "@/components/menu-section";

const whatsappUrl = createWhatsAppUrl("Olá! Gostaria de fazer um pedido na Doceria La Floresta.");
const quoteUrl = createWhatsAppUrl("Olá! Gostaria de pedir um orçamento para encomenda.");
const mapUrl = "https://www.google.com/maps?q=Avenida%20Guapira%2C%201650%20-%20Ja%C3%A7an%C3%A3%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002265-002&output=embed";
const mapDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Avenida%20Guapira%2C%201650%20-%20Ja%C3%A7an%C3%A3%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002265-002";

// Find featured items from menuCategories
const bolosCategory = menuCategories.find((c) => c.id === "bolos")?.items || [];
const tortasCategory = menuCategories.find((c) => c.id === "tortas-doces")?.items || [];

const featuredItems = [
  bolosCategory.find((item) => item.slug === "bolo-floresta-negra"),
  bolosCategory.find((item) => item.slug === "bolo-de-brigadeiro"),
  tortasCategory.find((item) => item.slug === "torta-de-morango"),
  tortasCategory.find((item) => item.slug === "cheesecake-de-amora"),
].filter((item) => item !== undefined);

const trustItems = ["+20 anos de tradição", "Bolos, doces, salgados e sorvetes", "Aberto todos os dias", "Delivery pelo iFood"];

type ExternalLinkProps = { href: string; className: string; children: React.ReactNode; label?: string };
function ExternalLink({ href, className, children, label }: ExternalLinkProps) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#inicio" className="brand" aria-label="Doceria La Floresta — início">
            <Image src="/logo-lafloresta-oficial.webp" alt="" width={512} height={512} sizes="(max-width: 700px) 54px, 67px" />
            <small className="brand-descriptor">{business.descriptor}</small>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#cardapio">Cardápio</a><a href="#encomendas">Encomendas</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a>
          </nav>
          <div className="header-actions">
            <BusinessStatusBadge />
            <ExternalLink href={whatsappUrl} className="button button-primary header-cta"><WhatsAppIcon /> Pedir agora</ExternalLink>
            <MobileNavigation />
          </div>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-decoration hero-decoration-one" aria-hidden="true" /><div className="hero-decoration hero-decoration-two" aria-hidden="true" />
          <div className="container hero-grid">
            <MotionReveal className="hero-copy">
              <p className="eyebrow">Tradição que adoça o Jaçanã</p>
              <h1>Doceria<br /><em>La Floresta</em></h1>
              <p className="hero-text">{business.slogan}. Um cardápio completo para deixar cada encontro ainda mais especial.</p>
              <div className="button-row">
                <ExternalLink href={whatsappUrl} className="button button-primary"><WhatsAppIcon /> Pedir pelo WhatsApp</ExternalLink>
                <ExternalLink href={business.social.ifood} className="button button-outline">Pedir no iFood <ArrowIcon /></ExternalLink>
              </div>
              <p className="consult-note">Disponibilidade e valores sob consulta.</p>
            </MotionReveal>
            <MotionReveal className="hero-visual">
              <ProductPlaceholder
                image="/images/products/bolo-floresta-negra.webp"
                label="Bolo Floresta Negra da Doceria La Floresta"
                context="hero"
                lcp
                position="center center"
              />
              <div className="hero-seal"><strong>+20</strong><span>anos de<br />tradição</span></div>
            </MotionReveal>
          </div>
        </section>

        <section className="trust-strip" aria-label="Diferenciais"><div className="container trust-grid">
          {trustItems.map((item, index) => <div key={item} className="trust-item"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}
        </div></section>

        <section className="section" id="destaques"><div className="container">
          <MotionReveal className="section-heading split-heading"><div><p className="eyebrow">Favoritos da casa</p><h2>Os mais pedidos</h2></div><p>Confira quatro opções em destaque e veja o cardápio completo logo abaixo.</p></MotionReveal>
          <div className="featured-grid">{featuredItems.map((item, index) => (
            <MotionReveal className="product-card" key={item.name}>
              <ProductPlaceholder
                image={item.image}
                label={item.name}
                context="featured"
                position={item.imagePosition}
                fit={item.imageFit}
              />
              <div className="product-copy">
                <span className="card-number">0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <ExternalLink href={createMenuInquiryUrl(item.name)} className="text-link">Consultar <ArrowIcon /></ExternalLink>
              </div>
            </MotionReveal>
          ))}</div>
        </div></section>

        <MenuSection />

        <section className="section order-section" id="encomendas"><div className="container order-grid">
          <MotionReveal className="order-visual"><ProductPlaceholder image="/images/products/bolo-de-nozes.webp" label="Bolo de Nozes para encomendas" context="order" position="center 45%" /></MotionReveal>
          <MotionReveal className="order-copy"><p className="eyebrow light">Celebre com a gente</p><h2>Encomendas para momentos especiais</h2><p>Para aniversários, encontros e eventos, preparamos opções tradicionais sob consulta.</p>
            <ul className="order-list"><li><strong>Bolos inteiros</strong><span>Servem aproximadamente 12 pessoas</span></li><li><strong>Mini salgados</strong><span>Porções com 30 unidades</span></li><li><strong>Tortas inteiras</strong><span>Opções de 8 ou 12 fatias</span></li></ul>
            <ExternalLink href={quoteUrl} className="button button-cream"><WhatsAppIcon /> Pedir orçamento</ExternalLink>
          </MotionReveal>
        </div></section>

        <section className="section about-section" id="sobre"><div className="container about-grid">
          <MotionReveal className="about-mark"><span>Desde</span><strong>+20</strong><span>anos</span></MotionReveal>
          <MotionReveal className="about-copy"><p className="eyebrow">Nossa história</p><h2>Uma doceria de bairro, feita com carinho</h2><span className="draft-label">Rascunho — revisar com o proprietário</span><p>Há mais de 20 anos, a Doceria La Floresta faz parte do dia a dia do Jaçanã, reunindo tradição, receitas queridas e atendimento acolhedor.</p><p>Dos bolos aos salgados e sorvetes, cada escolha ajuda a transformar uma pausa comum em um momento especial.</p></MotionReveal>
        </div></section>

        <section className="section how-section" id="como-pedir"><div className="container">
          <MotionReveal className="section-heading centered"><p className="eyebrow">Simples e rápido</p><h2>Como pedir</h2></MotionReveal>
          <div className="steps-grid">{[["01","Escolha o item","Veja os favoritos da casa e escolha o que combina com o seu momento."],["02","Chame a gente","Fale pelo WhatsApp ou faça seu pedido pelo iFood."],["03","Receba ou retire","Combine os detalhes do pedido diretamente com a equipe."]].map(([number,title,text]) => <MotionReveal className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></MotionReveal>)}</div>
        </div></section>

        <section className="section gallery-section" id="galeria"><div className="container">
          <MotionReveal className="section-heading split-heading"><div><p className="eyebrow">Conheça nossos produtos</p><h2>Um pouco da La Floresta</h2></div><ExternalLink href={business.social.instagram} className="button button-outline"><InstagramIcon /> Seguir @doceria.lafloresta</ExternalLink></MotionReveal>
          <div className="gallery-grid">
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-1" label="Ver o Instagram da Doceria La Floresta — foto 1">
              <ProductPlaceholder image="/images/products/bolo-rigo.webp" label="Bolo Rigo" context="gallery" position="center center" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-2" label="Ver o Instagram da Doceria La Floresta — foto 2">
              <ProductPlaceholder image="/images/products/bolo-de-leite-ninho.webp" label="Bolo de Leite Ninho" context="gallery" position="center 50%" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-3" label="Ver o Instagram da Doceria La Floresta — foto 3">
              <ProductPlaceholder image="/images/products/bolo-de-abacaxi.webp" label="Bolo de Abacaxi" context="gallery" position="52% center" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-4" label="Ver o Instagram da Doceria La Floresta — foto 4">
              <ProductPlaceholder image="/images/products/bolo-de-kit-kat-com-morango.webp" label="Bolo de Kit-Kat com Morango" context="gallery" position="center center" fit="contain" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-5" label="Ver o Instagram da Doceria La Floresta — foto 5">
              <ProductPlaceholder image="/images/products/bolo-mil-folhas.webp" label="Bolo Mil Folhas" context="gallery" position="center center" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-6" label="Ver o Instagram da Doceria La Floresta — foto 6">
              <ProductPlaceholder image="/images/products/bolo-trufado.webp" label="Bolo Trufado" context="gallery" position="center 50%" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-7" label="Ver o Instagram da Doceria La Floresta — foto 7">
              <ProductPlaceholder image="/images/products/bolo-de-morango-com-cobertura-de-chantilly.webp" label="Bolo de Morango com Chantilly" context="gallery" position="center center" />
            </ExternalLink>
            <ExternalLink href={business.social.instagram} className="gallery-item gallery-item-8" label="Ver o Instagram da Doceria La Floresta — foto 8">
              <ProductPlaceholder image="/images/products/bolo-de-doce-de-leite-com-morango.webp" label="Bolo de Doce de Leite com Morango" context="gallery" position="center 48%" />
            </ExternalLink>
          </div>
        </div></section>

        <section className="section contact-section" id="contato"><div className="container contact-grid">
          <MotionReveal className="contact-copy"><p className="eyebrow">Venha nos visitar</p><h2>Estamos no Jaçanã</h2>
            <div className="contact-list"><div><LocationIcon /><p><strong>Endereço</strong>{business.address.street}<br />{business.address.neighborhood}, {business.address.city} - {business.address.state}<br />CEP {business.address.postalCode}</p></div><div><ClockIcon /><p><strong>Horário</strong>{business.hours.summary}</p></div><div><PhoneIcon /><p><strong>Telefones</strong>{business.phones.map((phone) => <span key={phone}>{phone}</span>)}<span>WhatsApp: {business.whatsapp.display}</span></p></div></div>
            <div className="contact-actions"><ExternalLink href={whatsappUrl} className="button button-primary"><WhatsAppIcon /> WhatsApp</ExternalLink><ExternalLink href={business.social.ifood} className="button button-outline">iFood</ExternalLink><ExternalLink href={business.social.instagram} className="button button-outline"><InstagramIcon /> Instagram</ExternalLink></div>
          </MotionReveal>
          <MotionReveal className="map-card"><iframe title="Mapa da Doceria La Floresta na Avenida Guapira, 1650" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><ExternalLink href={mapDirectionsUrl} className="map-link"><LocationIcon /> Abrir rota no Google Maps <ArrowIcon /></ExternalLink></MotionReveal>
        </div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><Image src="/logo-lafloresta-oficial.webp" alt="Logo da Doceria La Floresta" width={512} height={512} sizes="83px" /></div><nav aria-label="Navegação do rodapé"><a href="#cardapio">Cardápio</a><a href="#encomendas">Encomendas</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav><div className="footer-social"><ExternalLink href={business.social.instagram} className="icon-link" label="Instagram da Doceria La Floresta"><InstagramIcon /></ExternalLink><ExternalLink href={whatsappUrl} className="icon-link" label="WhatsApp da Doceria La Floresta"><WhatsAppIcon /></ExternalLink></div></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Doceria La Floresta. Todos os direitos reservados.</p><p>Feito com carinho no Jaçanã.</p></div></footer>
      <ExternalLink href={whatsappUrl} className="whatsapp-float" label="Pedir pelo WhatsApp"><WhatsAppIcon /><span>Peça pelo WhatsApp</span></ExternalLink>
    </>
  );
}
