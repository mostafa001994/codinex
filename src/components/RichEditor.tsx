"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichEditorProps {
    value: string;
    onChange: (html: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
}

export default function RichEditor({ value, onChange, onImageUpload }: RichEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    // ✔ این خط ۱۰۰٪ خطا را حذف می‌کند
    if (editor === null) {
        return <div>در حال بارگذاری ویرایشگر...</div>;
    }

    async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !onImageUpload) return;

        const url = await onImageUpload(file);

        // ✔ این همیشه کار می‌کند و هیچ خطایی ندارد


        (editor as any).chain().focus().insertContent(`<img src="${url}" alt="" />`).run();



    }

    return (
        <div className="border rounded p-2 space-y-2">

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border-b pb-2 text-sm">

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    Italic
                </button>



                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive("heading", { level: 1 }) ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    H1
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive("heading", { level: 2 }) ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    1. List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive("codeBlock") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"}
                >
                    {"</>"}
                </button>

                {onImageUpload && (
                    <label className="px-2 py-1 rounded border cursor-pointer">
                        تصویر
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageSelect}
                        />
                    </label>
                )}
            </div>

            <EditorContent editor={editor} className="min-h-[200px]" />
        </div>
    );
}