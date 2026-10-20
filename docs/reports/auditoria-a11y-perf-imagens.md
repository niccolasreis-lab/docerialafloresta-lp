# Auditoria A11y, Performance e Imagens — Doceria La Floresta

## 1. Visão Geral e Objetivo
Esta auditoria avalia a estratégia de imagens, o uso de `next/image`, atributos `alt`, dimensions (`fill` com aspect ratio), atributos `sizes`, gerenciamento de LCP/CLS e acessibilidade em dispositivos móveis e desktops (375px, 768px, 1280px) sem alteração direta de código.

---

## 2. Avaliação por Critério

### A. Estratégia de `next/image`, `sizes` e `priority` / `loading`
- **Uso de `next/image`:** O projeto utiliza corretamente o componente otimizado do Next.js através do wrapper modular `ProductPlaceholder` (`components/product-placeholder.tsx`).
- **Atributo `sizes`:** Está configurado consistentemente como `sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 28vw"`, permitindo que o Next.js sirva tamanhos responsivos adequados para viewports mobile (375px), tablets (768px) e desktops (1280px).
- **Priority e Loading:** O primeiro card da seção de destaque recebe `priority={true}`, resultando em carregamento `eager` para otimizar o LCP (Largest Contentful Paint). Todos os demais cards utilizam carregamento preguiçoso (`loading="lazy"`), economizando largura de banda inicial.

### B. Gestão de LCP e CLS (Cumulative Layout Shift)
- **LCP (Largest Contentful Paint):** A imagem principal do hero / primeiro card de destaque possui prioridade de carregamento, evitando atrasos no LCP mobile.
- **CLS (Cumulative Layout Shift):** O uso de `fill` combinado com a classe CSS `.product-placeholder` com `aspect-ratio` definido garante a reserva prévia de espaço no layout, prevenindo refluídos e deslocamentos de layout inesperados ao carregar as imagens.

### C. Peso e Otimização dos Arquivos de Imagem
- **Peso das fotos reais:** Os arquivos em `public/images/products/` variam entre ~33 KB e ~212 KB (ex.: `bolo-rigo.jpg` com 33 KB; `bolo-mil-folhas.jpg` com 212 KB).
- **Recomendação de Otimização:** Otimizar e comprimir imagens acima de 150 KB (como o `bolo-mil-folhas.jpg`) para formatos WebP/AVIF com compressão otimizada reduz o tempo de transferência em conexões móveis 4G/5G no Jaçanã.

### D. Textos Alternativos (`alt`) e Acessibilidade
- **Descrições:** Cada imagem possui texto alternativo descritivo (`Foto de {label}` ou `Placeholder temporário para foto de {label}`), permitindo leitura compreensível por leitores de tela.
- **Enquadramento Acessível:** Os cards mantêm contraste de texto adequado e botões de consulta claramente associados a cada produto.

---

## 3. Critérios Mensuráveis Propostos

1. **LCP Mobile:** < 2.0s em conexões 4G simuladas.
2. **CLS:** < 0.05 em todas as resoluções (375px, 768px, 1280px).
3. **Peso máximo por imagem de produto:** < 150 KB antes da compressão do Next/Image.
4. **Cobertura de alt:** 100% das imagens com textos descritivos úteis.

---

## 4. Recomendações e Correções Futuras
1. Manter a diretriz de `priority` estritamente no elemento LCP crítico.
2. Aplicar compressão adicional (TinyPNG ou Squoosh) nas imagens de produtos que superem 150 KB.
3. Garantir que novos itens do cardápio mantenham o padrão estruturado em `ProductPlaceholder`.
