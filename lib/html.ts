const SCRIPT_RE = /<script\b[^>]*>[\s\S]*?<\/script\s*>/gi;
const TAG_RE = /<\/?[a-z][\w-]*(\s[^>]*)?\/?>/i;

/** True when admin-entered text contains HTML tags (vs. legacy plain text). */
export function isHtml(text: string | undefined | null): boolean {
  return Boolean(text) && TAG_RE.test(text as string);
}

/**
 * Separates <script> tags from markup. The markup is server-rendered (SEO,
 * no flash); scripts are executed on the client because `innerHTML` never runs them.
 */
export function splitScripts(html: string): { markup: string; scripts: string } {
  const scripts = html.match(SCRIPT_RE)?.join('\n') ?? '';
  return { markup: html.replace(SCRIPT_RE, ''), scripts };
}
