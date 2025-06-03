import { useState, useEffect } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import AdminSideBar from "../components/AdminSideBar";
import toast from "react-hot-toast";

const ManageCatigory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const API_BASE = "http://localhost:5000/api/catigory";

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/all-catigory`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setCategories(data.data);
            toast.success("Categories Retrieved");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/add-catigory`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            });
            const data = await res.json();
            setLoading(false);
            if (res.ok) {
                fetchCategories();
                closeModals();
            }
            if (data.message) {
                toast.success(data.message);
            }
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    const handleEditCategory = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/update-catigory/${selectedCategory._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory),
            });
            const data = await res.json();
            setLoading(false);
            if (res.ok) {
                fetchCategories();
                closeModals();
            }
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.message) {
                toast.success(data.message);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/delete-catigory/${selectedCategory._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            setLoading(false);
            if (res.ok) {
                fetchCategories();
                closeModals();
            }
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.message) {
                toast.success(data.message);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    // State for modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handlers for modals
    const openAddModal = () => {
        setNewCategory({ name: "", description: "" });
        setIsAddModalOpen(true);
    };

    const openEditModal = (category) => {
        setSelectedCategory(category);
        setNewCategory({ name: category.name, description: category.description });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        setNewCategory({ name: "", description: "" });
    };

    // Framer Motion variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.1, transition: { duration: 0.2 } },
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.5 },
        }),
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 underline decoration-orange-400"
                >
                    Admin Dashboard
                </motion.h1>

                {/* Statistics Section */}
                <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Category Statistics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                        >
                            <FaBox className="text-orange-500 text-2xl" />
                            <div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-600">
                                    Total Categories
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-gray-800">
                                    {categories.length}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Action Links Section */}
                <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Category Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                        <motion.button
                            variants={buttonVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            onClick={openAddModal}
                            className="bg-orange-600 text-white p-4 rounded-md flex items-center justify-center space-x-2 hover:bg-orange-700 transition-colors"
                        >
                            <FaPlus className="text-lg" />
                            <span className="text-sm sm:text-base font-medium">Add category</span>
                            {loading && <FaSpinner className="animate-spin text-lg" />}
                        </motion.button>
                    </div>
                </div>

                {/* Categories Table */}
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Categories List
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Description</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                                {categories.length === 0 ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-center py-4 text-red-500 text-sm"
                                    >
                                        No Category Yet
                                    </motion.p>
                                ) : (
                                    categories.map((category, index) => (
                                        <motion.tr
                                            key={category._id}
                                            custom={index}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="py-3 px-6 text-left">{category.name}</td>
                                            <td className="py-3 px-6 text-left">{category.description}</td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center space-x-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => openEditModal(category)}
                                                        className="text-blue-600 hover:text-blue-800 relative"
                                                    >
                                                        <FaEdit />
                                                        {loading && selectedCategory?._id === category._id && (
                                                            <FaSpinner className="animate-spin text-xs absolute top-0 right-0" />
                                                        )}
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => openDeleteModal(category)}
                                                        className="text-red-600 hover:text-red-800 relative"
                                                    >
                                                        <FaTrash />
                                                        {loading && selectedCategory?._id === category._id && (
                                                            <FaSpinner className="animate-spin text-xs absolute top-0 right-0" />
                                                        )}
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Category Modal */}
                {isAddModalOpen && (
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Category</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, name: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        value={newCategory.description}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, description: e.target.value })
                                        }
                                        className="mt-1 p-3 border border-gray-500 block w-full rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="Enter category description"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={closeModals}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddCategory}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center space-x-2"
                                >
                                    <span>{loading ? "Adding..." : "Add Category"}</span>
                                    {loading && <FaSpinner className="animate-spin text-lg" />}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Edit Category Modal */}
                {isEditModalOpen && (
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, name: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        value={newCategory.description}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, description: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md p-3 border border-gray-500shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="Enter category description"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={closeModals}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleEditCategory}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center space-x-2"
                                >
                                    <span>{loading ? "Updating..." : "Update Category"}</span>
                                    {loading && <FaSpinner className="animate-spin text-lg" />}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                Confirm Delete
                            </h2>
                            <p className="text-gray-600">
                                Are you sure you want to delete the category "
                                {selectedCategory?.name}"?
                            </p>
                            <div className="mt-6 flex justify-end space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={closeModals}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDeleteCategory}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center space-x-2"
                                >
                                    <span>{loading ? "Deleting..." : "Delete"}</span>
                                    {loading && <FaSpinner className="animate-spin text-lg" />}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default ManageCatigory;
