import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaEdit, FaWhatsapp } from "react-icons/fa";
import AdminSideBar from "../components/AdminSideBar";
import toast from "react-hot-toast";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import ContactGrid from "../components/ContactGrid";
// Add these at the top, below your imports
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6">Are you sure you want to delete this social link?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    );
};

const EditSocialModal = ({ isOpen, onClose, social, onSave }) => {
    const [icon, setIcon] = useState(social?.icon || '');
    const [link, setLink] = useState(social?.link || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIcon(social?.icon || '');
        setLink(social?.link || '');
    }, [social]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/links/update-social/${social._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ icon, link }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Update failed');
            toast.success('Social link updated successfully');
            onSave();
            onClose();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Social Link</h2>
                <form onSubmit={handleUpdate}>
                    <label className="block mb-2 text-sm">Icon</label>
                    <select
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        className="w-full border p-2 rounded mb-4"
                        required
                    >
                        <option value="">Select icon</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="youtube">YouTube</option>
                        <option value="whatsapp">Whatsapp</option>
                    </select>

                    <label className="block mb-2 text-sm">Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full border p-2 rounded mb-4"
                        required
                    />

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const iconMap = {
    facebook: <FaFacebook size={30} className="text-blue-600" />,
    twitter: <FaTwitter size={30} className="text-blue-400" />,
    instagram: <FaInstagram size={30} className="text-pink-500" />,
    linkedin: <FaLinkedin size={30} className="text-blue-700" />,
    youtube: <FaYoutube size={30} className="text-red-600" />,
    whatsapp: <FaWhatsapp size={30} className="text-green-600" />
};



// Modal to add new social link
const BannerModal = ({ isOpen, onClose, onBannerAdded }) => {
    const [icon, setIcon] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/links/add-social", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ icon, link }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add social link");
            }

            toast.success("Social link added successfully!");
            onBannerAdded();
            onClose();
            setIcon('');
            setLink('');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-orange-600 mb-4">Add New Social</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        >
                            <option value="">Select an icon</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter</option>
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="youtube">YouTube</option>
                            <option value="whatsapp">Whatsapp</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                            {loading ? 'Uploading...' : 'Add Social'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ManageContact = () => {
    const [link, setLink] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSocial, setSelectedSocial] = useState(null);


    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/links/get-social");
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setLink(data || []);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/links/delete-social/${selectedSocial._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Delete failed");
            toast.success("Social link deleted");
            fetchBanners();
            setIsDeleteModalOpen(false);
        } catch (err) {
            toast.error(err.message);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 underline decoration-orange-400">
                        Manage Contact
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
                    <p className="text-center py-10 text-gray-600">Loading social links...</p>
                ) : link.length === 0 ? (
                    <p className="text-center py-10 text-gray-600">No social links found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-orange-500 text-white">
                                    <th className="py-3 px-4 text-left">Icon</th>
                                    <th className="py-3 px-4 text-left">Link</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {link.map((social) => (
                                    <tr key={social._id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-4 capitalize">{iconMap[social.icon] || <span>{social.icon}</span>}</td>
                                        <td className="py-3 px-4">
                                            <a
                                                href={social.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {social.link}
                                            </a>
                                        </td>
                                        <td className="py-3 px-4 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedSocial(social);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedSocial(social);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <ContactGrid />

                <BannerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onBannerAdded={fetchBanners}
                />
            </main>
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />

            <EditSocialModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                social={selectedSocial}
                onSave={fetchBanners}
            />

        </div>
    );
};

export default ManageContact;
