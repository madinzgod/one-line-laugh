import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one funny line, a single sentence, well under the 200-character cap.
const LINE =
  "Adulthood is just saying 'next week will be less busy' every single week until you die.";

// The gate only judges a line of 1 to 200 characters, so refuse to write
// anything else: a loud failure here beats a silently invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Clear only the contents of the output directory, never the directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
