import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import ProductImages from "@/components/product/ProductImages";
import ProductTabs from "@/components/product/ProductTabs";
import ProductEditForm from "@/components/product/ProductEditForm";
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
        title: "Suksess",
        description: "Produktet ble oppdatert",
      });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Feil",
        description: "Kunne ikke oppdatere produktet",
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
      toast({
        title: "Lagt til i handlekurv",
        description: `${product.name} ble lagt til i handlekurven`,
      });
    }
  };

  const handleProductChange = (field: string, value: string | number) => {
    setEditedProduct(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  const handleImageUpdate = (index: number, value: string) => {
    setEditedProduct(prev => {
      if (!prev) return null;
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
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
          <ProductImages
            images={product?.images || []}
            isEditing={isEditing}
            onImageUpdate={handleImageUpdate}
            productName={product?.name || ""}
          />

          <div className="space-y-6">
            {isEditing ? (
              <ProductEditForm
                product={editedProduct as Product}
                onChange={handleProductChange}
              />
            ) : (
              <>
                <h1 className="text-4xl font-serif">{product?.name}</h1>
                <p className="text-2xl text-accent">{product?.price} kr</p>
                <p className="text-gray-600">{product?.description}</p>
              </>
            )}

            <ProductTabs
              description={product?.description || ""}
              specifications={product?.specifications || {}}
              videoUrl={product?.video_url}
            />

            <div className="flex gap-4">
              {user?.is_admin ? (
                <>
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveChanges}>Lagre endringer</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Avbryt
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Rediger produkt</Button>
                  )}
                </>
              ) : null}
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleAddToCart}
              >
                Legg til i handlekurv
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