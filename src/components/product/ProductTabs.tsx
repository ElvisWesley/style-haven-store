import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  videoUrl?: string;
}

const ProductTabs = ({ description, specifications, videoUrl }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Detaljer</TabsTrigger>
        <TabsTrigger value="specifications">Spesifikasjoner</TabsTrigger>
        <TabsTrigger value="video">Video</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="mt-4">
        <Card className="p-4">
          <p>{description}</p>
        </Card>
      </TabsContent>
      <TabsContent value="specifications" className="mt-4">
        <Card className="p-4">
          <dl className="space-y-2">
            {specifications &&
              Object.entries(specifications).map(([key, value]) => (
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
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;