const { spawnSync } = require('node:child_process');
const path = require('node:path');
const env = { ...process.env, DATABASE_URL: 'file:./test.db', SESSION_SECRET: 'test-only-secret-with-at-least-thirty-two-characters', DEMO_PASSWORD: '' };
function run(modulePath, args) {
  const result = spawnSync(process.execPath, [modulePath, ...args], { env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
run(require.resolve('prisma/build/index.js'), ['migrate', 'deploy']);
const seeded = spawnSync(process.execPath, [path.join(__dirname, '..', 'prisma', 'seed.cjs')], { env, stdio: 'inherit' });
if (seeded.status !== 0) process.exit(seeded.status || 1);
run(path.join(__dirname, '..', 'node_modules', 'vitest', 'vitest.mjs'), ['run']);
