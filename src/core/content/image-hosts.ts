/**
 * Hosts that `next/image` may load remote images from. `next/image` throws on any other host, so the
 * adapters replace images from unknown hosts with a placeholder instead of breaking the page.
 * Extend with `CONTENT_IMAGE_HOSTS` (comma separated) when the admin publishes images from a new host.
 */
const DEFAULT_IMAGE_HOSTS = ['avatars.githubusercontent.com'];

export const getImageHosts = (): string[] => [
    ...DEFAULT_IMAGE_HOSTS,
    ...(process.env.CONTENT_IMAGE_HOSTS ?? '').split(',').map((host) => host.trim()).filter(Boolean),
];

/** Site paths (`/webp/x.webp`) or https URLs on an allowed host. */
export function isRenderableImage(url: string | null | undefined): url is string {
    if (!url) {
        return false;
    }
    if (url.startsWith('/') && !url.startsWith('//')) {
        return true;
    }

    try {
        const { protocol, hostname } = new URL(url);
        return protocol === 'https:' && getImageHosts().includes(hostname);
    } catch {
        return false;
    }
}
