import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Modern Dining Table",
    price: "1,299",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
    category: "tables"
  },
  {
    id: 2,
    name: "Rustic Coffee Table",
    price: "899",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d",
    category: "tables"
  },
  {
    id: 3,
    name: "Vintage Lantern Set",
    price: "249",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
    category: "lanterns"
  },
  {
    id: 4,
    name: "Modern Wall Fireplace",
    price: "1,499",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    category: "wall-fireplaces"
  },
  {
    id: 5,
    name: "Contemporary Floor Fireplace",
    price: "2,499",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    category: "floor-fireplaces"
  }
];

const CategoryPage = () => {
  const { category } = useParams();
  const categoryProducts = products.filter(product => product.category === category);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-4xl font-serif mb-8 capitalize">
          {category?.replace("-", " ")}
        </h1>
        <div className="product-grid">
          {categoryProducts.map((product) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;