import { useState } from "react";
import { Label } from "./ui/label";
import Image from "next/image";

export const ThumbnailPreview = ({
  initialImageUrl,
  onChange,
  onDelete
}: {
  initialImageUrl: string;
  onChange: (file: File | null) => void;
  onDelete: () => void
}) => {
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onChange(file);
    }
  };

//   const handleDelete = () => {
//     setPreviewUrl("");
//     onChange(null);
//   };

  return (
    <>
      <Label>Thumbnails</Label>
      <div className="p-3 rounded-sm max-w-56 border border-border">
        {previewUrl && (
          <Image
            src={previewUrl}
            alt={"Preview Thumbnail"}
            width={400}
            height={400}
            className="w-full h-full rounded-sm"
          />
        )}

        <div className="flex items-center justify-center gap-3 mt-3">
          <Label className="text-blue-600 cursor-pointer underline">
            Changes
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </Label>

          <Label
            className="text-red-600 underline cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </Label>
        </div>
      </div>
    </>
  );
};
