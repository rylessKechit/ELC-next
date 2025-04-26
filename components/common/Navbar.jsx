// components/common/Navbar.jsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = ({ mobileMenuOpen, onLinkClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleDropdown = (e, index) => {
    e.stopPropagation()
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  }

  const navLinks = [
    { path: '/', label: 'Accueil', exact: true },
    {
      label: 'Nos Services',
      isDropdown: true,
      items: [
        { path: '/experience-vip', label: 'Transfert VIP' },
        { path: '/services-evenements', label: 'Événements & Soirées' },
        { path: '/services-longue-distance', label: 'Voyages Longue Distance' },
        { path: '/services-affaires', label: 'Transport d\'Affaires' }
      ]
    },
    { path: '/flotte-vehicules', label: 'Notre Flotte' },
    { path: '/a-propos', label: 'À Propos' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick()
  }

  return (
    <nav className={`border-t border-white/10 transition-all duration-500 bg-secondary/95 backdrop-blur-md
                     md:border-t-0 md:static md:bg-transparent md:backdrop-blur-none
                     ${mobileMenuOpen 
                      ? 'fixed top-0 right-0 h-screen w-[300px] z-40 shadow-2xl transform translate-x-0' 
                      : 'fixed top-0 right-0 h-screen w-[300px] z-40 transform translate-x-full md:transform-none'}`}>
      <div className="h-20 md:h-auto flex items-center justify-center md:justify-center">
        <ul className="w-full flex flex-col md:flex-row md:justify-center">
          {navLinks.map((link, index) => (
            <li key={index} className="relative">
              {link.isDropdown ? (
                <>
                  <button 
                    className={`flex items-center justify-between w-full px-6 py-4 md:py-3 text-left text-white hover:text-primary transition-colors
                               border-b border-white/10 md:border-b-0 ${openDropdown === index ? 'bg-white/5 md:bg-transparent' : ''}`}
                    onClick={(e) => toggleDropdown(e, index)}
                  >
                    {link.label}
                    <i className={`fas fa-chevron-down text-xs ml-1.5 transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div 
                    className={`md:absolute md:top-full md:left-0 min-w-[230px] bg-secondary/95 md:shadow-lg md:rounded-md 
                                md:border-t-2 md:border-primary overflow-hidden transition-all duration-300
                                ${openDropdown === index 
                                  ? 'max-h-96 opacity-100 visible' 
                                  : 'max-h-0 md:max-h-0 opacity-0 md:invisible'}`}
                  >
                    {link.items.map((item, i) => (
                      <Link 
                        key={i}
                        href={item.path}
                        className={`block px-10 md:px-5 py-3 hover:bg-primary/10 hover:pl-6 md:hover:pl-7 transition-all
                                  border-l-2 border-transparent hover:border-primary md:text-sm
                                  ${isActiveLink(item.path) ? 'text-primary border-primary bg-primary/5' : 'text-white'}`}
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link 
                  href={link.path}
                  className={`block px-6 py-4 md:py-5 text-white hover:text-primary transition-colors border-b border-white/10 md:border-b-0 md:uppercase md:text-sm md:tracking-wider
                             md:relative
                             ${isActiveLink(link.path, link.exact) 
                               ? 'text-primary' 
                               : 'text-white'}`}
                  onClick={handleLinkClick}
                >
                  {link.label}
                  {isActiveLink(link.path, link.exact) && (
                    <span className="hidden md:block absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-[30px] h-[2px] bg-primary"></span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar