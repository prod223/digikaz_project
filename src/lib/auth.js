import { supabase } from './supabase';

/**
 * Fonction pour s'inscrire
 * @param {Object} userData - Données de l'utilisateur
 * @param {string} userData.email - Email de l'utilisateur
 * @param {string} userData.password - Mot de passe
 * @param {string} userData.nom - Nom de l'utilisateur
 * @param {string} userData.telephone - Téléphone
 * @param {string} userData.type_utilisateur - Type d'utilisateur (bailleur ou locataire)
 * @returns {Promise<Object>} Résultat de l'inscription
 */
export async function signUp(userData) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de l'inscription: ${error.message}`);
  }
}

/**
 * Fonction pour se connecter
 * @param {Object} credentials - Identifiants de connexion
 * @param {string} credentials.email - Email de l'utilisateur
 * @param {string} credentials.password - Mot de passe
 * @returns {Promise<Object>} Résultat de la connexion
 */
export async function signIn(credentials) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la connexion: ${error.message}`);
  }
}

/**
 * Fonction pour se déconnecter
 * @returns {Promise<Object>} Résultat de la déconnexion
 */
export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la déconnexion: ${error.message}`);
  }
}

/**
 * Fonction pour récupérer les informations de l'utilisateur connecté
 * @returns {Promise<Object>} Informations de l'utilisateur
 */
export async function getCurrentUser() {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du profil: ${error.message}`);
  }
}

/**
 * Fonction pour réinitialiser le mot de passe
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Object>} Résultat de la réinitialisation
 */
export async function resetPassword(email) {
  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la réinitialisation: ${error.message}`);
  }
}

/**
 * Fonction pour mettre à jour le mot de passe
 * @param {string} password - Nouveau mot de passe
 * @returns {Promise<Object>} Résultat de la mise à jour
 */
export async function updatePassword(password) {
  try {
    const response = await fetch('/api/auth/update-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
  }
}

/**
 * Fonction pour vérifier si l'utilisateur est connecté
 * @returns {Promise<boolean>} True si connecté, false sinon
 */
export async function isAuthenticated() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return !error && user !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Fonction pour obtenir la session actuelle
 * @returns {Promise<Object|null>} Session actuelle ou null
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    return error ? null : session;
  } catch (error) {
    return null;
  }
}

/**
 * Fonction pour écouter les changements d'authentification
 * @param {Function} callback - Fonction appelée lors des changements
 * @returns {Function} Fonction pour arrêter l'écoute
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}



