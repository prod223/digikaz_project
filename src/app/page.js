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
                <button className="btn-primary text-base md:text-lg px-8 py-3">Commencer maintenant</button>
                <button className="btn-secondary text-base md:text-lg px-8 py-3">Voir les logements</button>
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