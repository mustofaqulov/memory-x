const { spawnSync } = require('node:child_process');

// Install prepares the local SQLite client. The Vercel build replaces it with
// the PostgreSQL client after checking its production environment variables.
const result = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), 'generate', '--schema', 'prisma/schema.prisma'], {
  env: { ...process.env, DATABASE_URL: 'file:./dev.db' },
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exit(result.status || 0);
