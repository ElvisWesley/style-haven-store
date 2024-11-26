import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/ui/use-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate checkout",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">Handlekurven er tom</h1>
            <p className="text-gray-600 mb-8">Legg til noen produkter, så vil du se dem her.</p>
            <Button asChild>
              <a href="/">Fortsett handelen</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-3xl font-serif mb-8">Handlekurv</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 border rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-serif mb-4">Sammendrag av ordren</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 font-medium">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
