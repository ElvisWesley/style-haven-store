import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import MockCheckout from "@/components/cart/MockCheckout";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'vipps' | 'klarna'>('vipps');
  const [showMockCheckout, setShowMockCheckout] = useState(false);

  const handleCheckout = async () => {
    try {
      console.log('Initiating checkout with server URL:', SERVER_URL);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${SERVER_URL}/api/checkout/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          paymentMethod,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout session creation failed');
      }

      const data = await response.json();
      
      if (paymentMethod === 'klarna' && window.Klarna) {
        await window.Klarna.Payments.init({
          client_token: data.clientToken
        });
        
        await window.Klarna.Payments.load({
          container: '#klarna-payments-container'
        });
      } else if (paymentMethod === 'vipps' && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Invalid payment method or missing redirect URL');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: "An error occurred. Starting mock checkout process...",
      });
      setShowMockCheckout(true);
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
              <CartItem
                key={item.id}
                {...item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <CartSummary
            total={total}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onCheckout={handleCheckout}
          />
        </div>
      </main>
      <Footer />
      
      {showMockCheckout && (
        <MockCheckout onClose={() => setShowMockCheckout(false)} />
      )}
    </div>
  );
};

export default CartPage;