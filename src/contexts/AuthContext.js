'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { signIn, signUp, signOut, getCurrentUser } from '@/lib/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialiser l'état d'authentification
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Vérifier la session actuelle
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erreur lors de la récupération de la session:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          // Récupérer les informations complètes de l'utilisateur
          const userData = await getCurrentUser();
          setUser(userData.user);
          setProfile(userData.profile);
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const userData = await getCurrentUser();
            setUser(userData.user);
            setProfile(userData.profile);
            setError(null);
          } catch (error) {
            console.error('Erreur lors de la récupération du profil:', error);
            setError('Erreur lors de la récupération du profil');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setError(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signUp(userData);
      
      // L'utilisateur sera automatiquement connecté après l'inscription
      // grâce à l'écouteur d'événements auth state change
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signIn(credentials);
      
      // L'utilisateur sera automatiquement mis à jour
      // grâce à l'écouteur d'événements auth state change
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await signOut();
      
      // L'utilisateur sera automatiquement déconnecté
      // grâce à l'écouteur d'événements auth state change
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour rafraîchir les données utilisateur
  const refreshUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await getCurrentUser();
      setUser(userData.user);
      setProfile(userData.profile);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour effacer les erreurs
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    profile,
    loading,
    error,
    register,
    login,
    logout,
    refreshUser,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
}



