import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/images/logo.webp';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Footer */}
        <div className="py-12 border-b border-white/10 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src={logo} 
                alt="Elysian Luxury Chauffeurs Logo" 
                className="h-20 w-auto filter brightness-0 invert"
                width={160}
                height={80}
              />
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
            <Link href="/" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                <i className="fas fa-map-marker-alt text-lg"></i>
              </div>
              <span className="mt-2 font-medium tracking-wide">ME TROUVER</span>
            </Link>
            
            <Link href="tel:+33643537653" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                <i className="fas fa-phone text-lg"></i>
              </div>
              <span className="mt-2 font-medium tracking-wide">M'APPELER</span>
            </Link>
            
            <Link href="/contact" className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                <i className="fas fa-envelope text-lg"></i>
              </div>
              <span className="mt-2 font-medium tracking-wide">ME CONTACTER</span>
            </Link>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="py-6 text-sm text-white/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            &copy; {currentYear} ELYSIAN LUXURY CHAUFFEURS
          </div>
          
          <div>
            <span>Crée par <a href="https://vizionair.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Vizion'air</a></span>
          </div>
        </div>
        
        {/* Gradient line at the bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:300%_100%] animate-gradient"></div>
      </div>
    </footer>
  );
};

export default Footer;