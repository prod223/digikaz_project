'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Veuillez saisir votre adresse email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez saisir une adresse email valide');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implémenter l'API de réinitialisation de mot de passe
      console.log('Demande de réinitialisation pour:', email);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo.png" alt="DigiKaz" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl text-center">
              <div className="text-6xl mb-6">📧</div>
              <h1 className="text-3xl font-bold text-theme-primary mb-4">
                Email envoyé !
              </h1>
              <p className="text-theme-secondary mb-6">
                Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
              </p>
              <p className="text-sm text-theme-secondary mb-8">
                Vérifiez votre boîte de réception et cliquez sur le lien pour créer un nouveau mot de passe.
              </p>
              
              <div className="space-y-4">
                <Link href="/connexion" className="btn-primary w-full">
                  Retour à la connexion
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary w-full"
                >
                  Envoyer un autre email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.png" alt="DigiKaz" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">
            Mot de passe oublié ?
          </h1>
          <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
            Pas de panique ! Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary"
                  placeholder="votre.email@exemple.com"
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </button>

              {/* Lien vers connexion */}
              <div className="text-center">
                <p className="text-theme-secondary">
                  Vous vous souvenez de votre mot de passe ?{' '}
                  <Link href="/connexion" className="text-gold-500 hover:text-gold-600 font-semibold">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
