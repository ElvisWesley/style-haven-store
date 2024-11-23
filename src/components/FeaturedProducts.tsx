import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

const FeaturedProducts = () => {
  return (
    <section className="container mx-auto py-20">
      <h2 className="text-4xl font-serif text-center mb-12">Featured Products</h2>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="product-card">
            <CardContent className="p-0">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                  <p className="text-accent font-medium">${product.price}</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const featuredProducts = [
  {
    id: 1,
    name: "Modern Dining Table",
    price: "1,299",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
  },
  {
    id: 2,
    name: "Vintage Lantern Set",
    price: "249",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
  },
  {
    id: 3,
    name: "Electric Wall Fireplace",
    price: "899",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
  },
];

export default FeaturedProducts;