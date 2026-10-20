# Plano de QA — Aprimoramento de imagens e cardápio

## Objetivo

Validar, sem alterar o código de produto, o tratamento das imagens, conteúdo dos cards, fallback sem imagem, busca e abas, links de consulta pelo WhatsApp, estabilidade do console, LCP e responsividade nos viewports de **375px**, **768px** e **1280px**.

## Regra de aceite

A entrega somente será aprovada quando:

1. Todos os gates obrigatórios e casos de prioridade crítica/alta passarem.
2. Não houver erro de console, exceção de página, falha de hidratação, recurso local 4xx/5xx ou link `wa.me` inválido.
3. Nenhum viewport apresentar rolagem horizontal da página, corte de conteúdo, sobreposição, controle inacessível ou layout quebrado.
4. O LCP mobile medido em ambiente de produção local atender ao limite definido neste plano.
5. Cada falha possuir evidência reproduzível, severidade e correção recomendada.

## Ambiente e preparação

- Validar um hash Git explícito e registrar o hash completo no relatório de execução.
- Instalação limpa conforme o lockfile: `npm ci` (ou `npm install` quando solicitado pelo gate da rodada).
- Executar a aplicação compilada, não apenas o servidor de desenvolvimento:
  - `npm run build`
  - `npm run start`
- Usar navegador Chromium controlado pelo Playwright, com cache/contexto novo por cenário.
- Viewports obrigatórios:
  - Mobile: `375 × 812`
  - Tablet: `768 × 1024`
  - Desktop: `1280 × 800`
- Executar os testes sem extensões de navegador e sem throttling para regressão funcional.
- Executar a medição de desempenho separadamente com perfil mobile consistente.

## Gates automatizáveis

| ID | Verificação | Automação sugerida | Critério de aprovação |
|---|---|---|---|
| G-01 | Instalação reproduzível | `npm ci` | Código 0; lockfile não alterado. |
| G-02 | Lint | `npm run lint` | Código 0; nenhum erro. |
| G-03 | Tipos | `npm run typecheck` | Código 0; nenhum erro. |
| G-04 | Build de produção | `npm run build` | Código 0; sem erro de compilação, tipo ou prerender. |
| G-05 | Auditoria de produção | `npm audit --omit=dev` | 0 vulnerabilidades conhecidas. |
| G-06 | Servidor de produção | `npm run start` + requisição HTTP | Página inicial responde 200 e carrega completamente. |
| G-07 | Testes de interface | Playwright/Chromium | 100% dos casos críticos e altos passam nos três viewports. |
| G-08 | Console e rede | Listeners Playwright | 0 erros de console, `pageerror`, request failures ou respostas locais 4xx/5xx. |
| G-09 | LCP | Lighthouse CLI ou Web Vitals via Playwright/CDP | LCP ≤ 2,5 s no perfil mobile definido; mediana de 3 execuções. |

## Matriz de validação funcional

### 1. Imagens tratadas

| ID | Prioridade | Cenário | Procedimento / verificação automatizável | Aprovação |
|---|---|---|---|---|
| IMG-01 | Crítica | Todas as imagens cadastradas carregam | Para cada `img` visível, verificar `complete === true` e `naturalWidth > 0`; monitorar respostas das URLs de `/images/`. | Nenhuma imagem quebrada; HTTP 200 para recursos locais. |
| IMG-02 | Alta | Relação imagem/produto correta | Comparar nome do card, `alt` e arquivo esperado no mapeamento do cardápio. | Imagem corresponde ao produto; sem troca entre itens. |
| IMG-03 | Alta | Texto alternativo | Inspecionar todas as imagens dos produtos. | `alt` não vazio, objetivo e coerente com o nome; decorativas usam `alt=""` somente quando justificável. |
| IMG-04 | Alta | Tratamento visual | Captura nos três viewports; inspecionar `object-fit`, contêiner e bordas. | Sem distorção, achatamento, corte indevido de elemento principal, vazamento ou mudança brusca de proporção. |
| IMG-05 | Alta | Otimização Next Image | Inspecionar DOM e rede. | Imagens do produto usam `next/image`; dimensões/sizes adequados; imagens não críticas não são carregadas com prioridade. |
| IMG-06 | Média | Hero/LCP | Confirmar que a imagem principal está priorizada e não usa lazy loading. | Imagem LCP inicia cedo, não sofre troca tardia e não gera CLS perceptível. |
| IMG-07 | Média | Nitidez por densidade | Capturas em DPR padrão/alto quando disponível. | Sem pixelização evidente nas dimensões efetivamente exibidas. |
| IMG-08 | Alta | Estabilidade de layout | Medir deslocamentos e observar carregamento. | Contêiner reserva espaço antes da imagem; CLS da página dentro do limite Lighthouse (≤ 0,1). |

