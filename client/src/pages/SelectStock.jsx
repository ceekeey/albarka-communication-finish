import { Link } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import AdminSideBar from "../components/AdminSideBar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const API_BASE = "http://localhost:5000/api/catigory";
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/all-catigory`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setCategories(data.data || []);
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

    // Framer Motion variants for category cards
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

                {/* Action Links Section */}
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Select Category To Proceed
                    </h2>
                    {/* Responsive columns with titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {loading ? (
                            <div className="flex justify-center items-center py-10 col-span-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                            </div>
                        ) : categories.length === 0 ? (
                            <motion.p
                                className="text-center text-gray-600 py-10 col-span-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                No categories found.
                            </motion.p>
                        ) : (
                            <AnimatePresence>
                                {categories.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to={`/admin/manage-stocks/${item._id}`}>
                                            <div className="bg-gray-50 rounded p-5 flex flex-col items-center shadow-xl">
                                                <FaBox className="text-orange-500 text-2xl mb-2" />
                                                <span className="font-semibold text-gray-700">{item.name}</span>
                                                <span className="text-xl font-bold text-orange-600">
                                                    Stock: {item.productCount || 0}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;