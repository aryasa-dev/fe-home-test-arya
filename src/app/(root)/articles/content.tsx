"use client";
import { ArticleCard } from "@/components/ArticleCard";
import { DataLoader } from "@/components/DataLoader";
import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination";
import { useApi } from "@/hooks/useApi";
import { ArticlesResponse } from "@/types";
import { useEffect, useState } from "react";

export function ArticlesContent() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { data, loading, refetch, error } = useApi<ArticlesResponse>(
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
  }, [search, category, page, limit]);

  if (error) return <div>Ooops! Sorry something went wrong.</div>;

  return (
    <>
      <Hero
        categoryValue={category}
        setCategoryValue={setCategory}
        searchValue={search}
        setSearchValue={setSearch}
      />

      {/* List */}
      <section className="py-10 min-h-screen">
        <div className="container">
          {!loading && data ? (
            <>
              <p>
                Showing: {data.data.length} of {data.total}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px] mt-6 mb-10 h-full">
                {data.data.map((article) => (
                  <ArticleCard
                    key={article.id}
                    category={article.category}
                    content={article.content}
                    createdAt={article.createdAt}
                    id={article.id}
                    imageUrl={article.imageUrl}
                    title={article.title}
                  />
                ))}
              </div>

              <Pagination
                current={page}
                onChange={(p) => setPage(p)}
                perPage={limit}
                total={data.total}
              />
            </>
          ) : (
            <DataLoader className="mt-5" />
          )}
        </div>
      </section>
      {/* List */}
    </>
  );
}
