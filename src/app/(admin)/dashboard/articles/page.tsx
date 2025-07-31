"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SelectComponent from "@/components/SelectComponent";
import { useApi } from "@/hooks/useApi";
import { ArticlesResponse, CategoriesResponse } from "@/types";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { articlesColumns } from "./columns";
import { useRouter } from "next/navigation";

type Props = {};

export default function DashboardArticlesPage({}: Props) {
  const { data, loading } = useApi<CategoriesResponse>({
    method: "GET",
    path: "categories",
    auth: true,
  });
  const {
    data: articles,
    loading: articlesLoading,
    refetch,
  } = useApi<ArticlesResponse>(
    {
      method: "GET",
      path: "articles",
      auth: true,
      params: {},
    },
    {
      manual: true,
    }
  );
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch({
        params: {
          title: search || undefined,
          category: category || undefined,
          page,
          limit,
        },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, limit, category, search]);
  return (
    <section>
      <div className="container">
        <Card className="w-full h-full">
          <CardHeader className="p-0">
            <div className="pb-6 px-6">
              <p>Total Articles</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-x-2">
                <SelectComponent
                  label="Category"
                  data={data?.data ?? []}
                  value={category}
                  setValue={setCategory}
                />
                <SearchInput
                  value={search}
                  setValue={setSearch}
                  placeholder="Search by title"
                />
              </div>

              <Button onClick={() => router.push("articles/create")}>
                <PlusIcon /> Add Articles
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0 mt-0">
            {articlesLoading ? (
              <p className="p-6">Loading..</p>
            ) : (
              <DataTable
                columns={articlesColumns}
                data={articles?.data ?? []}
                page={page}
                pageSize={limit}
                totalItems={articles?.total ?? 0}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
