import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import AdminSideBar from "../components/AdminSideBar";
import toast from "react-hot-toast";

const BannerModal = ({ isOpen, onClose, onBannerAdded }) => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/banner', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.message) {
                toast.success(data.message);
                setTitle('');
                setSubtitle('');
                setImage(null);
                onBannerAdded(); // Trigger parent component to refresh banners
                onClose(); // Close the modal
            }
            if (data.error) {
                throw new Error(data.error)
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-orange-600 mb-4">Add New Banner</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Add Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch banners on mount
    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/banner");
            const data = await res.json();
            setBanners(data || []);
        } catch (err) {
            toast.error("Failed to fetch banners");
        } finally {
            setLoading(false);
        }
    };

    const deleteBanner = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/banner/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.message) {
                toast.success("Banner deleted");
                fetchBanners();
            } else {
                toast.error(data.message || "Delete failed");
            }
        } catch (err) {
            toast.error("Error deleting banner");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 underline decoration-orange-400">
                        Manage Banners
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
                    >
                        <FaPlus />
                        Add New
                    </button>
                </div>

                {loading ? (
                    <p className="text-center py-10 text-gray-600">Loading banners...</p>
                ) : banners.length === 0 ? (
                    <p className="text-center py-10 text-gray-600">No banners found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banners.map((banner) => (
                            <div
                                key={banner._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={`http://localhost:5000${banner.imageUrl}`}
                                    alt={banner.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{banner.title}</h2>
                                    <p className="text-sm text-gray-600">{banner.subtitle}</p>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() => deleteBanner(banner._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <BannerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onBannerAdded={fetchBanners}
                />
            </main>
        </div>
    );
};

export default AdminBanners;