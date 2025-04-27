// components/common/Navbar.jsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = ({ mobileMenuOpen, onLinkClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()

  // Handle hover for desktop dropdown
  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 768) { // Only on desktop
      setOpenDropdown(index)
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Only on desktop
      setOpenDropdown(null)
    }
  }

  // Toggle dropdown menu on click (mainly for mobile)
  const toggleDropdown = (e, index) => {
    e.stopPropagation()
    setOpenDropdown(openDropdown === index ? null : index)
  }

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
  ]

  // Check if link is active
  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return pathname === path
    }
    return pathname.startsWith(path) && path !== '#'
  }
  
  // Check if any dropdown item is active to highlight parent
  const isDropdownActive = (items) => {
    if (!items) return false
    return items.some(item => isActiveLink(item.path))
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block border-y border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-center">
            {navLinks.map((link, index) => (
              <li 
                key={index} 
                className={`relative group ${link.isDropdown ? 'dropdown-container' : ''}`}
                onMouseEnter={() => link.isDropdown && handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {link.isDropdown ? (
                  <>
                    <button 
                      className={`px-6 h-full text-white hover:text-primary transition-colors py-4 uppercase text-sm tracking-wider flex items-center
                                ${(openDropdown === index || isDropdownActive(link.items)) ? 'text-primary' : ''}`}
                      onClick={(e) => toggleDropdown(e, index)}
                      aria-expanded={openDropdown === index}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <i className={`fas fa-chevron-down text-xs ml-1.5 transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : ''}`}></i>
                      {/* Ajout d'un indicateur visuel permanent pour montrer que c'est un dropdown */}
                      <span className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 
                                      border-l-[4px] border-l-transparent 
                                      border-r-[4px] border-r-transparent 
                                      border-t-[4px] border-t-primary"></span>
                    </button>
                    
                    <div 
                      className={`absolute top-full left-0 min-w-[250px] bg-secondary/95 shadow-lg rounded-b-md border-t-2 border-primary overflow-hidden z-20
                                transition-all duration-300 ${openDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    >
                      {link.items.map((item, i) => (
                        <Link 
                          key={i}
                          href={item.path}
                          className={`block px-5 py-3 hover:bg-primary/10 hover:pl-7 transition-all border-l-2 
                                    ${isActiveLink(item.path) ? 'text-primary border-primary bg-primary/5' : 'text-white border-transparent'}`}
                          onClick={() => { onLinkClick && onLinkClick(); setOpenDropdown(null); }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    href={link.path}
                    className={`block px-6 py-4 transition-colors uppercase text-sm tracking-wider relative hover:text-primary
                              ${isActiveLink(link.path, link.exact) ? 'text-primary' : 'text-white'}`}
                    onClick={() => onLinkClick && onLinkClick()}
                  >
                    {link.label}
                    {isActiveLink(link.path, link.exact) && (
                      <span className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-[30px] h-[2px] bg-primary"></span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 z-40 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li key={index} className="border-b border-white/10 py-2">
                {link.isDropdown ? (
                  <div>
                    <button 
                      className={`flex justify-between items-center w-full pb-2 text-lg font-medium
                                ${(openDropdown === index || isDropdownActive(link.items)) ? 'text-primary' : 'text-white'}`}
                      onClick={(e) => toggleDropdown(e, index)}
                      aria-expanded={openDropdown === index}
                    >
                      {link.label}
                      <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    <div className={`space-y-2 pl-4 overflow-hidden transition-all duration-300 ${
                      openDropdown === index ? 'max-h-[300px] opacity-100 pt-2' : 'max-h-0 opacity-0'
                    }`}>
                      {link.items.map((item, i) => (
                        <Link 
                          key={i}
                          href={item.path}
                          className={`block py-1 transition-colors ${
                            isActiveLink(item.path) ? 'text-primary' : 'text-white/80 hover:text-primary'
                          }`}
                          onClick={() => { onLinkClick && onLinkClick(); setOpenDropdown(null); }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={link.path}
                    className={`block text-lg font-medium transition-colors ${
                      isActiveLink(link.path, link.exact) ? 'text-primary' : 'text-white hover:text-primary'
                    }`}
                    onClick={() => onLinkClick && onLinkClick()}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mt-auto space-y-4">
            <Link 
              href="/contact" 
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white hover:bg-white/15 transition-all w-full"
              onClick={() => onLinkClick && onLinkClick()}
            >
              <i className="fas fa-phone"></i>
              <span className="font-medium">Réservation téléphonique</span>
            </Link>
            
            <Link 
              href="/#booking" 
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all shadow-md w-full"
              onClick={() => onLinkClick && onLinkClick()}
            >
              <i className="fas fa-calendar-alt"></i>
              <span className="font-medium">Réserver maintenant</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar