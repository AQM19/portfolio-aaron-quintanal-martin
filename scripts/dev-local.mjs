/**
 * `npm run dev:local`: runs the web against the admin's local environment (Docker Postgres + S3).
 *
 * Reads the admin's .env and passes the connection to `next dev` as process variables, which take precedence over
 * the .env files: so .env.development.local can point to Neon (`npm run dev`, written by the admin's
 * scripts/setup-neon.ps1) while this command keeps using Docker. No password is copied by hand or written to disk:
 * the web reads public_api.published_content with the read-only web_reader role and loads images from the local S3.
 *
 * Admin repository path: ADMIN_REPO env var, or ../AQPortfoil (or ../portfolio-aaron-desk) next to this repository.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const webRoot = resolve(import.meta.dirname, '..');
const adminRoot = resolve(process.env.ADMIN_REPO
    ?? ['AQPortfoil', 'portfolio-aaron-desk'].map((name) => resolve(webRoot, '..', name)).find((dir) => existsSync(resolve(dir, '.env')))
    ?? resolve(webRoot, '..', 'AQPortfoil'));
const adminEnv = resolve(adminRoot, '.env');

if (!existsSync(adminEnv)) {
    console.error(`No encuentro ${adminEnv}. Ejecuta antes scripts/setup-local.ps1 en el repo del admin (o define ADMIN_REPO).`);
    process.exit(1);
}

const env = Object.fromEntries(
    readFileSync(adminEnv, 'utf8')
        .split(/\r?\n/)
        .map((line) => /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line))
        .filter(Boolean)
        .map((match) => [match[1], match[2]]),
);
const s3 = `http://localhost:${env.S3_LOCAL_PORT || '9000'}`;
const password = encodeURIComponent(env.WEB_READER_PASSWORD ?? '');

const localContent = {
    CONTENT_SOURCE: 'postgres',
    PORTFOLIO_READ_DATABASE_URL: `postgresql://web_reader:${password}@localhost:${env.POSTGRES_PORT || '5433'}/${env.POSTGRES_DB || 'portfolio'}`,
    CONTENT_REVALIDATE_SECONDS: '5',
    CONTENT_IMAGE_HOSTS: s3,
};
console.log('Contenido desde el Postgres y el S3 locales del admin (Docker).');

// Next's CLI through Node itself: no shell, so the arguments are passed as they are.
const nextBin = createRequire(import.meta.url).resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], {
    cwd: webRoot,
    stdio: 'inherit',
    env: { ...process.env, ...localContent },
});
child.on('exit', (code) => process.exit(code ?? 0));
