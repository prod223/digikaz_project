'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ className = '', children = 'Déconnexion' }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Implémenter l'API de déconnexion
      console.log('Déconnexion...');
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Supprimer le token d'authentification du localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Rediriger vers la page d'accueil
      router.push('/');
      
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Déconnexion...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
