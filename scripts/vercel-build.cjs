const { spawnSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const sqliteSchema = readFileSync(path.join(root, 'prisma', 'schema.prisma'), 'utf8');
const postgresSchema = readFileSync(path.join(root, 'prisma', 'postgres', 'schema.prisma'), 'utf8');
const expectedPostgresSchema = sqliteSchema
  .replace('output   = "../node_modules/@memoryx/prisma-client"', 'output   = "../../node_modules/@memoryx/prisma-client"')
  .replace('provider = "sqlite"', 'provider = "postgresql"');

if (postgresSchema !== expectedPostgresSchema) {
  throw new Error('Prisma schemas differ. Update prisma/postgres/schema.prisma before deploying.');
}
if (!/^postgres(?:ql)?:\/\//.test(process.env.DATABASE_URL ?? '')) {
  throw new Error('Vercel DATABASE_URL must point to a persistent PostgreSQL database.');
}
if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  throw new Error('Vercel SESSION_SECRET must contain at least 32 characters.');
}

function run(modulePath, args) {
  const result = spawnSync(process.execPath, [modulePath, ...args], {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

const prisma = require.resolve('prisma/build/index.js');
const schema = 'prisma/postgres/schema.prisma';
run(prisma, ['generate', '--schema', schema]);
run(prisma, ['migrate', 'deploy', '--schema', schema]);
run(path.join(root, 'prisma', 'seed.cjs'), []);
run(require.resolve('next/dist/bin/next'), ['build']);
