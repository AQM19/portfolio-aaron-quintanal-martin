/** Whether a menu entry is the current page: `pathname` is the internal next-intl route (e.g. `/projects/[slug]`). */
export const isNavActive = (href: string | { pathname: string }, pathname: string) => {
    const target = typeof href === 'string' ? href : href.pathname;
    return target === '/' ? pathname === '/' : pathname === target || pathname.startsWith(`${target}/`);
};
