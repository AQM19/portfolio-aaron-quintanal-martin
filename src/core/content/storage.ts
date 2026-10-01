/**
 * Files uploaded by the admin (images and documents) live in private S3 buckets (Neon Storage): a public GET
 * answers 403. The web serves them through its own route, `/api/assets/<bucket>/<key>`, signing each read with a
 * credential that never leaves the server.
 *
 * Server-only variables (never NEXT_PUBLIC_):
 * - `STORAGE_ENDPOINT`: S3 endpoint, e.g. https://<id>.storage.<region>.aws.neon.tech
 * - `STORAGE_REGION` (default us-east-1), `STORAGE_ACCESS_KEY_ID`, `STORAGE_SECRET_ACCESS_KEY`
 * - `STORAGE_BUCKETS`: buckets the route may serve, comma separated (e.g. `imgs,docs`); any other is a 404.
 */
export const ASSET_ROUTE = '/api/assets';

export interface StorageConfig {
    endpoint: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    buckets: string[];
}

/** Configuration of the private storage, or `null` when it is not configured (the URLs are left as they are). */
export function getStorageConfig(): StorageConfig | null {
    const endpoint = process.env.STORAGE_ENDPOINT?.trim().replace(/\/+$/, '');
    const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID?.trim();
    const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY?.trim();
    const buckets = (process.env.STORAGE_BUCKETS ?? '').split(',').map((bucket) => bucket.trim()).filter(Boolean);

    if (!endpoint || !accessKeyId || !secretAccessKey || buckets.length === 0) {
        return null;
    }

    return { endpoint, region: process.env.STORAGE_REGION?.trim() || 'us-east-1', accessKeyId, secretAccessKey, buckets };
}

/**
 * Replaces every bucket URL inside the published document (image fields, the CV, documentation links and images
 * embedded in rich text) with the web route. Runs on the raw document, before the contract is parsed.
 */
export function proxyStorageUrls<T>(document: T): T {
    const config = getStorageConfig();
    if (!config) {
        return document;
    }

    const prefixes = config.buckets.map((bucket) => [`${config.endpoint}/${bucket}/`, `${ASSET_ROUTE}/${bucket}/`]);
    const rewrite = (value: unknown): unknown => {
        if (typeof value === 'string') {
            return prefixes.reduce((text, [from, to]) => text.split(from).join(to), value);
        }
        if (Array.isArray(value)) {
            return value.map(rewrite);
        }
        if (value && typeof value === 'object') {
            return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rewrite(item)]));
        }
        return value;
    };

    return rewrite(document) as T;
}
