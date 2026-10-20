/** Prefixes a root-relative public path ('/images/x.webp') with the deploy base (e.g. '/ahmed-elnopy/'). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
