'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, useEditorState, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TableKit } from '@tiptap/extension-table';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  ImagePlus,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Code,
  Loader2,
} from 'lucide-react';
import { isHtml, legacyTextToHtml } from '@/lib/html';
import { uploadFile } from '@/lib/admin-helpers';

interface HtmlFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  /** Applied to the editing surface, e.g. a dark background for footer/hero text. */
  previewClassName?: string;
}

/** Legacy plain text / light markdown is converted so it opens with its formatting intact. */
function toEditorHtml(value: string): string {
  return isHtml(value) ? value : legacyTextToHtml(value);
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // keep the editor selection
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`rounded p-1.5 transition disabled:opacity-30 ${
        active ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({
  editor,
  sourceMode,
  onToggleSource,
}: {
  editor: Editor;
  sourceMode: boolean;
  onToggleSource: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      link: e.isActive('link'),
      left: e.isActive({ textAlign: 'left' }),
      center: e.isActive({ textAlign: 'center' }),
      right: e.isActive({ textAlign: 'right' }),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });
  const chain = () => editor.chain().focus();
  const off = sourceMode;

  function setLink() {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Đường dẫn (để trống để bỏ link):', prev ?? 'https://');
    if (url === null) return;
    if (!url.trim()) chain().extendMarkRange('link').unsetLink().run();
    else chain().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const src = await uploadFile(file);
      chain().setImage({ src, alt: file.name.replace(/\.[^.]+$/, '') }).run();
    } catch (err) {
      window.alert(`Tải ảnh thất bại: ${err instanceof Error ? err.message : String(err)}`);
    }
    setUploading(false);
  }

  const icon = 'h-4 w-4';
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      <ToolbarButton title="In đậm" active={s.bold} disabled={off} onClick={() => chain().toggleBold().run()}>
        <Bold className={icon} />
      </ToolbarButton>
      <ToolbarButton title="In nghiêng" active={s.italic} disabled={off} onClick={() => chain().toggleItalic().run()}>
        <Italic className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Gạch chân" active={s.underline} disabled={off} onClick={() => chain().toggleUnderline().run()}>
        <Underline className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Gạch ngang" active={s.strike} disabled={off} onClick={() => chain().toggleStrike().run()}>
        <Strikethrough className={icon} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-gray-300" />
      <ToolbarButton title="Tiêu đề lớn" active={s.h2} disabled={off} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
        <Heading2 className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Tiêu đề nhỏ" active={s.h3} disabled={off} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
        <Heading3 className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Danh sách chấm" active={s.bullet} disabled={off} onClick={() => chain().toggleBulletList().run()}>
        <List className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Danh sách số" active={s.ordered} disabled={off} onClick={() => chain().toggleOrderedList().run()}>
        <ListOrdered className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Trích dẫn" active={s.quote} disabled={off} onClick={() => chain().toggleBlockquote().run()}>
        <Quote className={icon} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-gray-300" />
      <ToolbarButton title="Căn trái" active={s.left} disabled={off} onClick={() => chain().setTextAlign('left').run()}>
        <AlignLeft className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Căn giữa" active={s.center} disabled={off} onClick={() => chain().setTextAlign('center').run()}>
        <AlignCenter className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Căn phải" active={s.right} disabled={off} onClick={() => chain().setTextAlign('right').run()}>
        <AlignRight className={icon} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-gray-300" />
      <ToolbarButton title="Chèn / sửa link" active={s.link} disabled={off} onClick={setLink}>
        <Link2 className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Chèn ảnh" disabled={off || uploading} onClick={() => fileRef.current?.click()}>
        {uploading ? <Loader2 className={`${icon} animate-spin`} /> : <ImagePlus className={icon} />}
      </ToolbarButton>
      <ToolbarButton
        title="Chèn bảng 3×3"
        disabled={off}
        onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table className={icon} />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-gray-300" />
      <ToolbarButton title="Hoàn tác" disabled={off || !s.canUndo} onClick={() => chain().undo().run()}>
        <Undo2 className={icon} />
      </ToolbarButton>
      <ToolbarButton title="Làm lại" disabled={off || !s.canRedo} onClick={() => chain().redo().run()}>
        <Redo2 className={icon} />
      </ToolbarButton>
      <span className="flex-1" />
      <button
        type="button"
        onClick={onToggleSource}
        className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition ${
          sourceMode ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Code className="h-3.5 w-3.5" />
        {sourceMode ? 'Về trình soạn thảo' : 'Mã HTML'}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickImage} />
    </div>
  );
}

/** WYSIWYG editor (TipTap) for long text. Stores HTML; a "Mã HTML" toggle allows hand-editing. */
export default function HtmlField({
  label,
  value,
  onChange,
  rows = 6,
  previewClassName = 'bg-white text-gray-800',
}: HtmlFieldProps) {
  const [sourceMode, setSourceMode] = useState(false);
  const [source, setSource] = useState('');
  // Last HTML this field emitted, so parent re-renders don't reset the cursor.
  const emitted = useRef(value);
  const minHeight = `${Math.max(rows, 3) * 1.6}rem`;

  const editor = useEditor({
    immediatelyRender: false, // avoid SSR hydration mismatch
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TableKit,
    ],
    content: toEditorHtml(value),
    editorProps: {
      attributes: { class: 'rich-html outline-none px-4 py-3', style: `min-height:${minHeight}` },
    },
    onUpdate: ({ editor: e }) => {
      const html = e.isEmpty ? '' : e.getHTML();
      emitted.current = html;
      onChange(html);
    },
  });

  // External value change (e.g. data finished loading) → load it into the editor.
  useEffect(() => {
    if (!editor || value === emitted.current) return;
    emitted.current = value;
    editor.commands.setContent(toEditorHtml(value), { emitUpdate: false });
  }, [editor, value]);

  function toggleSource() {
    if (!editor) return;
    if (!sourceMode) {
      setSource(editor.isEmpty ? '' : editor.getHTML());
    } else {
      editor.commands.setContent(source, { emitUpdate: true });
    }
    setSourceMode(!sourceMode);
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="overflow-hidden rounded-lg border border-gray-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500">
        {editor ? (
          <Toolbar editor={editor} sourceMode={sourceMode} onToggleSource={toggleSource} />
        ) : (
          <div className="h-10 border-b border-gray-200 bg-gray-50" />
        )}
        {sourceMode ? (
          <textarea
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              emitted.current = e.target.value;
              onChange(e.target.value);
            }}
            spellCheck={false}
            style={{ minHeight }}
            className="block w-full px-4 py-3 font-mono text-sm text-gray-900 outline-none"
          />
        ) : (
          <EditorContent editor={editor} className={`max-h-[32rem] overflow-y-auto ${previewClassName}`} />
        )}
      </div>
    </div>
  );
}
