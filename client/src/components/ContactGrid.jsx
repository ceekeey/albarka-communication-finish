import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ContactGrid = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({ _id: "", icon: "", link: "" });
    const [formData, setFormData] = useState({ icon: "", link: "" });

    const getLocation = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/links/get-location');
            const data = await res.json();
            setContacts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateContact = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/links/update-location/${currentContact._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const updatedContact = await res.json();
                setContacts(contacts.map((contact) =>
                    contact._id === updatedContact._id ? updatedContact : contact
                ));
                setIsModalOpen(false);
                setFormData({ icon: "", link: "" });
            } else {
                console.error('Failed to update contact');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const openEditModal = (contact) => {
        setCurrentContact(contact);
        setFormData({ icon: contact.icon, link: contact.link });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ icon: "", link: "" });
    };

    useEffect(() => {
        getLocation();
    }, [updateContact]);

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {contacts.map((item, index) => (
                    <motion.div
                        key={item._id}
                        className="bg-white p-6 rounded-lg shadow text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        {item.icon === "location" && <FaMapMarkerAlt className="text-red-500 text-4xl mb-3" />}
                        {item.icon === "email" && <FaEnvelope className="text-blue-500 text-4xl mb-3" />}
                        {item.icon === "phone" && <FaPhoneAlt className="text-green-500 text-4xl mb-3" />}

                        <h3 className="text-lg font-semibold mb-1 capitalize">{item.icon}</h3>
                        <p className="text-orange-700">{item.link}</p>

                        <button
                            className="mt-3 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-900"
                            onClick={() => openEditModal(item)}
                        >
                            Edit
                        </button>
                    </motion.div>
                ))}
            </section>

            {isModalOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
                        <div>
                            <div className="mb-4">
                                <label className="block text-orange-700 mb-1" htmlFor="icon">Icon</label>
                                <select
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                                >
                                    <option value="location">Location</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-orange-700 mb-1" htmlFor="link">Link</label>
                                <input
                                    id="link"
                                    type="text"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                                    placeholder="Enter contact detail"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 bg-orange-300 rounded hover:bg-orange-400"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                                    onClick={updateContact}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default ContactGrid;