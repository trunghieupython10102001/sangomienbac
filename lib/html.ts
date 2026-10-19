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

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string): string {
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Converts legacy plain text — including the light markdown news articles use
 * (`## `, `- `, `1. `, `**bold**`, `| tables |`) — into HTML for the rich text editor.
 */
export function legacyTextToHtml(text: string): string {
  const out: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;
  let rows: string[][] = [];

  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li><p>${i}</p></li>`).join('')}</${list.tag}>`);
    list = null;
  };
  const flushTable = () => {
    if (rows.length) {
      const [head, ...body] = rows;
      const tr = (cells: string[], tag: 'th' | 'td') =>
        `<tr>${cells.map((c) => `<${tag}><p>${inline(c)}</p></${tag}>`).join('')}</tr>`;
      out.push(`<table><tbody>${tr(head, 'th')}${body.map((r) => tr(r, 'td')).join('')}</tbody></table>`);
    }
    rows = [];
  };
  const pushItem = (tag: 'ul' | 'ol', item: string) => {
    if (list?.tag !== tag) flushList();
    list ??= { tag, items: [] };
    list.items.push(inline(item));
  };

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('|')) {
      flushList();
      if (!/^\|[\s|:-]+\|?$/.test(line)) rows.push(line.split('|').slice(1, -1).map((c) => c.trim()));
      continue;
    }
    flushTable();
    if (line.startsWith('- ')) pushItem('ul', line.slice(2));
    else if (/^\d+\. /.test(line)) pushItem('ol', line.replace(/^\d+\. /, ''));
    else {
      flushList();
      if (line.startsWith('### ')) out.push(`<h3>${inline(line.slice(4))}</h3>`);
      else if (line.startsWith('## ')) out.push(`<h2>${inline(line.slice(3))}</h2>`);
      else if (line) out.push(`<p>${inline(line)}</p>`);
    }
  }
  flushTable();
  flushList();
  return out.join('');
}
