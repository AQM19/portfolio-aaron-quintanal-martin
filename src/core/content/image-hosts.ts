/**
 * Origins that `next/image` may load remote images from. `next/image` throws on any other origin, so the
 * adapters replace images from unknown origins with a placeholder instead of breaking the page.
 *
 * `CONTENT_IMAGE_HOSTS` (comma separated) adds more: a host name (`cdn.example.com`, https) or a full origin
 * (`http://localhost:9000`, for the local S3 of the admin). Add the public host of the Neon Storage buckets.
 */
export interface ImageOrigin {
    protocol: 'http' | 'https';
    hostname: string;
    port: string;
}

const DEFAULT_ORIGINS = ['avatars.githubusercontent.com'];

export function getImageOrigins(): ImageOrigin[] {
    const entries = [...DEFAULT_ORIGINS, ...(process.env.CONTENT_IMAGE_HOSTS ?? '').split(',')]
        .map((entry) => entry.trim())
        .filter(Boolean);

    return entries.flatMap((entry): ImageOrigin[] => {
        try {
            const url = new URL(entry.includes('://') ? entry : `https://${entry}`);
            return [{ protocol: url.protocol === 'http:' ? 'http' : 'https', hostname: url.hostname, port: url.port }];
        } catch {
            return [];
        }
    });
}

/** True when some configured origin is on this machine (local S3): next/image needs explicit permission. */
export const hasLocalImageOrigin = (): boolean =>
    getImageOrigins().some((o) => o.hostname === 'localhost' || o.hostname === '127.0.0.1');

/** Site paths (`/webp/x.webp`) or URLs on an allowed origin. */
export function isRenderableImage(url: string | null | undefined): url is string {
    if (!url) {
        return false;
    }
    if (url.startsWith('/') && !url.startsWith('//')) {
        return true;
    }

    try {
        const { protocol, hostname, port } = new URL(url);
        return getImageOrigins().some((o) => `${o.protocol}:` === protocol && o.hostname === hostname && o.port === port);
    } catch {
        return false;
    }
}
