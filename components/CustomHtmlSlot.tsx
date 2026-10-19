'use client';

import { usePathname } from 'next/navigation';
import { HtmlContent } from './HtmlContent';
import type { CustomHtmlBlock, CustomHtmlPosition } from '@/lib/default-data';

function normalize(path: string): string {
  const trimmed = path.trim();
  return trimmed.length > 1 ? trimmed.replace(/\/+$/, '') : trimmed;
}

/** "" matches every page; "/san-pham/*" matches that path and everything under it. */
export function matchesPath(paths: string, pathname: string): boolean {
  const patterns = paths.split(',').map(normalize).filter(Boolean);
  if (patterns.length === 0) return true;
  const current = normalize(pathname);
  return patterns.some((p) =>
    p.endsWith('/*') ? current === p.slice(0, -2) || current.startsWith(p.slice(0, -1)) : current === p,
  );
}

export default function CustomHtmlSlot({
  blocks,
  position,
}: {
  blocks: CustomHtmlBlock[];
  position: CustomHtmlPosition;
}) {
  const pathname = usePathname();

  const visible = blocks.filter(
    (b) => b.enabled && b.position === position && b.html.trim() && matchesPath(b.paths, pathname),
  );
  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((b) => (
        // Keyed by path too, so page-specific scripts re-run after client navigation.
        <HtmlContent key={`${b.id}:${pathname}`} html={b.html} />
      ))}
    </>
  );
}
