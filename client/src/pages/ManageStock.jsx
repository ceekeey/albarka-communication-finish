import { useState, useEffect } from "react";
import { FaBox, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from 'browser-image-compression';

const ManageStock = () => {
    const { categoryId } = useParams();
    const [stockItems, setStockItems] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [newStock, setNewStock] = useState({ name: "", description: "", image: null, periority: "", quantity: "" });
    const [loading, setLoading] = useState(false);

    // Fetch stock items on component mount
    useEffect(() => {
        fetchStockItems();
    }, []);

    const fetchStockItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/stock/all-stock-admin/${categoryId}`);
            const data = await response.json();
            setStockItems(data.data || []);
            if (data.message) {
                toast.success(data.message);
            }
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (err) {
            toast.error("Failed to fetch stock items");
        } finally {
            setLoading(false);
        }
    };

    // Handlers for modals
    const openAddModal = () => {
        setNewStock({ name: "", description: "", image: null });
        setIsAddModalOpen(true);
    };

    const openEditModal = (stock) => {
        setSelectedStock(stock);
        setNewStock({ name: stock.name, description: stock.description, image: null, periority: stock.periority, quantity: stock.quantity });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (stock) => {
        setSelectedStock(stock);
        setIsDeleteModalOpen(true);
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedStock(null);
        setNewStock({ name: "", description: "", image: null });
    };

    // Handle form submission for add
    const handleAddStock = async () => {
        setLoading(true);
        const formData = new FormData();

        formData.append("name", newStock.name);
        formData.append("description", newStock.description);
        formData.append("categoryId", categoryId);
        formData.append("periority", newStock.periority);
        formData.append("quantity", newStock.quantity);

        if (newStock.image) {
            try {
                const options = {
                    maxSizeMB: 1, // Compress to under 1MB
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                const compressedImage = await imageCompression(newStock.image, options);
                formData.append("image", compressedImage);
            } catch (compressionError) {
                toast.error("Image compression failed");
                console.error("Compression Error:", compressionError);
                setLoading(false);
                return;
            }
        }

        try {
            const response = await fetch("http://localhost:5000/api/stock/add-stock", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.message) {
                closeModals();
                await fetchStockItems();
                toast.success(data.message);
            }
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    // Handle form submission for edit
    const handleEditStock = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", newStock.name);
        formData.append("description", newStock.description);
        formData.append("periority", newStock.periority);
        formData.append("quantity", newStock.quantity);
        if (newStock.image) {
            try {
                const options = {
                    maxSizeMB: 1, // Compress to under 1MB
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                const compressedImage = await imageCompression(newStock.image, options);
                formData.append("image", compressedImage);
            } catch (compressionError) {
                toast.error("Image compression failed");
                console.error("Compression Error:", compressionError);
                setLoading(false);
                return;
            }
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/stock/update-stock/${selectedStock._id}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );
            const data = await response.json();
            if (response.ok) {
                await fetchStockItems();
                closeModals();
                toast.success(data.message);
            }
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete
    const handleDeleteStock = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5000/api/stock/delete-stock/${selectedStock._id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
            if (response.ok) {
                await fetchStockItems();
                closeModals();
                toast.success(data.message);
            }
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setNewStock((prev) => ({ ...prev, image: files[0] }));
        } else {
            setNewStock((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Framer Motion variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <AdminSideBar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 underline decoration-orange-400">
                    Admin Dashboard
                </h1>
                <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Stock Statistics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                            <FaBox className="text-orange-500 text-2xl" />
                            <div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-600">
                                    Total Stock Items
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-gray-800">
                                    {stockItems?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Stock Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                        <motion.button
                            onClick={openAddModal}
                            className="bg-orange-600 text-white p-4 rounded-md flex items-center justify-center space-x-2 hover:bg-orange-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaPlus className="text-lg" />
                            <span className="text-sm sm:text-base font-medium">Add Stock</span>
                        </motion.button>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                        Stock List
                    </h2>
                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                        </div>
                    ) : stockItems.length === 0 ? (
                        <motion.p
                            className="text-center text-gray-600 py-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            No stock items found for this category.
                        </motion.p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Image</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Description</th>
                                        <th className="py-3 px-6 text-left">Periority</th>
                                        <th className="py-3 px-6 text-left">Quantity</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm">
                                    <AnimatePresence>
                                        {stockItems.map((item, ind) => (
                                            <motion.tr
                                                key={item._id}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                                variants={listItemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                layout
                                            >
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    {ind + 1}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <img
                                                        src={`http://localhost:5000${item.image}`}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="py-3 px-6 text-left">{item.name}</td>
                                                <td className="py-3 px-6 text-left">{item.description}</td>
                                                <td className="py-3 px-6 text-left">{item.periority}</td>
                                                <td className="py-3 px-6 text-left">{item.quantity}</td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center space-x-2">
                                                        <motion.button
                                                            onClick={() => openEditModal(item)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                            whileHover={{ scale: 1.2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <FaEdit />
                                                        </motion.button>
                                                        <motion.button
                                                            onClick={() => openDeleteModal(item)}
                                                            className="text-red-600 hover:text-red-800"
                                                            whileHover={{ scale: 1.2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <FaTrash />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {isAddModalOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Stock</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newStock.name}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter stock name"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={newStock.quantity}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter quantity"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Periority</label>
                                        <input
                                            type="number"
                                            name="periority"
                                            min={1}
                                            max={5}
                                            value={newStock.periority}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter priority (1–5)"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            accept="image/*"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={newStock.description}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter stock description"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-2">
                                    <motion.button
                                        onClick={closeModals}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        onClick={handleAddStock}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="animate-spin mr-2">↻</span>
                                        ) : null}
                                        Add
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {isEditModalOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Stock</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newStock.name}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter stock name"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Periority</label>
                                        <input
                                            type="text"
                                            name="periority"
                                            value={newStock.periority}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter priority"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={newStock.quantity}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter quantity"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            accept="image/*"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={newStock.description}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md p-3 border border-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter stock description"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-2">
                                    <motion.button
                                        onClick={closeModals}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        onClick={handleEditStock}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="animate-spin mr-2">↻</span>
                                        ) : null}
                                        Save
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {isDeleteModalOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white rounded-lg p-6 w-full max-w-md"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Confirm Delete
                                </h2>
                                <p className="text-gray-600">
                                    Are you sure you want to delete the stock item "
                                    {selectedStock?.name}"?
                                </p>
                                <div className="mt-6 flex justify-end space-x-2">
                                    <motion.button
                                        onClick={closeModals}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        onClick={handleDeleteStock}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="animate-spin mr-2">↻</span>
                                        ) : null}
                                        Delete
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ManageStock;