# Checklist de Aceitação — Doceria La Floresta

> **Regra de aceite:** cada item só será marcado ao apresentar evidência objetiva (arquivo:linha, saída de comando, relatório ou captura) no mesmo commit validado por todos os papéis.
>
> **Dado pendente obrigatoriamente visível:** horário de abertura **[CONFIRMAR horário de abertura]**. Nenhum dado de negócio pode ser inventado.

## Estrutura e manutenção
- [x] Projeto Next.js com App Router, TypeScript e Tailwind CSS inicia com `npm run dev`.
- [x] Dados editáveis e centralizados em `data/business.ts` e `data/menu.ts`.
- [x] Estrutura prevista: `app/` (rotas, layout e metadata), `components/` (seções/UI), `data/`, `public/images/`, `public/logo.png`, `docs/reports/` e testes de interface.
- [x] README explica como editar contatos, cardápio, cores e imagens.
- [x] Imagens ausentes usam placeholder explicitamente identificado e com linguagem visual da marca; nenhuma área azul vazia.

## Dados e conteúdo
- [x] Nome, complemento “Doces e Sorvetes”, slogan, endereço e CEP correspondem exatamente ao briefing.
- [x] WhatsApp usa `https://wa.me/5511948094770`; telefones fixos são (11) 2249-1380 e (11) 2243-0861.
- [x] Instagram usa `https://www.instagram.com/doceria.lafloresta`.
- [x] Link de iFood usa exatamente a URL completa confirmada no briefing.
- [x] Horário declara atendimento diário até 02:00 e exibe o placeholder visível do horário de abertura.
- [x] Não há preços publicados; a comunicação é “sob consulta”.
- [x] Texto “Sobre” é curto, acolhedor e identificado como rascunho para revisão do proprietário.
- [x] Todas as categorias e itens do cardápio do briefing estão presentes; descrições especificadas para os cinco bolos iniciais estão corretas.

## Interface, conversão e responsividade
- [ ] Header fixo inclui logo, âncoras Cardápio/Encomendas/Sobre/Contato, CTA WhatsApp, badge de status e menu hambúrguer funcional no mobile.
- [ ] Badge “Aberto agora” é calculado de forma honesta sem inventar o horário de abertura; o estado/placeholder deixa a pendência explícita.
- [ ] Hero contém título, slogan e CTAs de WhatsApp (primário) e iFood (secundário).
- [ ] Faixa de confiança contém os quatro diferenciais solicitados.
- [ ] Seção “Mais pedidos” traz exatamente Bolo Floresta Negra, Bolo de Brigadeiro, Torta de Morango e Cheesecake de Amora.
- [ ] Cardápio possui categorias em abas com rolagem horizontal no mobile e busca/filtro rápido.
- [ ] Cada item do cardápio mostra nome, descrição quando fornecida, imagem/placeholder e “Consultar”.
- [ ] “Consultar” abre WhatsApp com `Olá! Gostaria de consultar o item: {nome}` devidamente URL-encoded.
- [ ] Encomendas menciona bolos (~12 pessoas), mini salgados (30 un.) e tortas inteiras (8 ou 12 fatias), com CTA de orçamento.
- [ ] Seções Como pedir, Galeria (6–9 itens e link Instagram), Localização/Contato (incluindo mapa) e Rodapé estão presentes na ordem do briefing.
- [ ] Botão flutuante do WhatsApp permanece disponível em todas as telas.
- [ ] Em 375px, 768px e 1280px não há cortes, sobreposições nem navegação inacessível.
- [ ] A identidade usa carmim, creme quente, cacau e laranja-dourado; títulos serifados e corpo sans-serif; tom acolhedor e tradicional.

## Acessibilidade, SEO e desempenho
- [ ] Todas as imagens possuem `alt` útil (ou `alt=""` somente quando decorativas); uso de `next/image` e carregamento não crítico lazy.
- [ ] Contraste de texto e controles atende WCAG AA; foco de teclado é visível.
- [ ] Semântica inclui landmarks e hierarquia de headings válida.
- [ ] Animações são sutis e respeitam `prefers-reduced-motion`.
- [ ] Metadata, title/description, Open Graph e schema.org `Bakery`/`LocalBusiness` existem e contêm apenas dados confirmados ou placeholders explicitamente tratados.
- [ ] Lighthouse mobile é superior a 90, com relatório/saída anexada.

## Qualidade, segurança e gate
- [ ] Build, lint, checagem de tipos e testes automatizados passam.
- [ ] Testes cobrem âncoras, abas/filtros, URLs wa.me codificadas, menu mobile, badge de status e console limpo em 375/768/1280px.
- [ ] Sem segredos no repositório, `dangerouslySetInnerHTML` injustificado, dependências desnecessárias/vulneráveis ou montagem insegura de URL.
- [ ] Links externos abertos em nova aba usam `rel="noopener noreferrer"`.
- [ ] Cada etapa possui commit próprio e relatórios em `docs/reports/` para Conteúdo, UX, QA, A11y/SEO/Perf e Segurança/Código, todos com evidências.
- [ ] Todos os validadores aprovam o mesmo commit final.
- [ ] `docs/RELATORIO_FINAL.md` contém resumo, vereditos, pendências `[CONFIRMAR]`, comandos de execução e instruções de edição.

## Registro de evidências (preencher no gate final)
| Item/Grupo | Commit validado | Evidência | Situação |
|---|---|---|---|
| Estrutura e manutenção | — | — | Pendente |
| Dados e conteúdo | — | — | Pendente |
| Interface e conversão | — | — | Pendente |
| Acessibilidade, SEO e desempenho | — | — | Pendente |
| Qualidade, segurança e gate | — | — | Pendente |
