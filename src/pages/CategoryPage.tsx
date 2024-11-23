import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { category } = useParams();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12">
          <div className="product-grid">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="product-card">
                <CardContent className="p-0">
                  <Skeleton className="aspect-square rounded-t-lg" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-4xl font-serif mb-8 capitalize">
          {category?.replace("-", " ")}
        </h1>
        <div className="product-grid">
          {products?.map((product) => (
            <Card key={product.id} className="product-card">
              <CardContent className="p-0">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0]}
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