### 2. Descrições dos produtos

| ID | Prioridade | Cenário | Procedimento / verificação automatizável | Aprovação |
|---|---|---|---|---|
| TXT-01 | Crítica | Descrições confirmadas | Comparar os cinco bolos com descrição no briefing e em `data/menu.ts`. | Texto preserva ingredientes e sentido do briefing, sem informação inventada. |
| TXT-02 | Alta | Produto sem descrição oficial | Inspecionar cards de itens sem descrição. | Usa fallback editorial neutro previamente aprovado; não inventa sabor, ingrediente, preço ou disponibilidade. |
| TXT-03 | Alta | Ausência de preço | Buscar padrões monetários (`R$`, valores com moeda) no conteúdo renderizado. | Nenhum preço publicado; indicação “sob consulta” permanece coerente. |
| TXT-04 | Média | Legibilidade e truncamento | Capturas e medição de overflow nos três viewports. | Texto não é cortado de modo que altere o significado; card se adapta ao conteúdo. |
| TXT-05 | Média | Acentuação e caracteres | Verificar itens com acentos e símbolos, como “Açaí”, “Limão”, “H2OH!”. | Sem caracteres corrompidos; busca sem acento continua funcional. |

### 3. Fallback sem imagem

| ID | Prioridade | Cenário | Procedimento / verificação automatizável | Aprovação |
|---|---|---|---|---|
| FB-01 | Crítica | `image: null` | Abrir categoria com produtos sem imagem e inspecionar o card. | Exibe fallback da marca; nunca imagem quebrada, bloco vazio ou área azul genérica. |
| FB-02 | Alta | Sem requisição inválida | Monitorar rede ao renderizar item sem imagem. | Nenhuma requisição para `null`, `undefined`, string vazia ou caminho inexistente. |
| FB-03 | Alta | Acessibilidade do fallback | Inspecionar árvore acessível/DOM. | Fallback comunica o produto adequadamente sem duplicação excessiva para leitor de tela. |
| FB-04 | Alta | Consistência dimensional | Comparar cards com e sem foto nos três viewports. | Mesmo espaço visual básico, sem colapso do card ou desalinhamento da grade. |
| FB-05 | Média | Troca de aba com fallbacks | Alternar repetidamente entre categorias. | Fallbacks renderizam sem flash de imagem anterior, warning de chave ou erro de hidratação. |

### 4. Abas e busca/filtro

| ID | Prioridade | Cenário | Procedimento / verificação automatizável | Aprovação |
|---|---|---|---|---|
| NAV-01 | Crítica | Categoria inicial | Abrir página nova. | “Bolos” selecionada; conteúdo e `aria-selected` correspondem à aba ativa. |
| NAV-02 | Crítica | Todas as abas | Clicar em cada categoria e conferir ao menos primeiro/último item esperado. | Conteúdo corresponde exclusivamente à categoria selecionada. |
| NAV-03 | Alta | Reset da busca na troca de aba | Digitar busca e mudar a aba. | Campo é limpo e todos os itens da nova categoria aparecem. |
| NAV-04 | Crítica | Busca por nome | Buscar termo completo e parcial. | Somente itens correspondentes da categoria ativa são exibidos. |
| NAV-05 | Alta | Busca por descrição | Buscar ingrediente existente em descrição. | Retorna todos e somente os itens correspondentes da categoria ativa. |
| NAV-06 | Alta | Busca sem acento e case-insensitive | Exemplos: `acai`, `limao`, caixa mista. | Resultados equivalem às formas acentuadas/capitalizadas. |
| NAV-07 | Alta | Espaços laterais | Pesquisar com espaços antes/depois. | Espaços são ignorados sem alterar os resultados. |
| NAV-08 | Crítica | Estado vazio | Buscar termo inexistente. | Grade some; mensagem inclui termo e categoria; botão “Limpar busca” fica acessível. |
| NAV-09 | Crítica | Limpar estado vazio | Acionar “Limpar busca”. | Campo esvazia e lista completa da categoria retorna. |
| NAV-10 | Alta | Teclado nas abas | Testar Tab e ativação por Enter/Espaço; avaliar setas conforme padrão ARIA adotado. | Todos os controles alcançáveis, foco visível e estado anunciado corretamente; nenhuma armadilha de teclado. |
| NAV-11 | Alta | Rolagem de abas mobile | Em 375 e 768, acessar primeira e última categoria. | Rolagem horizontal fica restrita ao conjunto de abas; página não ganha overflow horizontal. |
| NAV-12 | Média | Digitação rápida | Inserir e apagar termo rapidamente. | Sem atraso grave, cards duplicados, estado obsoleto ou erro de console. |
| NAV-13 | Alta | Associação ARIA | Inspecionar `tablist`, `tab`, `tabpanel`, IDs e `aria-labelledby`. | IDs únicos e relações válidas; painel referencia a aba ativa. |

