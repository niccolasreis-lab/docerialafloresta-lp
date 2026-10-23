# Evolução da vitrine e consulta de encomendas

## Experiência entregue

O visitante pode pesquisar em todas as sete categorias, ampliar um produto, consultar disponibilidade e organizar uma encomenda antes de continuar no WhatsApp. O site prepara a mensagem, mas não a envia nem confirma a encomenda.

- Abertura com chamada para o cardápio, foto identificada e acesso ao WhatsApp e iFood.
- Entrada das seções com deslocamento discreto; abertura em sequência e transição entre categorias. Conteúdo visível no HTML inicial e preferência de movimento reduzido respeitada.
- Seção repetida de cartões de encomendas substituída pelo formulário.
- Etiqueta interna de rascunho removida; marca da seção Sobre corrigida para “Mais de 20 anos de tradição”.
- Diálogos nativos com fechamento por Escape, botão, fundo e retorno de foco ao acionador.
- Busca sem acentos, resultados por categoria e chaves distintas para produtos presentes em mais de uma categoria.
- Dúvidas frequentes sem prometer prazos, preços ou condições não confirmadas.
- Status de funcionamento a partir dos horários cadastrados, incluindo virada da meia-noite.
- Imagem social 1200 × 630 com logo original e foto existente. URL padrão dos metadados aponta para a produção conhecida.

## Validação

- TypeScript: aprovado.
- Compilação de produção: aprovada.
- Auditoria de descrições: aprovada.
- Auditoria de imagens: aprovada (142 entradas, 128 produtos únicos, 7 categorias).
- Cinco testes de regras: aprovados; cobrem fuso/data, mensagem de consulta, limites dos horários, pesquisa global e identificação por categoria.
- Imagem de compartilhamento: inspecionada visualmente.
- Revisão React: eventos e efeitos limitados aos componentes interativos, busca derivada, chaves estáveis, rótulos nos campos e diálogo nativo.
- QA de navegador: não executado. O supervisor de prévia injeta `--host` e `--strictPort`, incompatíveis com `next dev`; encerra antes de servir a página. Código de aplicação não foi alterado para contornar essa limitação do ambiente.
- Não foi enviada mensagem de teste à loja nem realizado pedido real.

## Conteúdo ainda necessário

Avaliações reais autorizadas, fotos da loja/equipe, novas fotografias dos itens atualmente ilustrados e campanhas aprovadas pela loja. Não foram inventados depoimentos, promoções, ingredientes adicionais ou condições comerciais. Originais de imagens foram preservados.
