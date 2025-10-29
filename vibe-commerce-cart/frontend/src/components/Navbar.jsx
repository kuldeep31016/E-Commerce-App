import { LuShoppingBag, LuSearch } from 'react-icons/lu';

export default function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-3xl font-black gradient-text">VIBE</div>
          <nav className="hidden md:flex items-center gap-5 text-slate-300">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#products" className="hover:text-white transition-colors">Shop</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-[420px]">
            <div className="relative group">
              <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-slate-100 placeholder-slate-400" placeholder="Search products..." />
            </div>
          </div>
          <button onClick={onCartClick} className="relative p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 active:scale-95">
            <LuShoppingBag className="w-6 h-6 text-white" />
            {!!cartCount && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}


