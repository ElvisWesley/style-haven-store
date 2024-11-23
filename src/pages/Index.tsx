import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-secondary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Elevate Your Space</h1>
            <p className="text-xl mb-8">Discover our curated collection of premium interior products</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link to="/products">Shop Collection</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="container mx-auto py-20">
        <h2 className="text-4xl font-serif text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-xl font-serif">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProducts />
      <Footer />
    </div>
  );
};

const categories = [
  {
    id: "tables",
    name: "Tables",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
  },
  {
    id: "lanterns",
    name: "Lanterns",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
  },
  {
    id: "wall-fireplaces",
    name: "Wall Fireplaces",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
  },
  {
    id: "floor-fireplaces",
    name: "Floor Fireplaces",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
];

export default Index;