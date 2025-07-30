"use client";
import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination";
import { useApi } from "@/hooks/useApi";
import { formattedDate } from "@/lib/utils";
import { ArticlesResponse } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { data, loading, refetch } = useApi<ArticlesResponse>(
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

  return (
    <>
      <Hero categoryValue={category} setCategoryValue={setCategory} searchValue={search} setSearchValue={setSearch} />

      {/* List */}
      <section className="py-10 min-h-screen">
        <div className="container">
          {!loading && data ? (
            <>
              <p>
                Showing: {data.data.length} of {data.total}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px] mt-6 mb-10">
                {data.data.map((article) => (
                  <div key={article.id} className="">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={400}
                      height={400}
                      className="w-full h-60 object-cover rounded-[12px]"
                    />

                    <div className="mt-4 space-y-2">
                      <p className="text-slate-600 text-sm">
                        {formattedDate(article.createdAt)}
                      </p>
                      <h4 className="text-slate-900 font-semibold text-lg">
                        {article.title}
                      </h4>
                      <div className="line-clamp-3 overflow-hidden" dangerouslySetInnerHTML={{ __html: article.content }}></div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-blue-200 text-blue-900 text-sm px-3 py-1 rounded-full">
                          {article.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination current={page} onChange={p => setPage(p)} perPage={limit} total={data.total} />
            </>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </section>
      {/* List */}
    </>
  );
}
