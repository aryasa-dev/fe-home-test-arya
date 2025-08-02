import React from "react";
import { PreviewArticleContent } from "./content";

export const metadata = {
  title: "Preview Article",
};

export default async function PreviewArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
      <div className="container">
        <PreviewArticleContent id={id as string} />
      </div>
    </section>
  );
}
