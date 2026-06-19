import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntry = path.join(distDir, 'server', 'entry-server.js');
const template = await readFile(templatePath, 'utf8');
const { prerenderRoutes, render, getMeta } = await import(pathToFileURL(serverEntry).href);
const { generateAgentFiles } = await import(pathToFileURL(path.join(root, 'src', 'agentFiles.js')).href);

function withHeadMeta(html, meta) {
  let next = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);

  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${meta.description}" />`
  );

  const canonical = `<link rel="canonical" href="${meta.canonical}" />`;
  next = next.includes('rel="canonical"')
    ? next.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, canonical)
    : next.replace('</head>', `    ${canonical}\n  </head>`);

  return next;
}

for (const route of prerenderRoutes) {
  const appHtml = render(route);
  const meta = getMeta(route);
  const html = withHeadMeta(
    template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
    meta
  );
  const filePath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.slice(1), 'index.html');

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

const agentFiles = generateAgentFiles();
for (const [filename, content] of Object.entries(agentFiles)) {
  await writeFile(path.join(distDir, filename), content);
}

await rm(path.join(distDir, 'server'), { recursive: true, force: true });
