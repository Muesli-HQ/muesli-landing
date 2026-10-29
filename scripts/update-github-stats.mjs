import { readFile, writeFile } from 'node:fs/promises';

const snapshot = new URL('../src/githubStats.json', import.meta.url);
// Keep a verified count available even when GitHub is unavailable during a build.
const previous = JSON.parse(await readFile(snapshot, 'utf8'));
if (!Number.isInteger(previous.stars) || previous.stars < 0) {
  throw new Error('Invalid GitHub star-count fallback');
}

try {
  const response = await fetch('https://api.github.com/repos/Muesli-HQ/muesli', {
    headers: { Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!Number.isInteger(data.stargazers_count) || data.stargazers_count < 0) {
    throw new Error('Invalid star count');
  }
  await writeFile(snapshot, `${JSON.stringify({
    stars: data.stargazers_count,
    checkedAt: new Date().toISOString().slice(0, 10),
  }, null, 2)}\n`);
  console.log(`GitHub stars refreshed: ${data.stargazers_count}`);
} catch (error) {
  console.warn(`GitHub stars: retaining ${previous.stars} from ${previous.checkedAt} (${error.message})`);
}
