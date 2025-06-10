import { useState, useEffect } from "react";
import SidebarFilters from "../components/SidebarFilters";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [filters, setFilters] = useState({ category: { name: "All", id: null }, rating: 0, search: "" });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: "All", id: null }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/catigory/all-catigory");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const result = await response.json();
        const categoryList = [{ name: "All", id: null }, ...result.data.map(cat => ({ id: cat._id, name: cat.name }))];
        setCategories(categoryList);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = filters.category.id
          ? `http://localhost:5000/api/stock/stocks-by-category/${filters.category.id}`
          : "http://localhost:5000/api/stock/all-stock-products";

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setProducts(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters.category.id]); // Re-fetch when category ID changes

  const filteredProducts = products.filter((p) => {
    const productCategory = typeof p.category === "string" ? p.category : p.category?.name;
    const matchCategory =
      filters.category.name === "All" || productCategory === filters.category.name;
    const matchSearch =
      filters.search === "" ||
      p.name?.toLowerCase().includes(filters.search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <SidebarFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      <main className="flex-1 p-6">
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        {loading ? (
          <p className="text-gray-600 text-center">Loading products...</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-orange-600 underline decoration-orange-400">
              Our Products
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              Showing products for: <span className="font-semibold text-orange-600">{filters.category.name}</span>
              {filters.category.id && (
                <span> (ID: {filters.category.id})</span>
              )}
              {filters.search && (
                <>
                  {" "}matching <span className="font-semibold text-orange-600">"{filters.search}"</span>
                </>
              )}
              {filteredProducts.length > 0 && (
                <span> ({filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"})</span>
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <div key={product._id || idx} className="w-full">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">
                  No products match the selected filters.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}