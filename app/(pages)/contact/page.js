// app/contact/page.js - Version corrigée
import ContactForm from '@/components/contact/ContactForm';
import Breadcrumb from '@/components/common/Breadcrumb';

export const metadata = {
  title: 'Contact - Elysian Luxury Chauffeurs',
  description: 'Contactez-nous pour vos demandes de réservation, informations ou toute autre question. Service client disponible 7j/7.',
};

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* En-tête */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Contactez-nous
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Notre équipe est à votre disposition pour répondre à toutes vos questions 
                et vous accompagner dans vos déplacements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Formulaire de contact */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>

              {/* Informations de contact */}
              <div className="space-y-8">
                {/* Téléphone */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <i className="fas fa-phone text-white text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Téléphone</h3>
                      <p className="text-primary font-semibold text-lg">+33 6 43 53 76 53</p>
                      <p className="text-gray-600 text-sm mt-1">Disponible 7j/7, de 7h à 22h</p>
                      <a 
                        href="tel:+33643537653" 
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium mt-3 transition-colors"
                      >
                        Appeler maintenant <i className="fas fa-phone ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <i className="fas fa-envelope text-white text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                      <p className="text-primary font-semibold">contact@elysian-luxury-chauffeurs.com</p>
                      <p className="text-gray-600 text-sm mt-1">Réponse sous 24h</p>
                      <a 
                        href="mailto:contact@elysian-luxury-chauffeurs.com" 
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium mt-3 transition-colors"
                      >
                        Envoyer un email <i className="fas fa-envelope ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="fab fa-whatsapp text-white text-xl"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">WhatsApp</h3>
                      <p className="text-green-600 font-semibold">+33 6 12 34 56 78</p>
                      <p className="text-gray-600 text-sm mt-1">Pour des réponses rapides et des réservations urgentes</p>
                      <a 
                        href="https://wa.me/33612345678" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mt-3 transition-colors"
                      >
                        Nous contacter sur WhatsApp <i className="fab fa-whatsapp ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi</span>
                      <span className="font-semibold">7h - 22h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samedi</span>
                      <span className="font-semibold">8h - 22h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimanche</span>
                      <span className="font-semibold">9h - 20h</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 italic">
                    Service de réservation disponible 24h/24 via notre site web.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}