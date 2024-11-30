import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductListProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">${product.price}</p>
            <p className="text-sm text-gray-600 mb-4">
              Dimensions: {product.specifications?.dimensions || "Not specified"}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;