### 5. Links WhatsApp

| ID | Prioridade | Cenário | Procedimento / verificação automatizável | Aprovação |
|---|---|---|---|---|
| WA-01 | Crítica | Número correto | Coletar todos os links com `href^="https://wa.me/"`. | Todos usam exclusivamente `https://wa.me/5511948094770`. |
| WA-02 | Crítica | Mensagem por item | Para cada card, analisar URL e `searchParams.get("text")`. | Mensagem decodificada é exatamente `Olá! Gostaria de consultar o item: {nome}`. |
| WA-03 | Crítica | URL encoding | Testar nomes com acentos, espaços, parênteses e pontuação. | URL é válida; caracteres especiais são codificados; uma única decodificação recupera a mensagem exata. |
| WA-04 | Alta | CTA associado ao card | Cruzar heading do card com mensagem do link. | Cada botão consulta o item do próprio card, sem nome trocado. |
| WA-05 | Alta | Segurança de nova aba | Inspecionar links externos. | `target="_blank"` acompanhado de `rel="noopener noreferrer"`. |
| WA-06 | Alta | Links gerais | Validar hero, header, orçamento e botão flutuante separadamente. | Número correto e mensagem adequada ao contexto; nenhum link vazio ou malformado. |
| WA-07 | Média | Acionamento | Interceptar popup/navegação sem enviar mensagem real. | Clique tenta abrir exatamente a URL validada e permanece acessível por teclado. |

### 6. Console, exceções e rede

Em cada viewport, registrar durante carregamento, troca de todas as abas, busca com e sem resultado, limpeza, abertura do menu mobile e cliques interceptados em links:

```ts
const consoleErrors: string[] = [];
const pageErrors: string[] = [];
const failedRequests: string[] = [];
const badResponses: string[] = [];

page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(error.message));
page.on("requestfailed", (request) => failedRequests.push(request.url()));
page.on("response", (response) => {
  if (response.url().startsWith(baseURL) && response.status() >= 400) {
    badResponses.push(`${response.status()} ${response.url()}`);
  }
});
```

**Critério de aprovação:** todos os arrays terminam vazios. Warnings relevantes de React/Next, hidratação, acessibilidade ou imagem também devem ser registrados e tratados como falha alta, ainda que não sejam `console.error`.

## Matriz de responsividade

Executar os casos abaixo em **375 × 812**, **768 × 1024** e **1280 × 800**.

| Área | Verificações | Critério de aprovação |
|---|---|---|
| Página inteira | `document.documentElement.scrollWidth <= clientWidth` | Sem overflow horizontal global. |
| Header | Logo, status, CTA e navegação/menu | Sem colisão, corte ou controle fora da tela. |
| Cardápio | Abas, busca, nota de porção e grade | Tudo alcançável; abas roláveis no mobile; busca ocupa espaço adequado. |
| Cards | Foto/fallback, badge, nome, descrição e CTA | Conteúdo não se sobrepõe; CTA permanece visível e clicável. |
| Estado vazio | Mensagem e botão | Centralizados/legíveis; botão não excede o viewport. |
| Botão flutuante | Posição e relação com conteúdo | Não encobre CTA, texto essencial ou controles. |
| Rodapé | Links e marca | Sem corte, sobreposição ou área clicável reduzida. |
| Zoom/texto | Zoom do navegador em 200% (amostra mobile e desktop) | Conteúdo permanece utilizável, sem perda de informação ou funcionalidade. |

### Asserções automatizáveis de geometria

