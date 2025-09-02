'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LogementCard from '@/components/LogementCard';
import Breadcrumb from '@/components/Breadcrumb';

// Icônes SVG inline
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

const XMarkIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function RechercherPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [logements, setLogements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filtres de recherche
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || 'all',
    prixMin: searchParams.get('prixMin') || '',
    prixMax: searchParams.get('prixMax') || '',
    statut: searchParams.get('statut') || 'all',
    score: searchParams.get('score') || 'all',
    rayon: searchParams.get('rayon') || '10',
    surfaceMin: searchParams.get('surfaceMin') || '',
    surfaceMax: searchParams.get('surfaceMax') || '',
    chambres: searchParams.get('chambres') || 'all',
    meuble: searchParams.get('meuble') || 'all',
    balcon: searchParams.get('balcon') || 'all',
    parking: searchParams.get('parking') || 'all',
    ascenseur: searchParams.get('ascenseur') || 'all',
    animaux: searchParams.get('animaux') || 'all',
    fumeur: searchParams.get('fumeur') || 'all',
    universite: searchParams.get('universite') || '',
    transport: searchParams.get('transport') || 'all'
  });

  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Effectuer la recherche quand les filtres changent
  useEffect(() => {
    if (Object.values(filters).some(value => value !== '' && value !== 'all')) {
      performSearch();
    }
  }, [filters]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construire l'URL de recherche avec les filtres
      const searchUrl = new URL('/api/logements', window.location.origin);
      
      if (filters.type !== 'all') searchUrl.searchParams.set('type_logement', filters.type);
      if (filters.prixMin) searchUrl.searchParams.set('prix_min', filters.prixMin);
      if (filters.prixMax) searchUrl.searchParams.set('prix_max', filters.prixMax);
      if (filters.statut !== 'all') searchUrl.searchParams.set('statut_logement', filters.statut);
      if (filters.rayon) searchUrl.searchParams.set('radius', filters.rayon);
      if (filters.score !== 'all') searchUrl.searchParams.set('sort_by', 'score');
      
      // Ajouter la pagination
      searchUrl.searchParams.set('page', currentPage.toString());
      searchUrl.searchParams.set('limit', '12');

      const response = await fetch(searchUrl);
      if (!response.ok) throw new Error('Erreur lors de la recherche');
      
      const result = await response.json();
      
      if (result.success) {
        setSearchResults(result.data);
        setTotalResults(result.pagination?.total || result.data.length);
      } else {
        throw new Error(result.error || 'Erreur lors de la recherche');
      }
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset à la première page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      type: 'all',
      prixMin: '',
      prixMax: '',
      statut: 'all',
      score: 'all',
      rayon: '10',
      surfaceMin: '',
      surfaceMax: '',
      chambres: 'all',
      meuble: 'all',
      balcon: 'all',
      parking: 'all',
      ascenseur: 'all',
      animaux: 'all',
      fumeur: 'all',
      universite: '',
      transport: 'all'
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });
    
    const newURL = `/rechercher?${params.toString()}`;
    router.push(newURL);
  };

  // Mettre à jour l'URL quand les filtres changent
  useEffect(() => {
    updateURL();
  }, [filters]);

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '' && value !== 'all').length;
  };

  return (
    <div className="min-h-screen bg-theme-primary pt-24">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-gold-50/50 to-white dark:from-gold-900/20 dark:to-black">
        <div className="max-w-7xl mx-auto text-center">
          <Breadcrumb 
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Rechercher', href: '#' }
            ]} 
          />
          
          <h1 className="text-5xl md:text-6xl font-black text-gradient mb-6">
            Trouvez votre logement idéal
          </h1>
          <p className="text-xl text-theme-secondary max-w-3xl mx-auto mb-8">
            Utilisez nos filtres avancés pour découvrir des logements qui correspondent parfaitement à vos besoins
          </p>
          
          {/* Barre de recherche principale */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-theme-secondary" />
            <input
              type="text"
              placeholder="Rechercher par ville, quartier, université..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:focus:border-gold-400 transition-colors text-lg"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-2 rounded-xl transition-colors font-semibold"
            >
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Filtres et résultats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar des filtres */}
          <div className="lg:w-80 space-y-6">
                         {/* Bouton toggle filtres sur mobile */}
             <div className="lg:hidden">
               <button
                 onClick={() => setShowFilters(!showFilters)}
                 className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-theme-primary font-medium"
               >
                 <FunnelIcon className="w-5 h-5" />
                 Filtres ({getActiveFiltersCount()})
                 <AdjustmentsHorizontalIcon className="w-5 h-5" />
               </button>
             </div>

             {/* Indicateur de filtres actifs */}
             {getActiveFiltersCount() > 0 && (
               <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-700 rounded-xl p-4">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-medium text-gold-800 dark:text-gold-200">
                     Filtres actifs ({getActiveFiltersCount()})
                   </span>
                   <button
                     onClick={clearFilters}
                     className="text-xs text-gold-600 hover:text-gold-700 font-medium"
                   >
                     Effacer tout
                   </button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {Object.entries(filters).map(([key, value]) => {
                     if (value && value !== 'all' && value !== '') {
                       return (
                         <span
                           key={key}
                           className="inline-flex items-center gap-1 px-2 py-1 bg-gold-100 dark:bg-gold-800/40 text-gold-800 dark:text-gold-200 text-xs rounded-lg"
                         >
                           {key === 'prixMin' && 'Prix min: ' + value + '€'}
                           {key === 'prixMax' && 'Prix max: ' + value + '€'}
                           {key === 'surfaceMin' && 'Surface min: ' + value + 'm²'}
                           {key === 'surfaceMax' && 'Surface max: ' + value + 'm²'}
                           {key === 'location' && 'Lieu: ' + value}
                           {key === 'universite' && 'Université: ' + value}
                           {key === 'type' && 'Type: ' + value}
                           {key === 'statut' && 'Statut: ' + value}
                           {key === 'score' && 'Note: ' + value + '+'}
                           {key === 'rayon' && 'Rayon: ' + value + 'km'}
                           {key === 'chambres' && 'Chambres: ' + value}
                           {key === 'meuble' && 'Meublé: ' + value}
                           {key === 'balcon' && 'Balcon: ' + value}
                           {key === 'parking' && 'Parking: ' + value}
                           {key === 'ascenseur' && 'Ascenseur: ' + value}
                           {key === 'animaux' && 'Animaux: ' + value}
                           {key === 'fumeur' && 'Fumeur: ' + value}
                           {key === 'transport' && 'Transport: ' + value}
                         </span>
                       );
                     }
                     return null;
                   })}
                 </div>
               </div>
             )}

            {/* Panneau des filtres */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-gray-700/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-theme-primary">Filtres</h3>
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                    >
                      Effacer tout
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Type de logement */}
                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Type de logement
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                    >
                      <option value="all">Tous les types</option>
                      <option value="Studio">Studio</option>
                      <option value="Appartement">Appartement</option>
                      <option value="Maison">Maison</option>
                    </select>
                  </div>

                  {/* Fourchette de prix */}
                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Fourchette de prix (€/mois)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.prixMin}
                        onChange={(e) => handleFilterChange('prixMin', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.prixMax}
                        onChange={(e) => handleFilterChange('prixMax', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Statut */}
                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-2">
                      Statut
                    </label>
                    <select
                      value={filters.statut}
                      onChange={(e) => handleFilterChange('statut', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="disponible">Disponible</option>
                      <option value="reserve">Réservé</option>
                      <option value="indisponible">Indisponible</option>
                    </select>
                  </div>

                                     {/* Note minimum */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Note minimum
                     </label>
                     <select
                       value={filters.score}
                       onChange={(e) => handleFilterChange('score', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     >
                       <option value="all">Toutes les notes</option>
                       <option value="4">4+ étoiles</option>
                       <option value="3">3+ étoiles</option>
                       <option value="2">2+ étoiles</option>
                     </select>
                   </div>

                   {/* Rayon de recherche */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Rayon de recherche (km)
                     </label>
                     <select
                       value={filters.rayon}
                       onChange={(e) => handleFilterChange('rayon', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     >
                       <option value="5">5 km</option>
                       <option value="10">10 km</option>
                       <option value="20">20 km</option>
                       <option value="50">50 km</option>
                     </select>
                   </div>

                   {/* Bouton filtres avancés */}
                   <div className="pt-4">
                     <button
                       type="button"
                       onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                       className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gold-600 hover:text-gold-700 bg-gold-50 dark:bg-gold-900/20 hover:bg-gold-100 dark:hover:bg-gold-900/30 rounded-xl transition-colors border border-gold-200 dark:border-gold-700"
                     >
                       <AdjustmentsHorizontalIcon className="w-4 h-4" />
                       {showAdvancedFilters ? 'Masquer les filtres avancés' : 'Afficher les filtres avancés'}
                       <svg 
                         className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} 
                         fill="none" 
                         stroke="currentColor" 
                         viewBox="0 0 24 24"
                       >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </button>
                   </div>

                   {/* Filtres rapides supplémentaires */}
                   <div className="pt-4 space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-theme-primary mb-2">
                         Disponibilité
                       </label>
                       <select
                         value={filters.statut}
                         onChange={(e) => handleFilterChange('statut', e.target.value)}
                         className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       >
                         <option value="all">Tous les statuts</option>
                         <option value="disponible">Disponible maintenant</option>
                         <option value="reserve">Réservé</option>
                         <option value="indisponible">Indisponible</option>
                       </select>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-theme-primary mb-2">
                         Budget mensuel (€)
                       </label>
                       <div className="grid grid-cols-2 gap-3">
                         <input
                           type="number"
                           placeholder="Min"
                           value={filters.prixMin}
                           onChange={(e) => handleFilterChange('prixMin', e.target.value)}
                           className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                         />
                         <input
                           type="number"
                           placeholder="Max"
                           value={filters.prixMax}
                           onChange={(e) => handleFilterChange('prixMax', e.target.value)}
                           className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                         />
                       </div>
                     </div>
                   </div>

                   {/* Filtres avancés */}
                   {showAdvancedFilters && (
                     <>
                       {/* Séparateur */}
                       <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                         <h4 className="text-lg font-semibold text-theme-primary mb-4">Caractéristiques du logement</h4>
                       </div>

                   {/* Surface */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Surface (m²)
                     </label>
                     <div className="grid grid-cols-2 gap-3">
                       <input
                         type="number"
                         placeholder="Min"
                         value={filters.surfaceMin}
                         onChange={(e) => handleFilterChange('surfaceMin', e.target.value)}
                         className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       />
                       <input
                         type="number"
                         placeholder="Max"
                         value={filters.surfaceMax}
                         onChange={(e) => handleFilterChange('surfaceMax', e.target.value)}
                         className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       />
                     </div>
                   </div>

                   {/* Nombre de chambres */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Nombre de chambres
                     </label>
                     <select
                       value={filters.chambres}
                       onChange={(e) => handleFilterChange('chambres', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     >
                       <option value="all">Toutes</option>
                       <option value="1">1 chambre</option>
                       <option value="2">2 chambres</option>
                       <option value="3">3 chambres</option>
                       <option value="4">4+ chambres</option>
                     </select>
                   </div>

                   {/* Meublé */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Meublé
                     </label>
                     <select
                       value={filters.meuble}
                       onChange={(e) => handleFilterChange('meuble', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     >
                       <option value="all">Tous</option>
                       <option value="oui">Meublé</option>
                       <option value="non">Non meublé</option>
                       <option value="partiel">Partiellement meublé</option>
                     </select>
                   </div>

                   {/* Séparateur */}
                   <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                     <h4 className="text-lg font-semibold text-theme-primary mb-4">Équipements & Services</h4>
                   </div>

                   {/* Équipements */}
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-theme-primary mb-2">
                         Balcon/Terrasse
                       </label>
                       <select
                         value={filters.balcon}
                         onChange={(e) => handleFilterChange('balcon', e.target.value)}
                         className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       >
                         <option value="all">Tous</option>
                         <option value="oui">Avec balcon</option>
                         <option value="non">Sans balcon</option>
                       </select>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-theme-primary mb-2">
                         Parking
                       </label>
                       <select
                         value={filters.parking}
                         onChange={(e) => handleFilterChange('parking', e.target.value)}
                         className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       >
                         <option value="all">Tous</option>
                         <option value="oui">Avec parking</option>
                         <option value="non">Sans parking</option>
                       </select>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-theme-primary mb-2">
                         Ascenseur
                       </label>
                       <select
                         value={filters.ascenseur}
                         onChange={(e) => handleFilterChange('ascenseur', e.target.value)}
                         className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       >
                         <option value="all">Tous</option>
                         <option value="oui">Avec ascenseur</option>
                         <option value="non">Sans ascenseur</option>
                       </select>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-theme-primary mb-2">
                         Animaux
                       </label>
                       <select
                         value={filters.animaux}
                         onChange={(e) => handleFilterChange('animaux', e.target.value)}
                         className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                       >
                         <option value="all">Tous</option>
                         <option value="oui">Animaux acceptés</option>
                         <option value="non">Animaux refusés</option>
                       </select>
                     </div>
                   </div>

                   {/* Fumeur */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Fumeur
                     </label>
                     <select
                       value={filters.fumeur}
                       onChange={(e) => handleFilterChange('fumeur', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     >
                       <option value="all">Tous</option>
                       <option value="oui">Fumeurs acceptés</option>
                       <option value="non">Non-fumeurs uniquement</option>
                     </select>
                   </div>

                   {/* Séparateur */}
                   <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                     <h4 className="text-lg font-semibold text-theme-primary mb-4">Localisation & Transport</h4>
                   </div>

                   {/* Université */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Université proche
                     </label>
                     <input
                       type="text"
                       placeholder="Ex: Sorbonne, Sciences Po..."
                       value={filters.universite}
                       onChange={(e) => handleFilterChange('universite', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     />
                   </div>

                   {/* Transport */}
                   <div>
                     <label className="block text-sm font-medium text-theme-primary mb-2">
                       Transport en commun
                     </label>
                     <select
                       value={filters.transport}
                       onChange={(e) => handleFilterChange('transport', e.target.value)}
                       className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary focus:border-gold-500 focus:outline-none transition-colors"
                     >
                       <option value="all">Tous</option>
                       <option value="metro">Métro à proximité</option>
                       <option value="rer">RER à proximité</option>
                       <option value="bus">Lignes de bus</option>
                       <option value="velib">Station Vélib'</option>
                     </select>
                   </div>
                     </>
                   )}
                 </div>
               </div>
             </div>
           </div>

          {/* Résultats de recherche */}
          <div className="flex-1">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-theme-primary">
                  {loading ? 'Recherche en cours...' : `${totalResults} logement${totalResults > 1 ? 's' : ''} trouvé${totalResults > 1 ? 's' : ''}`}
                </h2>
                {getActiveFiltersCount() > 0 && (
                  <p className="text-sm text-theme-secondary mt-1">
                    Filtres actifs : {getActiveFiltersCount()}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-theme-secondary">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span className="text-sm">Trié par pertinence</span>
              </div>
            </div>

            {/* États de chargement et d'erreur */}
            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-500 mx-auto mb-4"></div>
                <p className="text-theme-secondary">Recherche en cours...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-theme-primary mb-2">Erreur de recherche</h3>
                <p className="text-theme-secondary mb-4">{error}</p>
                <button
                  onClick={performSearch}
                  className="btn-primary"
                >
                  Réessayer
                </button>
              </div>
            )}

            {/* Résultats */}
            {!loading && !error && searchResults.length === 0 && getActiveFiltersCount() > 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-theme-primary mb-2">Aucun résultat trouvé</h3>
                <p className="text-theme-secondary mb-4">
                  Essayez de modifier vos critères de recherche ou d'élargir votre zone de recherche
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                >
                  Effacer les filtres
                </button>
              </div>
            )}

            {!loading && !error && searchResults.length > 0 && (
              <>
                {/* Grille des logements */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchResults.map((logement) => (
                    <LogementCard
                      key={logement.id}
                      logement={logement}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalResults > 12 && (
                  <div className="flex items-center justify-center mt-12">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold-500 transition-colors"
                      >
                        Précédent
                      </button>
                      
                      <span className="px-4 py-2 text-theme-secondary">
                        Page {currentPage} sur {Math.ceil(totalResults / 12)}
                      </span>
                      
                      <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage >= Math.ceil(totalResults / 12)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold-500 transition-colors"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* État initial - Aucune recherche */}
            {!loading && !error && searchResults.length === 0 && getActiveFiltersCount() === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-theme-primary mb-2">Commencez votre recherche</h3>
                <p className="text-theme-secondary mb-4">
                  Utilisez les filtres à gauche ou la barre de recherche ci-dessus pour trouver votre logement idéal
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="btn-primary"
                  >
                    Voir les filtres
                  </button>
                  <Link href="/logements" className="btn-secondary">
                    Voir tous les logements
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
