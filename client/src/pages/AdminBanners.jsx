import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import AdminSideBar from "../components/AdminSideBar";
import BannerModal from "../components/BannerModal";
import toast from "react-hot-toast";

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
            setBanners(data.data || []);
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
            if (data.success) {
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