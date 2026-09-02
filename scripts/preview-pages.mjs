import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

if (!existsSync(outDir)) {
  console.error("Сначала выполните: npm run build");
  process.exit(1);
}

const previewRoot = path.join(root, ".pages-preview");
const siteDir = path.join(previewRoot, "University-");
rmSync(previewRoot, { recursive: true, force: true });
mkdirSync(siteDir, { recursive: true });
cpSync(outDir, siteDir, { recursive: true });

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".txt", "text/plain; charset=utf-8"],
  [".map", "application/json"],
]);

const port = Number(process.env.PORT || 4173);

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  let filePath = path.join(previewRoot, decodeURIComponent(url.pathname));
  if (!filePath.startsWith(previewRoot)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    if (statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch {
    // fall through to readFile
  }

  try {
    const body = readFileSync(filePath);
    res.writeHead(200, {
      "Content-Type": mime.get(path.extname(filePath)) || "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Preview: http://127.0.0.1:${port}/University-/`);
});
