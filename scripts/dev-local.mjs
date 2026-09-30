/**
 * `npm run dev:local`: runs the web against the admin's local environment (Docker Postgres + S3).
 *
 * Creates .env.development.local (git-ignored) from the admin's .env the first time, so no password is copied
 * by hand or committed: the web reads public_api.published_content with the read-only web_reader role and
 * loads images from the local S3. Then starts `next dev`.
 *
 * Admin repository path: ADMIN_REPO env var, or ../AQPortfoil next to this repository.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const webRoot = resolve(import.meta.dirname, '..');
const target = resolve(webRoot, '.env.development.local');
const adminRoot = resolve(process.env.ADMIN_REPO ?? resolve(webRoot, '..', 'AQPortfoil'));
const adminEnv = resolve(adminRoot, '.env');

if (!existsSync(target)) {
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

    writeFileSync(target, [
        '# Generado por scripts/dev-local.mjs desde el .env del admin. No se versiona (.env*.local).',
        'CONTENT_SOURCE=postgres',
        `PORTFOLIO_READ_DATABASE_URL=postgresql://web_reader:${password}@localhost:${env.POSTGRES_PORT || '5433'}/${env.POSTGRES_DB || 'portfolio'}`,
        'CONTENT_REVALIDATE_SECONDS=5',
        `CONTENT_IMAGE_HOSTS=${s3}`,
        '',
    ].join('\n'), 'utf8');
    console.log(`Creado ${target} (base de datos y S3 locales del admin).`);
}

// Next's CLI through Node itself: no shell, so the arguments are passed as they are.
const nextBin = createRequire(import.meta.url).resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], { cwd: webRoot, stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
