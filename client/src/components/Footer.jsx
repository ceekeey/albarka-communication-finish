import { useEffect, useState } from "react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import {
    FaInstagram,
    FaWhatsapp,
    FaFacebook,
    FaXTwitter,
} from "react-icons/fa6";

const iconMap = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaXTwitter,
    whatsapp: FaWhatsapp,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
};

const Footer = () => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/links/get-social");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setSocialLinks(data);
                }
            } catch (error) {
                console.error("Error fetching social links:", error);
            }
        };

        fetchSocialLinks();
    }, []);

    return (
        <footer className="bg-gray-900 text-white py-4 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-4 md:gap-8 items-center">
                {/* Copyright */}
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

                {/* Social Icons */}
                <div className="flex justify-center gap-3 sm:gap-4">
                    {socialLinks.map(({ _id, icon, link }) => {
                        const IconComponent = iconMap[icon.toLowerCase()];
                        return (
                            IconComponent && (
                                <a
                                    key={_id}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={icon}
                                >
                                    <IconComponent
                                        size={25}
                                        className="bg-gray-700 hover:bg-orange-500 p-1 rounded-md transition-colors sm:size-30"
                                    />
                                </a>
                            )
                        );
                    })}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
