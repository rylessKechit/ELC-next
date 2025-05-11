"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: 'admin@elysian-luxury-chauffeurs.com',
    password: 'ElysianAdmin123!',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
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
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      
      if (result.error) {
        setError(`Échec de connexion: ${result.error}`);
        setLoading(false);
      } else {
        // Redirection vers le tableau de bord
        router.push('/admin/dashboard');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto w-32 h-12 mb-2">
            <div className="bg-primary h-full w-full flex items-center justify-center text-white font-bold">ELYSIAN</div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Administration Elysian Luxury Chauffeurs
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder au système
          </p>
        </div>
        
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
                type="email