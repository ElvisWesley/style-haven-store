import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const products = [
  {
    id: 1,
    name: "Modern Dining Table",
    price: "1,299",
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Elegant modern dining table perfect for contemporary homes. Features a solid wood construction with a beautiful natural finish.",
    specifications: {
      dimensions: "72\" L x 36\" W x 30\" H",
      weight: "120 lbs",
      material: "Solid Oak",
      finish: "Natural Matte",
    },
    relatedProducts: [2, 3],
  },
  // ... other products would be defined here
];

const ProductPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-serif">{product.name}</h1>
            <p className="text-2xl text-accent">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card className="p-4">
                  <p>{product.description}</p>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <Card className="p-4">
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2">
                        <dt className="font-medium capitalize">{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </TabsContent>
              <TabsContent value="video" className="mt-4">
                <Card className="p-4">
                  <div className="aspect-video">
                    <iframe
                      src={product.video}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <Button
              size="lg"
              className="w-full bg-accent hover:bg-accent/90"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
