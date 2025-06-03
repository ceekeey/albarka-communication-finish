import Navbar from "../components/Navbar";
import Products from "../components/Products";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="h-screen">
      <Navbar />
      <HeroCarousel />
      <Products />
      <Footer />
    </div >
  );
}
