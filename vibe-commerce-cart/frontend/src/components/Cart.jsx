import CartItem from './CartItem';
import { AnimatePresence, motion } from 'framer-motion';

export default function Cart({ cart, onUpdate, onRemove, onClear, onCheckout, open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-slate-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Shopping Cart</h3>
                <p className="text-sm text-slate-400">{cart?.items?.length || 0} items</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {(!cart?.items || cart.items.length === 0) && (
                <p className="text-slate-400 py-6 text-center">Your cart is empty</p>
              )}
              {cart?.items?.map((it) => (
                <CartItem key={it._id} item={it} onUpdate={onUpdate} onRemove={onRemove} />
              ))}
            </div>
            <div className="p-6 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total</span>
                <span className="text-2xl font-semibold gradient-text">${(cart?.total || 0).toFixed(2)}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={onClear} className="w-1/2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white py-3 transition-colors">Clear Cart</button>
                <button onClick={onCheckout} className="w-1/2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 hover:shadow-xl hover:shadow-indigo-500/50 transition-all">Checkout</button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


