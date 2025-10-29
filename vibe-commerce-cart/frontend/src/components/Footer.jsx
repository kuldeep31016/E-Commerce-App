export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 py-8 text-center text-sm text-slate-400">
      <div className="container mx-auto px-6">
        <div className="font-bold gradient-text text-lg">VIBE</div>
        <p className="mt-2">© {new Date().getFullYear()} Vibe Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
}


