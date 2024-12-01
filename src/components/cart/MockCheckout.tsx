import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface MockCheckoutProps {
  onClose: () => void;
}

const MockCheckout = ({ onClose }: MockCheckoutProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (step > 1) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      toast({
        title: "Order Completed",
        description: "Your mock order has been successfully processed!",
      });
      setTimeout(() => {
        navigate('/success');
      }, 1500);
    }
  }, [step, navigate, toast]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-serif mb-6">Mock Checkout Process</h2>
        
        <div className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <p>This is a mock checkout process for demonstration purposes.</p>
              <Button onClick={() => setStep(2)} className="w-full">
                Start Mock Checkout
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-2">
              <p>Processing payment...</p>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-1/3 animate-pulse" />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-2">
              <p>Confirming order...</p>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-2/3 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockCheckout;