import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ArrowLeft,
  Star, 
  MapPin, 
  Users, 
  Award, 
  ChevronRight,
  Clock,
  CheckCircle,
  Heart,
  Share2,
  Facebook,
  Instagram,
  Youtube,
  ChevronDown,
  User,
  UserPlus,
  MessageCircle,
  Mail,
  Download,
  Play,
  BookOpen,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Home,
  AlertCircle,
  FileText,
  Video,
  Upload
} from 'lucide-react';

export default function ProfiloPersonalTrainer() {
  const router = useRouter();
  const { slug } = router.query;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programmi, setProgrammi] = useState([]);

  // Carica dati del trainer dal localStorage o usa mock
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    
    try {
      // Se è un profilo reale (inizia con pt_real_), carica dal localStorage
      if (slug.toString().startsWith('pt_real_')) {
        const savedProfile = localStorage.getItem('bt_profile_data');
        const savedPrograms = localStorage.getItem('bt_programs_data');
        
        if (savedProfile) {
          const profileData = JSON.parse(savedProfile);
          
          // Trasforma i dati del PT nel formato trainer
          const realTrainer = {
            id: slug,
            nome: profileData.nome + (profileData.cognome ? ` ${profileData.cognome}` : ''),
            specializzazioni: profileData.specializzazioni || [],
            citta: profileData.citta || 'Online',
            rating: 4.8,
            recensioni: Math.floor(Math.random() * 50) + 15,
            programmiCreati: 0, // Calcolato dai programmi reali
            esperienza: profileData.anniEsperienza ? `${profileData.anniEsperienza} anni` : '1 anno',
            certificazioni: profileData.certificazioni || ['Personal Trainer Certificato'],
            descrizione: profileData.bio || 'Personal Trainer professionale specializzato nel raggiungimento dei tuoi obiettivi.',
            biografiaCompleta: profileData.bio || 'Personal Trainer con esperienza nel settore del fitness.',
            immagine: profileData.fotoProfile || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&face=center',
            coverImage: profileData.fotoCopertina || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
            disponibile: true,
            badge: "PT Verificato",
            clientiSeguiti: Math.floor(Math.random() * 200) + 50,
            anniEsperienza: profileData.anniEsperienza || 1,
            slogan: profileData.slogan || '',
            contatti: {
              email: profileData.email || '',
              telefono: profileData.telefono || '',
              instagram: profileData.instagram || '',
              website: profileData.sitoWeb || '',
              facebook: profileData.facebook || ''
            },
            metodologia: [
              "Valutazione iniziale personalizzata",
              "Programmazione scientifica",
              "Monitoraggio progressi costante",
              "Supporto continuo",
              "Approccio professionale"
            ],
            achievements: [
              { icon: "🏆", title: "PT Certificato", description: "Professionista verificato" },
              { icon: "⭐", title: `${profileData.anniEsperienza || 1}+ anni`, description: "Esperienza nel settore" },
              { icon: "📈", title: "Risultati", description: "Clienti soddisfatti" },
              { icon: "🎯", title: "Specializzato", description: "Focus sui tuoi obiettivi" }
            ]
          };
          
          setTrainer(realTrainer);
          
          // Carica programmi reali del PT
          if (savedPrograms) {
            try {
              const programsData = JSON.parse(savedPrograms);
              const publishedPrograms = Array.isArray(programsData) 
                ? programsData.filter(p => p.pubblicato === true)
                : [];
              
              // Aggiorna il conteggio programmi del trainer
              realTrainer.programmiCreati = publishedPrograms.length;
              
              setProgrammi(publishedPrograms);
            } catch (e) {
              console.error('Errore caricamento programmi:', e);
              setProgrammi([]);
            }
          }
        } else {
          // Profilo reale non trovato, usa mock
          setTrainer(getMockTrainer());
          setProgrammi(getMockPrograms());
        }
      } else {
        // Profilo mock
        setTrainer(getMockTrainer());
        setProgrammi(getMockPrograms());
      }
    } catch (error) {
      console.error('Errore caricamento profilo:', error);
      setTrainer(getMockTrainer());
      setProgrammi(getMockPrograms());
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const getMockTrainer = () => ({
    id: 1,
    nome: "Marco Rossi",
    specializzazioni: ["Massa Muscolare", "Forza & Potenza"],
    citta: "Milano",
    rating: 4.9,
    recensioni: 127,
    programmiCreati: 12,
    esperienza: "8 anni",
    certificazioni: ["CONI", "FIPE", "NASM"],
    descrizione: "Specialista in powerlifting e massa muscolare con oltre 8 anni di esperienza nel settore. Ho preparato atleti agonisti e aiutato centinaia di persone a raggiungere i loro obiettivi di trasformazione corporea.",
    biografiaCompleta: "Dopo aver completato la laurea in Scienze Motorie presso l'Università Statale di Milano, ho iniziato il mio percorso come Personal Trainer specializzandomi in powerlifting e allenamento per la forza. Nel corso degli anni ho ottenuto diverse certificazioni internazionali e ho avuto l'opportunità di lavorare con atleti di alto livello, preparatori olimpici e centinaia di clienti con obiettivi diversi.",
    immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&face=center",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
    disponibile: true,
    badge: "Top Rated",
    clientiSeguiti: 250,
    anniEsperienza: 8,
    slogan: "Trasformo obiettivi in risultati concreti",
    contatti: {
      email: "marco.rossi@besttrainer.it",
      telefono: "+39 349 123 4567",
      instagram: "@marco.trainer",
      website: "www.marcorossipt.it"
    },
    metodologia: [
      "Valutazione iniziale completa",
      "Programmazione personalizzata",
      "Monitoraggio progressi costante",
      "Supporto nutrizionale base",
      "Coaching motivazionale"
    ],
    achievements: [
      { icon: "🏆", title: "Top Seller 2024", description: "Miglior venditore dell'anno" },
      { icon: "⭐", title: "5 Stelle", description: "Rating perfetto per 6 mesi" },
      { icon: "📈", title: "250+ Clienti", description: "Persone trasformate" },
      { icon: "🎯", title: "Expert Badge", description: "Riconoscimento professionale" }
    ]
  });

  const getMockPrograms = () => [
    {
      id: 1,
      titolo: "Massa Muscolare Avanzato",
      prezzo: 29.99,
      rating: 4.8,
      numeroRecensioni: 156,
      vendite: 1247,
      durata: "12 settimane",
      tipoContenuto: "misto",
      covertinaPreview: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop",
      categoria: "Massa Muscolare",
      livello: "Avanzato",
      descrizione: "Programma completo per massimizzare la crescita muscolare"
    },
    {
      id: 2,
      titolo: "Powerlifting Foundation", 
      prezzo: 39.99,
      rating: 4.7,
      numeroRecensioni: 89,
      vendite: 654,
      durata: "16 settimane",
      tipoContenuto: "video",
      covertinaPreview: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
      categoria: "Forza & Potenza",
      livello: "Intermedio",
      descrizione: "Le basi del powerlifting per forza esplosiva"
    }
  ];

  const recensioniRecenti = [
    {
      id: 1,
      nome: "Luca M.",
      rating: 5,
      data: "2 settimane fa",
      commento: `${trainer?.nome || 'Il trainer'} è un professionista eccezionale. Grazie ai suoi programmi ho raggiunto risultati incredibili. Altamente raccomandato!`,
      verificata: true
    },
    {
      id: 2,
      nome: "Sofia B.",
      rating: 5,
      data: "1 mese fa",
      commento: "Approccio scientifico e personalizzato. Mi ha aiutata a raggiungere obiettivi che credevo impossibili. Professionalità al top!",
      verificata: true
    },
    {
      id: 3,
      nome: "Andrea V.",
      rating: 4,
      data: "2 mesi fa",
      commento: "Ottimi programmi e supporto costante. I contenuti sono chiari e ben strutturati.",
      verificata: true
    }
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      'Top Rated': 'bg-yellow-500',
      'Verified': 'bg-green-500',
      'Pro': 'bg-purple-500',
      'Expert': 'bg-blue-500',
      'PT Verificato': 'bg-purple-600'
    };
    return colors[badge] || 'bg-gray-500';
  };

  // Get content type icon
  const getContentTypeIcon = (tipoContenuto) => {
    switch (tipoContenuto) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'misto': return <Upload className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Get content type label
  const getContentTypeLabel = (tipoContenuto) => {
    switch (tipoContenuto) {
      case 'video': return 'Video';
      case 'misto': return 'Misto';
      default: return 'Documenti';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento profilo...</p>
        </div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profilo non trovato</h2>
          <p className="text-gray-600 mb-4">Il profilo che stai cercando non esiste o è stato rimosso.</p>
          <Link href="/professionisti" className="text-blue-600 hover:text-blue-700">
            Torna ai Professionisti
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{trainer.nome} - Personal Trainer | Best-Trainer</title>
        <meta 
          name="description" 
          content={`Profilo di ${trainer.nome}, Personal Trainer specializzato in ${trainer.specializzazioni.join(', ')}. ${trainer.esperienza} di esperienza, rating ${trainer.rating}/5.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${trainer.nome} - Personal Trainer | Best-Trainer`} />
        <meta property="og:description" content={trainer.descrizione} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={trainer.immagine} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://best-trainer-mvp.vercel.app/professionisti/${slug}`} />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-2xl font-bold">
                  Best-Trainer <span className="text-blue-400">BETA</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href="/programmi" className="hover:text-blue-400 transition-colors">
                    Programmi
                  </Link>
                  <Link href="/professionisti" className="text-blue-400 font-medium">
                    Professionisti
                  </Link>
                  <Link href="/tutorial-esercizi" className="hover:text-blue-400 transition-colors">
                    Tutorial Esercizi
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/login"
                  className="hover:text-blue-400 transition-colors"
                >
                  Accedi
                </Link>
                
                {/* PT Network Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    PT Network
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3 text-blue-600" />
                        <div>
                          <div className="font-medium">Dashboard PT</div>
                          <div className="text-sm text-gray-500">Accesso con codice</div>
                        </div>
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <Link
                        href="/auth/pt-application"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 mr-3 text-green-600" />
                        <div>
                          <div className="font-medium">Richiedi Accesso</div>
                          <div className="text-sm text-gray-500">Unisciti alla community</div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/professionisti" className="text-blue-600 hover:text-blue-700 transition-colors">Professionisti</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{trainer.nome}</span>
            </div>
          </div>
        </div>

        {/* Hero Profile Section */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                {/* Immagine Profilo */}
                <div className="md:w-1/3 relative">
                  <img
                    src={trainer.immagine}
                    alt={trainer.nome}
                    className="w-full h-80 md:h-full object-cover"
                  />
                  <div className={`absolute top-4 left-4 ${getBadgeColor(trainer.badge)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {trainer.badge}
                  </div>
                  <div className={`absolute bottom-4 right-4 w-4 h-4 rounded-full ${trainer.disponibile ? 'bg-green-500' : 'bg-red-500'} border-2 border-white`}></div>
                </div>

                {/* Info Profilo */}
                <div className="md:w-2/3 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{trainer.nome}</h1>
                      {trainer.slogan && (
                        <p className="text-lg text-blue-600 font-medium italic mb-3">"{trainer.slogan}"</p>
                      )}
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-5 h-5 mr-2" />
                        {trainer.citta}
                        <span className="mx-3">•</span>
                        <Clock className="w-5 h-5 mr-2" />
                        {trainer.esperienza} di esperienza
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-6">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-semibold ml-1">{trainer.rating}</span>
                          <span className="text-gray-500 ml-1">({trainer.recensioni} recensioni)</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-gray-700">{trainer.programmiCreati} programmi</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`p-2 rounded-lg transition-colors ${isFollowing ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {trainer.descrizione}
                  </p>

                  {/* Specializzazioni */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {trainer.specializzazioni.map((spec, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Certificazioni */}
                  <div className="flex items-center mb-6">
                    <Award className="w-5 h-5 text-green-600 mr-3" />
                    <div className="flex gap-2">
                      {trainer.certificazioni.map((cert, index) => (
                        <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Focus Programmi */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Programmi Disponibili</div>
                      <div className="text-2xl font-bold text-blue-600">{trainer.programmiCreati}</div>
                      <div className="text-sm text-gray-600">Corsi di allenamento professionali</div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setActiveTab('programmi')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        Vedi Programmi
                      </button>
                      {trainer.contatti.email && (
                        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Contatta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Panoramica', icon: Target },
                { id: 'programmi', label: 'Programmi', icon: BookOpen },
                { id: 'recensioni', label: 'Recensioni', icon: Star },
                { id: 'contatti', label: 'Contatti', icon: Mail }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Colonna Principale */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Biografia */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Chi sono</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {trainer.biografiaCompleta}
                    </p>
                  </div>

                  {/* Metodologia */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">La Mia Metodologia</h3>
                    <div className="space-y-3">
                      {trainer.metodologia.map((metodo, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{metodo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Riconoscimenti</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {trainer.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl mr-3">{achievement.icon}</span>
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Stats Card */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Statistiche</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-gray-600">Anni esperienza</span>
                        </div>
                        <span className="font-semibold">{trainer.anniEsperienza}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BookOpen className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="text-gray-600">Programmi creati</span>
                        </div>
                        <span className="font-semibold">{trainer.programmiCreati}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-500 mr-2" />
                          <span className="text-gray-600">Rating medio</span>
                        </div>
                        <span className="font-semibold">{trainer.rating}/5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-gray-600">Recensioni</span>
                        </div>
                        <span className="font-semibold">{trainer.recensioni}</span>
                      </div>
                    </div>
                  </div>

                  {/* Garanzie */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Garanzie</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-700">Trainer certificato</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">Programmi testati</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm text-gray-700">Risultati garantiti</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'programmi' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Programmi di {trainer.nome}</h3>
                  <span className="text-gray-600">{programmi.length} programmi disponibili</span>
                </div>
                
                {programmi.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programmi.map((programma) => (
                      <div key={programma.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                        {programma.covertinaPreview ? (
                          <img
                            src={programma.covertinaPreview}
                            alt={programma.titolo}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        
                        <div className="p-6">
                          <h4 className="font-bold text-gray-900 mb-2">{programma.titolo}</h4>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Clock className="w-4 h-4 mr-1" />
                            {programma.durata}
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              {getContentTypeIcon(programma.tipoContenuto)}
                              <span className="ml-1">{getContentTypeLabel(programma.tipoContenuto)}</span>
                            </div>
                          </div>

                          {programma.descrizione && (
                            <p className="text-gray-600 text-sm mb-3">{programma.descrizione}</p>
                          )}

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-blue-600">€{programma.prezzo}</span>
                            {programma.rating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium ml-1">{programma.rating}</span>
                                {programma.numeroRecensioni && (
                                  <span className="text-sm text-gray-500 ml-1">({programma.numeroRecensioni})</span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <Link href={`/programmi/${programma.id}`}>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                              Vedi Dettagli
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessun programma disponibile</h3>
                    <p className="text-gray-600">Questo trainer non ha ancora pubblicato programmi.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recensioni' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Recensioni</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold ml-1">{trainer.rating}/5</span>
                    <span className="text-gray-500 ml-2">({trainer.recensioni} recensioni)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {recensioniRecenti.map((recensione) => (
                    <div key={recensione.id} className="bg-white rounded-xl shadow-sm border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {recensione.nome.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">{recensione.nome}</span>
                              {recensione.verificata && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                              )}
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < recensione.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">{recensione.data}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{recensione.commento}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contatti' && (
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Contatti</h3>
                
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {trainer.contatti.email && (
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium">{trainer.contatti.email}</div>
                        </div>
                      </div>
                    )}
                    
                    {trainer.contatti.telefono && (
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Telefono</div>
                          <div className="font-medium">{trainer.contatti.telefono}</div>
                        </div>
                      </div>
                    )}

                    {trainer.contatti.instagram && (
                      <div className="flex items-center">
                        <Instagram className="w-5 h-5 text-pink-600 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Instagram</div>
                          <div className="font-medium">{trainer.contatti.instagram}</div>
                        </div>
                      </div>
                    )}
                    
                    {trainer.contatti.website && (
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Website</div>
                          <div className="font-medium">{trainer.contatti.website}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <div className="flex space-x-4">
                      {trainer.contatti.email && (
                        <a 
                          href={`mailto:${trainer.contatti.email}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Invia Email
                        </a>
                      )}
                      <button 
                        onClick={() => setActiveTab('programmi')}
                        className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        Vedi Programmi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Scopri i Programmi di {trainer.nome} 💪
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Inizia subito il tuo percorso di trasformazione con programmi professionali
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setActiveTab('programmi')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Esplora Programmi
              </button>
              {trainer.contatti.email && (
                <a 
                  href={`mailto:${trainer.contatti.email}`}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contatta ora
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Back to Directory */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <Link
              href="/professionisti"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Directory Professionisti
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Best-Trainer</h3>
                <p className="text-gray-400 mb-4">
                  La piattaforma dei programmi fitness. Trasforma la tua passione per il fitness in risultati concreti.
                </p>
                <div className="flex space-x-4">
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Programmi</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/programmi?categoria=massa" className="hover:text-white transition-colors">Massa Muscolare</Link></li>
                  <li><Link href="/programmi?categoria=dimagrimento" className="hover:text-white transition-colors">Dimagrimento</Link></li>
                  <li><Link href="/programmi?categoria=forza" className="hover:text-white transition-colors">Forza e Potenza</Link></li>
                  <li><Link href="/programmi?categoria=cardio" className="hover:text-white transition-colors">Cardio</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Professionisti</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/professionisti" className="hover:text-white transition-colors">Trova Trainer</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard PT</Link></li>
                  <li><Link href="/auth/pt-application" className="hover:text-white transition-colors">Richiedi Accesso</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Supporto</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/help" className="hover:text-white transition-colors">Centro Aiuto</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contatti</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Termini</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-400 text-sm">
                  © 2024 Best-Trainer. Tutti i diritti riservati.
                </p>
                <div className="flex items-center mt-4 md:mt-0">
                  <span className="text-gray-400 text-sm mr-4">Seguici anche su:</span>
                  <Link href="https://www.facebook.com/BestTrainerNetwork" className="text-blue-400 hover:text-blue-300 text-sm">
                    Facebook Community 👥
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}