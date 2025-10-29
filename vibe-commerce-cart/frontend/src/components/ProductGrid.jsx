import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

export default function ProductGrid({ onAddToCart, products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-2xl border border-slate-700 p-4 h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((p) => (
        <motion.div key={p._id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard product={p} onAddToCart={onAddToCart} />
        </motion.div>
      ))}
    </motion.div>
  );
}


