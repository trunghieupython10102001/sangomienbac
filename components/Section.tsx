import { HtmlContent } from './HtmlContent';
import type { SectionHtml, SectionHtmlKey } from '@/lib/default-data';

// Deliberately not a client component: on server pages the override is decided
// on the server, so a replaced section's default markup is never sent to the browser.
/**
 * Wraps a built-in page section so the admin can replace it with raw HTML.
 * `display: contents` keeps the wrapper out of layout (sticky header, flex, grid);
 * `data-section` lets the admin grab the section's current HTML as a starting point.
 */
export function Section({
  id,
  overrides,
  children,
}: {
  id: SectionHtmlKey;
  overrides: SectionHtml;
  children: React.ReactNode;
}) {
  const override = overrides[id];
  const replaced = override?.enabled && override.html.trim();
  return (
    <div data-section={id} className="contents">
      {replaced ? <HtmlContent html={override.html} className="contents" /> : children}
    </div>
  );
}
