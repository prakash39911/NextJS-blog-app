"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./ToolBar";
import Highlight from "@tiptap/extension-highlight";
import ImageResize from "tiptap-extension-resize-image";
import { useEffect } from "react";

export default function TextEditor({ content, onChange }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configure the built-in extensions from StarterKit
        heading: {
          levels: [1, 2],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      ImageResize,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[240px] border rounded-md bg-slate-50 py-2 px-3",
        spellcheck: "true",
      },
      handleKeyDown: (view, event) => {
        // Let the browser handle all key events naturally
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content) {
      // Only update when content changes from external source
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content, false);
      }
    }
  }, [content, editor]);

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
