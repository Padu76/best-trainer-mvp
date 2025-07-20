import Head from 'next/head'
import PTApplication from '../../components/PTApplication'

export default function PTApplicationPage() {
  return (
    <>
      <Head>
        <title>Diventa Personal Trainer su Best-Trainer - Candidatura</title>
        <meta 
          name="description" 
          content="Unisciti a Best-Trainer come Personal Trainer. Monetizza la tua esperienza creando e vendendo programmi di allenamento. Candidatura semplice e veloce." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="diventa personal trainer, vendere programmi fitness, guadagnare online fitness, personal trainer online, marketplace fitness" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Diventa Personal Trainer su Best-Trainer" />
        <meta property="og:description" content="Trasforma la tua passione in business. Crea e vendi programmi di allenamento su Best-Trainer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/auth/pt-application" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-pt-application.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diventa Personal Trainer - Best-Trainer" />
        <meta name="twitter:description" content="Monetizza la tua esperienza fitness creando programmi professionali" />
        <meta name="twitter:image" content="https://best-trainer-mvp.vercel.app/og-pt-application.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/auth/pt-application" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Schema.org per Application Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Candidatura Personal Trainer - Best-Trainer",
              "description": "Diventa un creator su Best-Trainer e monetizza la tua esperienza nel fitness",
              "url": "https://best-trainer-mvp.vercel.app/auth/pt-application",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Best-Trainer",
                "url": "https://best-trainer-mvp.vercel.app"
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
                    "name": "Diventa PT",
                    "item": "https://best-trainer-mvp.vercel.app/auth/pt-application"
                  }
                ]
              },
              "mainEntity": {
                "@type": "JobPosting",
                "title": "Personal Trainer Creator",
                "description": "Unisciti al marketplace di Best-Trainer come creator di programmi fitness",
                "hiringOrganization": {
                  "@type": "Organization",
                  "name": "Best-Trainer",
                  "sameAs": "https://best-trainer-mvp.vercel.app"
                },
                "jobLocation": {
                  "@type": "Place",
                  "addressCountry": "IT"
                },
                "employmentType": "CONTRACTOR",
                "workHours": "Flessibile",
                "responsibilities": "Creazione di programmi di allenamento professionali per il marketplace",
                "qualifications": "Certificazione Personal Trainer, esperienza comprovata nel settore fitness"
              }
            })
          }}
        />
        
        {/* FAQ Schema per PT Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Quali sono i requisiti per diventare Personal Trainer su Best-Trainer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "È necessario essere un Personal Trainer certificato con almeno 1 anno di esperienza e poter dimostrare competenze professionali nel settore fitness."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto posso guadagnare vendendo programmi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I guadagni dipendono dalla qualità e popolarità dei tuoi programmi. I nostri top creator generano redditi significativi dal loro lavoro."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto tempo richiede il processo di candidatura?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La candidatura richiede circa 10-15 minuti. Il processo di approvazione avviene entro 48 ore dall'invio."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Best-Trainer Creator Program",
              "description": "Programma per Personal Trainer che vogliono monetizzare la propria esperienza",
              "url": "https://best-trainer-mvp.vercel.app/auth/pt-application",
              "serviceType": "Fitness Content Creation Platform",
              "areaServed": "Italy",
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Personal Trainers"
              }
            })
          }}
        />
      </Head>
      <PTApplication />
    </>
  )
}