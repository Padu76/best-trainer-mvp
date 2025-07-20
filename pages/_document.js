import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        {/* DNS Prefetch per performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//vercel.app" />
        
        {/* Structured Data per SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Best-Trainer",
              "url": "https://best-trainer-mvp.vercel.app",
              "description": "Il primo marketplace italiano per programmi di allenamento creati da Personal Trainer certificati",
              "inLanguage": "it-IT",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://best-trainer-mvp.vercel.app/programmi?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Best-Trainer",
                "url": "https://best-trainer-mvp.vercel.app"
              }
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Best-Trainer",
              "url": "https://best-trainer-mvp.vercel.app",
              "description": "Marketplace di programmi di allenamento professionali",
              "foundingDate": "2025",
              "founder": {
                "@type": "Person",
                "name": "Best-Trainer Team"
              },
              "areaServed": "IT",
              "serviceType": "Fitness Training Programs"
            })
          }}
        />
      </Head>
      <body className="antialiased">
        {/* Preloader per migliore UX */}
        <div id="preloader" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
        
        <Main />
        <NextScript />
        
        {/* Script per rimuovere preloader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                  preloader.style.opacity = '0';
                  setTimeout(function() {
                    preloader.remove();
                  }, 300);
                }
              });
              
              // CSS per animazione spinner
              const style = document.createElement('style');
              style.textContent = \`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              \`;
              document.head.appendChild(style);
            `
          }}
        />
      </body>
    </Html>
  )
}