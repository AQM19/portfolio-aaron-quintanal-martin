import { AwsClient } from 'aws4fetch';
import { getStorageConfig } from '@/core/content/storage';

/** Response headers passed through from the bucket. */
const FORWARDED_HEADERS = ['content-type', 'content-length', 'etag', 'last-modified'];

/**
 * Serves a file of the private buckets (see core/content/storage.ts): `/api/assets/<bucket>/<key>`.
 * Only the buckets in STORAGE_BUCKETS; anything else, or a missing file, is a 404 (it does not reveal which).
 */
export async function GET(request: Request, ctx: RouteContext<'/api/assets/[bucket]/[...key]'>) {
    const config = getStorageConfig();
    const { bucket, key } = await ctx.params;

    // Empty, dot or encoded-slash segments (`..%2F`) could let the key reach another bucket
    if (!config || !config.buckets.includes(bucket) || key.some((segment) => !segment || segment === '.' || /\.\.|[\\/]/.test(segment))) {
        return new Response('Not found', { status: 404 });
    }

    const s3 = new AwsClient({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: config.region,
        service: 's3',
    });

    const objectUrl = `${config.endpoint}/${bucket}/${key.map(encodeURIComponent).join('/')}`;
    const ifNoneMatch = request.headers.get('if-none-match');
    const upstream = await s3.fetch(objectUrl, { headers: ifNoneMatch ? { 'if-none-match': ifNoneMatch } : {} });

    if (upstream.status === 304) {
        return new Response(null, { status: 304, headers: { etag: upstream.headers.get('etag') ?? '' } });
    }
    if (!upstream.ok) {
        if (upstream.status !== 404 && upstream.status !== 403) {
            console.error(`[assets] ${bucket}/${key.join('/')} answered ${upstream.status}`);
        }
        return new Response('Not found', { status: 404 });
    }

    const headers = new Headers();
    for (const name of FORWARDED_HEADERS) {
        const value = upstream.headers.get(name);
        if (value) headers.set(name, value);
    }
    // The admin uploads every file with a new name (content hash), so a key never changes content
    headers.set('cache-control', 'public, max-age=86400, s-maxage=31536000, immutable');
    headers.set('x-content-type-options', 'nosniff');

    return new Response(upstream.body, { status: 200, headers });
}
