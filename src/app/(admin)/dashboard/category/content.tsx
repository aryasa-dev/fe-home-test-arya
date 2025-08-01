"use client";
import { DataTable } from "@/components/DataTable";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { getCategoryColumns } from "./columns";
import { useApi } from "@/hooks/useApi";
import { CategoriesResponse } from "@/types";
import { FormDialog } from "@/components/FormDialog";
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
import { createCategory } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ButtonLoader } from "@/components/ButtonLoader";

type Props = {};

export default function DashboardCategoryContent({}: Props) {
  const form = useForm<z.infer<typeof createCategory>>({
    resolver: zodResolver(createCategory),
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const getCategories = useApi<CategoriesResponse>(
    {
      method: "GET",
      path: "categories",
      auth: true,
      params: {},
    },
    { manual: true }
  );
  const columns = useMemo(
    () => getCategoryColumns(() => getCategories.refetch({ params: { page } })),
    [getCategories.refetch, page]
  );

  const {loading, refetch} = useApi<CategoriesResponse>(
    {
      method: "POST",
      path: "categories",
      auth: true,
      bodyRequest: {},
    },
    {
      manual: true,
      onSuccess: () => {
        alert("Category created successfully");
        setShowAddCategory(false)
        getCategories.refetch()
      },
      onError: () => {
        alert("Failed to create category")
      }
    }
  );

  async function onSubmit(values: z.infer<typeof createCategory>) {
    await refetch({
        bodyRequest: values
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      getCategories.refetch({
        params: {
          search: search || undefined,
          page,
          limit,
        },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, limit, search]);

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader className="p-0">
          <div className="pb-6 px-6">
            <p>Total Category: {getCategories.data?.totalData}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-x-2">
              <SearchInput
                value={search}
                setValue={setSearch}
                placeholder="Search by title"
              />
            </div>

            <Button onClick={() => setShowAddCategory(true)}>
              <PlusIcon /> Add Category
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0 mt-0">
          {getCategories.loading && !getCategories.data?.data ? (
            <p className="p-6">Loading..</p>
          ) : (
            <DataTable
              columns={columns}
              data={getCategories.data?.data ?? []}
              page={page}
              pageSize={limit}
              totalItems={getCategories.data?.totalData ?? 0}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </CardContent>
      </Card>
      <FormDialog
        openDialog={showAddCategory}
        setOpenDialog={setShowAddCategory}
        title="Add Category"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Input Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-3 relative z-10">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setShowAddCategory(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {loading ? <ButtonLoader /> : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </FormDialog>
    </>
  );
}
