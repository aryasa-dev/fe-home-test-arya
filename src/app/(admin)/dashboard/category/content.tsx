"use client";
import { DataTable } from "@/components/DataTable";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getCategoryColumns } from "./columns";
import { useApi } from "@/hooks/useApi";
import { CategoriesResponse, Category } from "@/types";
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
import { createCategory, editCategory } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ButtonLoader } from "@/components/ButtonLoader";

type Props = {};

export default function DashboardCategoryContent({}: Props) {
  const formCreate = useForm<z.infer<typeof createCategory>>({
    resolver: zodResolver(createCategory),
  });
  const formEdit = useForm<z.infer<typeof editCategory>>({
    resolver: zodResolver(editCategory),
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [idCategory, setIdCategory] = useState<string | null>(null);

  // get categories
  const getCategories = useApi<CategoriesResponse>(
    {
      method: "GET",
      path: "categories",
      auth: true,
      params: {},
    },
    { manual: true }
  );

  // get category detail
  const getCategoryDetail = getCategories.data?.data.find(
    (item) => item.id === idCategory
  );

  // post category
  const { loading, refetch } = useApi(
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
        setShowAddCategory(false);
        getCategories.refetch();
      },
      onError: () => {
        alert("Failed to create category");
      },
    }
  );

  // edit category
  const { loading: editLoading, refetch: editCategoryRefetch } = useApi(
    {
      method: "PUT",
      path: `categories/${idCategory}`,
      auth: true,
      bodyRequest: {},
    },
    {
      manual: true,
      onSuccess: () => {
        alert("Category edited successfully");
        setShowEditCategory(false);
        getCategories.refetch();
      },
      onError: () => {
        alert("Failed to edit category");
      },
    }
  );

  const handleEdit = useCallback((id: string) => {
    setShowEditCategory(true);
    setIdCategory(id);
  }, []);

  const columns = useMemo(
    () =>
      getCategoryColumns(
        () => getCategories.refetch({ params: { page } }),
        handleEdit
      ),
    [getCategories.refetch, page, handleEdit]
  );

  async function onCreateSubmit(values: z.infer<typeof createCategory>) {
    await refetch({
      bodyRequest: values,
    });
  }

  async function onEditSubmit(values: z.infer<typeof createCategory>) {
    console.log(values);
    await editCategoryRefetch({
      bodyRequest: values,
    });
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

  useEffect(() => {
    if (idCategory && getCategoryDetail) {
      formEdit.reset(
        {
          name: getCategoryDetail.name || "",
        },
        {
          keepDirtyValues: true,
        }
      );
    }
  }, [idCategory, getCategoryDetail, formEdit]);

  if (getCategories.loading) return <p>Loading...</p>

  return (
    <>
      {/* {!getCategories.loading ? ( */}
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

              <Button
                onClick={() => {
                  setIdCategory(null);
                  setShowAddCategory(true);
                }}
              >
                <PlusIcon /> Add Category
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0 mt-0">
            <DataTable
              columns={columns}
              data={getCategories.data?.data ?? []}
              page={page}
              pageSize={limit}
              totalItems={getCategories.data?.totalData ?? 0}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </CardContent>
        </Card>
      {/* ) : (
        <p className="p-6">Loading..</p>
      )} */}

      {/* Create Category */}
      <FormDialog
        openDialog={showAddCategory}
        setOpenDialog={setShowAddCategory}
        title="Add Category"
      >
        <Form {...formCreate}>
          <form
            onSubmit={formCreate.handleSubmit(onCreateSubmit)}
            className="space-y-4"
          >
            <FormField
              control={formCreate.control}
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
              <Button type="submit" disabled={formCreate.formState.isSubmitting}>
                {loading ? <ButtonLoader /> : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </FormDialog>

      {/* Edit Category */}
      <FormDialog
        openDialog={showEditCategory}
        setOpenDialog={setShowEditCategory}
        title="Edit Category"
      >
        <Form {...formEdit}>
          <form
            onSubmit={formEdit.handleSubmit(onEditSubmit)}
            className="space-y-4"
          >
            <FormField
              control={formEdit.control}
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
                onClick={() => setShowEditCategory(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={formEdit.formState.isSubmitting}>
                {editLoading ? <ButtonLoader /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </FormDialog>
    </>
  );
}
