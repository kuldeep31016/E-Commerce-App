import { useEffect, useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';
import ValueProps from './components/ValueProps';
import Footer from './components/Footer';
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
    toast.success('Added to cart');
  };

  const handleUpdateCart = async (itemId, quantity) => {
    const updated = await updateCartItem(itemId, quantity);
    setCart(updated);
  };

  const handleRemove = async (itemId) => {
    const updated = await removeFromCart(itemId);
    setCart(updated);
    toast('Item removed', { icon: '🗑️' });
  };

  const handleClear = async () => {
    const updated = await clearCart();
    setCart(updated);
    toast('Cart cleared');
  };

  const openCheckout = () => setShowCheckout(true);
  const closeCheckout = () => setShowCheckout(false);

  const handleCheckout = async ({ customerName, customerEmail }) => {
    const receiptData = await checkout({ customerName, customerEmail, cartItems: cart.items });
    setReceipt(receiptData);
    setShowCheckout(false);
    const newCart = await getCart();
    setCart(newCart);
    toast.success('Order confirmed');
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <Navbar cartCount={cartCount} onCartClick={() => setShowCart(true)} />

      <main className="container mx-auto px-6 py-10">
        <section className="relative h-72 overflow-hidden rounded-3xl mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 opacity-20" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black text-white mb-2 tracking-tight">Welcome to Premium Shopping</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-slate-100/90 mb-6">Discover curated products that elevate your lifestyle</motion.p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold text-base hover:shadow-2xl transition-all">Explore Collection</motion.button>
          </div>
        </section>

        <ValueProps />

        <div className="mt-12 mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <p className="text-slate-400">Handpicked items just for you</p>
          </div>
        </div>
        {products.length > 0 || loadingProducts ? (
          <ProductGrid products={products} loading={loadingProducts} onAddToCart={handleAddToCart} />
        ) : (
          <div className="glass rounded-2xl p-8 text-center mt-4">
            <h3 className="text-xl font-semibold text-white">No products yet</h3>
            <p className="text-slate-400 mt-2">Start the backend to auto‑seed products, then refresh.</p>
            <div className="text-left text-sm text-slate-400 bg-slate-900 rounded-xl border border-slate-700 p-4 mt-4">
              <div>1) Open a new terminal:</div>
              <pre className="mt-2"><code>{`cd "vibe-commerce-cart/backend"\nnpm install\nnpm run dev`}</code></pre>
            </div>
          </div>
        )}
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
      <Footer />
    </div>
  );
}


