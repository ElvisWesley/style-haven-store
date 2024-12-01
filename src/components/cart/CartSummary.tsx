import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CartSummaryProps {
  total: number;
  paymentMethod: 'vipps' | 'klarna';
  onPaymentMethodChange: (value: 'vipps' | 'klarna') => void;
  onCheckout: () => void;
}

const CartSummary = ({ total, paymentMethod, onPaymentMethodChange, onCheckout }: CartSummaryProps) => {
  return (
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

      <div className="space-y-4">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => onPaymentMethodChange(value as 'vipps' | 'klarna')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vipps" id="vipps" />
            <Label htmlFor="vipps">Vipps</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="klarna" id="klarna" />
            <Label htmlFor="klarna">Klarna</Label>
          </div>
        </RadioGroup>

        <div id="klarna-payments-container" className="min-h-[200px]" />

        <Button 
          className="w-full"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;