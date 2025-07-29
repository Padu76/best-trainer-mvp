import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProgramCheckout from './ProgramCheckout';
import { 
  Star, 
  Clock, 
  Users, 
  Target, 
  Download, 
  Heart,
  Share2,
  Play,
  Award,
  CheckCircle,
  User,
  Calendar,
  Dumbbell,
  TrendingUp,
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  ThumbsUp,
  Home,
  FileText,
  Video,
  AlertCircle
} from 'lucide-react';

export default function ProgrammaDetail({ programData }) {
  const [activeTab, setActiveTab] = useState('descrizione');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [trainerData, setTrainerData] = useState(null);
  
  // Mock user - In un'app reale verrà da context/session
  const currentUser = {
    id: 'user_123',
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario.rossi@email.com'
  };

  // Carica i dati del trainer dal localStorage se è un programma reale
  useEffect(() => {
    if (programData && !programData.isMock && programData.trainer?.id) {
      const savedProfiles = localStorage.getItem('bt_profile_data');
      if (savedProfiles) {
        try {
          const profiles = JSON.parse(savedProfiles);
          const trainerProfile = Array.isArray(profiles) 
            ? profiles.find(p => p.id === programData.trainer.id)
            : profiles.id === programData.trainer.id ? profiles : null;
          
          if (trainerProfile) {
            setTrainerData({
              ...trainerProfile,
              // Assicurati che abbia i campi necessari
              rating: trainerProfile.rating || 4.5,
              numeroStudenti: trainerProfile.numeroStudenti || 0,
              anniEsperienza: trainerProfile.anniEsperienza || 1,
              certificazioni: trainerProfile.certificazioni || [],
              specializzazioni: trainerProfile.specializzazioni || []
            });
          }
        } catch (error) {
          console.error('Errore caricamento profilo trainer:', error);
        }
      }
    }
  }, [programData]);

  // Dati del programma - usa props se disponibili, altrimenti mock
  const programma = programData || {
    id: 'prog_001',
    titolo: "Programma Massa Muscolare Avanzato",
    sottotitolo: "12 settimane per trasformare il tuo fisico",
    prezzo: 79.99,
    prezzoOriginale: 119.99,
    rating: 4.8,
    numeroRecensioni: 324,
    numeroAcquisti: 1247,
    durata: "12 settimane",
    livello: "Avanzato",
    categoria: "Massa Muscolare",
    obiettivo: "Massa Muscolare",
    attrezzatura: "Palestra Completa",
    lingue: ["Italiano", "Inglese"],
    ultimoAggiornamento: "Dicembre 2024",
    descrizione: "Un programma completo per massimizzare l'ipertrofia muscolare in 12 settimane.",
    trainer: {
      id: 'pt_001',
      nome: "Marco Rossi",
      username: "marcorossifitness",
      foto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
      specializzazioni: ["Bodybuilding", "Powerlifting"],
      anniEsperienza: 8,
      certificazioni: ["NASM-CPT", "FIFE"],
      rating: 4.9,
      numeroStudenti: 2847,
      bio: "Personal Trainer specializzato in ipertrofia muscolare con 8 anni di esperienza."
    },
    immagini: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583500178690-f7e6a7c0ea54?w=800&h=600&fit=crop"
    ],
    isMock: true
  };

  // Trasforma i dati del trainer reale se disponibile
  const trainerInfo = trainerData ? {
    id: trainerData.id || programma.trainer?.id,
    nome: `${trainerData.nome} ${trainerData.cognome}`.trim() || programma.trainer?.nome,
    username: trainerData.username || programma.trainer?.username || 'trainer',
    foto: trainerData.fotoProfiloUrl || programma.trainer?.foto,
    specializzazioni: trainerData.specializzazioni || programma.trainer?.specializzazioni || [],
    anniEsperienza: trainerData.anniEsperienza || programma.trainer?.anniEsperienza || 1,
    certificazioni: trainerData.certificazioni || programma.trainer?.certificazioni || [],
    rating: trainerData.rating || programma.trainer?.rating || 4.5,
    numeroStudenti: trainerData.numeroStudenti || programma.trainer?.numeroStudenti || 0,
    bio: trainerData.bio || programma.trainer?.bio || 'Personal Trainer professionale'
  } : programma.trainer;

  // Normalizza i dati del programma per avere tutti i campi necessari
  const programNormalized = {
    ...programma,
    // Assicurati che abbia tutti i campi necessari
    sottotitolo: programma.sottotitolo || programma.descrizione?.substring(0, 100) + '...' || 'Programma di allenamento professionale',
    prezzoOriginale: programma.prezzoOriginale || (programma.prezzo * 1.5),
    rating: programma.rating || 0,
    numeroRecensioni: programma.numeroRecensioni || 0,
    numeroAcquisti: programma.vendite || programma.numeroAcquisti || 0,
    durata: programma.durata || '8 settimane',
    livello: programma.livello || 'Intermedio',
    obiettivo: programma.categoria || programma.obiettivo || 'Fitness',
    attrezzatura: programma.attrezzatura || 'Palestra',
    lingue: programma.lingue || ["Italiano"],
    ultimoAggiornamento: programma.dataCreazione ? 
      new Date(programma.dataCreazione).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }) :
      'Recente',
    // Gestisci le immagini
    immagini: programma.covertinaPreview ? 
      [programma.covertinaPreview, programma.covertinaPreview, programma.covertinaPreview] :
      [
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
      ],
    trainer: trainerInfo
  };

  // Contenuti dinamici basati sul tipo di programma
  const getContenuti = () => {
    const baseContenuti = [
      { tipo: "PDF", numero: 8, descrizione: "Schede allenamento dettagliate" },
      { tipo: "Tracker", numero: 3, descrizione: "Fogli di calcolo per progressi" }
    ];

    if (programma.tipoContenuto === 'video') {
      return [
        { tipo: "Video", numero: 25, descrizione: "Tutorial esercizi e spiegazioni tecniche" },
        ...baseContenuti
      ];
    } else if (programma.tipoContenuto === 'misto') {
      return [
        { tipo: "Video", numero: 15, descrizione: "Tutorial esercizi principali" },
        ...baseContenuti,
        { tipo: "Audio", numero: 5, descrizione: "Motivazione e consigli" }
      ];
    } else {
      return baseContenuti;
    }
  };

  // Struttura dinamica del programma
  const getStruttura = () => {
    const durataSettimane = parseInt(programma.durata) || 8;
    const fase1 = Math.ceil(durataSettimane / 3);
    const fase2 = Math.ceil(durataSettimane / 2);
    const fase3 = durataSettimane - fase2;

    return [
      {
        fase: "Fase 1: Adattamento",
        settimane: `1-${fase1}`,
        focus: "Preparazione e tecnica di base",
        allenamenti: fase1 * 5,
        caratteristiche: ["Volume moderato", "Focus sulla tecnica", "Adattamento"]
      },
      {
        fase: "Fase 2: Sviluppo",
        settimane: `${fase1 + 1}-${fase2}`,
        focus: `Sviluppo ${programma.categoria?.toLowerCase() || 'obiettivi'}`,
        allenamenti: (fase2 - fase1) * 5,
        caratteristiche: ["Volume crescente", "Intensità ottimizzata", "Progressione"]
      },
      ...(durataSettimane > 6 ? [{
        fase: "Fase 3: Intensificazione",
        settimane: `${fase2 + 1}-${durataSettimane}`,
        focus: "Consolidamento risultati",
        allenamenti: fase3 * 5,
        caratteristiche: ["Intensità massima", "Risultati visibili", "Mantenimento"]
      }] : [])
    ];
  };

  const recensioni = [
    {
      id: 1,
      utente: "Alessandro M.",
      rating: 5,
      data: "2 settimane fa",
      testo: `Programma fantastico! Molto ben strutturato e i risultati si vedono. ${trainerInfo.nome} è sempre disponibile per chiarimenti.`,
      verificato: true,
      likes: 23
    },
    {
      id: 2,
      utente: "Giulia R.",
      rating: 5,
      data: "1 mese fa",
      testo: "Primo programma che completo dall'inizio alla fine. La progressione è perfetta e molto motivante!",
      verificato: true,
      likes: 18
    },
    {
      id: 3,
      utente: "Luca B.",
      rating: 4,
      data: "1 mese fa",
      testo: "Ottimo programma, ben strutturato. Richiede dedizione ma i risultati ripagano tutto l'impegno.",
      verificato: true,
      likes: 12
    }
  ];

  const programmiCorrelati = [
    {
      id: 2,
      titolo: "Programma Definizione",
      trainer: trainerInfo.nome,
      prezzo: (programma.prezzo * 0.8).toFixed(2),
      rating: 4.7,
      immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      titolo: "Allenamento Funzionale", 
      trainer: trainerInfo.nome,
      prezzo: (programma.prezzo * 1.2).toFixed(2),
      rating: 4.6,
      immagine: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === programNormalized.immagini.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? programNormalized.immagini.length - 1 : prev - 1
    );
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    // Reindirizzamento gestito dal componente checkout
  };

  const tabs = [
    { id: 'descrizione', label: 'Descrizione', icon: Eye },
    { id: 'contenuti', label: 'Contenuti', icon: Download },
    { id: 'struttura', label: 'Struttura', icon: Target },
    { id: 'recensioni', label: 'Recensioni', icon: MessageCircle }
  ];

  // Debug info (solo sviluppo)
  const debugInfo = programData ? {
    isRealProgram: !programData.isMock,
    hasTrainerData: !!trainerData,
    programId: programData.id,
    trainerId: programData.trainer?.id,
    trainerName: trainerInfo?.nome
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug Info (solo in sviluppo) */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="bg-yellow-50 border border-yellow-200 p-3">
          <details className="text-xs text-yellow-800">
            <summary className="cursor-pointer font-medium flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Debug Info Programma (solo sviluppo)
            </summary>
            <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
          </details>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <Link href="/programmi" className="hover:text-blue-600">Programmi</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {programNormalized.categoria || 'Fitness'}
            </span>
            {!programNormalized.isMock && (
              <>
                <span>/</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  PT Verified
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenuto Principale */}
          <div className="lg:col-span-2">
            {/* Gallery Immagini */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={programNormalized.immagini[currentImageIndex]}
                  alt={programNormalized.titolo}
                  className="w-full h-80 object-cover"
                />
                
                {/* Navigation arrows */}
                {programNormalized.immagini.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {programNormalized.immagini.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badge tipo programma */}
                <div className="absolute top-4 left-4">
                  {programNormalized.isMock ? (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Demo
                    </span>
                  ) : (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      PT Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {programNormalized.immagini.length > 1 && (
                <div className="p-4 flex space-x-3">
                  {programNormalized.immagini.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header Programma */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {programNormalized.titolo}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {programNormalized.sottotitolo}
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(programNormalized.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">{programNormalized.rating.toFixed(1)}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({programNormalized.numeroRecensioni} recensioni)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {programNormalized.numeroAcquisti} studenti
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Clock className="w-3 h-3 mr-1" />
                      {programNormalized.durata}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {programNormalized.livello}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Target className="w-3 h-3 mr-1" />
                      {programNormalized.obiettivo}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <Dumbbell className="w-3 h-3 mr-1" />
                      {programNormalized.attrezzatura}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 ml-6">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-full border-2 transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Tab Headers */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                        {tab.id === 'recensioni' && (
                          <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {programNormalized.numeroRecensioni}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'descrizione' && (
                  <div className="prose max-w-none">
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {programNormalized.descrizione}
                    </div>
                  </div>
                )}

                {activeTab === 'contenuti' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Cosa è incluso nel programma
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {getContenuti().map((contenuto, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-lg mr-4">
                            {contenuto.tipo === 'Video' ? (
                              <Video className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Download className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {contenuto.numero} {contenuto.tipo}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {contenuto.descrizione}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'struttura' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Struttura del programma
                    </h3>
                    {getStruttura().map((fase, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {fase.fase}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Settimane {fase.settimane}</span>
                            <span>{fase.allenamenti} allenamenti</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{fase.focus}</p>
                        <div className="flex flex-wrap gap-2">
                          {fase.caratteristiche.map((caratteristica, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {caratteristica}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'recensioni' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recensioni degli studenti
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 text-lg font-semibold">{programNormalized.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {programNormalized.numeroRecensioni} recensioni
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {recensioni.map((recensione) => (
                        <div key={recensione.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-900">
                                    {recensione.utente}
                                  </span>
                                  {recensione.verificato && (
                                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                                  )}
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < recensione.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500 ml-2">
                                    {recensione.data}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{recensione.testo}</p>
                          <div className="flex items-center">
                            <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Utile ({recensione.likes})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Purchase Card con Checkout integrato */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 sticky top-6">
              {!showCheckout ? (
                // Vista normale con prezzi e pulsanti
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        €{parseFloat(programNormalized.prezzo).toFixed(2)}
                      </span>
                      {programNormalized.prezzoOriginale > programNormalized.prezzo && (
                        <>
                          <span className="text-lg text-gray-500 line-through ml-2">
                            €{parseFloat(programNormalized.prezzoOriginale).toFixed(2)}
                          </span>
                          <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                            -33%
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Accesso a vita • Aggiornamenti gratuiti
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      Acquista Ora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                    <button className="w-full border-2 border-gray-200 text-gray-700 font-medium py-4 px-6 rounded-lg hover:border-blue-200 hover:text-blue-600 transition-colors">
                      Aggiungi al Carrello
                    </button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-green-600 mr-2" />
                      <span>Garanzia soddisfatti o rimborsati 30 giorni</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 text-blue-600 mr-2" />
                      <span>Download immediato dopo l'acquisto</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                      <span>Aggiornato {programNormalized.ultimoAggiornamento}</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Vista checkout
                <div className="p-4">
                  <div className="mb-4">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Torna indietro
                    </button>
                  </div>
                  <ProgramCheckout
                    program={{
                      id: programNormalized.id,
                      title: programNormalized.titolo,
                      price: parseFloat(programNormalized.prezzo),
                      description: programNormalized.sottotitolo
                    }}
                    pt={{
                      id: trainerInfo.id,
                      name: trainerInfo.nome
                    }}
                    user={currentUser}
                    onSuccess={handleCheckoutSuccess}
                  />
                </div>
              )}
            </div>

            {/* Trainer Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Il tuo Trainer
              </h3>
              
              <Link 
                href={`/professionisti/${trainerInfo.username || trainerInfo.id}`}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {trainerInfo.foto ? (
                    <img
                      src={trainerInfo.foto}
                      alt={trainerInfo.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {trainerInfo.nome}
                  </h4>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{trainerInfo.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {trainerInfo.numeroStudenti} studenti
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {trainerInfo.specializzazioni.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Esperienza:</span>
                  <span className="font-medium">{trainerInfo.anniEsperienza} anni</span>
                </div>
                {trainerInfo.certificazioni.length > 0 && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600">Certificazioni:</span>
                    <div className="flex space-x-1">
                      {trainerInfo.certificazioni.slice(0, 2).map((cert) => (
                        <span
                          key={cert}
                          className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Programmi Correlati */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Altri programmi di {trainerInfo.nome}
              </h3>
              <div className="space-y-4">
                {programmiCorrelati.map((prog) => (
                  <Link
                    key={prog.id}
                    href={`/programmi/${prog.id}`}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors group"
                  >
                    <img
                      src={prog.immagine}
                      alt={prog.titolo}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                        {prog.titolo}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium ml-1">{prog.rating}</span>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">
                          €{prog.prezzo}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}