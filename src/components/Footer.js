import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-theme-secondary border-t border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo-placeholder.svg"
                  alt="DigiKaz"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gradient">
                DigiKaz
              </span>
            </Link>
            <p className="text-theme-secondary text-sm leading-relaxed mb-6">
              La plateforme de location de logements étudiants la plus moderne et élégante. 
              Trouvez votre logement idéal en quelques clics.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-theme-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-theme-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-theme-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-theme-primary font-semibold text-lg mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/logements" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Tous les logements
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Rechercher
                </Link>
              </li>
              <li>
                <Link href="/favoris" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Mes favoris
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Mes réservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-theme-primary font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/aide" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/securite" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Sécurité
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-theme-primary font-semibold text-lg mb-6">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/conditions" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Politique des cookies
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-theme-secondary hover:text-orange-400 transition-colors duration-200">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-theme mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-theme-secondary text-sm">
              © 2024 DigiKaz. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-theme-secondary text-sm">Fait avec ❤️ pour les étudiants</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
