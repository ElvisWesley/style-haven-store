import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  video_url: string;
  specifications: Record<string, string>;
}

const ProductPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addItem } = useCart();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEditedProduct(data);
      return data;
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: Partial<Product>) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
    },
  });

  const handleSaveChanges = () => {
    if (!editedProduct) return;
    updateProductMutation.mutate(editedProduct);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              {isEditing ? (
                <Input
                  value={editedProduct?.images[0] || ""}
                  onChange={(e) =>
                    setEditedProduct(prev => prev ? {
                      ...prev,
                      images: [e.target.value, ...prev.images.slice(1)]
                    } : null)
                  }
                  placeholder="Image URL"
                />
              ) : (
                <img
                  src={product?.images[0]}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product?.images.map((image, index) => (
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
            {isEditing ? (
              <>
                <Input
                  value={editedProduct?.name || ""}
                  onChange={(e) =>
                    setEditedProduct(prev => prev ? {
                      ...prev,
                      name: e.target.value
                    } : null)
                  }
                  placeholder="Product Name"
                />
                <Input
                  type="number"
                  value={editedProduct?.price || ""}
                  onChange={(e) =>
                    setEditedProduct(prev => prev ? {
                      ...prev,
                      price: parseFloat(e.target.value)
                    } : null)
                  }
                  placeholder="Price"
                />
                <Textarea
                  value={editedProduct?.description || ""}
                  onChange={(e) =>
                    setEditedProduct(prev => prev ? {
                      ...prev,
                      description: e.target.value
                    } : null)
                  }
                  placeholder="Description"
                />
              </>
            ) : (
              <>
                <h1 className="text-4xl font-serif">{product?.name}</h1>
                <p className="text-2xl text-accent">${product?.price}</p>
                <p className="text-gray-600">{product?.description}</p>
              </>
            )}

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card className="p-4">
                  <p>{product?.description}</p>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <Card className="p-4">
                  <dl className="space-y-2">
                    {product?.specifications &&
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2">
                          <dt className="font-medium capitalize">{key}</dt>
                          <dd>{String(value)}</dd>
                        </div>
                      ))}
                  </dl>
                </Card>
              </TabsContent>
              <TabsContent value="video" className="mt-4">
                <Card className="p-4">
                  <div className="aspect-video">
                    <iframe
                      src={product?.video_url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              {user?.is_admin ? (
                <>
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveChanges}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Product</Button>
                  )}
                </>
              ) : null}
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;