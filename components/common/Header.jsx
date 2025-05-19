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

  // Scroll handler avec fonctionnalité hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Déterminer si on scroll vers le bas ou vers le haut
      const isScrollingDown = currentScrollPos > prevScrollPos;
      
      // Logique de visibilité - cacher quand on scroll vers le bas, montrer vers le haut
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
    // Réactiver le scroll du body si nécessaire
    document.body.classList.remove('overflow-hidden');
  }, [pathname]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Empêcher le scroll du body quand le menu est ouvert
    if (!mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  // Fermer le menu mobile quand on clique sur un lien
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
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

          {/* CTA Buttons - Desktop */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:+33643537653" 
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/15 transition-all text-sm"
            >
              <i className="fas fa-phone"></i>
              <span className="font-medium">Réservation téléphonique</span>
            </a>
            
            <Link 
              href="/#booking" 
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark hover:text-white hover:text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              <i className="fas fa-calendar-alt"></i>
              <span className="font-medium">Réserver maintenant</span>
            </Link>
            
            {/* Icônes mobiles - Contact et Réservation */}
            <div className="flex md:hidden items-center gap-4">
              <Link 
                href="/contact" 
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/15 transition-all flex items-center justify-center"
                aria-label="Réservation téléphonique"
              >
                <i className="fas fa-phone text-sm"></i>
              </Link>
              
              <Link 
                href="/#booking" 
                className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                aria-label="Réserver maintenant"
              >
                <i className="fas fa-calendar-alt text-sm"></i>
              </Link>
            </div>
            
            {/* Bouton hamburger mobile */}
            <button 
              className="flex md:hidden flex-col justify-center items-center w-8 h-6 relative z-50 ml-4"
              onClick={toggleMenu}
              aria-label="Menu principal"
              aria-expanded={mobileMenuOpen}
              aria-controls="main-navigation"
            >
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white my-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Navbar Component */}
      <Navbar mobileMenuOpen={mobileMenuOpen} onLinkClick={handleLinkClick} />
    </header>
  );
};

export default Header;