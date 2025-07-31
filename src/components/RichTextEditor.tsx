"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const defaultModules = {
  toolbar: [
    ["bold", "italic"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    ["clean"],
  ],
};

type RichTextEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
  modules?: object;
  readonly?: boolean;
};

export function RichTextEditor({
  modules = defaultModules,
  onChange,
  value = "",
  readonly = false,
}: RichTextEditorProps) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (content: string) => {
    setText(content);
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className="min-h-[500px] max-w-[1090px]">
      <ReactQuill
        value={text}
        onChange={handleChange}
        // readOnly={readonly}
        modules={modules}
        className="h-full w-full rounded-lg border bg-white whitespace-break-spaces"
      />
    </div>
  );
}