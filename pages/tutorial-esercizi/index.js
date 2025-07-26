import Head from 'next/head'
import TutorialEsercizi from '../../components/TutorialEsercizi'

export default function TutorialEserciziPage() {
  return (
    <>
      <Head>
        <title>Tutorial Esercizi Gratuiti - Tecnica Perfetta | Best-Trainer</title>
        <meta 
          name="description" 
          content="Centinaia di tutorial gratuiti per imparare la tecnica perfetta di ogni esercizio. Personal Trainer professionali, video HD, spiegazioni dettagliate. Completamente gratis!" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="tutorial esercizi, tecnica allenamento, video gratuiti palestra, esercizi corretti, personal trainer video, workout tutorial, form perfetto" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Tutorial Esercizi Gratuiti - Tecnica Perfetta | Best-Trainer" />
        <meta property="og:description" content="Centinaia di tutorial gratuiti per imparare la tecnica corretta di ogni esercizio. Video HD con Personal Trainer certificati!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/tutorial-esercizi" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-tutorial-esercizi.jpg" />
        <meta property="og:video" content="https://best-trainer-mvp.vercel.app/tutorial-preview.mp4" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tutorial Esercizi Fitness Gratuiti - Best-Trainer" />
        <meta name="twitter:description" content="Impara la tecnica perfetta con centinaia di tutorial gratuiti" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-tutorial-esercizi.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/tutorial-esercizi" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org per Tutorial Esercizi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Tutorial Esercizi Gratuiti",
              "description": "Collezione completa di tutorial per esercizi fitness realizzati da Personal Trainer professionali",
              "url": "https://best-trainer-mvp.vercel.app/tutorial-esercizi",
              "mainEntity": {
                "@type": "VideoGallery",
                "name": "Tutorial Tecnica Esercizi",
                "description": "Tutorial professionali per imparare la tecnica corretta degli esercizi",
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
                    "name": "Tutorial Esercizi",
                    "item": "https://best-trainer-mvp.vercel.app/tutorial-esercizi"
                  }
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://best-trainer-mvp.vercel.app/tutorial-esercizi?q={search_term}",
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        {/* FAQ Schema per Tutorial Esercizi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "I tutorial sono davvero gratuiti?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sì, tutti i tutorial nella nostra libreria sono completamente gratuiti e sempre accessibili senza registrazione."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Chi crea i tutorial?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tutti i tutorial sono creati da Personal Trainer certificati e professionisti del fitness con anni di esperienza."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Come posso imparare la tecnica corretta?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ogni tutorial include spiegazioni dettagliate, angolazioni multiple e gli errori più comuni da evitare per una tecnica perfetta."
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <TutorialEsercizi />
    </>
  )
}