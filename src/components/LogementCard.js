'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Icônes SVG inline
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

const HeartIcon = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

const StarIcon = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export default function LogementCard({ logement, onClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Studio': return <BuildingOffice2Icon className="w-4 h-4" />;
      case 'Appartement': return <BuildingOfficeIcon className="w-4 h-4" />;
      case 'Maison': return <HomeIcon className="w-4 h-4" />;
      default: return <HomeIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Studio': return 'bg-blue-500/90 text-white';
      case 'Appartement': return 'bg-purple-500/90 text-white';
      case 'Maison': return 'bg-green-500/90 text-white';
      default: return 'bg-gray-500/90 text-white';
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const images = logement.photos && logement.photos.length > 0 
    ? logement.photos 
    : ['/chambre.png', '/chambre2.png', '/chambre3.png'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    router.push(`/logements/${logement.id}`);
  };

  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`w-3 h-3 ${i < fullStars ? 'text-gold-400' : 'text-gray-300'}`} 
          filled={i < fullStars}
        />
      );
    }
    
    return stars;
  };

  return (
    <article
      onClick={() => onClick && onClick(logement)}
      className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 dark:border-gray-700 hover:border-gold-300 dark:hover:border-gold-600 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={logement.titre}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        
        {/* Navigation Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${getTypeColor(logement.type_logement)}`}>
          <div className="flex items-center gap-1.5">
            {getTypeIcon(logement.type_logement)}
            {logement.type_logement}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`absolute top-3 right-12 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
          logement.statut_logement === 'disponible' 
            ? 'bg-green-500/90 text-white'
            : 'bg-red-500/90 text-white'
        }`}>
          {logement.statut_logement === 'disponible' ? '✓ Disponible' : '✕ Occupé'}
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-200 hover:scale-110"
        >
          <HeartIcon 
            className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500' : 'text-white'}`} 
            filled={isLiked}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-theme-primary line-clamp-1 flex-1 mr-2">
            {logement.titre}
          </h3>
          {logement.score > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {renderStars(logement.score)}
              </div>
              <span className="text-xs text-theme-secondary ml-1">
                {logement.score.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        
        {logement.accroche && (
          <p className="text-theme-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
            {logement.accroche}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-theme-secondary mb-4">
          <MapPinIcon className="w-4 h-4 text-gold-500" />
          <span className="text-sm line-clamp-1">{logement.adresse}</span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <CurrencyEuroIcon className="w-5 h-5 text-gold-500" />
            <span className="text-2xl font-black text-gold-600">
              {logement.prix.toLocaleString()}
            </span>
            <span className="text-theme-secondary text-sm">/mois</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Voir détails
          </button>
        </div>
      </div>
    </article>
  );
}
