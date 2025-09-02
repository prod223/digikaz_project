'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LogementCard from '@/components/LogementCard';
// Icônes en SVG inline pour éviter la dépendance @heroicons/react
const MagnifyingGlassIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CurrencyEuroIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 010-5.656m0 5.656l2.879 2.879M9.121 9.121L12 12m-2.879 2.879a3 3 0 105.656-5.656m-5.656 5.656L12 12" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BuildingOfficeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BuildingOffice2Icon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

const FunnelIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const AdjustmentsHorizontalIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
  </svg>
);

export default function LogementsPage() {
  const [logements, setLogements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    prixMin: '',
    prixMax: '',
    location: ''
  });

  useEffect(() => {
    fetchLogements();
  }, []);

  const fetchLogements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/logements');
      if (!response.ok) throw new Error('Erreur lors de la récupération des logements');
      const result = await response.json();
      
      // L'API retourne { success: true, data: [...] }
      if (result.success && Array.isArray(result.data)) {
        setLogements(result.data);
      } else {
        throw new Error('Format de réponse API invalide');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogements = Array.isArray(logements) ? logements.filter(logement => {
    if (filters.type !== 'all' && logement.type_logement !== filters.type) return false;
    if (filters.prixMin && logement.prix < parseInt(filters.prixMin)) return false;
    if (filters.prixMax && logement.prix > parseInt(filters.prixMax)) return false;
    if (filters.location && !logement.adresse.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  }) : [];



  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-theme-secondary">Chargement des logements...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-primary pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-theme-primary mb-2">Erreur de chargement</h2>
            <p className="text-theme-secondary mb-4">{error}</p>
            <button 
              onClick={fetchLogements}
              className="btn-primary"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary pt-24">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-gold-50/50 to-white dark:from-gold-900/20 dark:to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gradient mb-6">
            Découvrez nos logements
          </h1>
          <p className="text-xl text-theme-secondary max-w-3xl mx-auto mb-8">
            Trouvez votre logement idéal parmi notre sélection de propriétés vérifiées et sécurisées
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-theme-secondary" />
            <input
              type="text"
              placeholder="Rechercher par ville, quartier ou université..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:focus:border-gold-400 transition-colors"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-theme-secondary" />
              <span className="text-sm font-medium text-theme-secondary">Filtres:</span>
            </div>
            
            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
            >
              <option value="all">Tous les types</option>
              <option value="Studio">Studio</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison">Maison</option>
            </select>

            {/* Prix Min */}
            <input
              type="number"
              placeholder="Prix min"
              value={filters.prixMin}
              onChange={(e) => setFilters({...filters, prixMin: e.target.value})}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors w-24"
            />

            {/* Prix Max */}
            <input
              type="number"
              placeholder="Prix max"
              value={filters.prixMax}
              onChange={(e) => setFilters({...filters, prixMax: e.target.value})}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors w-24"
            />

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({type: 'all', prixMin: '', prixMax: '', location: ''})}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-secondary hover:text-theme-primary transition-colors"
            >
              Effacer
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-theme-primary">
              {filteredLogements.length} logement{filteredLogements.length > 1 ? 's' : ''} trouvé{filteredLogements.length > 1 ? 's' : ''}
            </h2>
            <div className="flex items-center gap-2 text-theme-secondary">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span className="text-sm">Trié par pertinence</span>
            </div>
          </div>

          {filteredLogements.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-theme-primary mb-2">Aucun logement trouvé</h3>
              <p className="text-theme-secondary mb-4">Essayez de modifier vos critères de recherche</p>
              <button
                onClick={() => setFilters({type: 'all', prixMin: '', prixMax: '', location: ''})}
                className="btn-secondary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredLogements.map((logement) => (
                <LogementCard
                  key={logement.id}
                  logement={logement}
                  onClick={(logement) => {
                    // Navigation vers la page détail du logement
                    console.log('Voir détails du logement:', logement);
                    // TODO: Implémenter la navigation
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
