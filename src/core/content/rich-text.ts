import sanitizeHtml from 'sanitize-html';

/**
 * Long texts from the admin are HTML produced by its WYSIWYG editor. The admin already sanitizes them
 * (AQPortfoil/Services/Content/RichText.cs); this is a second barrier with the same allowlist, so the web never
 * renders anything else even if the database were tampered with. Keep both lists in sync.
 */
const OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: ['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'hr'],
    // target/rel are set by the transform below (the transform runs before the attribute filter).
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    // External links open in a new tab without giving the target page access to this one.
    transformTags: {
        a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
};

export function sanitizeRichText(html: string | null | undefined): string | undefined {
    if (!html) return undefined;
    const clean = sanitizeHtml(html, OPTIONS).trim();
    return clean.length > 0 ? clean : undefined;
}

/** Full years between the birth date (YYYY-MM-DD) and today. */
export function ageFrom(birthDate: string, today = new Date()): number {
    const [year, month, day] = birthDate.split('-').map(Number);
    let age = today.getFullYear() - year;
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) age--;
    return age;
}

/** Replaces the `{age}` placeholder of the bio. */
export function withAge(text: string, birthDate: string | null | undefined): string {
    return birthDate ? text.replaceAll('{age}', String(ageFrom(birthDate))) : text.replaceAll('{age}', '');
}
