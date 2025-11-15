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
    <nav className="backdrop-blur-md bg-background/90 border-b border-gray-700 dark:border-gray-800 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center pt-4">
            <Link href="/" className="flex items-center select-none focus:outline-none">
              <Image
                src={currentLogo}
                alt="Unipix Logo"
                width={156}
                height={20}
                className="p-4 transition-opacity duration-300"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/search" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Search
              </Link>
              <Link 
                href="/collections" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Collections
              </Link>
              <Link 
                href="/blog" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Blog
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
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
        <div className="md:hidden border-t border-gray-700 dark:border-gray-800 bg-background">
          <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/search" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Link 
              href="/collections" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
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