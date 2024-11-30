import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductEditFormProps {
  product: {
    name: string;
    price: number;
    description: string;
  };
  onChange: (field: string, value: string | number) => void;
}

const ProductEditForm = ({ product, onChange }: ProductEditFormProps) => {
  return (
    <>
      <Input
        value={product.name}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="Produktnavn"
      />
      <Input
        type="number"
        value={product.price}
        onChange={(e) => onChange("price", parseFloat(e.target.value))}
        placeholder="Pris"
      />
      <Textarea
        value={product.description}
        onChange={(e) => onChange("description", e.target.value)}
        placeholder="Beskrivelse"
      />
    </>
  );
};

export default ProductEditForm;