import Head from 'next/head'
import AuthSystem from '../../components/AuthSystem'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Accedi al tuo account - Best-Trainer</title>
        <meta 
          name="description" 
          content="Accedi al tuo account Best-Trainer per gestire i tuoi programmi di allenamento, monitorare i progressi e accedere ai contenuti acquistati." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="login best trainer, accedi account, registrazione fitness, area personale, dashboard utente" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Accedi a Best-Trainer - Area Personale" />
        <meta property="og:description" content="Accedi al tuo account per gestire programmi di allenamento e monitorare i tuoi progressi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/auth/login" />
        <meta property="og:image" content="https://best-trainer-mvp.vercel.app/og-login.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Accedi a Best-Trainer" />
        <meta name="twitter:description" content="Area personale per gestire i tuoi programmi di allenamento" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/auth/login" />
        
        {/* SEO - No Index per pagine di login */}
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Schema.org per Login Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Login - Best-Trainer",
              "description": "Pagina di accesso per utenti registrati di Best-Trainer",
              "url": "https://best-trainer-mvp.vercel.app/auth/login",
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
                    "name": "Accedi",
                    "item": "https://best-trainer-mvp.vercel.app/auth/login"
                  }
                ]
              },
              "potentialAction": {
                "@type": "AuthenticateAction",
                "target": "https://best-trainer-mvp.vercel.app/auth/login"
              }
            })
          }}
        />
        
        {/* Preload fonts per performance */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'" 
        />
        
        {/* DNS prefetch per social login */}
        <link rel="dns-prefetch" href="//accounts.google.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//appleid.apple.com" />
      </Head>
      <AuthSystem />
    </>
  )
}

// Redirect se già loggato (opzionale per MVP)
export async function getServerSideProps({ req, res }) {
  // In futuro qui controlleremo se l'utente è già autenticato
  // e lo reindirizzeremo alla dashboard appropriata
  
  return {
    props: {}
  }
}