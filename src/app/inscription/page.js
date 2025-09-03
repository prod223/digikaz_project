'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    typeCompte: 'locataire', // 'locataire' ou 'bailleur'
    telephone: '',
    universite: '',
    accepteConditions: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    
         if (!formData.password) newErrors.password = 'Le mot de passe est requis';
     else if (formData.password.length < 8) newErrors.password = 'Minimum 8 caractères';
     
     if (formData.password !== formData.confirmPassword) {
       newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
     }

     // Validation du téléphone (requis par l'API)
     if (!formData.telephone.trim()) {
       newErrors.telephone = 'Le téléphone est requis';
     }

     // Le champ université est optionnel pour les locataires

     if (!formData.accepteConditions) {
       newErrors.accepteConditions = 'Vous devez accepter les conditions';
     }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Préparer les données selon le modèle de l'API
      const inscriptionData = {
        nom: `${formData.prenom} ${formData.nom}`.trim(),
        email: formData.email,
        password: formData.password,
        telephone: formData.telephone,
        type_utilisateur: formData.typeCompte // 'locataire' ou 'bailleur'
      };

      // Appel à l'API d'inscription
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscriptionData),
      });

      const result = await response.json();

      if (result.success) {
        // Inscription réussie
        alert('Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.');
        // Redirection vers la page de connexion
        window.location.href = '/connexion';
      } else {
        // Erreur lors de l'inscription
        alert(`Erreur lors de l'inscription: ${result.error}`);
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
         <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
       <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.png" alt="DigiKaz" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">
            Rejoignez DigiKaz
          </h1>
          <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
            Créez votre compte et commencez votre recherche de logement étudiant en quelques minutes
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl">
            
            {/* Type de compte */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-theme-primary mb-4">
                Je suis un...
              </label>
              <div className="grid grid-cols-2 gap-4">
                                 <button
                   type="button"
                   onClick={() => setFormData(prev => ({ ...prev, typeCompte: 'locataire' }))}
                   className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                     formData.typeCompte === 'locataire'
                       ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300'
                       : 'border-gray-200 dark:border-gray-600 hover:border-gold-300'
                   }`}
                 >
                   <div className="text-center">
                     <div className="text-3xl mb-2">🎓</div>
                     <div className="font-semibold">Locataire</div>
                     <div className="text-sm text-theme-secondary">Rechercher un logement</div>
                   </div>
                 </button>
                
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, typeCompte: 'bailleur' }))}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.typeCompte === 'bailleur'
                      ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gold-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏠</div>
                    <div className="font-semibold">Bailleur</div>
                    <div className="text-sm text-theme-secondary">Louer un bien</div>
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                      errors.prenom 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-gold-500'
                    } bg-white dark:bg-gray-700 text-theme-primary`}
                    placeholder="Votre prénom"
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                      errors.nom 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-gold-500'
                    } bg-white dark:bg-gray-700 text-theme-primary`}
                    placeholder="Votre nom"
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-gold-500'
                  } bg-white dark:bg-gray-700 text-theme-primary`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

                             {/* Téléphone */}
               <div>
                 <label className="block text-sm font-medium text-theme-primary mb-2">
                   Téléphone *
                 </label>
                 <input
                   type="tel"
                   name="telephone"
                   value={formData.telephone}
                   onChange={handleChange}
                   className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                     errors.telephone 
                       ? 'border-red-500 focus:border-red-500' 
                       : 'border-gray-200 dark:border-gray-600 focus:border-gold-500'
                   } bg-white dark:bg-gray-700 text-theme-primary`}
                   placeholder="06 12 34 56 78"
                 />
                 {errors.telephone && (
                   <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
                 )}
               </div>

                             {/* Université (pour les locataires) - Optionnel */}
               {formData.typeCompte === 'locataire' && (
                 <div>
                   <label className="block text-sm font-medium text-theme-primary mb-2">
                     Université (optionnel)
                   </label>
                   <input
                     type="text"
                     name="universite"
                     value={formData.universite}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary"
                     placeholder="Nom de votre université (facultatif)"
                   />
                 </div>
               )}

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-gold-500'
                  } bg-white dark:bg-gray-700 text-theme-primary`}
                  placeholder="Minimum 8 caractères"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Confirmer le mot de passe *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-600 focus:border-gold-500'
                  } bg-white dark:bg-gray-700 text-theme-primary`}
                  placeholder="Retapez votre mot de passe"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="accepteConditions"
                  checked={formData.accepteConditions}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-gold-500 border-gray-300 rounded focus:ring-gold-500"
                />
                <label className="text-sm text-theme-secondary">
                  J'accepte les{' '}
                  <Link href="/conditions" className="text-gold-500 hover:text-gold-600 underline">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link href="/confidentialite" className="text-gold-500 hover:text-gold-600 underline">
                    politique de confidentialité
                  </Link>
                  *
                </label>
              </div>
              {errors.accepteConditions && (
                <p className="text-red-500 text-sm mt-1">{errors.accepteConditions}</p>
              )}

              {/* Bouton d'inscription */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Création du compte...
                  </div>
                                 ) : (
                   `Créer mon compte ${formData.typeCompte === 'locataire' ? 'locataire' : 'bailleur'}`
                 )}
              </button>

              {/* Lien vers connexion */}
              <div className="text-center">
                <p className="text-theme-secondary">
                  Vous avez déjà un compte ?{' '}
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
