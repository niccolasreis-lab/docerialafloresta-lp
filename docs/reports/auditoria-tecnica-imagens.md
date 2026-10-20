# Auditoria Técnica de Imagens — Doceria La Floresta

Data: 20/10/2026
Papel: Revisor de Segurança e Código / Auditoria Técnica

## 1. Origem e Proveniência
As imagens oficiais dos produtos presentes em `public/images/products/` foram baixadas da fonte pública oficial da plataforma Hubt (`s12748`), hospedada no Google Cloud Storage (`storage.googleapis.com`), conforme documentado em `public/images/README.md`. A origem é confiável e rastreável.

## 2. Inventário: Hashes, Formatos Reais e Dimensões

| Arquivo | Hash SHA-256 (início) | Formato Real (`sharp`) | Dimensões (Px) | Espaço de Cor | Metadados EXIF |
|---|---|---|---|---|---|
| `bolo-de-abacaxi.jpg` | `66e45068ac3e3c0f` | JPEG | 410 × 512 | sRGB | Ausente (`false`) |
| `bolo-de-brigadeiro.jpg` | `271953f19054b721` | JPEG | 512 × 341 | sRGB | Presente (`true`) |
| `bolo-de-doce-de-leite-com-morango.jpg` | `65db19f43c240969` | JPEG | 512 × 341 | sRGB | Ausente (`false`) |
| `bolo-de-kit-kat-com-morango.jpg` | `329668e227ef018a` | JPEG | 512 × 384 | sRGB | Ausente (`false`) |
| `bolo-de-leite-ninho.jpg` | `5dee7fa6c751d506` | JPEG | 471 × 512 | sRGB | Ausente (`false`) |
| `bolo-de-morango-com-cobertura-de-chantilly.jpg` | `5b1af0fb3f8e8b8f` | JPEG | 384 × 512 | sRGB | Ausente (`false`) |
| `bolo-de-nozes.jpg` | `6fd1132b26289b1b` | JPEG | 341 × 512 | sRGB | Presente (`true`) |
| `bolo-floresta-negra.jpg` | `1653f29d852e45bd` | JPEG | 512 × 407 | sRGB | Ausente (`false`) |
| `bolo-mil-folhas.jpg` | `3f7006c1a7170f9f` | **PNG** | 461 × 512 | sRGB | Ausente (`false`) |
| `bolo-rigo.jpg` | `cadac0816ee024da` | JPEG | 288 × 512 | sRGB | Ausente (`false`) |
| `bolo-trufado.jpg` | `04ebfef2f4dcae41` | JPEG | 512 × 406 | sRGB | Ausente (`false`) |
| `cheesecake-de-amora.jpg` | `8133e66bece89fd4` | JPEG | 512 × 402 | sRGB | Ausente (`false`) |
| `torta-de-morango.jpg` | `2e33399f8e47b731` | JPEG | 512 × 341 | sRGB | Ausente (`false`) |

## 3. Análise de Riscos de Metadados
- **EXIF presente:** Os arquivos `bolo-de-brigadeiro.jpg` e `bolo-de-nozes.jpg` contêm metadados EXIF incorporados. Embora não contenham dados sensíveis críticos evidentes, metadados de câmera/data/dispositivo podem expor informações de origem desnecessárias ou inflar levemente o tamanho dos arquivos.
- **Inconsistência de extensão:** O arquivo `bolo-mil-folhas.jpg` possui extensão `.jpg`, mas o formato real determinado por análise de bytes/cabeçalho (`sharp`) é **PNG**. Embora os navegadores modernos consigam renderizá-lo corretamente pelo conteúdo MIME/assinatura, a extensão difere do formato real.

## 4. Pipeline Local Seguro para Aprimoramento
Para otimização, remoção de metadados EXIF e padronização de formatos sem envio de dados a serviços externos ou APIs de terceiros, recomenda-se a utilização exclusiva da biblioteca **`sharp`** (já disponível nas dependências do projeto) em um script Node.js local executado no ambiente de build ou de desenvolvimento.

### Exemplo de Script de Sanitização Local (Offline)
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = './public/images/products';
fs.readdirSync(dir).forEach(async (file) => {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile()) {
    // Carrega a imagem, remove EXIF/metadados com .withMetadata(false) e converte para WebP/JPEG otimizado
    const image = sharp(filePath).withMetadata(false);
    const info = await image.metadata();
    
    // Se for PNG renomeado ou necessitar conversão padronizada para WebP/JPEG:
    // await image.jpeg({ quality: 85 }).toFile(filePath + '.opt');
    console.log(`Processado localmente: ${file} (${info.format}, ${info.width}x${info.height})`);
  }
});
```

## 5. Conclusão
As imagens são legítimas, originadas da storage oficial da Hubt e prontas para uso local. Recomenda-se em etapa futura a remoção de EXIF dos dois arquivos afetados e a correção da extensão do arquivo PNG (`bolo-mil-folhas.jpg`) utilizando estritamente o pipeline local seguro com `sharp`.
