import {
    MagnifyingGlassIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SidebarFilters({ filters, setFilters, categories }) {
    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value });
    };

    return (
        <aside className="w-full md:w-72 p-6 bg-white shadow-lg rounded-r-3xl border-r transition-all duration-300 min-h-screen">
            <div className="flex items-center gap-3 mb-8 text-orange-600">
                <Link to={'/'}>
                    <FaHome size={40} className="text-orange-600" />
                </Link>
                Home
            </div>

            {/* Search */}
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map((cat) => {
                        const selected = filters.category === cat;
                        return (
                            <button
                                key={cat}
                                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${selected
                                    ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300 shadow-sm"
                                    : "hover:bg-orange-50 text-gray-700"
                                    }`}
                                onClick={() => setFilters({ ...filters, category: cat })}
                            >
                                {cat}
                                {selected && (
                                    <CheckCircleIcon className="w-5 h-5 text-orange-500 transform scale-100 animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}