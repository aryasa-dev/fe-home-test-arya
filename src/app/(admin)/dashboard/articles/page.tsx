import React from "react";
import { ArticlesContent } from "./content";

export const metadata = {
  title: "Articles",
};

export default function DashboardArticlesPage() {
  return (
    <section>
      <div className="container">
        <ArticlesContent />
      </div>
    </section>
  );
}
