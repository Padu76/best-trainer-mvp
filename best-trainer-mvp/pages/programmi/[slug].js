import Head from 'next/head'
import { useRouter } from 'next/router'
import ProgrammaDetail from '../../components/ProgrammaDetail'

export default function ProgrammaDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  // In produzione, qui faremo fetch dei dati del programma specifico
  // Per ora usiamo dati placeholder basati sullo slug
  const programTitle = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Programma di Allenamento"
  const programPrice = "19.90"
  const trainerName = "Personal Trainer Certificato"

  return (
    <>
      <Head>
        <title>{programTitle} - Best-Trainer</title>
        <meta 
          name="description" 
          content={`Dettagli completi del programma ${programTitle}. Recensioni verificate, contenuti inclusi e informazioni sul Personal Trainer. Acquista e inizia subito!`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content={`${programTitle}, programma allenamento, ${trainerName}, scheda allenamento, workout plan, fitness program`}
        />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${programTitle} - Programma di Allenamento`} />
        <meta property="og:description" content={`Programma professionale ${programTitle} creato da ${trainerName}. Include PDF completo, video tutorial e supporto.`} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://best-trainer-mvp.vercel.app/programmi/${slug}`} />
        <meta property="og:image" content={`https://best-trainer-mvp.vercel.app/og-programma-${slug}.jpg`} />
        <meta property="product:price:amount" content={programPrice} />
        <meta property="product:price:currency" content="EUR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${programTitle} - Best-Trainer`} />
        <meta name="twitter:description" content={`Programma di allenamento professionale ${programTitle}`} />
        <meta name="twitter:image" content={`https://best-trainer-mvp.vercel.app/og-programma-${slug}.jpg`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://best-trainer-mvp.vercel.app/programmi/${slug}`} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org per Prodotto */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": programTitle,
              "description": `Programma di allenamento professionale ${programTitle} creato da Personal Trainer certificato`,
              "image": `https://best-trainer-mvp.vercel.app/programma-${slug}.jpg`,
              "sku": slug,
              "brand": {
                "@type": "Brand",
                "name": "Best-Trainer"
              },
              "offers": {
                "@type": "Offer",
                "price": programPrice,
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Best-Trainer"
                },
                "url": `https://best-trainer-mvp.vercel.app/programmi/${slug}`
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "156",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Utente Verificato"
                },
                "reviewBody": "Programma fantastico, risultati evidenti già dalle prime settimane!"
              },
              "category": "Fitness Programs",
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Fitness Enthusiasts"
              }
            })
          }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": programTitle,
                  "item": `https://best-trainer-mvp.vercel.app/programmi/${slug}`
                }
              ]
            })
          }}
        />
      </Head>
      <ProgrammaDetail />
    </>
  )
}

// Next.js getServerSideProps per SEO dinamico (opzionale per MVP)
export async function getServerSideProps({ params }) {
  const { slug } = params
  
  // In futuro qui faremo fetch dei dati reali dal database
  // Per ora restituiamo props vuote
  return {
    props: {
      slug
    }
  }
}