# Revisão das imagens antigas

Foram inspecionadas as 46 imagens de produtos anteriores à etapa dos 82 recortes. Seleção editorial: renovar 12 imagens com balcões, vitrines, bandejas reflexivas, fundos escuros, luz desigual ou enquadramento pouco consistente; manter as outras 34, de fundo limpo e apresentação legível.

As 12 imagens foram geradas individualmente com a ferramenta de imagens, em modo de edição, usando a respectiva imagem antiga como referência. Direção: preservar a aparência e decoração do produto, melhorar luz e fundo, prato claro, produto inteiro, sem nomes, etiquetas ou outros textos. Uma solicitação retornou erro de serviço e foi refeita com sucesso (Cheesecake de Amora).

## Produtos renovados

Bolo Floresta Negra; Bolo de Nozes; Bolo de Brigadeiro; Bolo de Leite Ninho; Bolo Rigo; Bolo de Doce de Leite com Morango; Bolo de Abacaxi; Bolo Mil Folhas; Bolo Trufado; Bolo de Kit-Kat com Morango; Bolo de Morango com Cobertura de Chantilly; Cheesecake de Amora.

## Implementação

`data/refreshed-product-images.json` guarda nome, novo caminho, caminho anterior e hash da imagem gerada. As versões novas usam `/images/generated/refresh/*-v2.webp`, otimizadas em 1024 × 1024. Os arquivos anteriores permanecem preservados. O cadastro prioriza a versão renovada, incluindo produtos repetidos entre categorias. Referências diretas na abertura, encomendas, galeria e metadados também usam as novas versões. O enquadramento contém o produto inteiro; não há etiqueta visível nem menção a IA nos cards, conforme solicitado.

## Validação

Auditorias de imagens e descrições, TypeScript e build de produção aprovados. Inventário: 142 entradas, 128 produtos únicos, sendo 34 com as imagens mantidas, 82 com os recortes anteriores e 12 com as novas versões. Inspeção visual das 12 saídas. Não foram modificados preços, nomes, descrições, links de pedido ou o logotipo.

O arquivo de revisão entregue ao proprietário contém os motivos individuais, orientações de geração e as 34 imagens recomendadas para manter.
