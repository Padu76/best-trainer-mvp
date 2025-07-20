import Head from 'next/head'
import Link from 'next/link'
import { Users, Star, Award, ArrowRight, Search } from 'lucide-react'

export default function PersonalTrainerDirectory() {
  return (
    <>
      <Head>
        <title>Personal Trainer Certificati - Directory Professionale | Best-Trainer</title>
        <meta 
          name="description" 
          content="Scopri i migliori Personal Trainer italiani certificati su Best-Trainer. Profili verificati, specializzazioni, recensioni e programmi di qualità per ogni obiettivo fitness." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="personal trainer italiani, trainer certificati, professionisti fitness, specialisti allenamento, coach sportivi" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Personal Trainer Certificati - Directory Professionale" />
        <meta property="og:description" content="Directory completa dei migliori Personal Trainer italiani. Profili verificati e programmi di qualità." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/personal-trainer" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-personal-trainer.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal Trainer Certificati - Best-Trainer" />
        <meta name="twitter:description" content="Trova il Personal Trainer perfetto per i tuoi obiettivi" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-personal-trainer.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/personal-trainer" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org per Directory PT */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Directory Personal Trainer",
              "description": "Directory completa di Personal Trainer certificati e professionisti del fitness",
              "url": "https://best-trainer-mvp.vercel.app/personal-trainer",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Personal Trainer Certificati",
                "description": "Lista di Personal Trainer professionali verificati",
                "numberOfItems": "150+"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://best-trainer-mvp.vercel.app"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Personal Trainer",
                    "item": "https://best-trainer-mvp.vercel.app/personal-trainer"
                  }
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://best-trainer-mvp.vercel.app/personal-trainer?q={search_term}",
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Best-Trainer Personal Trainer Network",
              "description": "Rete di Personal Trainer certificati per servizi di allenamento professionale",
              "url": "https://best-trainer-mvp.vercel.app/personal-trainer",
              "serviceType": "Personal Training Services",
              "areaServed": "Italy",
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Fitness Enthusiasts"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
                  Best-Trainer
                </Link>
                <span className="ml-2 text-sm text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded-full">BETA</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/programmi" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Programmi
                </Link>
                <Link href="/video-library" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Video Gratuiti
                </Link>
                <Link href="/personal-trainer" className="text-blue-400 font-medium">
                  Personal Trainer
                </Link>
                <Link href="/auth/pt-application" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Diventa Creatore
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Coming Soon Section */}
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Directory Personal Trainer
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                La directory completa dei Personal Trainer certificati è attualmente in sviluppo. 
                Stiamo preparando un'esperienza incredibile per trovare il trainer perfetto per te!
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Profili Verificati</h3>
                  <p className="text-gray-600 text-sm">Certificazioni e competenze validate</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Recensioni Reali</h3>
                  <p className="text-gray-600 text-sm">Feedback verificati da clienti veri</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Ricerca Avanzata</h3>
                  <p className="text-gray-600 text-sm">Filtra per specializzazione e zona</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/programmi"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Esplora i Programmi
                </Link>
                
                <Link 
                  href="/video-library"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
                >
                  🎥 Video Tutorial Gratuiti
                </Link>
              </div>

              {/* Stats Preview */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-gray-500 text-sm mb-4">Quando sarà pronta, troverai:</p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">150+</p>
                    <p className="text-gray-600 text-sm">Personal Trainer</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">4.9★</p>
                    <p className="text-gray-600 text-sm">Rating Medio</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-600">500+</p>
                    <p className="text-gray-600 text-sm">Programmi Disponibili</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PT Signup CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Sei un Personal Trainer?</h2>
              <p className="text-blue-100 mb-6">
                Unisciti alla community di professionisti che stanno già trasformando il fitness italiano.
              </p>
              <Link 
                href="/auth/pt-application"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors inline-flex items-center"
              >
                Candidati Ora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}