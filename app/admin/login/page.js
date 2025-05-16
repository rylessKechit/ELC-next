"use client";

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  // États du composant
  const [credentials, setCredentials] = useState({
    email: 'admin@elysian-luxury-chauffeurs.com',
    password: process.env.NEXT_PUBLIC_DEFAULT_ADMIN_PASSWORD || 'ElysianAdmin123!',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Hooks de navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Récupérer l'URL de callback de manière sécurisée
  const getCallbackUrl = () => {
    try {
      let callbackUrl = searchParams.get('callbackUrl');
      
      // Si pas de callbackUrl, utiliser le dashboard par défaut
      if (!callbackUrl) {
        return '/admin/dashboard';
      }
      
      // Décoder l'URL si elle est encodée
      callbackUrl = decodeURIComponent(callbackUrl);
      
      // Vérifier que l'URL est relative ou sur le même domaine
      if (callbackUrl.startsWith('/')) {
        return callbackUrl;
      }
      
      // Si l'URL n'est pas relative, rediriger vers le dashboard par défaut
      return '/admin/dashboard';
    } catch (error) {
      console.error('Erreur lors du traitement du callbackUrl:', error);
      return '/admin/dashboard';
    }
  };
  
  const callbackUrl = getCallbackUrl();

  // Vérifier si l'utilisateur est déjà connecté au chargement de la page
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        setIsCheckingAuth(true);
        const session = await getSession();
        
        if (session && session.user) {
          console.log('Utilisateur déjà connecté, redirection vers:', callbackUrl);
          // Utiliser replace pour éviter l'historique de navigation
          router.replace(callbackUrl);
          return;
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkExistingAuth();
  }, [callbackUrl, router]);

  // Gestionnaire de changement des champs de saisie
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (error) {
      setError('');
    }
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation côté client
    if (!credentials.email || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Format d\'email invalide');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Tentative de connexion pour:', credentials.email);
      
      // Appel à NextAuth pour la connexion
      const result = await signIn('credentials', {
        email: credentials.email.trim(),
        password: credentials.password,
        redirect: false, // Important: ne pas rediriger automatiquement
      });
      
      console.log('Résultat de la connexion:', result);
      
      if (result?.error) {
        // Erreur de connexion
        console.error('Erreur de connexion:', result.error);
        setError('Identifiants incorrects. Veuillez vérifier votre email et mot de passe.');
        setLoading(false);
      } else if (result?.ok) {
        // Connexion réussie
        console.log('Connexion réussie, redirection vers:', callbackUrl);
        
        // Vérifier la session une fois de plus avant de rediriger
        const session = await getSession();
        
        if (session && session.user) {
          // Utiliser router.replace pour éviter l'historique
          router.replace(callbackUrl);
        } else {
          setError('Erreur lors de la création de la session. Veuillez réessayer.');
          setLoading(false);
        }
      } else {
        // Cas imprévu
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Exception lors de la connexion:', error);
      setError('Une erreur de connexion est survenue. Vérifiez votre connexion internet et réessayez.');
      setLoading(false);
    }
  };

  // Gestionnaire pour tester avec les identifiants par défaut
  const handleUseDefaultCredentials = (e) => {
    e.preventDefault();
    setCredentials({
      email: 'admin@elysian-luxury-chauffeurs.com',
      password: 'ElysianAdmin123!',
    });
    setError('');
  };

  // État de chargement initial
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <div className="mx-auto w-32 h-16 mb-8">
            <div className="bg-primary h-full w-full flex items-center justify-center text-white font-bold text-xl rounded-lg shadow-md">
              ELYSIAN
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Administration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder au système de gestion
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Affichage des erreurs */}
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Erreur de connexion
                    </h3>
                    <div className="mt-1 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="admin@elysian-luxury-chauffeurs.com"
                  value={credentials.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bouton de connexion */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-primary-light group-hover:text-white transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>

        {/* Lien retour */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
          >
            ← Retour au site principal
          </Link>
        </div>
      </div>
    </div>
  );
}