import { Lightbulb } from 'lucide-react';
import Link from 'next/link';
import NavbarActions from './NavbarActions';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">IdeaBoard</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Products</a>
          <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Customers</a>
          <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
          <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Learn</a>
        </div>

        <div className="flex items-center gap-4">
          <NavbarActions />
        </div>
      </div>
    </nav>
  );
}