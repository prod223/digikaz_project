import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata = {
  title: 'DigiKaz - Location de logements étudiants',
  description: 'Trouvez votre logement étudiant idéal avec DigiKaz. Plateforme de location spécialisée pour les étudiants avec un système de matching intelligent.',
  keywords: 'logement étudiant, location, appartement, studio, colocation, DigiKaz',
  authors: [{ name: 'DigiKaz Team' }],
  openGraph: {
    title: 'DigiKaz - Location de logements étudiants',
    description: 'Trouvez votre logement étudiant idéal avec DigiKaz',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
