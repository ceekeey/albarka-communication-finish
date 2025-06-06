import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const Contact = () => {
    const { id: productId } = useParams();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
            <Navbar />

            <main className="flex-grow px-6 md:px-20 py-16">
                <motion.section
                    className="max-w-5xl mx-auto bg  -white backdrop-blur-md bg-opacity-60 shadow-2xl rounded-2xl p-10"
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
                                // TODO: integrate with email/API
                                const formData = {
                                    name: e.target.name.value,
                                    email: e.target.email.value,
                                    phone: e.target.phone.value,
                                    message: e.target.message.value,
                                    productId
                                    // Optional: include productId from query param or props if needed
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
                            <div className="flex items-center space-x-4">
                                <FiPhone className="text-orange-600" size={24} />
                                <span className="text-gray-600 font-medium">+234 123 456 7890</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FiMail className="text-orange-600" size={24} />
                                <span className="text-gray-600 font-medium">support@yourcompany.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FiMapPin className="text-orange-600" size={24} />
                                <span className="text-gray-600 font-medium">
                                    Gombe State University, Gombe, Nigeria
                                </span>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-inner h-64">
                                <iframe
                                    title="Office Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.44774855024!2d7.2097540964540235!3d10.28945077717219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b1d387caf9f%3A0x7f1ef9bd05aae2a8!2sGombe%20State%20University!5e0!3m2!1sen!2sng!4v1616587595840!5m2!1sen!2sng"
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

            {/* Modern Footer */}
            <Footer />
        </div>
    );
};

export default Contact;

// Dependencies: react-icons, framer-motion
