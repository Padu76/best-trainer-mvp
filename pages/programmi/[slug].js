import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ProgrammaDetail from '../../components/ProgrammaDetail'

export default function ProgrammaDetailPage() {
  const router = useRouter()
  const { slug } = router.query
  const [programData, setProgramData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState('')

  // Carica dati del programma dal localStorage o usa mock
  useEffect(() => {
    if (!slug) return

    setLoading(true)
    let debugMessages = []
    
    try {
      // Se è un programma reale (ID numerico lungo), carica dal localStorage
      const isRealProgram = /^\d{13,}$/.test(slug.toString()) // ID timestamp lungo
      debugMessages.push(`Slug: ${slug}, È programma reale: ${isRealProgram}`)
      
      if (isRealProgram) {
        const savedPrograms = localStorage.getItem('bt_programs_data')
        const savedProfile = localStorage.getItem('bt_profile_data')
        
        debugMessages.push(`LocalStorage programmi: ${savedPrograms ? 'TROVATO' : 'NON TROVATO'}`)
        debugMessages.push(`LocalStorage profilo PT: ${savedProfile ? 'TROVATO' : 'NON TROVATO'}`)
        
        if (savedPrograms) {
          try {
            const programsData = JSON.parse(savedPrograms)
            debugMessages.push(`Programmi parsati: ${Array.isArray(programsData) ? programsData.length : 'NON ARRAY'}`)
            
            // Trova il programma specifico
            const realProgram = Array.isArray(programsData) 
              ? programsData.find(p => p.dataCreazione && p.dataCreazione.toString() === slug.toString())
              : null
            
            if (realProgram) {
              debugMessages.push(`Programma trovato: ${realProgram.titolo}`)
              
              // Carica anche i dati del trainer
              let trainerData = null
              if (savedProfile) {
                try {
                  const profileData = JSON.parse(savedProfile)
                  trainerData = {
                    id: 'pt_real',
                    nome: profileData.nome + (profileData.cognome ? ` ${profileData.cognome}` : ''),
                    foto: profileData.fotoProfile,
                    rating: 4.8,
                    numeroStudenti: Math.floor(Math.random() * 200) + 50,
                    bio: profileData.bio || 'Personal Trainer professionale',
                    certificazioni: profileData.certificazioni || ['Certificato'],
                    specializzazioni: profileData.specializzazioni || [],
                    contatti: {
                      email: profileData.email,
                      instagram: profileData.instagram,
                      website: profileData.sitoWeb
                    }
                  }
                  debugMessages.push(`Trainer caricato: ${trainerData.nome}`)
                } catch (e) {
                  debugMessages.push(`Errore parsing profilo: ${e.message}`)
                }
              }
              
              // Trasforma il programma nel formato atteso da ProgrammaDetail
              const transformedProgram = {
                id: slug,
                titolo: realProgram.titolo || 'Programma di Allenamento',
                descrizione: realProgram.descrizione || 'Programma di allenamento professionale',
                prezzo: parseFloat(realProgram.prezzo) || 19.90,
                categoria: realProgram.categoria || 'Fitness',
                livello: realProgram.livello || 'Intermedio',
                durata: realProgram.durata || '8 settimane',
                tipoContenuto: realProgram.tipoContenuto || 'misto',
                covertinaPreview: realProgram.covertinaPreview || null,
                rating: 4.8, // Rating di default per programmi reali
                numeroRecensioni: Math.floor(Math.random() * 50) + 10,
                vendite: Math.floor(Math.random() * 100) + 20,
                trainer: trainerData || {
                  id: 'pt_unknown',
                  nome: 'Personal Trainer',
                  foto: null,
                  rating: 4.8,
                  numeroStudenti: 100
                },
                tags: realProgram.tags || [],
                equipmentRequired: realProgram.equipmentRequired || [],
                dataCreazione: realProgram.dataCreazione,
                pubblicato: realProgram.pubblicato,
                isReal: true,
                // Campi specifici del programma reale
                file: realProgram.file,
                video: realProgram.video,
                note: realProgram.note
              }
              
              setProgramData(transformedProgram)
              debugMessages.push(`Programma reale configurato: ${transformedProgram.titolo} - €${transformedProgram.prezzo}`)
            } else {
              debugMessages.push(`Programma con ID ${slug} non trovato nei dati salvati`)
              setProgramData(getMockProgramData(slug))
            }
          } catch (parseError) {
            debugMessages.push(`Errore parsing programmi: ${parseError.message}`)
            setProgramData(getMockProgramData(slug))
          }
        } else {
          debugMessages.push('Nessun programma salvato trovato, uso mock')
          setProgramData(getMockProgramData(slug))
        }
      } else {
        debugMessages.push('Programma mock richiesto')
        setProgramData(getMockProgramData(slug))
      }
      
      setDebugInfo(debugMessages.join('\n'))
      console.log('DEBUG PROGRAMMA:', debugMessages.join('\n'))
      
    } catch (error) {
      console.error('Errore caricamento programma:', error)
      debugMessages.push(`ERRORE: ${error.message}`)
      setDebugInfo(debugMessages.join('\n'))
      setProgramData(getMockProgramData(slug))
    } finally {
      setLoading(false)
    }
  }, [slug])

  // Dati mock per programmi demo
  const getMockProgramData = (programSlug) => {
    const mockPrograms = {
      'massa-muscolare-12-settimane': {
        id: 'mock_1',
        titolo: 'Massa Muscolare 12 Settimane',
        descrizione: 'Programma completo per aumentare la massa muscolare in 12 settimane con tecniche avanzate di bodybuilding e powerlifting.',
        prezzo: 19.90,
        categoria: 'Massa Muscolare',
        livello: 'Intermedio',
        durata: '12 settimane',
        tipoContenuto: 'misto',
        covertinaPreview: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        rating: 4.8,
        numeroRecensioni: 156,
        vendite: 1247,
        trainer: {
          id: 'pt_mock_1',
          nome: 'Marco Fitness',
          foto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
          rating: 4.9,
          numeroStudenti: 450,
          bio: 'Specialista in massa muscolare e powerlifting con 8 anni di esperienza.',
          certificazioni: ['CONI', 'FIPE', 'NASM'],
          specializzazioni: ['Bodybuilding', 'Powerlifting', 'Massa Muscolare']
        },
        tags: ['massa', 'forza', 'intermedio', 'bodybuilding'],
        equipmentRequired: ['Bilanciere', 'Manubri', 'Panca', 'Rack'],
        isMock: true
      },
      'cardio-intenso-hiit': {
        id: 'mock_2',
        titolo: 'Cardio Intenso HIIT',
        descrizione: 'Allenamento cardio ad alta intensità per bruciare grassi e migliorare la resistenza cardiovascolare.',
        prezzo: 15.90,
        categoria: 'Cardio & Resistenza',
        livello: 'Avanzato',
        durata: '8 settimane',
        tipoContenuto: 'video',
        covertinaPreview: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop',
        rating: 4.6,
        numeroRecensioni: 89,
        vendite: 542,
        trainer: {
          id: 'pt_mock_2',
          nome: 'Sara Cardio',
          foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face',
          rating: 4.7,
          numeroStudenti: 280,
          bio: 'Esperta in allenamento cardio e HIIT, preparatrice atletica.',
          certificazioni: ['NASM', 'ASI'],
          specializzazioni: ['Cardio', 'HIIT', 'Dimagrimento']
        },
        tags: ['cardio', 'hiit', 'dimagrimento', 'resistenza'],
        equipmentRequired: ['Nessun attrezzo richiesto'],
        isMock: true
      }
    }

    // Cerca il programma mock per slug, altrimenti usa il primo disponibile
    const foundProgram = mockPrograms[programSlug] || mockPrograms['massa-muscolare-12-settimane']
    
    // Se non trova nessun match, crea un programma generico basato sullo slug  
    if (!mockPrograms[programSlug]) {
      const programTitle = programSlug ? 
        programSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
        "Programma di Allenamento"
      
      return {
        id: programSlug || 'generic',
        titolo: programTitle,
        descrizione: `Programma di allenamento professionale ${programTitle} creato da Personal Trainer certificato.`,
        prezzo: 19.90,
        categoria: 'Fitness',
        livello: 'Intermedio',
        durata: '8 settimane',
        tipoContenuto: 'misto',
        covertinaPreview: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        rating: 4.7,
        numeroRecensioni: 67,
        vendite: 234,
        trainer: {
          id: 'pt_generic',
          nome: 'Personal Trainer Certificato',
          foto: null,
          rating: 4.8,
          numeroStudenti: 150,
          bio: 'Personal Trainer professionale con esperienza nel settore fitness.',
          certificazioni: ['Certificato'],
          specializzazioni: ['Fitness', 'Allenamento']
        },
        tags: ['allenamento', 'fitness'],
        equipmentRequired: ['Varia'],
        isMock: true
      }
    }
    
    return foundProgram
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Caricamento... - Best-Trainer</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento programma...</p>
          </div>
        </div>
      </>
    )
  }

  if (!programData) {
    return (
      <>
        <Head>
          <title>Programma non trovato - Best-Trainer</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Programma non trovato</h2>
            <p className="text-gray-600 mb-4">Il programma che stai cercando non esiste o è stato rimosso.</p>
            <a href="/programmi" className="text-blue-600 hover:text-blue-700">
              Torna ai Programmi
            </a>
          </div>
        </div>
      </>
    )
  }

  const programTitle = programData.titolo || "Programma di Allenamento"
  const programPrice = programData.prezzo?.toString() || "19.90"
  const trainerName = programData.trainer?.nome || "Personal Trainer Certificato"
  const programDescription = programData.descrizione || `Programma professionale ${programTitle} creato da ${trainerName}`

  return (
    <>
      <Head>
        <title>{programTitle} - Best-Trainer</title>
        <meta 
          name="description" 
          content={`${programDescription}. Recensioni verificate, contenuti inclusi e informazioni sul Personal Trainer. Acquista e inizia subito!`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content={`${programTitle}, programma allenamento, ${trainerName}, scheda allenamento, workout plan, fitness program, ${programData.categoria}, ${programData.livello}`}
        />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${programTitle} - Programma di Allenamento`} />
        <meta property="og:description" content={programDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://best-trainer-mvp.vercel.app/programmi/${slug}`} />
        <meta property="og:image" content={programData.covertinaPreview || `https://best-trainer-mvp.vercel.app/og-programma-${slug}.jpg`} />
        <meta property="product:price:amount" content={programPrice} />
        <meta property="product:price:currency" content="EUR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${programTitle} - Best-Trainer`} />
        <meta name="twitter:description" content={programDescription} />
        <meta name="twitter:image" content={programData.covertinaPreview || `https://best-trainer-mvp.vercel.app/og-programma-${slug}.jpg`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://best-trainer-mvp.vercel.app/programmi/${slug}`} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        
        {/* Debug Info (solo in sviluppo - rimuovi in produzione) */}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log("DEBUG PROGRAMMA DETAIL:\\n${debugInfo.replace(/\n/g, '\\n')}")`
            }}
          />
        )}
        
        {/* Schema.org per Prodotto */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": programTitle,
              "description": programDescription,
              "image": programData.covertinaPreview || `https://best-trainer-mvp.vercel.app/programma-${slug}.jpg`,
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
                "ratingValue": programData.rating?.toString() || "4.8",
                "reviewCount": programData.numeroRecensioni?.toString() || "50",
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
              "category": programData.categoria || "Fitness Programs",
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
      
      {/* Debug Info Panel (solo in sviluppo) */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <details>
            <summary className="cursor-pointer font-medium text-yellow-800">
              🐛 Debug Info (solo sviluppo)
            </summary>
            <pre className="text-xs text-yellow-700 mt-2 whitespace-pre-wrap overflow-x-auto">
              {debugInfo}
            </pre>
          </details>
        </div>
      )}
      
      <ProgrammaDetail programData={programData} />
    </>
  )
}

// Next.js getServerSideProps per SEO dinamico
export async function getServerSideProps({ params }) {
  const { slug } = params
  
  // In futuro qui faremo fetch dei dati reali dal database
  return {
    props: {
      slug
    }
  }
}