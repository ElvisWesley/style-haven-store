import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description"),
      category: formData.get("category"),
      images: [formData.get("image")],
      video_url: formData.get("video_url"),
      specifications: JSON.parse(formData.get("specifications") as string),
    };

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
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) throw new Error("Failed to save product");

      toast({
        title: `Product ${editingProduct ? "updated" : "created"} successfully`,
      });
      form.reset();
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
      <Card>
        <CardHeader>
          <CardTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Product Name"
              defaultValue={editingProduct?.name}
              required
            />
            <Input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              defaultValue={editingProduct?.price}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              defaultValue={editingProduct?.description}
              required
            />
            <Input
              name="category"
              placeholder="Category"
              defaultValue={editingProduct?.category}
              required
            />
            <Input
              name="image"
              placeholder="Image URL"
              defaultValue={editingProduct?.images?.[0]}
              required
            />
            <Input
              name="video_url"
              placeholder="Video URL"
              defaultValue={editingProduct?.video_url}
            />
            <Textarea
              name="specifications"
              placeholder="Specifications (JSON)"
              defaultValue={
                editingProduct?.specifications
                  ? JSON.stringify(editingProduct.specifications)
                  : ""
              }
              required
            />
            <div className="flex gap-2">
              <Button type="submit">
                {editingProduct ? "Update" : "Add"} Product
              </Button>
              {editingProduct && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product: any) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4">${product.price}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;