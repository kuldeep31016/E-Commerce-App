import { useEffect, useMemo, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';
import { getProducts, getCart, addToCart, updateCartItem, removeFromCart, clearCart, checkout } from './services/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const cartCount = useMemo(() => cart?.items?.reduce((s, i) => s + i.quantity, 0) || 0, [cart]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingProducts(true);
        const [prods, crt] = await Promise.all([getProducts(), getCart()]);
        setProducts(prods);
        setCart(crt);
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoadingProducts(false);
      }
    };
    load();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const updated = await addToCart(productId, quantity);
    setCart(updated);
  };

  const handleUpdateCart = async (itemId, quantity) => {
    const updated = await updateCartItem(itemId, quantity);
    setCart(updated);
  };

  const handleRemove = async (itemId) => {
    const updated = await removeFromCart(itemId);
    setCart(updated);
  };

  const handleClear = async () => {
    const updated = await clearCart();
    setCart(updated);
  };

  const openCheckout = () => setShowCheckout(true);
  const closeCheckout = () => setShowCheckout(false);

  const handleCheckout = async ({ customerName, customerEmail }) => {
    const receiptData = await checkout({ customerName, customerEmail, cartItems: cart.items });
    setReceipt(receiptData);
    setShowCheckout(false);
    const newCart = await getCart();
    setCart(newCart);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-white/80 backdrop-blur z-30 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-extrabold text-xl text-primary">Vibe Commerce</div>
          <button onClick={() => setShowCart(true)} className="relative inline-flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50">
            <FaShoppingCart />
            <span>Cart</span>
            {!!cartCount && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full grid place-items-center">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <ProductGrid products={products} loading={loadingProducts} onAddToCart={handleAddToCart} />
      </main>

      <Cart
        cart={cart}
        onUpdate={handleUpdateCart}
        onRemove={handleRemove}
        onClear={handleClear}
        onCheckout={() => { setShowCart(false); openCheckout(); }}
        open={showCart}
        onClose={() => setShowCart(false)}
      />

      {showCheckout && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={closeCheckout} />
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl p-5 shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Checkout</h3>
              <CheckoutForm onSubmit={handleCheckout} onCancel={closeCheckout} />
            </div>
          </div>
        </div>
      )}

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}


