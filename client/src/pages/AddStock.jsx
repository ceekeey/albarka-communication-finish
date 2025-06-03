import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AdminSideBar from "../components/AdminSideBar";


const AddStock = () => {
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        rating: "",
        category: "",
        image: "",
    });
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear errors for the field being edited
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.price || formData.price <= 0) newErrors.price = "Price must be a positive number";
        if (!formData.rating || formData.rating < 1 || formData.rating > 5)
            newErrors.rating = "Rating must be between 1 and 5";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.image) newErrors.image = "Image URL is required";
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Generate a unique ID (for demo purposes)
        const newProduct = {
            id: Date.now(), // Simple ID generation
            ...formData,
            price: parseFloat(formData.price),
            rating: parseInt(formData.rating),
        };

        // Log to console (placeholder for backend API call)
        console.log("New Product:", newProduct);

        // Reset form
        setFormData({
            title: "",
            description: "",
            price: "",
            rating: "",
            category: "",
            image: "",
        });
        alert("Product added successfully! (Logged to console)");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-6">
                    <Link to="/admin/home" className="mr-4 text-orange-600 hover:text-orange-500">
                        <FaArrowLeft className="text-lg" />
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 underline decoration-orange-400">
                        Add New Stock
                    </h1>
                </div>

                <div className="max-w-7xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-lg shadow-md p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                placeholder="Enter product title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                placeholder="Enter product description"
                                rows="3"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                placeholder="Enter price"
                                step="0.01"
                                min="0"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                placeholder="Enter rating"
                                min="1"
                                max="5"
                            />
                            {errors.rating && (
                                <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                            >
                                <option value="">Select a category</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                                placeholder="Enter image URL"
                            />
                            {errors.image && (
                                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="sm:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition-colors"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddStock;