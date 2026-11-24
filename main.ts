// Dad Joke Showdown — make.fun entry (program/v1, Node stdlib only).
//
// The program writes exactly one dad joke, at most 200 characters, to
// /output/entry.txt. The joke is a fixed, deterministic string: no network,
// no randomness, no environment input, no files read at run time.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I wanted to be a comedian, but my jokes were so bad the audience " +
  "started a support group. They call it Groan-ups Anonymous.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate self-check, mirroring the sealed scorer: UTF-8 text, 1-200 chars,
  // not only white space.
  const chars = [...JOKE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`joke is ${chars.length} characters, must be 1-200`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke is only white space");
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JOKE, "utf8");
  try {
    chmodSync(OUT_FILE, 0o644);
  } catch {
    // Leave the file as written; permissions are best-effort only.
  }
}

main();
