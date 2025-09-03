'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

export default function UserNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Récupérer les données utilisateur depuis le localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/connexion" className="btn-secondary">
          Connexion
        </Link>
        <Link href="/inscription" className="btn-primary">
          Inscription
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Bouton profil */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/10 transition-all duration-300"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold">
          {userData.prenom?.charAt(0)}{userData.nom?.charAt(0)}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-theme-primary">
            {userData.prenom} {userData.nom}
          </div>
          <div className="text-xs text-theme-secondary">
            {userData.typeCompte === 'etudiant' ? 'Étudiant' : 'Bailleur'}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-theme-secondary transition-transform duration-300 ${
            isMenuOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl z-50">
          <div className="p-4">
            {/* En-tête du menu */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gold-50 dark:bg-gold-900/20 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold">
                {userData.prenom?.charAt(0)}{userData.nom?.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-theme-primary">
                  {userData.prenom} {userData.nom}
                </div>
                <div className="text-sm text-theme-secondary">
                  {userData.email}
                </div>
              </div>
            </div>

            {/* Liens du menu */}
            <div className="space-y-2">
              <Link
                href="/profil"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
              >
                <span className="text-xl">👤</span>
                <span className="text-theme-primary">Mon Profil</span>
              </Link>

              {userData.typeCompte === 'etudiant' ? (
                <>
                  <Link
                    href="/favoris"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
                  >
                    <span className="text-xl">❤️</span>
                    <span className="text-theme-primary">Mes Favoris</span>
                  </Link>
                  <Link
                    href="/recherches"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
                  >
                    <span className="text-xl">🔍</span>
                    <span className="text-theme-primary">Mes Recherches</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/mes-annonces"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
                  >
                    <span className="text-xl">🏠</span>
                    <span className="text-theme-primary">Mes Annonces</span>
                  </Link>
                  <Link
                    href="/demandes"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
                  >
                    <span className="text-xl">📨</span>
                    <span className="text-theme-primary">Demandes Reçues</span>
                  </Link>
                </>
              )}

              <Link
                href="/messages"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                <span className="text-theme-primary">Messages</span>
              </Link>

              <Link
                href="/parametres"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all duration-300"
              >
                <span className="text-xl">⚙️</span>
                <span className="text-theme-primary">Paramètres</span>
              </Link>
            </div>

            {/* Séparateur */}
            <div className="border-t border-gray-200 dark:border-gray-600 my-4"></div>

            {/* Bouton de déconnexion */}
            <LogoutButton
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-300"
            >
              <span className="text-xl">🚪</span>
              <span>Déconnexion</span>
            </LogoutButton>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
