export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ✅ DigiKaz - Test Page
        </h1>
        <p className="text-gray-600 mb-8">
          Si vous voyez cette page, l'application fonctionne !
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ Build réussi sur Vercel
            </p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800 font-medium">
              ✅ Routage Next.js fonctionne
            </p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <p className="text-purple-800 font-medium">
              ✅ Déploiement actif
            </p>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="/" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
