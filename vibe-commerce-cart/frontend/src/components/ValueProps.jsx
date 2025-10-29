import { LuShieldCheck, LuTruck, LuSparkles } from 'react-icons/lu';

export default function ValueProps() {
  const items = [
    { icon: LuShieldCheck, title: 'Secure Checkout', desc: 'Industry‑standard encryption and safe payments.' },
    { icon: LuTruck, title: 'Fast Delivery', desc: 'Free shipping on most orders over $50.' },
    { icon: LuSparkles, title: 'Premium Quality', desc: 'Curated products with top-tier materials.' },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="glass rounded-2xl p-5 hover:shadow-glow transition-shadow">
          <div className="flex items-start gap-3">
            <span className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300"><Icon /></span>
            <div>
              <h4 className="font-semibold text-white">{title}</h4>
              <p className="text-slate-400 text-sm mt-1">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}


