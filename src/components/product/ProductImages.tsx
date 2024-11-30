import { Input } from "@/components/ui/input";

interface ProductImagesProps {
  images: string[];
  isEditing: boolean;
  onImageUpdate?: (index: number, value: string) => void;
  productName: string;
}

const ProductImages = ({ images, isEditing, onImageUpdate, productName }: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg">
        {isEditing ? (
          <Input
            value={images[0] || ""}
            onChange={(e) => onImageUpdate?.(0, e.target.value)}
            placeholder="Bilde URL"
          />
        ) : (
          <img
            src={images[0]}
            alt={productName}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`${productName} visning ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;