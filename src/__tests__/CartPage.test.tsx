import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../pages/CartPage';
import { CartProvider } from '../contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the cart context
vi.mock('../contexts/CartContext', () => ({
  useCart: () => ({
    items: [
      { id: 1, name: 'Test Product', price: 100, quantity: 1 }
    ],
    total: 100,
    removeItem: vi.fn(),
    updateQuantity: vi.fn()
  }),
  CartProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('CartPage', () => {
  const renderCartPage = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('renders cart items correctly', () => {
    renderCartPage();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('shows payment method options', () => {
    renderCartPage();
    expect(screen.getByLabelText('Vipps')).toBeInTheDocument();
    expect(screen.getByLabelText('Klarna')).toBeInTheDocument();
  });

  it('handles checkout process', async () => {
    renderCartPage();
    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);
    // Mock checkout should appear on error
    expect(await screen.findByText('Mock Checkout Process')).toBeInTheDocument();
  });
});