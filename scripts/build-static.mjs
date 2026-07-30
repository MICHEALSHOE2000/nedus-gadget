import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "dist");
const excluded = new Set([
  ".git",
  ".github",
  ".vercel",
  "dist",
  "node_modules",
  "scripts",
  "package-lock.json",
  "package.json",
  "vercel.json",
]);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of await readdir(projectRoot, { withFileTypes: true })) {
  if (excluded.has(entry.name)) continue;
  await cp(
    path.join(projectRoot, entry.name),
    path.join(outputDir, entry.name),
    { recursive: true },
  );
}

console.log("Static website prepared in dist/");
