// components/common/Header.jsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from './Navbar'
import logo from '../../public/assets/images/logo.png'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  // Gestionnaire de défilement avec hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      
      // Détermine si l'utilisateur a défilé vers le haut ou vers le bas
      const isScrollingDown = currentScrollPos > prevScrollPos
      
      // Visibility logic - hide header when scrolling down, show when scrolling up
      if (currentScrollPos > 100) {
        setVisible(!isScrollingDown)
        setScrolled(true)
      } else {
        setVisible(true)
        setScrolled(currentScrollPos > 30)
      }
      
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  // Fonction pour inverser l'état du menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    
    // Empêcher le défilement du body quand le menu est ouvert
    if (!mobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-out bg-black/90 backdrop-blur-md
                        ${scrolled ? 'shadow-md bg-black/95' : ''} 
                        ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-10 flex justify-between items-center">
        <div className="z-50">
          <Link href="/">
            <Image 
              src={logo} 
              alt="Elysian Luxury Chauffeurs" 
              className={`h-[75px] w-auto filter brightness-0 invert transition-all duration-300 ${scrolled ? 'h-[50px]' : ''}`}
              width={150}
              height={75}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex gap-5">
            <Link 
              href="/contact" 
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 text-white hover:bg-white/15 transition-all"
            >
              <i className="fas fa-phone"></i>
              <span className="font-medium">Réservation téléphonique</span>
            </Link>
            
            <Link 
              href="/#booking" 
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <i className="fas fa-calendar-alt"></i>
              <span className="font-medium">Réserver maintenant</span>
            </Link>
          </div>
          
          <button 
            className={`ml-6 md:ml-0 flex flex-col justify-center items-center w-8 h-6 relative z-50 md:hidden`}
            onClick={toggleMenu}
            aria-label="Menu principal"
          >
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white my-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </div>
      
      <Navbar mobileMenuOpen={mobileMenuOpen} onLinkClick={() => setMobileMenuOpen(false)} />
    </header>
  )
}

export default Header