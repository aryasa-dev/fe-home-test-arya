"use client";
import { ArticleCard } from "@/components/ArticleCard";
import { useApi } from "@/hooks/useApi";
import { formattedDate } from "@/lib/utils";
import { Article, ArticlesResponse } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Props = {};

export default function DetailArticle({}: Props) {
  const params = useParams();

  const { data, loading } = useApi<Article>({
    method: "GET",
    path: `articles/${params.id}`,
    auth: true,
  });

  const { data: articles, refetch } = useApi<ArticlesResponse>(
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
    refetch({
      params: {
        category: data?.categoryId || undefined,
      },
    });
  }, [data, params.id]);

  const otherArticles = useMemo(() => {
    return articles?.data.filter((item: any) => item.id !== params.id)
      .slice(0, 3);
  }, [articles, params.id]);

  console.log(data);
  return (
    <section className="min-h-screen pt-20 pb-10">
      <div className="container">
        {!loading && data ? (
          <div>
            <div className="flex items-center justify-center gap-x-1.5 text-slate-600 font-medium text-sm">
              <p>{formattedDate(data.createdAt)}</p>
              <div className="w-1 h-1 bg-slate-600 rounded-full" />
              <p>Created by {data.user.username}</p>
            </div>

            <h2 className="text-3xl font-semibold text-slate-900 mt-4 max-w-2xl text-center mx-auto">
              {data.title}
            </h2>

            <Image
              src={data.imageUrl}
              alt={data.title}
              width={800}
              height={400}
              className="w-full h-auto max-h-[480px] my-10 rounded-lg object-cover"
            />

            <data dangerouslySetInnerHTML={{ __html: data.content }} />

            <div className="mt-20">
              <b className="text-xl font-bold text-slate-900 block mb-6">Other articles</b>
              <div className="grid grid-cols-3 gap-10">
                {otherArticles?.map((article) => (
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
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
