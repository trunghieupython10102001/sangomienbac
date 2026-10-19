'use client';

import { useEffect, useRef } from 'react';
import { isHtml, splitScripts } from '@/lib/html';

/** Renders admin-authored HTML: markup via SSR, <script> tags re-created on mount so they run. */
export function HtmlContent({ html, className }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { markup, scripts } = splitScripts(html);

  useEffect(() => {
    const el = ref.current;
    if (!el || !scripts) return;
    const template = document.createElement('template');
    template.innerHTML = scripts;
    const added: HTMLScriptElement[] = [];
    template.content.querySelectorAll('script').forEach((old) => {
      const script = document.createElement('script');
      for (const attr of Array.from(old.attributes)) script.setAttribute(attr.name, attr.value);
      script.text = old.text;
      el.appendChild(script);
      added.push(script);
    });
    return () => added.forEach((s) => s.remove());
  }, [scripts]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}

/**
 * A long-text field that accepts HTML. Legacy plain text keeps its old look
 * (line breaks preserved) so existing content doesn't change.
 */
export function RichText({ text, className = '' }: { text: string; className?: string }) {
  if (isHtml(text)) return <HtmlContent html={text} className={`rich-html ${className}`} />;
  return <p className={`whitespace-pre-line ${className}`}>{text}</p>;
}
