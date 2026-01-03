import React from 'react';
import { Home, Palette, Paintbrush } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667EEA] to-[#764BA2] font-sans text-white flex flex-col w-full max-w-screen-xl mx-auto shadow-2xl overflow-hidden relative px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
             <Palette className="w-6 h-6 text-teal-400" />
             <Paintbrush className="w-4 h-4 text-white absolute bottom-0 right-0 transform translate-x-1 translate-y-1 bg-[#667EEA] rounded-full p-[2px]" />
          </div>
          <h1 className="text-sm font-bold tracking-wider text-teal-400">COLOR SOLUTION</h1>
        </div>
        {!isHome && (
          <Link to="/" className="p-2 bg-teal-500/20 rounded-xl hover:bg-teal-500/40 transition-colors">
            <Home className="w-6 h-6 text-teal-400" />
          </Link>
        )}
        {isHome && (
           <div className="p-2 bg-teal-500/20 rounded-xl">
             <Home className="w-6 h-6 text-teal-400" />
           </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden py-6">
        <div className="w-full max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-white/60 bg-black/10 mt-auto">
        <p>© 2025 Color Solution. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
        </div>
      </footer>
    </div>
  );
};
