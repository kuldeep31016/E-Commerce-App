import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel} className="w-1/2 rounded-lg border border-gray-200 py-2 hover:bg-gray-50">Cancel</button>
        <button disabled={!valid || submitting} type="submit" className="w-1/2 rounded-lg bg-primary text-white py-2 hover:bg-primary-dark disabled:opacity-60">
          {submitting ? 'Processing...' : 'Confirm Order'}
        </button>
      </div>
    </form>
  );
}


