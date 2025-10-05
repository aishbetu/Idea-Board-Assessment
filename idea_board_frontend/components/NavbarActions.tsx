"use client";

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function NavbarActions() {
  const pathname = usePathname();
  const router = useRouter();
  const isIdeaBoardPage = pathname === '/idea-board';

  if (isIdeaBoardPage) {
    return null;
  }

  return (
    <button 
      onClick={() => router.push('/idea-board')}
      className="flex items-center gap-1.5 sm:gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap">New Idea</span>
    </button>
  );
}