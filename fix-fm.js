// Run with: node update-frontmatter.js

import fs from 'fs/promises';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');

async function processFile(filePath, relPath) {
  let content = await fs.readFile(filePath, 'utf8');
  let fmMatch = content.match(/^---\n([\s\S]*?)---\n/);

  if (fmMatch) {
    // Remove id: line only
    let fm = fmMatch[1].replace(/^id:.*\n?/gm, '');
    content = `---\n${fm.trim()}\n---\n` + content.slice(fmMatch[0].length);
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Removed id: from ${relPath}`);
  }
}

async function walk(dir, relBase = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const relPath = path.join(relBase, entry.name);
    if (entry.isDirectory()) {
      await walk(entryPath, relPath);
    } else if (entry.name.endsWith('.md')) {
      await processFile(entryPath, relPath);
    }
  }
}

walk(docsDir).catch(console.error);
