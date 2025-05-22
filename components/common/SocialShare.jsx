// components/common/SocialShare.jsx - Version corrigée
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SocialShare = ({ url, title, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect mobile and scroll position
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 300); // Show after scrolling 300px
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate current page URL
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${pathname}` 
    : url;

  // Page-specific sharing data
  const getShareData = () => {
    const baseTitle = title || 'VTC Ballainvilliers - Chauffeur Privé Essonne';
    const description = 'Service VTC premium à Ballainvilliers avec chauffeurs privés dans l\'Essonne. Réservation 24h/24.';
    
    return {
      url: currentUrl,
      title: baseTitle,
      description: description
    };
  };

  const { url: shareUrl, title: shareTitle, description } = getShareData();

  // Social media share URLs
  const shareLinks = {
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`,
      icon: 'fab fa-facebook-f',
      label: 'Partager sur Facebook',
      color: 'hover:bg-blue-600'
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}&hashtags=VTCBallainvilliers,ChauffeurPrive,Essonne`,
      icon: 'fab fa-twitter',
      label: 'Partager sur Twitter',
      color: 'hover:bg-blue-400'
    },
    linkedin: {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(description)}`,
      icon: 'fab fa-linkedin-in',
      label: 'Partager sur LinkedIn',
      color: 'hover:bg-blue-700'
    },
    whatsapp: {
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`,
      icon: 'fab fa-whatsapp',
      label: 'Partager sur WhatsApp',
      color: 'hover:bg-green-500'
    },
    email: {
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${description}\n\n${shareUrl}`)}`,
      icon: 'fas fa-envelope',
      label: 'Partager par email',
      color: 'hover:bg-gray-600'
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Show temporary feedback
      const button = document.getElementById('copy-link-btn');
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('bg-green-500');
        
        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove('bg-green-500');
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Handle social share click
  const handleShare = (platform, shareUrl) => {
    // Track share event (you can integrate with analytics)
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

  if (!isVisible) return null;

  return (
    <div className="social-share-component">
      {/* Desktop Version - Sticky Left */}
      {!isMobile && (
        <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
          <div className="flex flex-col gap-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
            <div className="text-xs font-medium text-gray-600 text-center mb-2">
              Partager
            </div>
            
            {Object.entries(shareLinks).map(([platform, data]) => (
              <button
                key={platform}
                onClick={() => handleShare(platform, data.url)}
                className={`w-10 h-10 rounded-full bg-gray-100 ${data.color} text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110`}
                title={data.label}
                aria-label={data.label}
              >
                <i className={data.icon}></i>
              </button>
            ))}
            
            {typeof navigator !== 'undefined' && navigator.clipboard && (
              <button
                id="copy-link-btn"
                onClick={copyToClipboard}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
                title="Copier le lien"
                aria-label="Copier le lien de la page"
              >
                <i className="fas fa-link"></i>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Version - Bottom Sticky */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg border flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 ml-2">
              Partager cette page
            </span>
            
            <div className="flex gap-2">
              {['whatsapp', 'facebook', 'twitter', 'email'].map((platform) => {
                const data = shareLinks[platform];
                return (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform, data.url)}
                    className={`w-9 h-9 rounded-full bg-gray-100 ${data.color} text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center text-sm`}
                    title={data.label}
                    aria-label={data.label}
                  >
                    <i className={data.icon}></i>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;