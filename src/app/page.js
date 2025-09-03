import Link from 'next/link';
import Image from 'next/image';
import PropertiesSection from '@/components/PropertiesSection';
import HorizontalCarousel from '@/components/HorizontalCarousel';

export default function Home() {
  return (
    <div className="min-h-screen bg-theme-primary">
      
      {/* Top Highlighted Carousel */}
      <section className="px-4 mt-24 md:mt-28 lg:mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/40 p-4 md:p-6">
            <HorizontalCarousel />
          </div>
        </div>
      </section>

      {/* Hero Section - Two Column with Collage */}
      <section className="relative overflow-hidden pt-16 md:pt-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gold-50/40 to-white dark:from-black dark:via-gray-900/60 dark:to-black" />
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] bg-gold-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 text-sm font-medium mb-6">
                ✨ La plateforme moderne pour étudiants
              </span>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Trouvez vite un <span className="text-gradient">logement stylé</span>
              </h1>
              <p className="text-lg md:text-xl text-theme-secondary mb-10 max-w-xl">
                Explorez les meilleures offres proches de votre université. Swipez, matchez et réservez en toute simplicité.
              </p>
                             <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#comment-ca-marche" className="btn-primary text-base md:text-lg px-8 py-3 inline-block text-center">Comment ça marche</a>
                  <a href="#nos-tarifs" className="btn-secondary text-base md:text-lg px-8 py-3 inline-block text-center">Nos tarifs</a>
                </div>

              {/* Trust */}
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/40">
                  <div className="text-2xl font-extrabold text-gold-500">500+</div>
                  <div className="text-xs text-theme-secondary">Logements vérifiés</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/40">
                  <div className="text-2xl font-extrabold text-gold-500">2K+</div>
                  <div className="text-xs text-theme-secondary">Étudiants heureux</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/40">
                  <div className="text-2xl font-extrabold text-gold-500">24h</div>
                  <div className="text-xs text-theme-secondary">Réservation</div>
                </div>
              </div>
            </div>

            {/* Right: Collage - Hidden on small screens */}
            <div className="hidden md:block relative h-[520px] md:h-[620px] lg:h-[680px]">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-gold-200/30 to-transparent rounded-3xl" />
              <div className="absolute left-0 top-6 w-1/2 h-2/3 rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/chambre3.png" alt="Appartement" fill className="object-cover" />
              </div>
              <div className="absolute right-0 top-24 w-[55%] h-[46%] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/chambre2.png" alt="Studio" fill className="object-cover" />
              </div>
              <div className="absolute left-1/3 bottom-4 w-1/3 h-[40%] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/chambre5.png" alt="Chambre" fill className="object-cover" />
              </div>
              {/* Accent ring */}
              <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full border-4 border-gold-400/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <PropertiesSection />

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gradient mb-6">
              Pourquoi DigiKaz ?
            </h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto">
              Une expérience révolutionnaire qui transforme la recherche de logement étudiant
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Swipe & Match */}
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">💕</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-theme-primary">Swipe & Match</h3>
              <p className="text-theme-secondary leading-relaxed">
                Interface intuitive inspirée des apps de rencontre. Swipez à droite pour aimer, à gauche pour passer.
              </p>
            </div>

            {/* Feature 2 - Réservation Express */}
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-theme-primary">Réservation Express</h3>
              <p className="text-theme-secondary leading-relaxed">
                Réservez votre logement en moins de 24h avec notre processus ultra-simplifié et sécurisé.
              </p>
            </div>

            {/* Feature 3 - Géolocalisation */}
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-theme-primary">Géolocalisation Smart</h3>
              <p className="text-theme-secondary leading-relaxed">
                Trouvez des logements à distance de marche de votre université grâce à notre système intelligent.
              </p>
            </div>

            {/* Feature 4 - Sécurisé */}
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-theme-primary">100% Sécurisé</h3>
              <p className="text-theme-secondary leading-relaxed">
                Logements vérifiés, propriétaires certifiés et paiements sécurisés. Votre sécurité est notre priorité.
              </p>
            </div>

            {/* Feature 5 - Support 24/7 */}
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-theme-primary">Support Premium</h3>
              <p className="text-theme-secondary leading-relaxed">
                Équipe dédiée disponible 24h/24 par chat, email ou téléphone pour vous accompagner.
              </p>
            </div>

            {/* Feature 6 - IA Recommandations */}
            <div className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-theme-primary">IA Personnalisée</h3>
              <p className="text-theme-secondary leading-relaxed">
                Algorithme intelligent qui apprend vos préférences pour vous proposer les logements parfaits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche Section */}
      <section id="comment-ca-marche" className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gradient mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto">
              En quelques étapes simples, trouvez votre logement idéal ou louez votre bien en toute sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Pour les étudiants */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-theme-primary mb-2">Pour les étudiants</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-theme-primary mb-2">Créez votre profil</h4>
                    <p className="text-theme-secondary">Inscrivez-vous gratuitement et complétez votre profil avec vos informations et préférences de logement.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-theme-primary mb-2">Recherchez intelligemment</h4>
                    <p className="text-theme-secondary">Utilisez nos filtres avancés et notre IA pour trouver le logement qui correspond parfaitement à vos critères.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-theme-primary mb-2">Contactez et visitez</h4>
                    <p className="text-theme-secondary">Échangez directement avec le propriétaire via notre messagerie sécurisée et organisez une visite.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pour les bailleurs */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-theme-primary mb-2">Pour les bailleurs</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-theme-primary mb-2">Créez votre compte</h4>
                    <p className="text-theme-secondary">Inscrivez-vous en tant que bailleur, vérifiez votre identité et accédez à votre tableau de bord.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-theme-primary mb-2">Publiez vos annonces</h4>
                    <p className="text-theme-secondary">Ajoutez vos biens avec photos HD, descriptions détaillées et gérez les disponibilités en temps réel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-theme-primary mb-2">Gérez facilement</h4>
                    <p className="text-theme-secondary">Recevez des demandes d'étudiants vérifiés, communiquez et gérez vos contrats depuis votre dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarification Section */}
      <section id="nos-tarifs" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gradient mb-6">
              Nos tarifs
            </h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto">
              Simple et transparent. Digikaz est entièrement gratuit pour les étudiants. Les bailleurs bénéficient d'outils premium pour optimiser leurs locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Étudiants - Gratuit */}
            <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-theme-primary mb-2">Étudiants</h3>
                <div className="text-4xl font-black text-gold-500 mb-2">Gratuit</div>
                <div className="text-theme-secondary mb-6">Pour toujours</div>
                
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <span className="text-gold-500 text-xl">✅</span>
                    <span className="text-theme-secondary">Recherche illimitée</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-500 text-xl">✅</span>
                    <span className="text-theme-secondary">Messagerie intégrée</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-500 text-xl">✅</span>
                    <span className="text-theme-secondary">Profil vérifié</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-500 text-xl">✅</span>
                    <span className="text-theme-secondary">Support client</span>
                  </li>
                </ul>

                <button className="w-full btn-primary">
                  Commencer gratuitement
                </button>
              </div>
            </div>

            {/* Bailleurs - Premium */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gold-500 to-gold-600 text-white border border-gold-400 hover:shadow-gold-glow transition-all duration-500 hover:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-gold-600 px-4 py-2 rounded-full text-sm font-bold">Populaire</span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Bailleurs</h3>
                <div className="text-4xl font-black mb-2">29€</div>
                <div className="text-gold-100 mb-6">Par mois</div>
                
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <span className="text-white text-xl">✅</span>
                    <span className="text-gold-100">Annonces illimitées</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white text-xl">✅</span>
                    <span className="text-gold-100">Analytics avancées</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white text-xl">✅</span>
                    <span className="text-gold-100">Gestion des contrats</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white text-xl">✅</span>
                    <span className="text-gold-100">Support prioritaire</span>
                  </li>
                </ul>

                <button className="w-full bg-white text-gold-600 font-bold py-3 px-6 rounded-xl hover:bg-gold-50 transition-all duration-300">
                  Essai gratuit 14 jours
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-5xl mx-auto text-center text-white">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Votre nouveau chez-vous<br />
            <span className="text-gold-200">vous attend</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gold-100 leading-relaxed">
            Rejoignez plus de 2000 étudiants qui ont déjà trouvé leur logement parfait. 
            Commencez votre recherche dès maintenant, c'est gratuit !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="bg-white text-gold-600 font-bold text-lg px-12 py-4 rounded-2xl hover:bg-gold-50 transition-all duration-300 shadow-2xl hover:scale-105">
              🎯 Commencer gratuitement
            </button>
            <button className="border-2 border-white/30 text-white font-semibold text-lg px-12 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
              📱 Télécharger l'app
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gold-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="font-medium">100% Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-medium">Inscription 2min</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="font-medium">Données sécurisées</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}