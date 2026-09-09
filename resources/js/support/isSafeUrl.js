// Blocks script-executing schemes from a URL that can come straight from a
// database column via a column's `url`/`src` prop — a relative path or a
// same-origin link carries no scheme at all and is always allowed. `data:`
// is deliberately not blocked: it can't execute script as an <img src>, and
// browsers already refuse to top-level-navigate a clicked <a href> to it.
const DANGEROUS_SCHEME = /^\s*(javascript|vbscript):/i

export function isSafeUrl(url) {
    if (typeof url !== 'string') {
        return false
    }

    return !DANGEROUS_SCHEME.test(url)
}
