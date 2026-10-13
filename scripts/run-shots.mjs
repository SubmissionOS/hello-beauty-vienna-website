// Startet die Screenshot-Suite (SHOTS=1) plattformunabhängig.
import { spawnSync } from 'node:child_process';
const r = spawnSync('npx', ['--no-install', 'playwright', 'test', 'tests/screenshots.spec.ts', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SHOTS: '1' },
});
process.exit(r.status ?? 1);
