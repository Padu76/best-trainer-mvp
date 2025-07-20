import Head from 'next/head'
import ProgrammiListing from '../../components/ProgrammiListing'

export default function Programmi() {
  return (
    <>
      <Head>
        <title>Tutti i Programmi di Allenamento - Best-Trainer</title>
        <meta 
          name="description" 
          content="Esplora centinaia di programmi di allenamento professionali per ogni sport e obiettivo. Filtra per livello, durata, attrezzatura e trova il programma perfetto per te." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="programmi allenamento, schede palestra, workout plans, fitness programs, personal trainer, massa muscolare, dimagrimento, forza, resistenza" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Programmi di Allenamento Professionali - Best-Trainer" />
        <meta property="og:description" content="Centinaia di programmi creati da Personal Trainer certificati. Trova quello perfetto per i tuoi obiettivi!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/programmi" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-programmi.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programmi di Allenamento - Best-Trainer" />
        <meta name="twitter:description" content="Trova programmi di allenamento professionali per ogni obiettivo" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-programmi.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/programmi" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org per Programmi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Programmi di Allenamento",
              "description": "Collezione di programmi di allenamento professionali creati da Personal Trainer certificati",
              "url": "https://best-trainer-mvp.vercel.app/programmi",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Programmi Fitness",
                "description": "Lista completa dei programmi di allenamento disponibili",
                "numberOfItems": "500+"
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
                    "name": "Programmi",
                    "item": "https://best-trainer-mvp.vercel.app/programmi"
                  }
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://best-trainer-mvp.vercel.app/programmi?q={search_term}",
                "query-input": "required name=search_term"
              }
            })
          }}
        />
      </Head>
      <ProgrammiListing />
    </>
  )
}