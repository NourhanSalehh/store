"use client";

import { Search } from "lucide-react";
import productsData from "../../../products.json"; 

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  selectedCategory,
  setSelectedCategory,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchType: string;
  setSearchType: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}) {
  const categories = Array.from(
    new Set(productsData.map((product: any) => product.category))
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Type Select */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="title">Search By Title</option>
          <option value="category">Search By Category</option>
        </select>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchType === "title" ? "Search By Title" : "Search By Category"
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
