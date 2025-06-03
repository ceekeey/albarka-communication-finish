import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-4 md:gap-8 items-center">
                {/* Copyright Section */}
                <div className="text-center md:text-left">
                    <h3 className="text-sm sm:text-base font-semibold mb-1">
                        © Copyright www.albarka.net.ng. All Rights Reserved
                    </h3>
                    <span className="text-xs sm:text-sm">
                        Developed by{" "}
                        <a
                            href="https://www.ngit.com.ng/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-orange-400 transition-colors"
                        >
                            NGIT Software Solutions
                        </a>
                    </span>
                </div>

                {/* Icons Section */}
                <div className="flex justify-center gap-3 sm:gap-4">
                    <Link to={'/'} aria-label="Facebook">
                        <FaFacebook
                            size={25}
                            className="bg-gray-700 hover:bg-blue-600 p-1 rounded-md transition-colors sm:size-30"
                        />
                    </Link>
                    <Link to={'/'} aria-label="Instagram">
                        <FaInstagram
                            size={25}
                            className="bg-gray-700 hover:bg-purple-500 p-1 rounded-md transition-colors sm:size-30"
                        />
                    </Link>
                    <Link to={'/'} aria-label="Twitter">
                        <FaXTwitter
                            size={25}
                            className="bg-gray-700 hover:bg-blue-400 p-1 rounded-md transition-colors sm:size-30"
                        />
                    </Link>
                    <Link to={'/'} aria-label="WhatsApp">
                        <FaWhatsapp
                            size={25}
                            className="bg-gray-700 hover:bg-green-500 p-1 rounded-md transition-colors sm:size-30"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;