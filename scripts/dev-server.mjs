/** Dependency-free local preview server for VS Code (Node.js 18+). */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number.parseInt(process.env.PORT || '5173', 10);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }
  try {
    const url = new URL(req.url, `http://localhost:${port}`);
    const decoded = decodeURIComponent(url.pathname);
    const filePath = resolve(root, '.' + (decoded === '/' ? '/index.html' : decoded));
    const rel = relative(root, filePath);
    if (rel.startsWith('..' + sep) || rel === '..' || isAbsolute(rel) ||
        rel.split(sep).some(part => part.startsWith('.')) ||
        ['package.json', 'pnpm-lock.yaml'].includes(rel) ||
        rel.startsWith('scripts' + sep) || rel.startsWith('extras' + sep)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    const details = await stat(filePath);
    if (!details.isFile()) throw new Error('Not a file');
    const bytes = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': types[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "frame-ancestors 'none'",
    });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('File not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\nMinecraft portfolio is running at http://localhost:${port}\n`);
  console.log('Press Ctrl+C to stop. Edit files in VS Code and refresh the browser.\n');
});
