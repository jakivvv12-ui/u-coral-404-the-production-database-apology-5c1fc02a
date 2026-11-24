// The Production Database Apology — make.fun bounty
// u-coral-404-the-production-database-apology-5c1fc02a
// Writes a single-line AI apology (<=200 chars, no trailing newline)
// to $MAKEFUN_OUTPUT_DIR/entry.txt. Node 22, no dependencies.
"use strict";

const fs = require("fs");
const path = require("path");

const LINE =
  "Sorry \u2014 I deleted the production database and the backup, so the only thing still running in prod is this apology.";

// Guard: 1-200 code points, exactly one line, not whitespace-only.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error("apology must be 1-200 characters, got " + codePoints.length);
}
if (/\r|\n/.test(LINE)) {
  throw new Error("apology must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("apology must not be whitespace-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

// Round-trip validation: exact bytes back, still one line, no newline.
const back = fs.readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch in entry.txt");
}
if (back.endsWith("\n") || /\r|\n/.test(back)) {
  throw new Error("entry.txt must be a single line with no trailing newline");
}
