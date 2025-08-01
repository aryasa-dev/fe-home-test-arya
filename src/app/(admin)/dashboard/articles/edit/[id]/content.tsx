'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeftIcon, ChevronDownIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { editArticleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Article, CategoriesResponse } from "@/types";
import UploadImage from "@/components/UploadImage";
import Link from "next/link";
import { RichTextEditor } from "@/components/RichTextEditor";
import { ThumbnailPreview } from "@/components/ThumbnailPreview";
import { uploadImage } from "@/services";
import { ButtonLoader } from "@/components/ButtonLoader";
import { useApi } from "@/hooks/useApi";

type EditArticleContentProps = {
    id: string
}

export function EditArticleContent({id}: EditArticleContentProps) {
    const router = useRouter();
  const form = useForm<z.infer<typeof editArticleSchema>>({
    resolver: zodResolver(editArticleSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      content: "",
      thumbnail: null,
    },
  });
  const [deleted, setDeleted] = useState(false);

  const categories = useApi<CategoriesResponse>({
    method: "GET",
    path: "categories",
    auth: true,
  });

  const { data, loading } = useApi<Article>({
    method: "GET",
    path: `articles/${id}`,
    auth: true,
  });

  const { refetch: submitEditArticle, loading: isSubmitting } = useApi(
    {
      method: "PUT",
      path: `articles/${id}`,
      bodyRequest: {},
    },
    {
      manual: true,
      onSuccess: () => {
        alert("Article updated successfully");
        router.push("/dashboard/articles");
      },
      onError: () => {
        alert("Failed to update article");
      },
    }
  );

  async function onSubmit(values: z.infer<typeof editArticleSchema>) {
    let imageUrl: string | null = null;
    const changedFields: Record<string, any> = {};

    if (values.title !== data?.title) {
      changedFields.title = values.title;
    }

    if (values.categoryId !== data?.categoryId) {
      changedFields.categoryId = values.categoryId;
    }

    if (values.content !== data?.content) {
      changedFields.content = values.content;
    }

    if (values.thumbnail instanceof File) {
      imageUrl = await uploadImage(values.thumbnail);
      changedFields.imageUrl = imageUrl;
    } else if (
      typeof values.thumbnail === "string" &&
      values.thumbnail !== data?.imageUrl
    ) {
      changedFields.imageUrl = values.thumbnail;
    }

    if (Object.keys(changedFields).length === 0) {
      console.log("Tidak ada data yang diubah.");
      return;
    }
    // console.log(changedFields)

    await submitEditArticle({ bodyRequest: changedFields });
  }

  useEffect(() => {
    if (data) {
      form.reset(
        {
          title: data.title || "",
          categoryId: data.categoryId || "",
          content: data.content || "",
          thumbnail: null,
        },
        {
          keepDirtyValues: true,
        }
      );
    }
  }, [data, form]);
  return (
    <Card>
          <CardHeader>
            <div className="flex items-center gap-3 pb-5">
              <ArrowLeftIcon
                onClick={() => router.push("/dashboard/articles")}
                className="cursor-pointer"
              />
              <p className="font-medium text-slate-900">Edit Article</p>
            </div>
          </CardHeader>

          {!loading && data ? (
            <CardContent className="mt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {!deleted ? (
                    <ThumbnailPreview
                      initialImageUrl={data.imageUrl}
                      onChange={(file) => form.setValue("thumbnail", file)}
                      onDelete={() => setDeleted(true)}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <UploadImage
                              onDelete={() => {
                                form.setValue("thumbnail", null, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Input Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <select
                                className={cn(
                                  buttonVariants({ variant: "outline" }),
                                  "w-full appearance-none font-normal"
                                )}
                                {...field}
                              >
                                <option value="">Select Category</option>
                                {categories.data?.data.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="text-sm text-slate-500">
                      The existing category list can be seen in the{" "}
                      <Link
                        href={"/dashboard/category"}
                        className="text-primary underline"
                      >
                        category
                      </Link>{" "}
                      menu
                    </span>
                  </div>

                  {/* Content */}
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RichTextEditor {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-x-3 relative z-10">
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() => router.push("/dashboard/articles")}
                    >
                      Cancel
                    </Button>
                    <Button variant={"ghost"}>Preview</Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                    >
                      {isSubmitting ? <ButtonLoader /> : "Upload"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          ) : (
            <p>Loading..</p>
          )}
        </Card>
  )
}