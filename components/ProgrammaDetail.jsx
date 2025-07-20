import React, { useState } from 'react';
import Link from 'next/link';
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
  ThumbsUp
} from 'lucide-react';

export default function ProgrammaDetail() {
  const [activeTab, setActiveTab] = useState('descrizione');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Dati del programma (in un'app reale verrebbero da props o API)
  const programma = {
    id: 1,
    titolo: "Programma Massa Muscolare Avanzato",
    sottotitolo: "12 settimane per trasformare il tuo fisico",
    prezzo: 79.99,
    prezzoOriginale: 119.99,
    rating: 4.8,
    numeroRecensioni: 324,
    numeroAcquisti: 1247,
    durata: "12 settimane",
    livello: "Avanzato",
    obiettivo: "Massa Muscolare",
    attrezzatura: "Palestra Completa",
    lingue: ["Italiano", "Inglese"],
    ultimoAggiornamento: "Dicembre 2024",
    trainer: {
      nome: "Marco Rossi",
      username: "marcorossifitness",
      foto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
      specializzazioni: ["Bodybuilding", "Powerlifting"],
      anniEsperienza: 8,
      certificazioni: ["NASM-CPT", "FIPE"],
      rating: 4.9,
      numeroStudenti: 2847,
      bio: "Personal Trainer specializzato in ipertrofia muscolare con 8 anni di esperienza. Campione regionale di powerlifting."
    },
    immagini: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583500178690-f7e6a7c0ea54?w=800&h=600&fit=crop"
    ],
    descrizione: `Un programma completo di 12 settimane progettato per massimizzare l'ipertrofia muscolare. 
    
Questo non è il solito programma generalista: ogni fase è stata scientificamente calibrata per ottimizzare la crescita muscolare attraverso periodizzazione lineare e tecniche avanzate di intensificazione.

**Cosa include:**
• 84 allenamenti dettagliati (7 a settimana x 12 settimane)
• Video tutorial per ogni esercizio
• Schede di allenamento scaricabili
• Piano nutrizionale specifico per la massa
• Tracker progressi personalizzato
• Supporto WhatsApp diretto con il trainer

**Risultati attesi:**
• +3-5kg di massa muscolare magra
• +15-25% di forza sui fondamentali
• Definizione muscolare migliorata
• Metabolismo accelerato`,
    
    contenuti: [
      { tipo: "Video", numero: 45, descrizione: "Tutorial esercizi e spiegazioni tecniche" },
      { tipo: "PDF", numero: 12, descrizione: "Schede allenamento e piani nutrizionali" },
      { tipo: "Audio", numero: 8, descrizione: "Motivazione e mindset" },
      { tipo: "Tracker", numero: 5, descrizione: "Fogli di calcolo per monitorare progressi" }
    ],
    
    struttura: [
      {
        fase: "Fase 1: Adattamento",
        settimane: "1-3",
        focus: "Preparazione muscolare e articolare",
        allenamenti: 21,
        caratteristiche: ["Volume moderato", "Focus sulla tecnica", "Adattamento neurologico"]
      },
      {
        fase: "Fase 2: Sviluppo",
        settimane: "4-8",
        focus: "Massima ipertrofia muscolare",
        allenamenti: 35,
        caratteristiche: ["Volume alto", "Intensità crescente", "Tecniche avanzate"]
      },
      {
        fase: "Fase 3: Intensificazione",
        settimane: "9-12",
        focus: "Consolidamento e definizione",
        allenamenti: 28,
        caratteristiche: ["Intensità massima", "Volume ottimizzato", "Peak muscolare"]
      }
    ]
  };

  const recensioni = [
    {
      id: 1,
      utente: "Alessandro M.",
      rating: 5,
      data: "2 settimane fa",
      testo: "Programma fantastico! In 12 settimane ho messo su 4kg di massa pulita. Le spiegazioni di Marco sono chiarissime e il supporto WhatsApp è stato fondamentale.",
      verificato: true,
      likes: 23
    },
    {
      id: 2,
      utente: "Giulia R.",
      rating: 5,
      data: "1 mese fa",
      testo: "Primo programma che completo dall'inizio alla fine. La progressione è perfetta e i risultati si vedono settimana dopo settimana. Consigliatissimo!",
      verificato: true,
      likes: 18
    },
    {
      id: 3,
      utente: "Luca B.",
      rating: 4,
      data: "1 mese fa",
      testo: "Ottimo programma, ben strutturato. L'unica pecca è che richiede davvero dedizione e costanza, ma i risultati ripagano tutto l'impegno.",
      verificato: true,
      likes: 12
    }
  ];

  const programmiCorrelati = [
    {
      id: 2,
      titolo: "Definizione Estiva",
      trainer: "Marco Rossi",
      prezzo: 69.99,
      rating: 4.7,
      immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      titolo: "Forza Esplosiva",
      trainer: "Marco Rossi", 
      prezzo: 89.99,
      rating: 4.9,
      immagine: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === programma.immagini.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? programma.immagini.length - 1 : prev - 1
    );
  };

  const tabs = [
    { id: 'descrizione', label: 'Descrizione', icon: Eye },
    { id: 'contenuti', label: 'Contenuti', icon: Download },
    { id: 'struttura', label: 'Struttura', icon: Target },
    { id: 'recensioni', label: 'Recensioni', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/programmi" className="hover:text-blue-600">Programmi</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Massa Muscolare</span>
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
                  src={programma.immagini[currentImageIndex]}
                  alt={programma.titolo}
                  className="w-full h-80 object-cover"
                />
                
                {/* Navigation arrows */}
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
                  {programma.immagini.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 flex space-x-3">
                {programma.immagini.map((img, index) => (
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
            </div>

            {/* Header Programma */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {programma.titolo}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {programma.sottotitolo}
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(programma.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">{programma.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({programma.numeroRecensioni} recensioni)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {programma.numeroAcquisti} studenti
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Clock className="w-3 h-3 mr-1" />
                      {programma.durata}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {programma.livello}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Target className="w-3 h-3 mr-1" />
                      {programma.obiettivo}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <Dumbbell className="w-3 h-3 mr-1" />
                      {programma.attrezzatura}
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
                            {programma.numeroRecensioni}
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
                      {programma.descrizione}
                    </div>
                  </div>
                )}

                {activeTab === 'contenuti' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Cosa è incluso nel programma
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {programma.contenuti.map((contenuto, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-lg mr-4">
                            <Download className="w-5 h-5 text-blue-600" />
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
                    {programma.struttura.map((fase, index) => (
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
                          <span className="ml-1 text-lg font-semibold">{programma.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {programma.numeroRecensioni} recensioni
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
            {/* Purchase Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    €{programma.prezzo}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    €{programma.prezzoOriginale}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    -33%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Accesso a vita • Aggiornamenti gratuiti
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center">
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
                  <span>Aggiornato {programma.ultimoAggiornamento}</span>
                </div>
              </div>
            </div>

            {/* Trainer Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Il tuo Trainer
              </h3>
              
              <Link 
                href={`/personal-trainer/${programma.trainer.username}`}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors group"
              >
                <img
                  src={programma.trainer.foto}
                  alt={programma.trainer.nome}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {programma.trainer.nome}
                  </h4>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{programma.trainer.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {programma.trainer.numeroStudenti} studenti
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {programma.trainer.specializzazioni.map((spec) => (
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
                  <span className="font-medium">{programma.trainer.anniEsperienza} anni</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Certificazioni:</span>
                  <div className="flex space-x-1">
                    {programma.trainer.certificazioni.map((cert) => (
                      <span
                        key={cert}
                        className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Programmi Correlati */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Altri programmi di {programma.trainer.nome}
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