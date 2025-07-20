import Head from 'next/head'
import BestTrainerMVP from '../components/Homepage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Best-Trainer - Il primo marketplace dei Personal Trainer italiani</title>
        <meta 
          name="description" 
          content="Trova programmi di allenamento professionali creati da Personal Trainer certificati. Tutti i livelli, tutti gli obiettivi, un solo posto. Palestra, yoga, HIIT, preparazione atletica e molto altro." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="personal trainer, programmi allenamento, fitness, palestra, workout, schede allenamento, trainer certificati, marketplace fitness" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Best-Trainer - Marketplace Personal Trainer Italiani" />
        <meta property="og:description" content="Il primo marketplace italiano per programmi di allenamento professionali. Trova il tuo Personal Trainer perfetto!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="it_IT" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best-Trainer - Marketplace Personal Trainer" />
        <meta name="twitter:description" content="Il primo marketplace italiano per programmi di allenamento professionali" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="IT" />
        <meta name="geo.country" content="Italy" />
        <meta name="language" content="Italian" />
        
        {/* Schema.org per Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Best-Trainer - Homepage",
              "description": "Il primo marketplace italiano per programmi di allenamento creati da Personal Trainer certificati",
              "url": "https://best-trainer-mvp.vercel.app",
              "mainEntity": {
                "@type": "Organization",
                "name": "Best-Trainer",
                "description": "Marketplace di programmi fitness professionali",
                "url": "https://best-trainer-mvp.vercel.app",
                "serviceType": "Fitness Training Programs",
                "areaServed": "Italy"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://best-trainer-mvp.vercel.app"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      <BestTrainerMVP />
    </>
  )
}