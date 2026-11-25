// One-Line Robot Wedding Vows — make.fun entry (program/v1)
//
// Writes a single line of wedding vows for a robot couple to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The gate allows 1 to 160 characters of UTF-8 text, not only whitespace.
//
// Candidates drafted against the judge brief (a real vow with a promise
// in it, machine detail that is specific — sensors, firmware, batteries,
// modes — and a turn that pays off in the last few words):
//  1. "I vow to love you through every update, low battery, and forced
//      restart, and to never, ever read your search history."
//      — warm, but "search history" is a human habit, not a robot one.
//  2. "I promise to charge beside you nightly, back you up before every
//      update, and swear your snoring is just the cooling fan."
//      — cosy image, yet the ending is a shrug rather than a turn.
//  3. "I vow to share my last 1% battery and my only charging port, but
//      my Wi-Fi password is where I draw the line."
//      — gets a grin, but it is a gag about limits, not a commitment.
//  4. CHOSEN: keeps the real wedding cadence — "in sickness and in
//      health" rebuilt from safe mode, low battery and airplane mode —
//      and saves the laugh for the very end, where "a newer model"
//      means both a shinier robot and a younger spouse.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I take you in sickness and in safe mode, in low battery and in airplane mode, and I vow never to trade you in for a newer model.";

function main(): void {
  // Guard the gate contract: 1 to 160 characters, never blank. Failing
  // loudly here beats shipping an invalid entry if the line is edited.
  if (ENTRY.trim().length === 0 || ENTRY.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${ENTRY.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Clear the output directory's contents entry by entry; never remove
  // the directory itself (in the grader it is a mounted volume).
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
