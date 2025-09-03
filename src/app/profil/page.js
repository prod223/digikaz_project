'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '@/components/LogoutButton';

export default function Profil() {
  const [activeTab, setActiveTab] = useState('informations');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@email.com',
    telephone: '06 12 34 56 78',
    universite: 'Université de Paris',
    typeCompte: 'etudiant',
    bio: 'Étudiante en informatique passionnée par la technologie et la recherche de logement étudiant.',
    preferences: {
      budgetMax: 800,
      typeLogement: 'studio',
      quartier: 'Quartier Latin',
      meuble: true,
      animaux: false
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Implémenter la sauvegarde des données
    console.log('Données sauvegardées:', formData);
  };



  const tabs = [
    { id: 'informations', label: 'Informations', icon: '👤' },
    { id: 'preferences', label: 'Préférences', icon: '⚙️' },
    { id: 'activite', label: 'Activité', icon: '📊' },
    { id: 'securite', label: 'Sécurité', icon: '🔒' }
  ];

  return (
         <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
       <div className="container mx-auto px-4 pt-24 pb-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.png" alt="DigiKaz" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">
            Mon Profil
          </h1>
          <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
            Gérez vos informations personnelles et vos préférences de logement
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          
          {/* Profil Header */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-4xl text-white font-bold">
                  {formData.prenom.charAt(0)}{formData.nom.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gold-500 hover:bg-gold-600 rounded-full flex items-center justify-center text-white transition-all duration-300">
                  📷
                </button>
              </div>

              {/* Informations principales */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-theme-primary mb-2">
                      {formData.prenom} {formData.nom}
                    </h2>
                    <p className="text-lg text-theme-secondary mb-2">
                      {formData.typeCompte === 'etudiant' ? '🎓 Étudiant' : '🏠 Bailleur'}
                    </p>
                    <p className="text-theme-secondary">
                      {formData.email}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex gap-3 justify-center md:justify-end">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn-primary px-6 py-2"
                    >
                      {isEditing ? 'Annuler' : 'Modifier'}
                    </button>
                    <LogoutButton className="btn-secondary px-6 py-2">
                      Déconnexion
                    </LogoutButton>
                  </div>
                </div>

                {formData.bio && (
                  <p className="text-theme-secondary max-w-2xl">
                    {formData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation des onglets */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 p-2 shadow-2xl mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'text-theme-secondary hover:bg-gold-50 dark:hover:bg-gold-900/20'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contenu des onglets */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl">
            
            {/* Onglet Informations */}
            {activeTab === 'informations' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary disabled:opacity-50"
                    />
                  </div>

                  {formData.typeCompte === 'etudiant' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-theme-primary mb-2">
                        Université
                      </label>
                      <input
                        type="text"
                        name="universite"
                        value={formData.universite}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary disabled:opacity-50"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary disabled:opacity-50 resize-none"
                    placeholder="Parlez-nous un peu de vous..."
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary px-8 py-3"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="btn-primary px-8 py-3"
                    >
                      Sauvegarder
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* Onglet Préférences */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Budget */}
                  <div>
                    <h3 className="text-xl font-semibold text-theme-primary mb-4">💰 Budget maximum</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-theme-secondary mb-2">
                          Budget mensuel: {formData.preferences.budgetMax}€
                        </label>
                        <input
                          type="range"
                          min="300"
                          max="1500"
                          step="50"
                          value={formData.preferences.budgetMax}
                          onChange={(e) => handlePreferenceChange('budgetMax', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-theme-secondary mt-1">
                          <span>300€</span>
                          <span>1500€</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Type de logement */}
                  <div>
                    <h3 className="text-xl font-semibold text-theme-primary mb-4">🏠 Type de logement</h3>
                    <div className="space-y-3">
                      {['studio', 'chambre', 'appartement', 'colocation'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="typeLogement"
                            value={type}
                            checked={formData.preferences.typeLogement === type}
                            onChange={(e) => handlePreferenceChange('typeLogement', e.target.value)}
                            className="w-4 h-4 text-gold-500 border-gray-300 focus:ring-gold-500"
                          />
                          <span className="text-theme-secondary capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quartier */}
                  <div>
                    <h3 className="text-xl font-semibold text-theme-primary mb-4">📍 Quartier préféré</h3>
                    <input
                      type="text"
                      value={formData.preferences.quartier}
                      onChange={(e) => handlePreferenceChange('quartier', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-gold-500 transition-all duration-300 bg-white dark:bg-gray-700 text-theme-primary"
                      placeholder="Quartier Latin, Montmartre..."
                    />
                  </div>

                  {/* Options */}
                  <div>
                    <h3 className="text-xl font-semibold text-theme-primary mb-4">✅ Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.preferences.meuble}
                          onChange={(e) => handlePreferenceChange('meuble', e.target.checked)}
                          className="w-4 h-4 text-gold-500 border-gray-300 rounded focus:ring-gold-500"
                        />
                        <span className="text-theme-secondary">Logement meublé</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.preferences.animaux}
                          onChange={(e) => handlePreferenceChange('animaux', e.target.checked)}
                          className="w-4 h-4 text-gold-500 border-gray-300 rounded focus:ring-gold-500"
                        />
                        <span className="text-theme-secondary">Animaux autorisés</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn-primary px-8 py-3">
                    Sauvegarder les préférences
                  </button>
                </div>
              </div>
            )}

            {/* Onglet Activité */}
            {activeTab === 'activite' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-theme-primary mb-4">
                  Statistiques d'activité
                </h3>
                <p className="text-theme-secondary mb-8">
                  Bientôt disponible ! Suivez votre activité sur DigiKaz
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-gold-50 dark:bg-gold-900/20 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-gold-600 mb-2">12</div>
                    <div className="text-theme-secondary">Logements visités</div>
                  </div>
                  <div className="bg-gold-50 dark:bg-gold-900/20 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-gold-600 mb-2">5</div>
                    <div className="text-theme-secondary">Favoris</div>
                  </div>
                  <div className="bg-gold-50 dark:bg-gold-900/20 rounded-2xl p-6">
                    <div className="text-3xl font-bold text-gold-600 mb-2">3</div>
                    <div className="text-theme-secondary">Messages envoyés</div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'securite' && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    🔒 Sécurité de votre compte
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Votre compte est protégé par un mot de passe sécurisé et une authentification à deux facteurs.
                  </p>
                </div>

                <div className="space-y-4">
                  <button className="w-full text-left p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-gold-300 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-theme-primary">Changer le mot de passe</h4>
                        <p className="text-sm text-theme-secondary">Mettez à jour votre mot de passe régulièrement</p>
                      </div>
                      <span className="text-gold-500">→</span>
                    </div>
                  </button>

                  <button className="w-full text-left p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-gold-300 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-theme-primary">Authentification à deux facteurs</h4>
                        <p className="text-sm text-theme-secondary">Ajoutez une couche de sécurité supplémentaire</p>
                      </div>
                      <span className="text-gold-500">→</span>
                    </div>
                  </button>

                  <button className="w-full text-left p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-gold-300 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-theme-primary">Sessions actives</h4>
                        <p className="text-sm text-theme-secondary">Gérez vos connexions sur différents appareils</p>
                      </div>
                      <span className="text-gold-500">→</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
