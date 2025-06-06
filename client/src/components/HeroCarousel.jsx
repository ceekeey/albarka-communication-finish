import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const HeroCarousel = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch banners from API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/banner");
                const data = await res.json();
                setBanners(data)
            } catch (err) {
                setError(err.message);
                toast.error("Failed to load banners: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return (
        <section className="relative text-white">
            {loading ? (
                <div className="h-[80vh] flex items-center justify-center bg-gray-200">
                    <p className="text-gray-600 text-lg">Loading banners...</p>
                </div>
            ) : error ? (
                <div className="h-[80vh] flex items-center justify-center bg-gray-200">
                    <p className="text-red-600 text-lg">Error: {error}</p>
                </div>
            ) : banners.length === 0 ? (
                <div className="h-[80vh] flex items-center justify-center bg-gray-200">
                    <p className="text-gray-600 text-lg">No banners available</p>
                </div>
            ) : (
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={5000}
                    transitionTime={800}
                    stopOnHover={false}
                    showArrows={false}
                >
                    {banners.map((banner, index) => (
                        <div
                            key={banner._id}
                            className="relative h-[80vh] bg-black bg-opacity-60"
                            style={{
                                backgroundImage: `url(http://localhost:5000${banner.imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            {/* Fallback image if background fails */}
                            <img
                                src={`http://localhost:5000${banner.imageUrl}`}
                                alt={banner.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-0"
                                onError={(e) => {
                                    console.error(`Failed to load image: http://localhost:5000${banner.imageUrl}`);
                                    e.target.style.display = "none"; // Hide if image fails
                                }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h1>
                                <p className="text-lg mb-6 max-w-2xl">{banner.subtitle}</p>
                                <Link
                                    to="/products"
                                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 font-medium rounded-lg transition"
                                >
                                    Explore Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </section>
    );
};

export default HeroCarousel;