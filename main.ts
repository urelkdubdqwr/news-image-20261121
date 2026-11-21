// make.fun news-image-20261121
// Entry title: Saturday 21 November 2026: 30 stories, six regions
import { copyFileSync, statSync } from "node:fs";
import { join } from "node:path";
const entry = new URL("./entry.png", import.meta.url);
const size = statSync(entry).size;
if (size === 0) throw new Error("entry.png is empty (0 bytes), refusing to publish a blank entry");
if (size > 1048576) throw new Error(`entry.png is ${size} bytes, exceeding the 1048576 byte size limit`);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");
copyFileSync(entry, dest);
console.log(`Copied entry.png (${size} bytes) to ${dest}`);
