"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = ({ mobileMenuOpen, onLinkClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  const pathname = usePathname();

  // Réinitialiser le dropdown lorsque le menu mobile est fermé
  useEffect(() => {
    if (!mobileMenuOpen) {
      setOpenDropdown(null);
    }
  }, [mobileMenuOpen]);

  // Ajouter les références pour chaque dropdown
  useEffect(() => {
    dropdownRefs.current = dropdownRefs.current.slice(0, navLinks.filter(link => link.isDropdown).length);
  }, []);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  // Gestionnaire de souris pour les menus déroulants (desktop uniquement)
  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 768) { // Only on desktop
      setOpenDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Only on desktop
      setOpenDropdown(null);
    }
  };

  // Navigation links data structure
  const navLinks = [
    { path: '/', label: 'ACCUEIL', exact: true },
    {
      label: 'NOS SERVICES',
      path: '#',
      isDropdown: true,
      items: [
        { path: '/experience-vip', label: 'Transfert VIP' },
        { path: '/services-evenements', label: 'Événements & Soirées' },
        { path: '/services-longue-distance', label: 'Voyages Longue Distance' },
        { path: '/services-affaires', label: 'Transport d\'Affaires' }
      ]
    },
    { path: '/flotte-vehicules', label: 'NOTRE FLOTTE' },
    { path: '/a-propos', label: 'À PROPOS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  // Check if link is active
  const isActive = (path, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path) && path !== '#';
  };
  
  // Check if any dropdown item is active to highlight parent
  const isDropdownActive = (items) => {
    if (!items) return false;
    return items.some(item => isActive(item.path));
  };

  return (
    <nav 
      className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block transition-all duration-300 bg-secondary backdrop-blur-sm border-t border-white/10`}
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-col md:flex-row justify-center md:h-12" role="menubar" aria-label="Menu principal">
          {navLinks.map((link, index) => {
            const dropdownIndex = link.isDropdown ? navLinks.filter((l, i) => l.isDropdown && i < index).length : -1;
            
            return (
              <li 
                key={index} 
                className={`relative ${link.isDropdown ? 'group' : ''}`}
                role="none"
              >
                {link.isDropdown ? (
                  <>
                    <button 
                      className={`flex items-center w-full md:h-full px-5 py-4 md:py-0 text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 hover:text-primary ${
                        (openDropdown === dropdownIndex || isDropdownActive(link.items)) ? 'text-primary' : ''
                      }`}
                      onClick={() => toggleDropdown(dropdownIndex)}
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === dropdownIndex}
                      role="menuitem"
                    >
                      {link.label}
                      <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${openDropdown === dropdownIndex ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    <ul 
                      className={`${
                        openDropdown === dropdownIndex ? 'block' : 'hidden'
                      } md:absolute md:top-full md:left-0 md:w-64 bg-secondary/95 shadow-lg rounded-b-md z-40`}
                      role="menu"
                      aria-label={`Sous-menu ${link.label}`}
                    >
                      {link.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex}
                          role="none"
                        >
                          <Link 
                            href={item.path}
                            className={`block px-8 md:px-5 py-3 text-sm border-b last:border-b-0 border-gray-700 transition-colors duration-300 ${
                              isActive(item.path) 
                                ? 'bg-primary bg-opacity-10 text-primary' 
                                : 'text-white hover:bg-primary hover:bg-opacity-10 hover:text-primary'
                            }`}
                            onClick={() => { onLinkClick && onLinkClick(); setOpenDropdown(null); }}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link 
                    href={link.path} 
                    className={`flex items-center justify-center h-full px-5 py-4 md:py-0 text-sm font-medium uppercase tracking-wider transition-colors duration-300 relative ${
                      isActive(link.path, link.exact) 
                        ? 'text-primary md:after:content-[""] md:after:absolute md:after:bottom-0 md:after:left-1/2 md:after:-translate-x-1/2 md:after:w-8 md:after:h-0.5 md:after:bg-primary' 
                        : 'text-white hover:text-primary'
                    }`}
                    onClick={() => onLinkClick && onLinkClick()}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;