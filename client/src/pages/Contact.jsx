import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Contact = () => {
    const { id: productId } = useParams();
    const [contactInfo, setContactInfo] = useState({
        phone: '+234 123 456 7890',
        email: 'support@yourcompany.com',
        address: 'Gombe State University, Gombe, Nigeria',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getLocation = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/links/get-location');
            if (!res.ok) throw new Error('Failed to fetch contact info');
            const data = await res.json();
            // Process array to map icon to corresponding contact info
            const newContactInfo = {
                phone: '+234 123 456 7890', // Fallback
                email: 'support@yourcompany.com', // Fallback
                address: 'Gombe State University, Gombe, Nigeria', // Fallback
            };
            data.forEach(item => {
                if (item.icon === 'phone') newContactInfo.phone = `+234 ${item.link}` || newContactInfo.phone;
                if (item.icon === 'email') newContactInfo.email = item.link || newContactInfo.email;
                if (item.icon === 'location') newContactInfo.address = item.link || newContactInfo.address;
            });
            setContactInfo(newContactInfo);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Could not load contact information');
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
            <Navbar />

            <main className="flex-grow px-6 md:px-20 py-16">
                <motion.section
                    className="max-w-5xl mx-auto bg-white backdrop-blur-md bg-opacity-60 shadow-2xl rounded-2xl p-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-orange-600 text-center text-5xl font-extrabold mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                        We’re here to answer questions, provide support, or just chat. Fill out the form or reach out through any of the channels below.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Contact Form */}
                        <motion.form
                            className="space-y-6"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = {
                                    name: e.target.name.value,
                                    email: e.target.email.value,
                                    phone: e.target.phone.value,
                                    message: e.target.message.value,
                                    productId,
                                };
                                try {
                                    const res = await fetch('http://localhost:5000/api/contact', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(formData),
                                    });

                                    const data = await res.json();
                                    if (res.ok) {
                                        alert(data.message);
                                        e.target.reset();
                                    } else {
                                        alert(data.error || 'Failed to send message.');
                                    }
                                } catch (err) {
                                    alert('Network error. Please try again later.');
                                }
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {['Name', 'Email', 'Phone', 'Message'].map((field, idx) => (
                                <div key={idx} className="relative group">
                                    {field === 'Message' ? (
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            required
                                            className="peer w-full border-b-2 border-gray-300 bg-transparent focus:outline-none placeholder-transparent"
                                            placeholder="Message"
                                        />
                                    ) : (
                                        <input
                                            type={
                                                field === 'Email'
                                                    ? 'email'
                                                    : field === 'Phone'
                                                        ? 'tel'
                                                        : 'text'
                                            }
                                            id={field.toLowerCase()}
                                            name={field.toLowerCase()}
                                            required
                                            className="peer h-12 md:h-14 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none placeholder-transparent"
                                            placeholder={field}
                                        />
                                    )}
                                    <label
                                        htmlFor={field.toLowerCase()}
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        {field}
                                    </label>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full py-4 bg-orange-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                            >
                                Send Message
                            </button>
                        </motion.form>

                        {/* Contact Info & Map */}
                        <motion.div
                            className="space-y-6 flex flex-col justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            {loading ? (
                                <p>Loading contact info...</p>
                            ) : error ? (
                                <p className="text-red-600">{error}</p>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-4">
                                        <FiPhone className="text-orange-600" size={24} />
                                        <span className="text-gray-600 font-medium">{contactInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <FiMail className="text-orange-600" size={24} />
                                        <span className="text-gray-600 font-medium">{contactInfo.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <FiMapPin className="text-orange-600" size={24} />
                                        <span className="text-gray-600 font-medium">{contactInfo.address}</span>
                                    </div>
                                </>
                            )}

                            <div className="rounded-xl overflow-hidden shadow-inner h-64">
                                <iframe
                                    title="Office Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252516.4187146934!2d7.297506803409057!3d9.081999008720904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62c2b%3A0x53e7e1d077f6fa3e!2sAbuja%2C%20Federal%20Capital%20Territory%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1698765432109!5m2!1sen!2sng"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;