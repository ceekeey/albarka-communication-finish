import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard"; // Adjust the import path as necessary

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/stock/all-stock");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const result = await response.json();
                setProducts(result.data); // Assuming the API returns { message, data: [...] }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        (product.title + (product.description || ""))
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-4 py-16 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-6 underline decoration-orange-400">Latest Products</h2>

            <div className="max-w-lg mx-auto mb-10 px-4">
                <input
                    type="text"
                    placeholder="Search for a product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 transition-colors"
                />
            </div>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Loading products...</p>
            ) : error ? (
                <p className="text-center text-red-500 text-lg">Error: {error}</p>
            ) : filteredProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                        {filteredProducts.map((product, idx) => (
                            <div key={product._id || idx} className="w-full">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-8">
                        <Link to={'/products'}>
                            <button className="bg-orange-600 py-3 px-8 rounded-md text-white font-medium hover:bg-orange-700 transition-colors">
                                View All Stock
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 text-lg">No products match your search.</p>
            )}
        </div>
    );
}