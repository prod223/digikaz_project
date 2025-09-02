'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

// Icônes SVG inline
const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

const HeartIcon = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EnvelopeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function LogementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [logement, setLogement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchLogement(params.id);
    }
  }, [params.id]);

  const fetchLogement = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/logements/${id}`);
      if (!response.ok) throw new Error('Logement non trouvé');
      const result = await response.json();
      
      if (result.success) {
        setLogement(result.data);
      } else {
        throw new Error(result.error || 'Erreur lors de la récupération du logement');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (direction) => {
    if (!logement?.photos || logement.photos.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === logement.photos.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? logement.photos.length - 1 : prev - 1
      );
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implémenter l'API pour sauvegarder le like
  };

  const handleReservation = () => {
    // TODO: Implémenter la logique de réservation
    alert('Fonctionnalité de réservation à implémenter');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-theme-secondary">Chargement du logement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !logement) {
    return (
      <div className="min-h-screen bg-theme-primary pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-theme-primary mb-2">Erreur de chargement</h2>
            <p className="text-theme-secondary mb-4">{error || 'Logement non trouvé'}</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => router.back()}
                className="btn-secondary"
              >
                Retour
              </button>
              <Link href="/logements" className="btn-primary">
                Voir tous les logements
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = logement.photos && logement.photos.length > 0 
    ? logement.photos 
    : ['/chambre3.png']; // Image par défaut

  return (
    <div className="min-h-screen bg-theme-primary pt-24">
      {/* Header avec navigation */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-24 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Retour</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white shadow-lg scale-110' 
                    : 'bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                <HeartIcon className="w-6 h-6" filled={isLiked} />
              </button>
              
              <button className="btn-primary px-6 py-3">
                Réserver
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Logements', href: '/logements' },
            { label: logement.titre, href: '#' }
          ]} 
        />
        
        {/* Titre et informations principales */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-theme-primary mb-2">
                {logement.titre}
              </h1>
              <div className="flex items-center gap-4 text-theme-secondary mb-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{logement.adresse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyEuroIcon className="w-5 h-5" />
                  <span className="font-bold text-2xl text-gold-600">
                    {Math.floor(logement.prix / 1000)}k €
                  </span>
                  <span className="text-sm">/mois</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (logement.score || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                    filled={star <= (logement.score || 0)}
                  />
                ))}
                <span className="ml-2 text-sm text-theme-secondary">
                  {logement.score || 0}/5
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-100 dark:bg-gold-900/30 text-gold-800 dark:text-gold-200">
                  {logement.type_logement}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  logement.statut_logement === 'disponible' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : logement.statut_logement === 'reserve'
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}>
                  {logement.statut_logement}
                </span>
              </div>
            </div>
          </div>
          
          {logement.accroche && (
            <p className="text-lg text-theme-secondary leading-relaxed max-w-4xl">
              {logement.accroche}
            </p>
          )}
        </div>

        {/* Galerie d'images */}
        <div className="mb-12">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex]}
                  alt={`${logement.titre} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                
                {/* Navigation des images */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageChange('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleImageChange('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Indicateurs d'images */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-theme-secondary">
                <span className="text-2xl">🏠</span>
                <span className="ml-2">Aucune image disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne gauche - Détails */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 dark:border-gray-700/40">
              <h2 className="text-2xl font-bold text-theme-primary mb-4">Description</h2>
              <p className="text-theme-secondary leading-relaxed">
                {logement.accroche || `Magnifique ${logement.type_logement.toLowerCase()} situé à ${logement.adresse}. Idéal pour les étudiants, ce logement offre un excellent rapport qualité-prix dans un quartier dynamique et bien desservi.`}
              </p>
            </div>

            {/* Caractéristiques */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20 dark:border-gray-700/40">
              <h2 className="text-2xl font-bold text-theme-primary mb-6">Caractéristiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🏠</span>
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">Type</div>
                    <div className="text-theme-secondary">{logement.type_logement}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">Prix</div>
                    <div className="text-theme-secondary">{logement.prix} €/mois</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">Localisation</div>
                    <div className="text-theme-secondary">{logement.adresse}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">Note</div>
                    <div className="text-theme-secondary">{logement.score || 0}/5</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/40">
              <h2 className="text-2xl font-bold text-theme-primary mb-4">Localisation</h2>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-theme-secondary">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p>Carte interactive à implémenter</p>
                  <p className="text-sm mt-2">Coordonnées: {logement.latitude}, {logement.longitude}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Actions et contact */}
          <div className="space-y-6">
            {/* Carte de réservation */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-gray-700/40 sticky top-40">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gold-600 mb-2">
                  {Math.floor(logement.prix / 1000)}k €
                </div>
                <div className="text-theme-secondary">par mois</div>
              </div>
              
              <button
                onClick={handleReservation}
                className="w-full btn-primary text-lg py-4 mb-4"
              >
                🎯 Réserver maintenant
              </button>
              
              <button className="w-full btn-secondary text-lg py-4 mb-6">
                💬 Contacter le propriétaire
              </button>
              
              <div className="text-center text-sm text-theme-secondary">
                <p>✅ Logement vérifié</p>
                <p>🔒 Réservation sécurisée</p>
                <p>⚡ Réponse sous 24h</p>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-gray-700/40">
              <h3 className="text-xl font-bold text-theme-primary mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">Téléphone</div>
                    <div className="text-theme-secondary">+33 1 23 45 67 89</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center">
                    <EnvelopeIcon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">Email</div>
                    <div className="text-theme-secondary">contact@digikaz.fr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
