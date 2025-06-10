import React from "react";
import loginImage from "/login-image.jpg"; // Replace with your image path
import { Link, useParams } from "react-router-dom";

export default function ShopLoginPage() {
    const locations = [
        { id: "1", shop: "/shop-login", name: "TUDUN HASTI GOMBE LOCAL GOVERNMENT SHOPPING COMPLEX" },
        { id: "2", shop: "/shop-login", name: "SHOP NO.6 LAYIN BABA NABEGO BATA KANO STATE" },
        { id: "3", shop: "/shop-login", name: "OPPOSITE MASALLACIN YANTAYA GOMBE" },
        { id: "4", shop: "/shop-login", name: "SHOP NO. 1 DANAJO PLAZA JALINGO TARABA STATE" },
        { id: "5", shop: "/shop-login", name: "SHOP NO. 2 DANAJO PLAZA JALINGO TARABA STATE" },
        { id: "6", shop: "/shop-login", name: "SHOP NO. 3 DANAJO PLAZA JALINGO TARABA STATE" },
        { id: "7", shop: "/shop-login", name: "HEAD OFFICE OPPOSITE GLO OFFICE ALONG PANTAMI ROAD, BOLARI, GOMBE, GOMBE STATE" },
        { id: "8", shop: "/shop-login", name: "SECTION NO. 1 IN THE HEAD OFFICE" },
        { id: "9", shop: "/shop-login", name: "SECTION NO. 2 IN THE HEAD OFFICE" },
        { id: "10", shop: "/login", name: "SUPER ADMIN" },
    ];

    const { id } = useParams();

    const selectedShop = locations.find((shop) => shop.id === id);

    return (
        <div className="min-h-screen flex">
            {/* Left side - Login form */}
            <div className="flex flex-col justify-center flex-1 px-8 py-12 bg-white max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedShop ? selectedShop.name : "Shop Not Found"}
                </h2>
                <p className="mb-6 text-sm text-gray-500">Welcome Back, Please login.</p>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition"
                    >
                        Login
                    </button>
                    <div className="flex justify-center">
                        <Link className="text-orange-600 text-center text-sm" to={'/'}>Back to Home</Link>
                    </div>
                </form>
            </div>

            {/* Right side - Image */}
            <div className="hidden md:block flex-1">
                <img
                    src={loginImage}
                    alt="Login Visual"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
