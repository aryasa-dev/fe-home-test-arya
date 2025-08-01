import { apiRequest } from "@/utils/api";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await apiRequest({
    method: "POST",
    path: "upload",
    bodyRequest: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.imageUrl;
};
