// components/common/Footer.jsx - Version propre avec partage social
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../public/assets/images/logo.webp';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Generate current page URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${pathname}` 
    : 'https://www.elysian-luxury-chauffeurs.com';

  // Page-specific sharing data
  const shareTitle = 'VTC Ballainvilliers - Chauffeur Privé Essonne Premium';
  const description = 'Service VTC premium à Ballainvilliers avec chauffeurs privés dans l\'Essonne. Réservation 24h/24.';

  // Social media share URLs
  const shareLinks = [
    {
      name: 'facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareTitle)}`,
      icon: 'fab fa-facebook-f',
      label: 'Partager sur Facebook',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}&hashtags=VTCBallainvilliers,ChauffeurPrive,Essonne`,
      icon: 'fab fa-twitter',
      label: 'Partager sur Twitter',
      color: 'hover:bg-blue-400'
    },
    {
      name: 'linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(description)}`,
      icon: 'fab fa-linkedin-in',
      label: 'Partager sur LinkedIn',
      color: 'hover:bg-blue-700'
    },
    {
      name: 'whatsapp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${currentUrl}`)}`,
      icon: 'fab fa-whatsapp',
      label: 'Partager sur WhatsApp',
      color: 'hover:bg-green-500'
    },
    {
      name: 'email',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${description}\n\n${currentUrl}`)}`,
      icon: 'fas fa-envelope',
      label: 'Partager par email',
      color: 'hover:bg-gray-600'
    }
  ];

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      const button = document.getElementById('copy-link-footer-btn');
      if (button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('bg-green-500', 'text-white');
        
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove('bg-green-500', 'text-white');
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Handle social share click
  const handleShare = (platform, shareUrl) => {
    // Track share event for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'share', {
        method: platform,
        content_type: 'page',
        item_id: pathname
      });
    }

    // Open share window
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      shareUrl,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section principale du footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1: Logo et description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src={logo} 
                alt="VTC Ballainvilliers - Chauffeur Privé Essonne" 
                className="h-16 w-auto filter brightness-0 invert"
                width={120}
                height={64}
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              <strong>VTC Ballainvilliers</strong> et <strong>chauffeur privé Essonne</strong> premium. 
              Service transport haut de gamme 24h/24 dans le département 91.
            </p>
            
            {/* Infos contact rapides */}
            <div className="space-y-2">
              <a 
                href="tel:+33643537653" 
                className="flex items-center text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <i className="fas fa-phone mr-3 text-primary"></i>
                +33 6 43 53 76 53
              </a>
              <a 
                href="mailto:contact@elysian-luxury-chauffeurs.com" 
                className="flex items-center text-sm text-gray-300 hover:text-primary transition-colors"
              >
                <i className="fas fa-envelope mr-3 text-primary"></i>
                Contact VTC Ballainvilliers
              </a>
              <div className="flex items-center text-sm text-gray-300">
                <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                Ballainvilliers, Essonne (91)
              </div>
            </div>
          </div>
          
          {/* Colonne 2: Services VTC */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Services VTC Ballainvilliers</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/experience-vip" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  VTC Premium Ballainvilliers
                </Link>
              </li>
              <li>
                <Link 
                  href="/services-evenements" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Chauffeur Événements Essonne
                </Link>
              </li>
              <li>
                <Link 
                  href="/services-longue-distance" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  VTC Longue Distance
                </Link>
              </li>
              <li>
                <Link 
                  href="/services-affaires" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Transport Affaires Ballainvilliers
                </Link>
              </li>
              <li>
                <Link 
                  href="/flotte-vehicules" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Flotte VTC Premium
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Colonne 3: Zones géographiques */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Chauffeur Privé Essonne</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/vtc-ballainvilliers" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  VTC Ballainvilliers Local
                </Link>
              </li>
              <li>
                <Link 
                  href="/chauffeurs-prive-essonne" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Chauffeur Privé Essonne 91
                </Link>
              </li>
              <li>
                <Link 
                  href="/vtc-longjumeau" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  VTC Longjumeau
                </Link>
              </li>
              <li>
                <Link 
                  href="/chauffeur-prive-antony" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Chauffeur Privé Antony
                </Link>
              </li>
              <li>
                <Link 
                  href="/vtc-massy" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  VTC Massy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Colonne 4: Partage social + Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Partager & Contact</h4>
            
            {/* Boutons de partage social */}
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-4">Partagez notre service VTC Ballainvilliers :</p>
              <div className="grid grid-cols-3 gap-3">
                {shareLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleShare(link.name, link.url)}
                    className={`w-12 h-12 rounded-full bg-white/10 ${link.color} text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110`}
                    title={link.label}
                    aria-label={link.label}
                  >
                    <i className={link.icon}></i>
                  </button>
                ))}
                
                {/* Bouton copier le lien */}
                <button
                  id="copy-link-footer-btn"
                  onClick={copyToClipboard}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                  title="Copier le lien"
                  aria-label="Copier le lien de la page"
                >
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="space-y-3">
              <Link 
                href="/#booking" 
                className="block w-full py-2 px-4 bg-primary text-white text-center rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Réserver VTC Ballainvilliers
              </Link>
              <Link 
                href="/contact" 
                className="block w-full py-2 px-4 border border-primary text-primary text-center rounded-md hover:bg-primary hover:text-white transition-colors text-sm"
              >
                <i className="fas fa-envelope mr-2"></i>
                Contact Chauffeur Essonne
              </Link>
            </div>
          </div>
        </div>
        
        {/* Section intermédiaire avec actions rapides */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Actions rapides desktop */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
              <Link href="/" className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <i className="fas fa-home text-lg"></i>
                </div>
                <span className="mt-2 font-medium tracking-wide text-sm">VTC BALLAINVILLIERS</span>
              </Link>
              
              <a href="tel:+33643537653" className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <i className="fas fa-phone text-lg"></i>
                </div>
                <span className="mt-2 font-medium tracking-wide text-sm">CHAUFFEUR PRIVÉ</span>
              </a>
              
              <Link href="/contact" className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <i className="fas fa-envelope text-lg"></i>
                </div>
                <span className="mt-2 font-medium tracking-wide text-sm">CONTACT ESSONNE</span>
              </Link>
            </div>
            
            {/* Horaires et disponibilité */}
            <div className="text-center md:text-right">
              <div className="text-primary font-semibold mb-1">Service 24h/24 - 7j/7</div>
              <div className="text-sm text-gray-300">VTC Ballainvilliers & Chauffeur Privé Essonne</div>
              <div className="text-xs text-gray-400 mt-1">Réservation immédiate ou programmée</div>
            </div>
          </div>
        </div>
        
        {/* Copyright et mentions légales */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
            <div className="text-center md:text-left">
              <div>&copy; {currentYear} <strong>VTC BALLAINVILLIERS - CHAUFFEUR PRIVÉ ESSONNE</strong></div>
              <div className="text-xs text-gray-400 mt-1">
                Service premium département 91 • Elysian Luxury Chauffeurs
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-xs">
              <Link href="/legals" className="hover:text-primary transition-colors">
                Mentions Légales
              </Link>
              <span className="hidden md:inline">•</span>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Confidentialité
              </Link>
              <span className="hidden md:inline">•</span>
              <a 
                href="https://vizionair.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
              >
                Site créé par Vizion'air
              </a>
            </div>
          </div>
        </div>
        
        {/* Ligne de gradient décorative */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary"></div>
      </div>
    </footer>
  );
};

export default Footer;