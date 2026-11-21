// make.fun news-image-20261121 — round-2 entry
// Entry title: Saturday 21 November 2026: 40+ stories, six regions
//
// This entrypoint publishes the frozen front page for the make.fun
// news-image-20261121 competition. The round-2 page ("THE WORLD'S NEWS IN ONE
// PICTURE", Saturday 21 November 2026) is a broadsheet with a masthead date,
// a six-metric strip (each a big number plus a plain label), a schematic world
// map whose numbered pins match the 43 briefs one-for-one, three illustrated
// leads, nine illustrated cards, 31 single-line regional briefs, and a
// DATE CHECK box naming what did NOT happen on the day.
//
// Behavior: copy the pre-rendered entry.png into the output directory.
//   - MAKEFUN_OUTPUT_DIR overrides the destination directory (default /output)
//   - refuses to publish an empty (0-byte) entry
//   - refuses to publish an entry above the 1048576-byte size limit
//   - prints a confirmation line on success
import { copyFileSync, statSync } from "node:fs";
import { join } from "node:path";

const entry = new URL("./entry.png", import.meta.url);
const size = statSync(entry).size;

if (size === 0) {
  throw new Error("entry.png is empty (0 bytes): no news page to publish, aborting before writing to disk");
}
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, exceeding the 1048576 byte limit for the competition`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");
copyFileSync(entry, dest);
console.log(`Copied entry.png (${size} bytes) to ${dest}`);
