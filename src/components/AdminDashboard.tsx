import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import ProductForm from "./admin/ProductForm";
import ProductList from "./admin/ProductList";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        editingProduct
          ? `http://localhost:5000/api/products/${editingProduct.id}`
          : "http://localhost:5000/api/products",
        {
          method: editingProduct ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.get("name"),
            price: parseFloat(formData.get("price") as string),
            description: formData.get("description"),
            category: formData.get("category"),
            images: [formData.get("image")],
            video_url: formData.get("video_url"),
            specifications: JSON.parse(formData.get("specifications") as string),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save product");

      toast({
        title: `Product ${editingProduct ? "updated" : "created"} successfully`,
      });
      setEditingProduct(null);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save product",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast({
        title: "Product deleted successfully",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ProductForm
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
      />
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;