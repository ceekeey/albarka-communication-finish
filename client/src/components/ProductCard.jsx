import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleViewDetails = () => {
        setShowModal(true);
    };

    const handleContact = () => {
        navigate(`/contact/${product._id}`);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-lg">
                <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                />
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {product.title}
                    </h3>
                    <p className="text-gray-500 mt-1">Name: {product.name}</p>
                    <p className="text-gray-500 mt-1">Category: {product.catigoryid?.name || "N/A"}</p>

                    <button
                        className="mt-auto bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative shadow-lg">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <img
                            src={`http://localhost:5000${product.image}`}
                            alt={product.name}
                            className="w-full h-48 object-contain mb-4 rounded"
                        />
                        <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 mb-2">Description: {product.description || "No description available."}</p>
                        <p className="text-gray-500 mb-4">Category: {product.catigoryid?.name || "N/A"}</p>
                        <button
                            onClick={handleContact}
                            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md w-full"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
