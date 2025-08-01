import React from "react";
import { CreateArticleContent } from "./content";

export const metadata = {
  title: "Create Articles",
};

export default function CreateArticlePage() {
  return (
    <section>
      <div className="container">
        <CreateArticleContent />
      </div>
    </section>
  );
}
