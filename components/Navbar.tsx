'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Light_logo from '../app/images/logo-light-text.png'
import Dark_logo from '../app/images/logo-dark-text.png'
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useTheme } from '@/components/theme-provider';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(Dark_logo);
  const { theme } = useTheme();

  // Prevent hydration issues and update logo when theme changes
  useEffect(() => {
    setMounted(true);
    
    // Determine which logo to use based on theme
    const getLogo = () => {
      if (theme === 'light') return Dark_logo;
      if (theme === 'dark') return Light_logo;
      // For system theme, check if user prefers dark mode
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? Light_logo : Dark_logo;
      }
      return Light_logo; // Default fallback
    };
    
    const newLogo = getLogo();
    console.log('Theme changed to:', theme, 'Logo set to:', newLogo === Light_logo ? 'Light' : 'Dark');
    setCurrentLogo(newLogo);
  }, [theme, mounted]);

  return (
    <nav className="backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src={currentLogo}
              alt="Logo"
              width={156}
              height={20}
              className="mr-2 p-4 pt-8 transition-opacity duration-300"
            />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                Home
              </Link>
              <Link href="/search" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                Search
              </Link>
              <Link href="/collections" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                Collections
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Home
            </Link>
            <Link href="/search" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Search
            </Link>
            <Link href="/collections" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10">
              Collections
            </Link>
            <div className="px-3 py-2 flex justify-center">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}