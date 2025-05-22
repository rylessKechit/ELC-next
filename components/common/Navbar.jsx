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

  // Structure des liens de navigation avec ancres SEO optimisées
  const navLinks = [
    { 
      path: '/', 
      label: 'ACCUEIL VTC BALLAINVILLIERS', 
      exact: true,
      ariaLabel: 'Accueil - Service VTC Ballainvilliers'
    },
    {
      label: 'SERVICES CHAUFFEUR PRIVÉ',
      path: '#',
      isDropdown: true,
      ariaLabel: 'Services de chauffeur privé dans l\'Essonne',
      items: [
        { 
          path: '/experience-vip', 
          label: 'VTC Premium Ballainvilliers',
          description: 'Service VTC haut de gamme avec chauffeur privé d\'élite',
          ariaLabel: 'VTC Premium à Ballainvilliers - Transport de luxe'
        },
        { 
          path: '/services-evenements', 
          label: 'Chauffeur Événements Essonne',
          description: 'Transport pour mariages, galas et événements spéciaux',
          ariaLabel: 'Chauffeur privé pour événements dans l\'Essonne'
        },
        { 
          path: '/services-longue-distance', 
          label: 'VTC Longue Distance Essonne',
          description: 'Voyages interrégionaux avec chauffeur privé',
          ariaLabel: 'Service VTC longue distance depuis l\'Essonne'
        },
        { 
          path: '/services-affaires', 
          label: 'Transport Affaires Ballainvilliers',
          description: 'Chauffeur privé dédié aux professionnels',
          ariaLabel: 'Transport d\'affaires avec chauffeur privé Ballainvilliers'
        }
      ]
    },
    { 
      path: '/flotte-vehicules', 
      label: 'FLOTTE VTC PREMIUM',
      ariaLabel: 'Notre flotte de véhicules VTC premium Ballainvilliers'
    },
    { 
      path: '/a-propos', 
      label: 'CHAUFFEURS ELYSIAN',
      ariaLabel: 'À propos d\'Elysian - Chauffeurs privés Essonne'
    },
    { 
      path: '/contact', 
      label: 'CONTACT VTC ESSONNE',
      ariaLabel: 'Contacter nos chauffeurs privés Essonne - Réservation VTC'
    },
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
      {/* Overlay pour fermer le menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden"
          onClick={onLinkClick}
        />
      )}
      
      <nav 
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block transition-all duration-300 bg-secondary backdrop-blur-sm border-t border-white/10 relative z-40`}
        aria-label="Navigation principale VTC Ballainvilliers"
        id="main-navigation"
      >
        <div className="max-w-7xl mx-auto">
          <ul className="flex flex-col md:flex-row justify-center md:h-12" role="menubar" aria-label="Menu principal chauffeur privé Essonne">
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
                        aria-label={link.ariaLabel}
                        role="menuitem"
                      >
                        <span>{link.label}</span>
                        <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${openDropdown === dropdownIndex ? 'rotate-180' : ''}`} aria-hidden="true"></i>
                      </button>
                      
                      <ul 
                        className={`${
                          openDropdown === dropdownIndex ? 'block' : 'hidden'
                        } md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 md:w-80 bg-secondary/98 md:bg-secondary/95 md:shadow-lg md:rounded-b-md z-50 border-l-2 border-primary md:border-l-0`}
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
                              className={`block px-6 md:px-5 py-4 border-b last:border-b-0 border-gray-700 transition-colors duration-300 hover:bg-primary hover:bg-opacity-15 hover:text-primary ${
                                isActive(item.path) 
                                  ? 'bg-primary bg-opacity-20 text-primary font-medium border-l-4 border-primary md:border-l-0' 
                                  : 'text-white'
                              }`}
                              onClick={onLinkClick}
                              role="menuitem"
                              aria-label={item.ariaLabel}
                            >
                              <div className="text-left">
                                <div className="font-medium text-sm mb-1">{item.label}</div>
                                {item.description && (
                                  <div className="text-xs text-gray-300 leading-tight">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                        
                        {/* CTA dans le dropdown */}
                        <li role="none" className="md:p-4 bg-primary/10">
                          <Link
                            href="/#booking"
                            className="block md:text-center py-3 px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
                            onClick={onLinkClick}
                            aria-label="Réserver chauffeur privé maintenant"
                          >
                            <i className="fas fa-calendar-alt mr-2" aria-hidden="true"></i>
                            Réserver Maintenant
                          </Link>
                        </li>
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
                      aria-label={link.ariaLabel}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
            
            {/* CTA mobile uniquement */}
            <li className="md:hidden mt-4 px-5" role="none">
              <div className="space-y-3">
                <Link
                  href="/#booking"
                  className="block w-full py-3 px-4 bg-primary text-white text-center rounded-md hover:bg-primary-dark transition-colors font-medium"
                  onClick={onLinkClick}
                  aria-label="Réserver VTC Ballainvilliers maintenant"
                >
                  <i className="fas fa-calendar-alt mr-2" aria-hidden="true"></i>
                  Réserver VTC Ballainvilliers
                </Link>
                
                <a
                  href="tel:+33643537653"
                  className="block w-full py-3 px-4 border border-white text-white text-center rounded-md hover:bg-white hover:text-secondary transition-colors font-medium"
                  onClick={onLinkClick}
                  aria-label="Appeler chauffeur privé Essonne maintenant"
                >
                  <i className="fas fa-phone mr-2" aria-hidden="true"></i>
                  Chauffeur Privé Direct
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;