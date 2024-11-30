import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductForm from "./admin/ProductForm";
import ProductList from "./admin/ProductList";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Kunne ikke hente produkter");
      return response.json();
    },
  });

  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      if (!response.ok) throw new Error("Kunne ikke lagre produkt");

      toast({
        title: `Produkt ${editingProduct ? "oppdatert" : "opprettet"} vellykket`,
      });
      setEditingProduct(null);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Feil",
        description: "Kunne ikke lagre produkt",
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

      if (!response.ok) throw new Error("Kunne ikke slette produkt");

      toast({
        title: "Produkt slettet vellykket",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Feil",
        description: "Kunne ikke slette produkt",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Input
          type="search"
          placeholder="Søk produkter..."
          className="max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ProductForm
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
      />
      <ProductList
        products={filteredProducts}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;