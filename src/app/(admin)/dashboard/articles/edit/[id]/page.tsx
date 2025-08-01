import React from "react";
import { EditArticleContent } from "./content";

export const metadata = {
  title: "Edit Article",
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <section>
      <div className="container">
        <EditArticleContent id={id as string} />
      </div>
    </section>
  );
}
