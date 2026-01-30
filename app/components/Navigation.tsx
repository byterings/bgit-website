'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/commands', label: 'Commands' },
    { href: '/changelog', label: 'Changelog' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-accent transition">
          bgit
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-1 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                  isActive(href)
                    ? 'text-[#52a8ff] bg-[#52a8ff]/15 font-semibold'
                    : 'text-foreground hover:text-[#52a8ff] hover:bg-[#52a8ff]/10'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/byterings/bgit"
              className="px-3 py-1.5 rounded-md text-muted hover:text-[#52a8ff] hover:bg-[#52a8ff]/10 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="border-l border-gray-800 pl-6">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-foreground hover:bg-[#52a8ff]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-md transition-all duration-200 ${
                  isActive(href)
                    ? 'text-[#52a8ff] bg-[#52a8ff]/15 font-semibold'
                    : 'text-foreground hover:text-[#52a8ff] hover:bg-[#52a8ff]/10'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/byterings/bgit"
              className="block px-4 py-2.5 rounded-md text-muted hover:text-[#52a8ff] hover:bg-[#52a8ff]/10 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
