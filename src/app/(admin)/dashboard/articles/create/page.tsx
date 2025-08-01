"use client";
import React from "react";
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
import { createArticleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { CategoriesResponse } from "@/types";
import UploadImage from "@/components/UploadImage";
import Link from "next/link";
import { RichTextEditor } from "@/components/RichTextEditor";
import { uploadImage } from "@/services";

type Props = {};

export default function CreateArticlePage({}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createArticleSchema>>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      thumbnail: null,
    },
  });

  const categories = useApi<CategoriesResponse>({
    method: "GET",
    path: "categories",
    auth: true,
  });

  const { refetch: addArticle, loading: isSubmitting } = useApi(
    {
      method: "POST",
      path: "articles",
      auth: true,
      bodyRequest: {},
    },
    {
      manual: true,
      onSuccess: () => {
        alert("Article created successfully");
        router.push("/dashboard/articles");
      },
      onError: () => {
        alert("Failed to create article");
      },
    }
  );

  async function onSubmit(values: z.infer<typeof createArticleSchema>) {
    let imageUrl: string | null = null;

    if (values.thumbnail instanceof File) {
      imageUrl = await uploadImage(values.thumbnail);
    }

    const { thumbnail, category, ...rest } = values;

    const payload = {
      ...rest,
      imageUrl,
      categoryId: category,
    };
    // console.log(payload)
    await addArticle({
      bodyRequest: payload,
    });
  }
  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 pb-5">
              <ArrowLeftIcon
                onClick={() => router.push("/dashboard/articles")}
                className="cursor-pointer"
              />
              <p className="font-medium text-slate-900">Create Article</p>
            </div>
          </CardHeader>

          <CardContent className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <UploadImage {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    name="category"
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
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-x-1">
                        <Loader2Icon className="animate-spin" /> Loading
                      </span>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
