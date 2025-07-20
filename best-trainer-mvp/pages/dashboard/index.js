import Head from 'next/head'
import PTDashboard from '../../components/PTDashboard'

export default function PTDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard Personal Trainer - Gestione Programmi e Vendite | Best-Trainer</title>
        <meta 
          name="description" 
          content="Dashboard completa per Personal Trainer: gestisci i tuoi programmi, monitora vendite e analytics, visualizza recensioni e ottimizza i guadagni su Best-Trainer." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="dashboard personal trainer, gestione programmi, vendite fitness, analytics pt, guadagni online" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dashboard Personal Trainer - Best-Trainer" />
        <meta property="og:description" content="Area riservata per Personal Trainer: gestisci programmi, monitora vendite e analytics" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/dashboard" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-pt-dashboard.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dashboard PT - Best-Trainer" />
        <meta name="twitter:description" content="Gestisci la tua attività di Personal Trainer online" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/dashboard" />
        
        {/* SEO - No Index per area privata */}
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Security Headers per area business */}
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live;" />
        
        {/* Schema.org per PT Dashboard */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Dashboard Personal Trainer - Best-Trainer",
              "description": "Pannello di controllo professionale per Personal Trainer per gestire programmi e vendite",
              "url": "https://best-trainer-mvp.vercel.app/dashboard",
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
                    "name": "Dashboard PT",
                    "item": "https://best-trainer-mvp.vercel.app/dashboard"
                  }
                ]
              },
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "Personal Trainer Dashboard",
                "description": "Applicazione web per la gestione dell'attività di Personal Trainer",
                "applicationCategory": "Business Management",
                "operatingSystem": "Web Browser",
                "featureList": [
                  "Gestione programmi fitness",
                  "Analytics vendite",
                  "Monitoraggio recensioni",
                  "Upload contenuti",
                  "Gestione profilo pubblico"
                ]
              }
            })
          }}
        />
        
        {/* Business Application Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Best-Trainer Creator Dashboard",
              "description": "Piattaforma per Personal Trainer per gestire e vendere programmi fitness",
              "url": "https://best-trainer-mvp.vercel.app/dashboard",
              "serviceType": "Fitness Content Management Platform",
              "provider": {
                "@type": "Organization",
                "name": "Best-Trainer"
              },
              "audience": {
                "@type": "PeopleAudience",
                "audienceType": "Personal Trainers"
              },
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://best-trainer-mvp.vercel.app/dashboard",
                "serviceSmsNumber": "+39 XXX XXX XXXX"
              }
            })
          }}
        />
        
        {/* Preload dashboard resources */}
        <link rel="preload" href="/icons/chart.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/upload.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/euro.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/trending-up.svg" as="image" type="image/svg+xml" />
        
        {/* Prefetch next likely pages */}
        <link rel="prefetch" href="/dashboard/programs" />
        <link rel="prefetch" href="/dashboard/sales" />
        <link rel="prefetch" href="/dashboard/profile" />
      </Head>
      <PTDashboard />
    </>
  )
}

// Server-side auth check per PT
export async function getServerSideProps({ req, res }) {
  // In futuro qui controlleremo:
  // 1. Se l'utente è autenticato
  // 2. Se ha i permessi di Personal Trainer
  // 3. Se il suo account PT è attivo
  
  /*
  const session = await getSession({ req })
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?redirect=/dashboard',
        permanent: false,
      },
    }
  }
  
  // Controllo se è un PT verificato
  if (session.user.role !== 'personal_trainer') {
    return {
      redirect: {
        destination: '/auth/pt-application',
        permanent: false,
      },
    }
  }
  
  // Controllo se l'account PT è approvato
  if (session.user.pt_status !== 'approved') {
    return {
      redirect: {
        destination: '/pt/pending-approval',
        permanent: false,
      },
    }
  }
  */
  
  return {
    props: {
      // In futuro qui passeremo i dati del PT
      // trainer: session.user,
      // stats: await getTrainerStats(session.user.id)
    }
  }
}