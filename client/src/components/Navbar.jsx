import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import logo from "/logo.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-orange-600 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="ZeyoCart Logo" className="h-10 w-auto" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6 text-white">
                    <Link to="/" className="hover:text-white font-medium">Home</Link>
                    <Link to="/products" className="hover:text-white font-medium">Products</Link>
                    <Link to="/contact" className="hover:text-white font-medium">Contact</Link>
                    <Link to="/login" className="hover:text-white font-medium">Staff Login</Link>
                </div>

                {/* Mobile toggle */}
                <div className="md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        {open ? <FiX className="text-white" size={24} /> : <FiMenu className="text-white" size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-4 pb-4 text-white">
                    <Link to="/" className="block py-2 hover:text-white">Home</Link>
                    <Link to="/products" className="block py-2 hover:text-white">Products</Link>
                    <Link to="/contact" className="block py-2 hover:text-white">Contact Us</Link>
                    <Link to="/login" className="block py-2 hover:text-white">Staff Login</Link>
                </div>
            )}
        </nav>
    );
}
