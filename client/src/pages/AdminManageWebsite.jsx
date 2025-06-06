import AdminSideBar from "../components/AdminSideBar";
import { FaImage, FaUsers, FaInfoCircle, FaEnvelope, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminManageWebsite = () => {
    const managementLinks = [
        {
            title: "Homepage Banners",
            icon: <FaImage className="text-orange-500 text-3xl" />,
            path: "/admin/manage-banners",
        },
        {
            title: "Contact Info",
            icon: <FaEnvelope className="text-orange-500 text-3xl" />,
            path: "/admin/manage-contact",
        },

    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 underline decoration-orange-400">
                    Manage Website
                </h1>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {managementLinks.map((item, idx) => (
                        <Link to={item.path} key={idx}>
                            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">
                                <div className="flex items-center space-x-4">
                                    {item.icon}
                                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminManageWebsite;
