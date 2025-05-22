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
    if (window.innerWidth >= 768) {
      setOpenDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setOpenDropdown(null);
    }
  };

  // Structure des liens de navigation
  const navLinks = [
    { path: '/', label: 'ACCUEIL', exact: true, icon: 'fa-home' },
    {
      label: 'NOS SERVICES',
      path: '#',
      isDropdown: true,
      icon: 'fa-concierge-bell',
      items: [
        { path: '/experience-vip', label: 'Transfert VIP', icon: 'fa-crown' },
        { path: '/services-evenements', label: 'Événements & Soirées', icon: 'fa-glass-cheers' },
        { path: '/services-longue-distance', label: 'Voyages Longue Distance', icon: 'fa-route' },
        { path: '/services-affaires', label: 'Transport d\'Affaires', icon: 'fa-briefcase' }
      ]
    },
    { path: '/flotte-vehicules', label: 'NOTRE FLOTTE', icon: 'fa-car' },
    { path: '/a-propos', label: 'À PROPOS', icon: 'fa-info-circle' },
    { path: '/contact', label: 'CONTACT', icon: 'fa-envelope' },
  ];

  // Vérifier si un lien est actif
  const isActive = (path, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path) && path !== '#';
  };
  
  // Vérifier si un élément du dropdown est actif
  const isDropdownActive = (items) => {
    if (!items) return false;
    return items.some(item => isActive(item.path));
  };

  return (
    <>
      {/* Overlay amélioré pour fermer le menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
          onClick={onLinkClick}
        />
      )}
      
      <nav 
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block transition-all duration-300 bg-secondary/95 backdrop-blur-md border-t border-white/10 relative z-40`}
        aria-label="Navigation principale"
        id="main-navigation"
      >
        {/* Navigation Desktop - Inchangée */}
        <div className="hidden md:block max-w-7xl mx-auto">
          <ul className="flex flex-row justify-center h-12" role="menubar" aria-label="Menu principal">
            {navLinks.map((link, index) => {
              const dropdownIndex = link.isDropdown ? navLinks.filter((l, i) => l.isDropdown && i < index).length : -1;
              
              return (
                <li 
                  key={index} 
                  className={`relative ${link.isDropdown ? 'group' : ''}`}
                  role="none"
                  onMouseEnter={() => link.isDropdown && handleMouseEnter(dropdownIndex)}
                  onMouseLeave={() => link.isDropdown && handleMouseLeave()}
                >
                  {link.isDropdown ? (
                    <>
                      <button 
                        className={`flex items-center justify-center md:justify-between w-full md:h-full px-5 py-4 md:py-0 text-white font-medium text-sm uppercase tracking-wider transition-colors duration-300 hover:text-primary ${
                          (openDropdown === dropdownIndex || isDropdownActive(link.items)) ? 'text-primary' : ''
                        }`}
                        onClick={() => toggleDropdown(dropdownIndex)}
                        aria-haspopup="menu"
                        aria-expanded={openDropdown === dropdownIndex}
                        role="menuitem"
                      >
                        <span>{link.label}</span>
                        <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${openDropdown === dropdownIndex ? 'rotate-180' : ''}`}></i>
                      </button>
                      
                      <ul 
                        className={`${
                          openDropdown === dropdownIndex ? 'block' : 'hidden'
                        } md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 md:w-64 bg-secondary/98 md:bg-secondary/95 md:shadow-lg md:rounded-b-md z-50 border-l-2 border-primary md:border-l-0`}
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
                              className={`block px-8 md:px-5 py-3 text-sm border-b last:border-b-0 border-gray-700 transition-colors duration-300 text-center md:text-left ${
                                isActive(item.path) 
                                  ? 'bg-primary bg-opacity-20 text-primary font-medium' 
                                  : 'text-white hover:bg-primary hover:bg-opacity-15 hover:text-primary'
                              }`}
                              onClick={onLinkClick}
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
                      onClick={onLinkClick}
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

        {/* Navigation Mobile - Complètement refaite */}
        <div className="md:hidden">
          {/* Header du menu mobile avec actions rapides */}
          <div className="bg-secondary/90 backdrop-blur-sm border-b border-white/10 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg">Menu Principal</h3>
                <p className="text-primary text-sm">VTC Ballainvilliers</p>
              </div>
              
              {/* Actions rapides */}
              <div className="flex items-center gap-3">
                <a 
                  href="tel:+33643537653" 
                  className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                  onClick={onLinkClick}
                  aria-label="Appeler directement"
                >
                  <i className="fas fa-phone text-sm"></i>
                </a>
                
                <Link 
                  href="/#booking" 
                  className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 flex items-center justify-center shadow-md"
                  onClick={onLinkClick}
                  aria-label="Réserver maintenant"
                >
                  <i className="fas fa-calendar-alt text-sm"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Menu principal mobile avec design carte */}
          <div className="bg-gradient-to-b from-secondary to-secondary/95 backdrop-blur-md px-4 py-6 max-h-[70vh] overflow-y-auto">
            <ul className="space-y-2" role="menubar" aria-label="Menu principal mobile">
              {navLinks.map((link, index) => {
                const dropdownIndex = link.isDropdown ? navLinks.filter((l, i) => l.isDropdown && i < index).length : -1;
                
                return (
                  <li key={index} role="none" className="group">
                    {link.isDropdown ? (
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300">
                        <button 
                          className={`w-full flex items-center justify-between p-4 text-white font-medium transition-colors duration-300 ${
                            (openDropdown === dropdownIndex || isDropdownActive(link.items)) ? 'text-primary' : 'hover:text-primary'
                          }`}
                          onClick={() => toggleDropdown(dropdownIndex)}
                          aria-haspopup="menu"
                          aria-expanded={openDropdown === dropdownIndex}
                          role="menuitem"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                              <i className={`fas ${link.icon} text-primary`}></i>
                            </div>
                            <span className="text-left">{link.label}</span>
                          </div>
                          <i className={`fas fa-chevron-down text-sm transition-transform duration-300 ${
                            openDropdown === dropdownIndex ? 'rotate-180 text-primary' : ''
                          }`}></i>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${
                          openDropdown === dropdownIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="bg-white/5 border-t border-white/10 p-2">
                            <ul role="menu" className="space-y-1">
                              {link.items.map((item, itemIndex) => (
                                <li key={itemIndex} role="none">
                                  <Link 
                                    href={item.path}
                                    className={`flex items-center p-3 rounded-lg text-sm transition-all duration-300 ${
                                      isActive(item.path) 
                                        ? 'bg-primary text-white font-medium shadow-sm' 
                                        : 'text-white/90 hover:bg-white/10 hover:text-primary'
                                    }`}
                                    onClick={onLinkClick}
                                    role="menuitem"
                                  >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                      isActive(item.path) ? 'bg-white/20' : 'bg-primary/20'
                                    }`}>
                                      <i className={`fas ${item.icon} text-xs ${
                                        isActive(item.path) ? 'text-white' : 'text-primary'
                                      }`}></i>
                                    </div>
                                    <span>{item.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.path} 
                        className={`flex items-center p-4 rounded-xl font-medium transition-all duration-300 ${
                          isActive(link.path, link.exact) 
                            ? 'bg-primary text-white shadow-lg scale-[1.02]' 
                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:text-primary hover:scale-[1.01]'
                        }`}
                        onClick={onLinkClick}
                        role="menuitem"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          isActive(link.path, link.exact) ? 'bg-white/20' : 'bg-primary/20'
                        }`}>
                          <i className={`fas ${link.icon} ${
                            isActive(link.path, link.exact) ? 'text-white' : 'text-primary'
                          }`}></i>
                        </div>
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Section CTA en bas du menu mobile */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/30 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2 text-center">Réservation Express</h4>
                <p className="text-white/80 text-sm text-center mb-4">Service VTC disponible 24h/24</p>
                
                <div className="flex gap-3">
                  <Link 
                    href="/#booking" 
                    className="flex-1 bg-primary text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                    onClick={onLinkClick}
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Réserver
                  </Link>
                  
                  <a 
                    href="tel:+33643537653" 
                    className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors duration-300"
                    onClick={onLinkClick}
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Appeler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;