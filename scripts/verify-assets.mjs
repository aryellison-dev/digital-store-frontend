import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const srcDir = new URL('../src/', import.meta.url);
const assetsDir = new URL('../public/assets/', import.meta.url);
const files = new Set(readdirSync(assetsDir));
const missing = new Set();

function inspect(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) inspect(path);
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      const source = readFileSync(path, 'utf8');
      for (const [, asset] of source.matchAll(/\/assets\/([a-zA-Z\d._-]+)/g)) {
        if (!files.has(asset)) missing.add(asset);
      }
    }
  }
}

if (!existsSync(assetsDir)) {
  console.error('Diretório de assets não encontrado.');
  process.exit(1);
}
inspect(srcDir.pathname);
for (const prefix of ['product-thumb-', 'produc-image-', 'home-slide-', 'collection-']) {
  if (![...files].some(file => file.startsWith(prefix))) missing.add(`${prefix}*`);
}
if (missing.size) {
  console.error(`Assets não encontrados: ${[...missing].join(', ')}`);
  process.exit(1);
}
console.log(`✓ ${files.size} assets locais disponíveis; referências literais verificadas.`);
