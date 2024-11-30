import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  editingProduct: any;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

const ProductForm = ({ editingProduct, onSubmit, onCancel }: ProductFormProps) => {
  const [specifications, setSpecifications] = useState(() => {
    if (editingProduct?.specifications) {
      return {
        ...editingProduct.specifications,
        dimensions: editingProduct.specifications.dimensions || "",
        weight: editingProduct.specifications.weight || "",
        material: editingProduct.specifications.material || "",
        finish: editingProduct.specifications.finish || "",
      };
    }
    return {
      dimensions: "",
      weight: "",
      material: "",
      finish: "",
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const updatedSpecs = {
      dimensions: formData.get("dimensions"),
      weight: formData.get("weight"),
      material: formData.get("material"),
      finish: formData.get("finish"),
    };
    
    formData.set("specifications", JSON.stringify(updatedSpecs));
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={editingProduct?.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={editingProduct?.price}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={editingProduct?.description}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              defaultValue={editingProduct?.category}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              name="dimensions"
              placeholder="e.g., 72 L x 36 W x 30 H"
              defaultValue={specifications.dimensions}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              name="weight"
              placeholder="e.g., 120 lbs"
              defaultValue={specifications.weight}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              name="material"
              placeholder="e.g., Solid Oak"
              defaultValue={specifications.material}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finish">Finish</Label>
            <Input
              id="finish"
              name="finish"
              placeholder="e.g., Natural Matte"
              defaultValue={specifications.finish}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              defaultValue={editingProduct?.images?.[0]}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="video_url"
              name="video_url"
              defaultValue={editingProduct?.video_url}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {editingProduct ? "Update" : "Add"} Product
            </Button>
            {editingProduct && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;