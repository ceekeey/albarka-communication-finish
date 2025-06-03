import { NavLink } from "react-router-dom";
import { FaHome, FaList, FaBox, FaSignOutAlt, FaWrench } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminSideBar = () => {
    const handleLogout = () => {
        console.log("Logout clicked");
    };

    // Framer Motion variants for links
    const linkVariants = {
        hover: { scale: 1.05, x: 5, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    return (
        <motion.aside
            className="w-full md:w-64 bg-gray-800 text-white p-4 flex-shrink-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <NavLink to="/admin/home" className="block mb-6">
                <h2 className="text-lg font-semibold text-orange-400 flex items-center space-x-2">
                    <FaHome className="text-xl" />
                    <span>Admin Dashboard</span>
                </h2>
            </NavLink>
            <ul className="space-y-2">
                <li>
                    <NavLink
                        to="/admin/home"
                        className={({ isActive }) =>
                            `block p-2 rounded flex items-center space-x-2 transition-colors ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <motion.div
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center space-x-2 w-full"
                            >
                                <FaHome className="text-lg" />
                                <span>Dashboard</span>
                            </motion.div>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/manage-catigory"
                        className={({ isActive }) =>
                            `block p-2 rounded flex items-center space-x-2 transition-colors ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <motion.div
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center space-x-2 w-full"
                            >
                                <FaList className="text-lg" />
                                <span>Manage Category</span>
                            </motion.div>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/manage-stock"
                        className={({ isActive }) =>
                            `block p-2 rounded flex items-center space-x-2 transition-colors ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <motion.div
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center space-x-2 w-full"
                            >
                                <FaBox className="text-lg" />
                                <span>Manage Stock</span>
                            </motion.div>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/manage-website"
                        className={({ isActive }) =>
                            `block p-2 rounded flex items-center space-x-2 transition-colors ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <motion.div
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center space-x-2 w-full"
                            >
                                <FaWrench className="text-lg" />
                                <span>Settings</span>
                            </motion.div>
                        )}
                    </NavLink>
                </li>
                <li>
                    <motion.button
                        onClick={handleLogout}
                        className="w-full text-left p-2 rounded flex items-center space-x-2 hover:bg-orange-500 transition-colors"
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span>Logout</span>
                    </motion.button>
                </li>
            </ul>
        </motion.aside >
    );
};

export default AdminSideBar;