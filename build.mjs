import { createHash, randomBytes } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { minify as minifyJS } from 'terser';
import CleanCSS from 'clean-css';
import { minify as minifyHTML } from 'html-minifier-terser';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'docs');

const NOTICE =
  '© 2023-2026 Daniel Muniz de Souza. Código proprietário. Este arquivo é protegido por direitos autorais: não é permitido reproduzir, copiar, modificar ou reutilizar qualquer parte sem autorização expressa do autor.';
const NOTICE_JS = `/* ${NOTICE} */`;
const NOTICE_CSS = `/* ${NOTICE} */`;
const NOTICE_HTML = `<!-- ${NOTICE} -->`;

function fingerprint() {
  return 'dmpwb-' + createHash('sha256')
    .update(randomBytes(16).toString('hex') + Date.now())
    .digest('hex')
    .slice(0, 12);
}

function kb(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

const fp = fingerprint();
const fpShort = fp.slice(6);
const stamp = new Date().toISOString();

console.log(`[build] fingerprint: ${fp}`);
console.log('----------------------------------------------');

const htmlSrc = await readFile(path.join(ROOT, 'index.html'), 'utf8');
const cssSrc = await readFile(path.join(SRC, 'style.css'), 'utf8');
const jsSrc = await readFile(path.join(SRC, 'i18n.js'), 'utf8');

const cssMin = new CleanCSS({ level: 2 }).minify(cssSrc);
if (cssMin.errors.length) {
  console.error('[build] ERRO no CSS:', cssMin.errors);
  process.exit(1);
}
const cssBuilt = NOTICE_CSS + '\n' + cssMin.styles + `:root{--wb:"${fp}"}`;

const jsMin = await minifyJS(jsSrc, { mangle: true, compress: true });
if (jsMin.error) {
  console.error('[build] ERRO no JS:', jsMin.error);
  process.exit(1);
}
const jsBuilt = NOTICE_JS + '\n' + `var __wb="${fp}";` + jsMin.code;

const htmlBuilt = await minifyHTML(htmlSrc, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeAttributeQuotes: true,
  sortAttributes: true,
  sortClassName: true,
  minifyCSS: true,
  minifyJS: true,
  decodeEntities: false
})
  .then((h) =>
    h
      .replace(/src\/style\.css\?v=\d+/, `style.min.css?v=${fpShort}`)
      .replace(/src\/i18n\.js\?v=\d+/, `i18n.min.js?v=${fpShort}`)
      .replace('<!DOCTYPE html>', `<!DOCTYPE html>\n${NOTICE_HTML}`)
      .replace('<head>', `<head>\n  <meta name="watermark" content="${fp}">`)
  )
  .catch((e) => {
    console.error('[build] ERRO no HTML:', e);
    process.exit(1);
  });

await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, 'index.html'), htmlBuilt);
await writeFile(path.join(OUT, 'style.min.css'), cssBuilt);
await writeFile(path.join(OUT, 'i18n.min.js'), jsBuilt);
await writeFile(path.join(OUT, '.nojekyll'), '');
await writeFile(
  path.join(OUT, 'build.json'),
  JSON.stringify({ fingerprint: fp, builtAt: stamp }, null, 2) + '\n'
);

console.log(`index.html      ${kb(htmlSrc.length)} -> ${kb(htmlBuilt.length)}  (${Math.round((htmlBuilt.length / htmlSrc.length) * 100)}%)`);
console.log(`style.css       ${kb(cssSrc.length)} -> ${kb(cssBuilt.length)}  (${Math.round((cssBuilt.length / cssSrc.length) * 100)}%)`);
console.log(`i18n.js         ${kb(jsSrc.length)} -> ${kb(jsBuilt.length)}  (${Math.round((jsBuilt.length / jsSrc.length) * 100)}%)`);
console.log('----------------------------------------------');
console.log(`[build] OK -> ${OUT}`);