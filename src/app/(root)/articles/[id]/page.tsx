import React from "react";
import { DetailArticleContent } from "./content";

export const metadata = {
  title: "Detail Article",
};

export default async function DetailArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <DetailArticleContent id={id as string} />;
}
