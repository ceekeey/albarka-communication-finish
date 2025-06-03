// HeroCarousel.jsx
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const slides = [
    {
        image: "https://images.pexels.com/photos/5632395/pexels-photo-5632395.jpeg?auto=compress&cs=tinysrgb&w=1600",
        headline: "Albarkar Communications",
        text: "Fashion, gadgets, accessories and more – all in one place.",
    },
    {
        image: "https://images.pexels.com/photos/5709660/pexels-photo-5709660.jpeg?auto=compress&cs=tinysrgb&w=1600",
        headline: "Albarkar Communications",
        text: "Secure checkout and reliable delivery every time.",
    },
    {
        image: "https://images.pexels.com/photos/8390116/pexels-photo-8390116.jpeg?auto=compress&cs=tinysrgb&w=1600",
        headline: "Albarkar Communications",
        text: "Explore curated collections tailored to your style.",
    },
];

const HeroCarousel = () => {
    return (
        <section className="relative text-white">
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
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="relative h-[80vh] bg-black bg-opacity-60"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {slide.headline}
                            </h1>
                            <p className="text-lg mb-6 max-w-2xl">{slide.text}</p>
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
        </section>
    );
};

export default HeroCarousel;
