// post-x-promote entry (Node 22, standard library only).
//
// Behaviour: copy POST.json from the bot/repository directory to the
// output directory as POST.json, where the grader reads it. That is the
// whole job of this program — the entry itself is the X post named by
// POST.json, and nothing this program writes about the post is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

function resolveDirs() {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  return { botDir, outputDir };
}

function copyPostJson(botDir, outputDir) {
  const sourcePath = join(botDir, 'POST.json');
  const destPath = join(outputDir, 'POST.json');

  if (!existsSync(sourcePath)) {
    throw new Error(`POST.json not found in bot directory: ${sourcePath}`);
  }

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(sourcePath, destPath);
  return destPath;
}

function main() {
  const { botDir, outputDir } = resolveDirs();
  try {
    // copyPostJson validates that the source exists before copying, so a
    // missing POST.json fails here with a clear, actionable message.
    copyPostJson(botDir, outputDir);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`post-x-promote: failed to copy POST.json from ${botDir} to ${outputDir}: ${message}`);
    process.exitCode = 1;
  }
}

main();
