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
        spellcheck: "true", // Ensures normal space behavior
        autocorrect: "on", // Helps prevent text input issues
        autocomplete: "on",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      editor.on("transaction", ({ transaction }) => {
        console.log(transaction);
      });
    },
    enableCoreExtensions: true,
    editable: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, false); // Update content without history
    }
  }, [content, editor]);

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
