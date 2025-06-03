const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-lg">
            <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-contain"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                <div className="flex items-center mt-2">
                </div>
                <p className="text-gray-500 mt-1">Name: {product.name}</p>
                <p className="text-gray-500 mt-1">Category: {product.catigoryid.name || 'N/A'}</p>
                <button className="mt-auto bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;