- Para elementos visíveis críticos, validar que o `boundingBox` está dentro da largura do viewport.
- Validar que botões/links principais têm área clicável mínima aproximada de `44 × 44 px`, salvo links textuais em contexto.
- Detectar interseções indevidas entre botão flutuante e elementos focados/CTAs.
- Produzir screenshot full-page por viewport e screenshots específicas do cardápio, estado vazio e fallback.
- Usar comparação visual com tolerância baixa apenas após definir baselines aprovados; mascarar conteúdo inerentemente dinâmico.

## Plano de LCP e desempenho

### Método

1. Executar contra `npm run build && npm run start`.
2. Utilizar Lighthouse mobile com configuração consistente ou Chrome DevTools Protocol.
3. Fazer uma execução de aquecimento e depois **3 execuções válidas** em contexto limpo.
4. Registrar cada valor, a mediana e o elemento identificado como LCP.
5. Salvar relatório HTML/JSON como evidência da rodada, sem versionar artefatos grandes salvo decisão do projeto.

### Critérios

| Métrica | Aprovação | Observação |
|---|---|---|
| LCP mobile | Mediana ≤ 2,5 s | Nenhuma das 3 execuções deve exceder 4,0 s. |
| CLS | ≤ 0,1 | Imagens devem reservar espaço. |
| INP/TBT laboratorial | TBT ≤ 200 ms como proxy | Interações de abas e busca não podem travar. |
| Performance Lighthouse | > 90 | Conforme aceite do projeto. |

### Diagnóstico obrigatório em caso de falha

- Confirmar qual elemento é o LCP.
- Verificar prioridade/preload da imagem hero, tamanho transferido, formato, dimensões e `sizes`.
- Separar tempo de servidor, atraso de descoberta, download e atraso de renderização.
- Conferir fontes, scripts e animações que bloqueiem a pintura.
- Repetir a medição após qualquer correção em um novo hash.

## Cobertura automatizada recomendada

Criar ou ampliar testes Playwright somente quando autorizado, agrupados em:

1. `menu-tabs.spec.ts`: estado inicial, todas as abas, ARIA e rolagem.
2. `menu-search.spec.ts`: nome, descrição, acentos, espaços, estado vazio e limpeza.
3. `menu-images.spec.ts`: carregamento, `alt`, fallback e ausência de requisição inválida.
4. `whatsapp-links.spec.ts`: número, mensagem decodificada, encoding e segurança do link.
5. `responsive-console.spec.ts`: três viewports, overflow, console, `pageerror`, rede e screenshots.
6. `performance.spec.ts` ou script Lighthouse separado: LCP/CLS/TBT e relatório.

Os testes não devem navegar realmente para o WhatsApp, Instagram ou iFood; devem validar/interceptar a URL para evitar efeitos externos.

## Severidade dos achados

- **Crítica:** página não abre; build falha; ação envia ao número/item errado; exceção impede interação; vulnerabilidade crítica de produção.
- **Alta:** imagem quebrada; busca/aba/estado vazio não funciona; URL malformada; erro de console/hidratação; overflow ou controle inacessível; LCP acima de 4 s; regressão de acessibilidade essencial.
- **Média:** descrição truncada, tratamento visual inconsistente, warning relevante, área de toque pequena ou LCP entre 2,5 s e 4 s.
- **Baixa:** desvio cosmético sem perda funcional, sem impacto de leitura ou conversão.

## Evidências mínimas do relatório de execução

- Hash completo validado e indicação de working tree isolada/limpa.
- Versões de Node, npm e navegador.
- Comandos, códigos de saída e resumo das saídas.
- Resultado por caso da matriz e por viewport.
- URLs `wa.me` amostradas com valor decodificado.
- Contagem de erros/warnings de console, `pageerror`, falhas de rede e HTTP 4xx/5xx.
- Screenshots full-page e focadas nas áreas críticas.
- Três medições de LCP, mediana e elemento LCP.
- Achados por severidade, impacto, passos de reprodução e correção recomendada.
- Veredito final: **APROVADO**, **APROVADO COM RESSALVAS** ou **REPROVADO**.

## Critério final de aprovação

**APROVADO** somente com gates G-01 a G-09 aprovados, todos os casos críticos e altos passando nos três viewports, nenhum bloqueio aberto, zero erro de console/rede local e LCP mobile mediano de no máximo 2,5 segundos. Achados médios somente podem resultar em **APROVADO COM RESSALVAS** quando não afetarem funcionalidade, acessibilidade essencial, conteúdo confirmado ou conversão; qualquer achado crítico/alto resulta em **REPROVADO**.
