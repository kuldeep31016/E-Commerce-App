import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CheckoutForm({ onSubmit, onCancel }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const valid = customerName.trim().length > 1 && /.+@.+\..+/.test(customerEmail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    try {
      await onSubmit({ customerName, customerEmail });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-300">Name</label>
        <input
          type="text"
          className="mt-1 w-full rounded-xl bg-slate-800 border-2 border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-white"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-slate-300">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-xl bg-slate-800 border-2 border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-white"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel} className="w-1/2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white py-2 transition-colors">Cancel</button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!valid || submitting} type="submit" className="w-1/2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 hover:shadow-xl hover:shadow-indigo-500/50 transition-all disabled:opacity-60">
          {submitting ? 'Processing...' : 'Confirm Order'}
        </motion.button>
      </div>
    </form>
  );
}


