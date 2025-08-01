import React from "react";
import DashboardCategoryContent from "./content";

export const metadata = {
  title: "Category",
};

export default function DashboardCategoryPage() {
  return (
    <section>
      <div className="container">
        <DashboardCategoryContent />
      </div>
    </section>
  );
}
