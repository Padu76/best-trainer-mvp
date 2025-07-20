import Head from 'next/head'
import UserDashboard from '../../components/UserDashboard'

export default function UserDashboardPage() {
  return (
    <>
      <Head>
        <title>I Miei Programmi - Dashboard Utente | Best-Trainer</title>
        <meta 
          name="description" 
          content="Gestisci i tuoi programmi di allenamento acquistati, scarica i contenuti, monitora i progressi e accedi alla tua area personale su Best-Trainer." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="dashboard utente, i miei programmi, area personale, download programmi, progressi allenamento" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dashboard Utente - I Miei Programmi" />
        <meta property="og:description" content="Area personale per gestire programmi acquistati e monitorare progressi di allenamento" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/user/dashboard" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-user-dashboard.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dashboard Utente - Best-Trainer" />
        <meta name="twitter:description" content="Gestisci i tuoi programmi di allenamento e monitora i progressi" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/user/dashboard" />
        
        {/* SEO - No Index per area privata */}
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Security Headers per area privata */}
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        
        {/* Schema.org per User Dashboard */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Dashboard Utente - Best-Trainer",
              "description": "Area personale per la gestione dei programmi di allenamento acquistati",
              "url": "https://best-trainer-mvp.vercel.app/user/dashboard",
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
                    "name": "Dashboard",
                    "item": "https://best-trainer-mvp.vercel.app/user/dashboard"
                  }
                ]
              },
              "mainEntity": {
                "@type": "WebApplication",
                "name": "User Dashboard",
                "description": "Applicazione web per la gestione dei programmi fitness acquistati",
                "applicationCategory": "Fitness Management",
                "operatingSystem": "Web Browser"
              }
            })
          }}
        />
        
        {/* Preload critical resources per dashboard */}
        <link rel="preload" href="/icons/download.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/star.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/heart.svg" as="image" type="image/svg+xml" />
      </Head>
      <UserDashboard />
    </>
  )
}

// Server-side auth check (opzionale per MVP)
export async function getServerSideProps({ req, res }) {
  // In futuro qui controlleremo l'autenticazione dell'utente
  // Se non autenticato, redirect al login
  
  /*
  const session = await getSession({ req })
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?redirect=/user/dashboard',
        permanent: false,
      },
    }
  }
  */
  
  return {
    props: {
      // In futuro qui passeremo i dati dell'utente
      // user: session.user
    }
  }
}