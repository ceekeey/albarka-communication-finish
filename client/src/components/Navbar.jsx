import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/logo.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const locations = [
        { id: 1, shop: "/shop-login", name: "TUDUN HASTI GOMBE LOCAL GOVERNMENT SHOPPING COMPLEX" },
        { id: 2, shop: "/shop-login", name: "SHOP NO.6 LAYIN BABA NABEGO BATA KANO STATE" },
        { id: 3, shop: "/shop-login", name: "OPPOSITE MASALLACIN YANTAYA GOMBE" },
        { id: 4, shop: "/shop-login", name: "SHOP NO. 1 DANAJO PLAZA JALINGO TARABA STATE" },
        { id: 5, shop: "/shop-login", name: "SHOP NO. 2 DANAJO PLAZA JALINGO TARABA STATE" },
        { id: 6, shop: "/shop-login", name: "SHOP NO. 3 DANAJO PLAZA JALINGO TARABA STATE" },
        { id: 7, shop: "/shop-login", name: "HEAD OFFICE OPPOSITE GLO OFFICE ALONG PANTAMI ROAD, BOLARI, GOMBE, GOMBE STATE" },
        { id: 8, shop: "/shop-login", name: "SECTION NO. 1 IN THE HEAD OFFICE" },
        { id: 9, shop: "/shop-login", name: "SECTION NO. 2 IN THE HEAD OFFICE" },
        { id: 10, shop: "/login", name: "SUPER ADMIN" },
    ];

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

                    {/* Dropdown Menu */}
                    <div className="relative group">
                        <button className="font-medium hover:text-white">
                            Login As Staff
                        </button>
                        <div className="absolute mt-5 right-0 min-w-[28rem] max-w-screen-lg max-h-64 overflow-y-auto bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 transform -translate-y-2 z-50 custom-scrollbar">
                            {locations.map(loc => (
                                <Link
                                    key={loc.id}
                                    to={`${loc.shop}/${loc.id}`}
                                    className="block px-4 py-2 text-sm hover:bg-orange-100 whitespace-normal"
                                >
                                    {loc.name}
                                </Link>
                            ))}
                        </div>
                    </div>


                    <Link to="/contact" className="hover:text-white font-medium">Contact</Link>
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
                <div className="md:hidden px-4 pb-4 text-white space-y-2">
                    <Link to="/" className="block py-2 hover:text-white">Home</Link>
                    <Link to="/products" className="block py-2 hover:text-white">Products</Link>

                    {/* Mobile Dropdown */}
                    <details className="block">
                        <summary className="py-2 cursor-pointer">Login As Staff</summary>
                        <div className="pl-2 max-h-64 overflow-y-auto bg-white text-black rounded-md shadow custom-scrollbar">
                            {locations.map(loc => (
                                <Link
                                    key={loc.id}
                                    to={`/login/${loc.shop}`}
                                    className="block px-4 py-2 text-sm hover:bg-orange-100 whitespace-normal"
                                >
                                    {loc.name}
                                </Link>
                            ))}
                        </div>
                    </details>

                    <Link to="/contact" className="block py-2 hover:text-white">Contact</Link>
                </div>
            )}
        </nav>
    );
}
