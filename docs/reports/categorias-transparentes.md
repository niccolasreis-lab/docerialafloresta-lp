# Categorias com recortes transparentes

As sete capas da navegação usam PNG com canal alfa, exibido inteiro com `object-fit: contain`. O fundo circular é criado pelo CSS e não faz parte da imagem. Cards e fotos de produtos preservados.

## Arquivos

Pasta: `public/images/category-covers/cutouts/`.
Nomes: `bolos.png`, `doces.png`, `docinhos.png`, `tortas-doces.png`, `salgados.png`, `sorvetes-acai.png`, `bebidas.png`.
As capas anteriores continuam em `public/images/category-covers/`.

## Edição das imagens

Ferramenta nativa de geração/edição de imagens, modo background-extraction, uma edição por capa original, com transparência ativada. Prompt aplicado a cada categoria:

> Remover somente o fundo bege e a superfície. Preservar integralmente os mesmos produtos, sua quantidade, aparência, composição, cores, perspectiva e proporções, incluindo pratos, pedestal, tigelas, copos e xícara. Produzir recorte fotográfico com transparência alfa real, mantendo espaços transparentes entre os objetos. Não adicionar texto, círculos, bordas ou fundo quadriculado. Centralizar a composição completa com cerca de 10% de espaço transparente para uso no botão circular. Preservar apenas sombras de contato discretas, sem superfície opaca.

Os PNGs de uso na navegação são redimensionados para 384 × 384 e comprimidos com transparência preservada. O componente Next Image mantém a otimização de tamanho e cache.

## Acabamento

Fundo radial suave, borda dourada discreta, sombra leve do produto e contorno vinho mais fino na categoria ativa. Espaçamento superior preserva o contorno completo. Movimento reduzido segue as regras existentes do site.

## Verificação

A auditoria de imagens confere os sete caminhos, PNGs válidos e canal alfa com pixels transparentes e opacos. Build, TypeScript, ESLint, auditorias do catálogo e testes das regras de consulta são executados antes da publicação.
