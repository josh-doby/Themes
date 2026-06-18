#!/usr/bin/env node
import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const THEMES_DIR = 'themes';
const OUT = 'index.json';

const files = readdirSync(THEMES_DIR).filter((f) => f.toLowerCase().endsWith('.json'));

const themes = files
  .map((file) => {
    const theme = JSON.parse(readFileSync(join(THEMES_DIR, file), 'utf8'));
    return {
      id: theme.id,
      displayName: theme.displayName,
      ...(theme.description ? {description: theme.description} : {}),
      file: `${THEMES_DIR}/${file}`,
    };
  })
  .sort((a, b) => a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase()));

const manifest = {schemaVersion: 1, themes};
writeFileSync(OUT, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${OUT} with ${themes.length} theme(s).`);
