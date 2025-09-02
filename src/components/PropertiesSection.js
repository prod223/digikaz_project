'use client';

import { useState } from 'react';
import PropertyCard from './PropertyCard';
import SearchBar from './SearchBar';

// Données statiques des propriétés
const propertiesData = [
  {
    id: 1,
    title: "Studio moderne près de la Sorbonne",
    location: "5ème arrondissement, Paris",
    price: 850,
    type: "Studio",
    surface: 25,
    bedrooms: 1,
    bathrooms: 1,
    status: "Disponible",
    rating: 4.8,
    images: [
      "/chambre.png",
      "/chambre2.png",
      "/chambre3.png"
    ]
  },
  {
    id: 2,
    title: "Appartement 2 pièces avec balcon",
    location: "13ème arrondissement, Paris",
    price: 1200,
    type: "Appartement",
    surface: 45,
    bedrooms: 2,
    bathrooms: 1,
    status: "Disponible",
    rating: 4.6,
    images: [
      "/chambre2.png",
      "/chambre5.png",
      "/4.png"
    ]
  },
  {
    id: 3,
    title: "Chambre en colocation étudiante",
    location: "11ème arrondissement, Paris",
    price: 650,
    type: "Chambre",
    surface: 18,
    bedrooms: 1,
    bathrooms: 1,
    status: "Disponible",
    rating: 4.4,
    images: [
      "/chambre3.png",
      "/chambre.png",
      "/chambre2.png"
    ]
  },
  {
    id: 4,
    title: "Studio rénové avec mezzanine",
    location: "20ème arrondissement, Paris",
    price: 780,
    type: "Studio",
    surface: 28,
    bedrooms: 1,
    bathrooms: 1,
    status: "Disponible",
    rating: 4.7,
    images: [
      "/chambre5.png",
      "/4.png",
      "/chambre3.png"
    ]
  },
  {
    id: 5,
    title: "Appartement 3 pièces familial",
    location: "15ème arrondissement, Paris",
    price: 1500,
    type: "Appartement",
    surface: 65,
    bedrooms: 3,
    bathrooms: 2,
    status: "Disponible",
    rating: 4.9,
    images: [
      "/4.png",
      "/chambre.png",
      "/chambre5.png"
    ]
  },
  {
    id: 6,
    title: "Chambre avec salle de bain privée",
    location: "7ème arrondissement, Paris",
    price: 720,
    type: "Chambre",
    surface: 20,
    bedrooms: 1,
    bathrooms: 1,
    status: "Disponible",
    rating: 4.5,
    images: [
      "/chambre2.png",
      "/chambre3.png",
      "/4.png"
    ]
  }
];

const PropertiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    type: 'Tous'
  });

  const filters = ['Tous', 'Studios', 'Appartements', 'Chambres'];

  const handleSearch = (searchData) => {
    setSearchCriteria(searchData);
    setActiveFilter(searchData.type);
  };

  const filteredProperties = propertiesData.filter(property => {
    // Filtre par type
    if (activeFilter !== 'Tous' && property.type !== activeFilter.slice(0, -1)) {
      return false;
    }

    // Filtre par localisation
    if (searchCriteria.location && !property.location.toLowerCase().includes(searchCriteria.location.toLowerCase())) {
      return false;
    }

    // Filtre par prix minimum
    if (searchCriteria.minPrice && property.price < parseInt(searchCriteria.minPrice)) {
      return false;
    }

    // Filtre par prix maximum
    if (searchCriteria.maxPrice && property.price > parseInt(searchCriteria.maxPrice)) {
      return false;
    }

    return true;
  });

  return (
    <section className="py-16 px-4 bg-theme-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Découvrez nos logements
          </h2>
          <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
            Des logements étudiants sélectionnés avec soin pour vous offrir le meilleur confort
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-sm px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-theme-secondary">
            {filteredProperties.length} logement{filteredProperties.length > 1 ? 's' : ''} trouvé{filteredProperties.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-theme-primary mb-2">
              Aucun logement trouvé
            </h3>
            <p className="text-theme-secondary">
              Aucun logement ne correspond à votre recherche. Essayez de modifier vos critères.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-primary text-lg px-8 py-3">
              Voir plus de logements
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
