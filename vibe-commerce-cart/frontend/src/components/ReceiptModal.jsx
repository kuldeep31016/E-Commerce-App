import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function ReceiptModal({ receipt, onClose }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <AnimatePresence>
      {receipt && (
        <>
          <Confetti width={dimensions.width} height={dimensions.height} recycle={false} numberOfPieces={300} gravity={0.3} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl max-w-lg w-full border-2 border-indigo-500/30 overflow-hidden"
            >
              <div className="relative p-10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 text-center overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                </div>
                <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }} className="relative inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-2xl shadow-green-500/50">
                  <span className="text-white text-3xl">✓</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-white mb-1">Order Confirmed!</motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-300">Thank you, {receipt.customerName}!</motion.p>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Order Number</p>
                  <p className="text-xl font-bold text-white font-mono">{receipt.orderId}</p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(receipt.timestamp).toLocaleString()}</p>
                </div>
                <div className="max-h-56 overflow-y-auto border border-slate-800 rounded-xl">
                  {receipt.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-2 border-b border-slate-800 last:border-0 text-slate-200">
                      <span>Qty {it.quantity}</span>
                      <span className="font-medium">${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-300">Total</span>
                  <span className="text-2xl font-semibold gradient-text">${receipt.total.toFixed(2)}</span>
                </div>
                <button onClick={onClose} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 hover:shadow-xl hover:shadow-indigo-500/50 transition-all">Done</button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


