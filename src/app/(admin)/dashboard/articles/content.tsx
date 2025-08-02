"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { ArticlesResponse, CategoriesResponse } from "@/types";
import { useRouter } from "next/navigation";
import { getArticleColumns } from "./columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SelectComponent } from "@/components/SelectComponent";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { DataLoader } from "@/components/DataLoader";
import { Badge } from "@/components/ui/badge";

type Props = {};

export function ArticlesContent({}: Props) {
  const { data, loading } = useApi<CategoriesResponse>({
    method: "GET",
    path: "categories",
    auth: true,
  });
  const {
    data: articles,
    loading: articlesLoading,
    refetch,
    error,
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
  const columns = useMemo(() => getArticleColumns(refetch), [refetch]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [getDataLoading, setGetDataLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch({
        params: {
          title: search || undefined,
          category: category || undefined,
          page,
          limit,
        },
      }).finally(() => setGetDataLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, limit, category, search]);

  if (error) return <div>Ooops! Sorry something went wrong.</div>;

  return (
    <Card className="w-full h-full">
      <CardHeader className="p-0">
        <div className="pb-6 px-6">
          <p>Total Articles: {articles?.total}</p>
        </div>
        <Separator />
        <div className="flex items-start justify-between p-6">
          <div className="space-y-2.5">
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
                className="min-w-[240px] border border-border rounded-md"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              {category && (
                <Badge variant={"secondary"}>
                  {data?.data.find((item) => item.id === category)?.name}
                </Badge>
              )}
              {search && <Badge variant={"secondary"}>"{search}"</Badge>}

              {category || search ? (
                <span
                  className="text-red-500 underline cursor-pointer"
                  onClick={() => {
                    setCategory("");
                    setSearch("");
                  }}
                >
                  Reset
                </span>
              ) : null}
            </div>
          </div>

          <Button
            onClick={() => router.push("articles/create")}
            disabled={getDataLoading}
          >
            <PlusIcon /> Add Articles
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 mt-0">
        {!getDataLoading && articles ? (
          <DataTable
            columns={columns}
            data={articles?.data ?? []}
            page={page}
            pageSize={limit}
            totalItems={articles?.total ?? 0}
            onPageChange={(newPage) => setPage(newPage)}
          />
        ) : (
          <DataLoader className="mt-5" />
        )}
      </CardContent>
    </Card>
  );
}
