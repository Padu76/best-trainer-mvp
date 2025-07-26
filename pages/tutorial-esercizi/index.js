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
          content="tutorial esercizi, tecnica allenamento, video gratuiti palestra, esercizi corretti, personal trainer video, workout tutorial, form perfetto, squat, panca piana, deadlift" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Tutorial Esercizi Gratuiti - Tecnica Perfetta | Best-Trainer" />
        <meta property="og:description" content="Centinaia di tutorial gratuiti per imparare la tecnica corretta di ogni esercizio. Video HD con Personal Trainer certificati!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/tutorial-esercizi" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-tutorial-esercizi.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="it_IT" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tutorial Esercizi Fitness Gratuiti - Best-Trainer" />
        <meta name="twitter:description" content="Impara la tecnica perfetta con centinaia di tutorial gratuiti" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-tutorial-esercizi.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/tutorial-esercizi" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IT" />
        <meta name="geo.country" content="Italy" />
        <meta name="language" content="Italian" />
        
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
                "url": "https://best-trainer-mvp.vercel.app",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://best-trainer-mvp.vercel.app/logo.png"
                }
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
                },
                {
                  "@type": "Question",
                  "name": "Posso usare i tutorial per allenarmi a casa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Assolutamente sì! I tutorial sono perfetti per imparare la tecnica corretta e allenarti in sicurezza ovunque tu sia."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Ci sono tutorial per principianti?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sì, abbiamo tutorial per tutti i livelli: principianti, intermedi e avanzati. Ogni video è etichettato con il livello di difficoltà."
                  }
                }
              ]
            })
          }}
        />

        {/* Video Object Schema per alcuni tutorial in evidenza */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Tutorial Esercizi in Evidenza",
              "description": "I tutorial di esercizi più popolari di Best-Trainer",
              "itemListElement": [
                {
                  "@type": "VideoObject",
                  "position": 1,
                  "name": "Squat Perfetto - Tecnica Base",
                  "description": "Impara la tecnica perfetta dello squat, l'esercizio fondamentale per gambe e glutei",
                  "duration": "PT3M45S",
                  "thumbnailUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
                  "uploadDate": "2024-01-15",
                  "contentUrl": "https://best-trainer-mvp.vercel.app/tutorial/squat-perfetto",
                  "embedUrl": "https://best-trainer-mvp.vercel.app/embed/squat-perfetto"
                },
                {
                  "@type": "VideoObject", 
                  "position": 2,
                  "name": "Panca Piana - Setup e Esecuzione",
                  "description": "Tecnica avanzata per la panca piana: setup, arco lombare e traiettoria del bilanciere",
                  "duration": "PT4M20S",
                  "thumbnailUrl": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=250&fit=crop",
                  "uploadDate": "2024-01-14",
                  "contentUrl": "https://best-trainer-mvp.vercel.app/tutorial/panca-piana",
                  "embedUrl": "https://best-trainer-mvp.vercel.app/embed/panca-piana"
                },
                {
                  "@type": "VideoObject",
                  "position": 3, 
                  "name": "Deadlift Rumeno - Catena Posteriore",
                  "description": "Variante del deadlift per sviluppare la catena posteriore in modo specifico",
                  "duration": "PT5M30S",
                  "thumbnailUrl": "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=250&fit=crop",
                  "uploadDate": "2024-01-13",
                  "contentUrl": "https://best-trainer-mvp.vercel.app/tutorial/deadlift-rumeno",
                  "embedUrl": "https://best-trainer-mvp.vercel.app/embed/deadlift-rumeno"
                }
              ]
            })
          }}
        />

        {/* Preload important resources */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Additional meta for better indexing */}
        <meta name="subject" content="Tutorial Esercizi Fitness" />
        <meta name="topic" content="Allenamento e Tecnica Esercizi" />
        <meta name="summary" content="Libreria gratuita di tutorial per esercizi fitness con Personal Trainer professionali" />
        <meta name="classification" content="Fitness, Sport, Allenamento" />
        <meta name="designer" content="Best-Trainer Team" />
        <meta name="reply-to" content="support@best-trainer.com" />
        <meta name="owner" content="Best-Trainer" />
        <meta name="url" content="https://best-trainer-mvp.vercel.app/tutorial-esercizi" />
        <meta name="identifier-URL" content="https://best-trainer-mvp.vercel.app/tutorial-esercizi" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Structured data for Course/Tutorial collection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Tutorial Esercizi Fitness Completi",
              "description": "Corso completo gratuito di tutorial per esercizi fitness con Personal Trainer certificati",
              "provider": {
                "@type": "Organization",
                "name": "Best-Trainer",
                "sameAs": [
                  "https://www.facebook.com/BestTrainerNetwork",
                  "https://www.instagram.com/besttrainer_official"
                ]
              },
              "courseMode": "online",
              "educationalLevel": "Beginner to Advanced",
              "teaches": [
                "Tecnica corretta degli esercizi",
                "Sicurezza in palestra", 
                "Prevenzione infortuni",
                "Progressioni di allenamento",
                "Form e postura corretta"
              ],
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student"
              },
              "availableLanguage": "it",
              "isAccessibleForFree": true,
              "inLanguage": "it-IT",
              "keywords": "tutorial esercizi, tecnica allenamento, fitness, palestra, personal trainer",
              "educationalCredentialAwarded": "Certificato di completamento tutorial"
            })
          }}
        />
      </Head>
      <TutorialEsercizi />
    </>
  )
}