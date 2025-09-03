'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import UserNav from './UserNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/logo.png"
                alt="DigiKaz"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-gradient">
              DigiKaz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link 
              href="/logements" 
              className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium"
            >
              Logements
            </Link>
            <Link 
              href="/rechercher" 
              className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium"
            >
              Rechercher
            </Link>
            <Link 
              href="/profil" 
              className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium"
            >
              Profil
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-theme-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass border-t border-theme animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  href="/logements" 
                  className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Logements
                </Link>
                <Link 
                  href="/rechercher" 
                  className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rechercher
                </Link>
                <Link 
                  href="/profil" 
                  className="text-theme-primary hover:text-gold-400 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profil
                </Link>
              </nav>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-theme">
                <div className="lg:hidden">
                  <UserNav />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
