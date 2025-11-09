"use client"

import { useState } from "react"
import NewsHero from "./NewsHero";
import NewsFilter from "./NewsFilter";
import NewsGrid from "./NewsGrid";
import { NewsItem, NewsCategory } from "../model/type";

interface NewsContainerProps {
  initialNews: NewsItem[]
  initialCategories: NewsCategory[]
}

export default function NewsContainer({ initialNews, initialCategories }: NewsContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen">
      <NewsHero />
      <NewsFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={initialCategories}
        newsItems={initialNews}
      />
      <NewsGrid
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        searchTerm={searchTerm}
        newsItems={initialNews}
      />
    </div>
  );
}