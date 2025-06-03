import { useState, useEffect } from "react";
import SidebarFilters from "../components/SidebarFilters";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [filters, setFilters] = useState({ category: "All", rating: 0, search: "" });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
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
        // Assuming API returns { message, data: [{ name: "Category1" }, { name: "Category2" }, ...] }
        const categoryNames = result.data.map((cat) => cat.name);
        setCategories(["All", ...categoryNames]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stock/all-stock-products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setProducts(result.data); // Assuming the API returns { message, data: [{ _id, name, category, rating, ... }, ...] }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      filters.category === "All" || p.category === filters.category;
    const matchRating = filters.rating === 0 || p.rating >= filters.rating;
    const matchSearch =
      filters.search === "" ||
      p.name?.toLowerCase().includes(filters.search.toLowerCase()); // Assuming product has a 'name' field
    return matchCategory && matchRating && matchSearch;
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
            {/* Display current filter context */}
            <p className="text-gray-700 mb-6 text-lg">
              Showing products for: <span className="font-semibold text-orange-600">{filters.category}</span>
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