"use client";

import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import Image from "next/image";

interface UploadImageProps {
  onChange: (file: File) => void;
  error?: string;
  onDelete?: () => void;
}

export default function UploadImage({
  onChange,
  error,
  onDelete,
}: UploadImageProps) {
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

  const handleDelete = () => {
    setPreview(null);
    onDelete?.();
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
        className={`${!preview ? "border-dashed border-2 p-6 text-center cursor-pointer hover:bg-gray-50 transition flex flex-col items-center justify-center" : "p-3 border"} rounded-sm max-w-56 min-h-40 max-h-48 border-border`}
      >
        {!preview ? (
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        ) : null}
        {preview ? (
          <>
            <Image
              src={preview}
              alt="preview"
              width={400}
              height={400}
              className="w-full max-h-28 rounded-sm"
            />
            <div className="flex items-center justify-center gap-3 mt-3">
              <Label className="text-blue-600 cursor-pointer underline">
                Changes
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>

              <Label
                className="text-red-600 underline cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </Label>
            </div>
          </>
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
