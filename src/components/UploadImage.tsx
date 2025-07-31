"use client";

import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import Image from "next/image";

interface UploadImageProps {
  onChange: (file: File) => void;
  error?: string;
}

export default function UploadImage({ onChange, error }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-1 max-w-56">
      <Label>Thumbnails</Label>
      <div
        onClick={handleClick}
        className="border-dashed border-2 border-gray-300 p-6 rounded-xl text-center cursor-pointer hover:bg-gray-50 transition h-40 flex flex-col items-center justify-center"
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <Image
            src={preview}
            alt="preview"
            width={400}
            height={400}
            className="mx-auto object-contain rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center text-slate-500">
            <ImagePlus size={20} className="mb-3" />
            <p className="text-xs">Click to select files</p>
            <p className="text-xs">Support File Type: .jpg or .png</p>
          </div>
        )}
      </div>
      {/* {error && <p className="text-sm text-red-500 mt-1">{error}</p>} */}
    </div>
  );
}
