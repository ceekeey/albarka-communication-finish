import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBox, FaList } from "react-icons/fa";
import AdminSideBar from "../components/AdminSideBar";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const API_BASE = "http://localhost:5000/api";
    const [categories, setCategories] = useState([]);
    const [stats, setStats] = useState({
        categoryCount: 0,
        totalStock: 0,
    });
    const [loading, setLoading] = useState(false);

    // Fetch categories and calculate stats
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/catigory/all-catigory`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            const categoriesData = data.data || [];
            setCategories(categoriesData);
            // Calculate stats
            const categoryCount = categoriesData.length;
            const totalStock = categoriesData.reduce((sum, category) => sum + (category.productCount || 0), 0);
            setStats({
                categoryCount,
                totalStock,
            });
            if (data.message) {
                toast.success(data.message);
            }
        } catch (err) {
            toast.error("Failed to fetch categories");
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Framer Motion variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 underline decoration-orange-400">
                    Admin Dashboard
                </h1>

                {/* Statistics Section */}
                <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Overview
                    </h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                        </div>
                    ) : stats.categoryCount === 0 ? (
                        <motion.p
                            className="text-center text-gray-600 py-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            No categories or stock available.
                        </motion.p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto">
                            <AnimatePresence>
                                <motion.div
                                    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow"
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaList className="text-orange-500 text-2xl" />
                                    <div>
                                        <h3 className="text-sm sm:text-base font-medium text-gray-600">
                                            Total Categories
                                        </h3>
                                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                                            {stats.categoryCount}
                                        </p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow"
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaBox className="text-orange-500 text-2xl" />
                                    <div>
                                        <h3 className="text-sm sm:text-base font-medium text-gray-600">
                                            Total Stock
                                        </h3>
                                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                                            {stats.totalStock}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Categories Section */}
                <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Select Category
                    </h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                        </div>
                    ) : categories.length === 0 ? (
                        <motion.p
                            className="text-center text-gray-600 py-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            No categories found.
                        </motion.p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                            <AnimatePresence>
                                {categories.map((item, index) => (
                                    <motion.div
                                        key={item.index}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <NavLink
                                            to={`/admin/manage-stocks/${item._id}`}
                                            className={({ isActive }) =>
                                                `bg-gray-50 rounded-lg p-5 flex flex-col items-center shadow-xl hover:shadow-2xl transition-shadow ${isActive ? "bg-orange-100" : ""
                                                }`
                                            }
                                        >
                                            <FaList className="text-orange-500 text-2xl mb-2" />
                                            <span className="font-semibold text-gray-700">{item.name}</span>
                                            <span className="text-xl font-bold text-orange-600">
                                                Stock: {item.productCount || 0}
                                            </span>
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default AdminDashboard;