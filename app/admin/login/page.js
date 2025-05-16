"use client";

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: 'admin@elysian-luxury-chauffeurs.com',
    password: 'ElysianAdmin123!',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Obtenir l'URL de callback
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        setIsCheckingAuth(true);
        const session = await getSession();
        
        if (session && session.user) {
          console.log('Utilisateur déjà connecté, redirection vers:', callbackUrl);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Tentative de connexion avec:', credentials.email);
      console.log('CallbackUrl:', callbackUrl);
      
      const result = await signIn('credentials', {
        email: credentials.email.trim(),
        password: credentials.password,
        redirect: false, // Important: ne pas rediriger automatiquement
      });
      
      console.log('Résultat de la connexion:', result);
      
      if (result?.error) {
        console.error('Erreur de connexion:', result.error);
        setError('Identifiants incorrects. Veuillez vérifier votre email et mot de passe.');
        setLoading(false);
      } else if (result?.ok) {
        console.log('Connexion réussie, vérification de la session...');
        
        // Attendre un peu et vérifier la session
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const session = await getSession();
        console.log('Session après connexion:', session);
        
        if (session && session.user) {
          console.log('Session confirmée, redirection vers:', callbackUrl);
          // Force le rechargement de la page de destination
          window.location.href = callbackUrl;
        } else {
          setError('Erreur lors de la création de la session. Veuillez réessayer.');
          setLoading(false);
        }
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Exception lors de la connexion:', error);
      setError('Une erreur de connexion est survenue. Vérifiez votre connexion internet et réessayez.');
      setLoading(false);
    }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto w-32 h-16 mb-4">
            <div className="bg-primary h-full w-full flex items-center justify-center text-white font-bold text-lg rounded-lg">
              ELYSIAN
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Administration Elysian
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder au système
          </p>
        </div>
        
        {/* Debug info en développement */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs">
            <p><strong>CallbackUrl:</strong> {callbackUrl}</p>
            <p><strong>Mode:</strong> {process.env.NODE_ENV}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email"
                value={credentials.email}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <Link href="/" className="text-primary hover:text-primary-dark">
              Retour au site principal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}