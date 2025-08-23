'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import White_logo from '../app/images/white-logo-text.png'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src={White_logo}
              alt="Logo"
              width={156}
              height={20}
              className="mr-2 p-4 pt-8"

            />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                Home
              </Link>
              <Link href="/search" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                Search
              </Link>
              <Link href="/collections" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                Collections
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
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
          </div>
        </div>
      )}
    </nav>
  );
}