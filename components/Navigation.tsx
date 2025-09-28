'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#b5ff00] text-[#111] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Question Papers Admin
        </Link>
        <div className="space-x-4">
          <Link
            href="https://mtbdstudio.vercel.app"
            className={`px-3 py-2 rounded ${
              pathname === '/subjects' ? 'bg-blue-800' : 'hover:bg-[#9cda00]'
            }`}
          >
            Portfolio
          </Link>
        </div>
      </div>
    </nav>
  );
}