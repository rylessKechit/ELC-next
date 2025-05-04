"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Navbar from './Navbar';
import logo from '../../public/assets/images/logo.webp';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();

  // Scroll handler with header hide/show functionality
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Determine if scrolling up or down
      const isScrollingDown = currentScrollPos > prevScrollPos;
      
      // Visibility logic - hide header when scrolling down, show when scrolling up
      if (currentScrollPos > 100) {
        setVisible(!isScrollingDown);
        setScrolled(true);
      } else {
        setVisible(true);
        setScrolled(currentScrollPos > 30);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
    if (mobileMenuOpen) {
      document.body.classList.remove('overflow-hidden');
    }
  }, [pathname, mobileMenuOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Prevent body scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out bg-secondary/90 backdrop-blur-md
                  ${scrolled ? 'shadow-md bg-secondary/95 py-2' : 'py-4'} 
                  ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-1 md:flex-none">
            <Link href="/" className="flex justify-start md:justify-center">
              <Image 
                src={logo} 
                alt="Elysian Luxury Chauffeurs" 
                className={`h-[60px] w-auto filter brightness-0 invert transition-all duration-300 ${scrolled ? 'h-[45px]' : ''}`}
                width={120}
                height={60}
                priority
              />
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link 
              href="/contact" 
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/15 transition-all text-sm"
            >
              <i className="fas fa-phone"></i>
              <span className="font-medium">Réservation téléphonique</span>
            </Link>
            
            <Link 
              href="/#booking" 
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              <i className="fas fa-calendar-alt"></i>
              <span className="font-medium">Réserver maintenant</span>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="flex md:hidden flex-col justify-center items-center w-8 h-6 relative z-50"
              onClick={toggleMenu}
              aria-label="Menu principal"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white my-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Navbar Component */}
      <Navbar mobileMenuOpen={mobileMenuOpen} onLinkClick={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;