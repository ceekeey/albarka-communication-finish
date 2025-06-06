import { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const AdminContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // <-- search state

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/contact");
            const data = await res.json();
            setContacts(data.data);
        } catch (error) {
            toast.error("Failed to fetch contacts");
        } finally {
            setLoading(false);
        }
    };

    // Filter contacts by search term
    const filteredContacts = contacts.filter((c) => {
        const term = searchTerm.toLowerCase();
        const contactName = c.name?.toLowerCase() || "";
        const contactEmail = c.email?.toLowerCase() || "";
        const productName = c.productId?.name?.toLowerCase() || "";

        return (
            contactName.includes(term) ||
            contactEmail.includes(term) ||
            productName.includes(term)
        );
    });

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            <AdminSideBar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 underline decoration-orange-400">
                    Contact Messages
                </h1>

                {/* Search input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, email or product..."
                        className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                    </div>
                ) : filteredContacts.length === 0 ? (
                    <motion.p
                        className="text-center text-gray-600 py-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No contact messages found.
                    </motion.p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">#</th>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Phone</th>
                                    <th className="py-3 px-6 text-left">Message</th>
                                    <th className="py-3 px-6 text-left">Product</th>
                                    <th className="py-3 px-6 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                                <AnimatePresence>
                                    {filteredContacts.map((c, idx) => (
                                        <motion.tr
                                            key={c._id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                            variants={listItemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            layout
                                        >
                                            <td className="py-3 px-6">{idx + 1}</td>
                                            <td className="py-3 px-6">{c.name}</td>
                                            <td className="py-3 px-6">{c.email}</td>
                                            <td className="py-3 px-6">{c.phone}</td>
                                            <td className="py-3 px-6">{c.message}</td>
                                            <td className="py-3 px-6 flex items-center space-x-3">
                                                {c.productId ? (
                                                    <>
                                                        <img
                                                            src={`http://localhost:5000${c.productId.image}`}
                                                            alt={c.productId.name}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                        <span>{c.productId.name}</span>
                                                    </>
                                                ) : (
                                                    <span className="italic text-gray-400">No product</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-6">{new Date(c.createdAt).toLocaleString()}</td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminContact;
