import Head from 'next/head'
import VideoLibrary from '../../components/VideoLibrary'

export default function VideoLibraryPage() {
  return (
    <>
      <Head>
        <title>Libreria Video Gratuita - Esercizi e Tutorial | Best-Trainer</title>
        <meta 
          name="description" 
          content="Centinaia di video tutorial gratuiti per imparare la tecnica perfetta di ogni esercizio. Personal Trainer professionali, video HD, spiegazioni dettagliate. Completamente gratis!" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="video esercizi, tutorial fitness, tecnica allenamento, video gratuiti palestra, esercizi corretti, personal trainer video, workout tutorial" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Libreria Video Gratuita - Tutorial Fitness Professionali" />
        <meta property="og:description" content="Centinaia di video tutorial gratuiti per imparare la tecnica corretta di ogni esercizio. Video HD con Personal Trainer certificati!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/video-library" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-video-library.jpg" />
        <meta property="og:video" content="https://best-trainer-mvp.vercel.app/video-preview.mp4" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Video Tutorial Fitness Gratuiti - Best-Trainer" />
        <meta name="twitter:description" content="Impara la tecnica perfetta con centinaia di video tutorial gratuiti" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-video-library.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/video-library" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org per Video Library */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Libreria Video Gratuita",
              "description": "Collezione completa di video tutorial per esercizi fitness realizzati da Personal Trainer professionali",
              "url": "https://best-trainer-mvp.vercel.app/video-library",
              "mainEntity": {
                "@type": "VideoGallery",
                "name": "Tutorial Esercizi Fitness",
                "description": "Video tutorial professionali per imparare la tecnica corretta degli esercizi",
                "numberOfItems": "200+"
              },
              "provider": {
                "@type": "Organization",
                "name": "Best-Trainer",
                "url": "https://best-trainer-mvp.vercel.app"
              },
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Fitness Enthusiasts"
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
                    "name": "Video Gratuiti",
                    "item": "https://best-trainer-mvp.vercel.app/video-library"
                  }
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://best-trainer-mvp.vercel.app/video-library?q={search_term}",
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        {/* FAQ Schema per Video Library */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "I video tutorial sono davvero gratuiti?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sì, tutti i video tutorial nella nostra libreria sono completamente gratuiti e sempre accessibili senza registrazione."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Chi crea i video tutorial?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tutti i video sono creati da Personal Trainer certificati e professionisti del fitness con anni di esperienza."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Posso usare i video per allenarmi a casa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Assolutamente sì! I video sono perfetti per imparare la tecnica corretta e allenarti in sicurezza ovunque tu sia."
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <VideoLibrary />
    </>
  )
}