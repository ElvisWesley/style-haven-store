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
          {editingProduct ? "Rediger Produkt" : "Legg til nytt produkt"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Produktnavn</Label>
            <Input
              id="name"
              name="name"
              defaultValue={editingProduct?.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Pris</Label>
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
            <Label htmlFor="description">Beskrivelse</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={editingProduct?.description}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              name="category"
              defaultValue={editingProduct?.category}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensjoner</Label>
            <Input
              id="dimensions"
              name="dimensions"
              placeholder="f.eks. 72 L x 36 B x 30 H"
              defaultValue={specifications.dimensions}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Vekt</Label>
            <Input
              id="weight"
              name="weight"
              placeholder="f.eks. 120 kg"
              defaultValue={specifications.weight}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Materiale</Label>
            <Input
              id="material"
              name="material"
              placeholder="f.eks. Massiv Eik"
              defaultValue={specifications.material}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finish">Overflatebehandling</Label>
            <Input
              id="finish"
              name="finish"
              placeholder="f.eks. Naturlig Matt"
              defaultValue={specifications.finish}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Bilde URL</Label>
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
              {editingProduct ? "Oppdater" : "Legg til"} Produkt
            </Button>
            {editingProduct && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Avbryt
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;