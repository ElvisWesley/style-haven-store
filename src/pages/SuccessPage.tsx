import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          <h1 className="text-3xl font-serif">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;