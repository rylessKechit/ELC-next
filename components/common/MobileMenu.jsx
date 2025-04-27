// components/common/MobileMenu.jsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MobileMenu = ({ isOpen, onClose }) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const pathname = usePathname()

  // Toggle dropdown menu
  const toggleDropdown = (e, index) => {
    e.stopPropagation()
    setActiveDropdown(activeDropdown === index ? null : index)
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

  const handleLinkClick = () => {
    onClose()
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Overlay complet pour le menu mobile */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-300 
                    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          {/* Menu de navigation */}
          <nav className="mb-8">
            <ul className="space-y-6">
              {navLinks.map((link, index) => (
                <li key={index} className="py-2">
                  {link.isDropdown ? (
                    <div>
                      <button 
                        className={`flex justify-between items-center w-full text-xl font-medium mb-4
                                  ${activeDropdown === index ? 'text-primary' : 'text-white'}`}
                        onClick={(e) => toggleDropdown(e, index)}
                      >
                        {link.label}
                        <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`}></i>
                      </button>
                      
                      <div className={`space-y-4 pl-4 overflow-hidden transition-all duration-300 ${
                        activeDropdown === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        {link.items.map((item, i) => (
                          <Link 
                            key={i}
                            href={item.path}
                            className={`block py-2 text-lg transition-colors ${
                              isActiveLink(item.path) ? 'text-primary' : 'text-white/80 hover:text-primary'
                            }`}
                            onClick={handleLinkClick}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={link.path}
                      className={`block text-xl font-medium transition-colors ${
                        isActiveLink(link.path, link.exact) ? 'text-primary' : 'text-white hover:text-primary'
                      }`}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* CTA buttons */}
          <div className="mt-auto space-y-4">
            <Link 
              href="tel:+33600000000" 
              className="flex items-center justify-center gap-2 px-5 py-3 bg-black text-white border border-white/20 rounded-full transition-all w-full"
              onClick={handleLinkClick}
            >
              <i className="fas fa-phone"></i>
              <span className="font-medium">Réservation téléphonique</span>
            </Link>
            
            <Link 
              href="/#booking" 
              className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-full transition-all shadow-md w-full"
              onClick={handleLinkClick}
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

export default MobileMenu