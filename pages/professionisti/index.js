import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  Award, 
  ChevronRight,
  Clock,
  CheckCircle,
  Heart,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  ChevronDown,
  User,
  UserPlus,
  AlertCircle,
  Home
} from 'lucide-react';

export default function ProfessionistiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('tutti');
  const [selectedCity, setSelectedCity] = useState('tutte');
  const [selectedRating, setSelectedRating] = useState('tutti');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [personalTrainers, setPersonalTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  const specializzazioni = [
    { id: 'tutti', label: 'Tutte le Specializzazioni', emoji: '🏆' },
    { id: 'palestra', label: 'Palestra & Fitness', emoji: '💪' },
    { id: 'massa', label: 'Massa Muscolare', emoji: '🏋️' },
    { id: 'dimagrimento', label: 'Dimagrimento', emoji: '🔥' },
    { id: 'forza', label: 'Forza & Potenza', emoji: '⚡' },
    { id: 'cardio', label: 'Cardio & Resistenza', emoji: '❤️' },
    { id: 'functional', label: 'Functional Training', emoji: '🤸' },
    { id: 'yoga', label: 'Yoga & Stretching', emoji: '🧘' },
    { id: 'corsa', label: 'Corsa & Running', emoji: '🏃' },
    { id: 'home', label: 'Home Workout', emoji: '🏠' },
    { id: 'ciclismo', label: 'Ciclismo', emoji: '🚴' },
    { id: 'nuoto', label: 'Nuoto', emoji: '🏊' },
    { id: 'arti_marziali', label: 'Arti Marziali', emoji: '🥋' },
    { id: 'preparazione', label: 'Preparazione Atletica', emoji: '🎯' },
    { id: 'preparazione_militare', label: 'Preparazione Militare', emoji: '🪖' },
    { id: 'crossfit', label: 'CrossFit', emoji: '🏋️‍♀️' },
    { id: 'pilates', label: 'Pilates', emoji: '🤸‍♀️' },
    { id: 'danza', label: 'Danza & Ballo', emoji: '💃' },
    { id: 'boxe', label: 'Boxe & Kickboxing', emoji: '🥊' },
    { id: 'tennis', label: 'Tennis', emoji: '🎾' },
    { id: 'calcio', label: 'Calcio', emoji: '⚽' },
    { id: 'basket', label: 'Basket', emoji: '🏀' },
    { id: 'pallavolo', label: 'Pallavolo', emoji: '🏐' },
    { id: 'riabilitazione', label: 'Riabilitazione', emoji: '🩺' },
    { id: 'postura', label: 'Postura & Benessere', emoji: '🧘‍♂️' },
    { id: 'terza_eta', label: 'Terza Età', emoji: '👴' },
    { id: 'gravidanza', label: 'Gravidanza & Post Parto', emoji: '🤰' },
    // Specializzazioni dalla dashboard PT
    { id: 'bodybuilding', label: 'Bodybuilding', emoji: '💪' },
    { id: 'powerlifting', label: 'Powerlifting', emoji: '🏋️' },
    { id: 'tonificazione', label: 'Tonificazione', emoji: '✨' },
    { id: 'endurance', label: 'Endurance', emoji: '🏃‍♂️' },
    { id: 'alimentazione', label: 'Alimentazione', emoji: '🥗' },
    { id: 'triathlon', label: 'Triathlon', emoji: '🏊‍♀️' }
  ];

  const citta = [
    { id: 'tutte', label: 'Tutte le Città' },
    { id: 'milano', label: 'Milano' },
    { id: 'roma', label: 'Roma' },
    { id: 'napoli', label: 'Napoli' },
    { id: 'torino', label: 'Torino' },
    { id: 'palermo', label: 'Palermo' },
    { id: 'genova', label: 'Genova' },
    { id: 'bologna', label: 'Bologna' },
    { id: 'firenze', label: 'Firenze' },
    { id: 'bari', label: 'Bari' },
    { id: 'catania', label: 'Catania' },
    { id: 'venezia', label: 'Venezia' },
    { id: 'verona', label: 'Verona' },
    { id: 'messina', label: 'Messina' },
    { id: 'padova', label: 'Padova' },
    { id: 'trieste', label: 'Trieste' },
    { id: 'brescia', label: 'Brescia' },
    { id: 'taranto', label: 'Taranto' },
    { id: 'prato', label: 'Prato' },
    { id: 'reggio_calabria', label: 'Reggio Calabria' },
    { id: 'modena', label: 'Modena' },
    { id: 'reggio_emilia', label: 'Reggio Emilia' },
    { id: 'perugia', label: 'Perugia' },
    { id: 'ravenna', label: 'Ravenna' },
    { id: 'livorno', label: 'Livorno' },
    { id: 'cagliari', label: 'Cagliari' },
    { id: 'foggia', label: 'Foggia' },
    { id: 'rimini', label: 'Rimini' },
    { id: 'salerno', label: 'Salerno' },
    { id: 'ferrara', label: 'Ferrara' },
    { id: 'sassari', label: 'Sassari' },
    { id: 'latina', label: 'Latina' },
    { id: 'giugliano', label: 'Giugliano in Campania' },
    { id: 'monza', label: 'Monza' },
    { id: 'siracusa', label: 'Siracusa' },
    { id: 'pescara', label: 'Pescara' },
    { id: 'bergamo', label: 'Bergamo' },
    { id: 'forlì', label: 'Forlì' },
    { id: 'trento', label: 'Trento' },
    { id: 'vicenza', label: 'Vicenza' },
    { id: 'terni', label: 'Terni' },
    { id: 'bolzano', label: 'Bolzano' },
    { id: 'novara', label: 'Novara' },
    { id: 'piacenza', label: 'Piacenza' },
    { id: 'ancona', label: 'Ancona' },
    { id: 'lecce', label: 'Lecce' },
    { id: 'udine', label: 'Udine' },
    { id: 'cesena', label: 'Cesena' },
    { id: 'pesaro', label: 'Pesaro' },
    { id: 'como', label: 'Como' },
    { id: 'la_spezia', label: 'La Spezia' },
    { id: 'brindisi', label: 'Brindisi' },
    { id: 'online', label: 'Online' },
    { id: 'estero', label: 'Estero' }
  ];

  // Carica profili reali dalla dashboard PT + profili mock
  useEffect(() => {
    const loadTrainers = () => {
      setLoading(true);
      let debugMessages = [];
      
      try {
        // Carica profili reali dalla dashboard PT
        const savedProfiles = localStorage.getItem('bt_profile_data');
        debugMessages.push(`LocalStorage bt_profile_data: ${savedProfiles ? 'TROVATO' : 'NON TROVATO'}`);
        
        let realTrainers = [];
        
        if (savedProfiles) {
          try {
            const parsedProfile = JSON.parse(savedProfiles);
            debugMessages.push(`Profilo PT parsato: ${parsedProfile.nome ? 'VALIDO' : 'INVALIDO'}`);
            
            if (parsedProfile.nome) {
              // Trasforma il profilo PT in formato trainer per la pagina pubblica
              const trainer = {
                id: `pt_real_${Date.now()}`,
                nome: parsedProfile.nome + (parsedProfile.cognome ? ` ${parsedProfile.cognome}` : ''),
                specializzazioni: (parsedProfile.specializzazioni || []).map(spec => 
                  spec.toLowerCase().replace(/\s+/g, '_')
                ),
                citta: parsedProfile.citta ? parsedProfile.citta.toLowerCase() : 'online',
                rating: 4.8, // Rating di default per PT reali
                recensioni: Math.floor(Math.random() * 50) + 10, // Random tra 10-60
                programmiCreati: Math.floor(Math.random() * 10) + 3, // Random tra 3-13
                esperienza: parsedProfile.anniEsperienza ? `${parsedProfile.anniEsperienza} anni` : '1 anno',
                certificazioni: parsedProfile.certificazioni || ['Certificato'],
                prezzo: parsedProfile.prezzoMedioOra ? `€${parsedProfile.prezzoMedioOra-10}-${parsedProfile.prezzoMedioOra}/ora` : '€40-60/ora',
                descrizione: parsedProfile.bio || 'Personal Trainer professionale specializzato nel raggiungimento dei tuoi obiettivi.',
                immagine: parsedProfile.fotoProfile || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&face=center',
                disponibile: true,
                badge: "PT Verificato",
                isReal: true, // Flag per distinguere dai mock
                email: parsedProfile.email,
                telefono: parsedProfile.telefono,
                slogan: parsedProfile.slogan,
                instagram: parsedProfile.instagram,
                sitoWeb: parsedProfile.sitoWeb,
                disponibilitaOnline: parsedProfile.disponibilitaOnline !== false,
                disponibilitaPresenza: parsedProfile.disponibilitaPresenza !== false
              };
              
              realTrainers = [trainer];
              debugMessages.push(`Trainer reale creato: ${trainer.nome} - Città: ${trainer.citta} - Spec: ${trainer.specializzazioni.join(', ')}`);
            }
          } catch (parseError) {
            debugMessages.push(`Errore parsing profilo PT: ${parseError.message}`);
          }
        }

        // Profili mock per demo
        const mockTrainers = [
          {
            id: 1,
            nome: "Marco Rossi",
            specializzazioni: ["massa", "forza"],
            citta: "milano",
            rating: 4.9,
            recensioni: 127,
            programmiCreati: 12,
            esperienza: "8 anni",
            certificazioni: ["CONI", "FIPE"],
            prezzo: "€60-80/ora",
            descrizione: "Specialista in powerlifting e massa muscolare. Preparatore di atleti agonisti.",
            immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&face=center",
            disponibile: true,
            badge: "Top Rated",
            isMock: true
          },
          {
            id: 2,
            nome: "Sofia Bianchi",
            specializzazioni: ["dimagrimento", "cardio"],
            citta: "roma",
            rating: 4.8,
            recensioni: 94,
            programmiCreati: 8,
            esperienza: "6 anni",
            certificazioni: ["NASM", "ASI"],
            prezzo: "€50-70/ora",
            descrizione: "Esperta in trasformazione corporea e nutrizione sportiva.",
            immagine: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=300&h=300&fit=crop&face=center",
            disponibile: true,
            badge: "Verified",
            isMock: true
          },
          {
            id: 3,
            nome: "Andrea Verdi",
            specializzazioni: ["functional", "preparazione"],
            citta: "torino",
            rating: 4.7,
            recensioni: 82,
            programmiCreati: 15,
            esperienza: "10 anni",
            certificazioni: ["CONI", "ISSA"],
            prezzo: "€70-90/ora",
            descrizione: "Coach di atleti professionisti, specialista in functional training.",
            immagine: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=300&h=300&fit=crop&face=center",
            disponibile: false,
            badge: "Pro",
            isMock: true
          },
          {
            id: 4,
            nome: "Elena Russo",
            specializzazioni: ["yoga", "riabilitazione"],
            citta: "firenze",
            rating: 4.9,
            recensioni: 156,
            programmiCreati: 6,
            esperienza: "12 anni",
            certificazioni: ["RYT", "ACSM"],
            prezzo: "€40-60/ora",
            descrizione: "Istruttrice yoga certificata e fisioterapista specializzata.",
            immagine: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&fit=crop&face=center",
            disponibile: true,
            badge: "Expert",
            isMock: true
          },
          {
            id: 5,
            nome: "Matteo Online",
            specializzazioni: ["forza", "preparazione"],
            citta: "online",
            rating: 4.9,
            recensioni: 203,
            programmiCreati: 18,
            esperienza: "9 anni",
            certificazioni: ["CONI", "NSCA"],
            prezzo: "€35-55/ora",
            descrizione: "Coach online specializzato in powerlifting e preparazione agonistica.",
            immagine: "https://images.unsplash.com/photo-1583500178690-f7e6a7c0ea54?w=300&h=300&fit=crop&face=center",
            disponibile: true,
            badge: "Digital Expert",
            isMock: true
          }
        ];

        // Combina trainer reali e mock
        const allTrainers = [...realTrainers, ...mockTrainers];
        
        setPersonalTrainers(allTrainers);
        debugMessages.push(`Trainer totali caricati: ${allTrainers.length} (${realTrainers.length} reali, ${mockTrainers.length} mock)`);
        
        setDebugInfo(debugMessages.join('\n'));
        console.log('DEBUG PROFESSIONISTI:', debugMessages.join('\n'));
        
      } catch (error) {
        console.error('Errore nel caricamento trainer:', error);
        debugMessages.push(`ERRORE: ${error.message}`);
        setDebugInfo(debugMessages.join('\n'));
        // Fallback ai soli mock in caso di errore
        setPersonalTrainers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTrainers();

    // Ricarica ogni 30 secondi per sincronizzare con la dashboard PT
    const interval = setInterval(loadTrainers, 30000);
    return () => clearInterval(interval);
  }, []);

  const trainersFiltered = personalTrainers.filter(trainer => {
    const matchSearch = trainer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       trainer.descrizione.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecialization = selectedSpecialization === 'tutti' || 
                               trainer.specializzazioni.includes(selectedSpecialization);
    const matchCity = selectedCity === 'tutte' || trainer.citta === selectedCity;
    const matchRating = selectedRating === 'tutti' || 
                       (selectedRating === '4.5+' && trainer.rating >= 4.5) ||
                       (selectedRating === '4.0+' && trainer.rating >= 4.0);
    
    return matchSearch && matchSpecialization && matchCity && matchRating;
  });

  const getBadgeColor = (badge) => {
    const colors = {
      'Top Rated': 'bg-yellow-500',
      'Verified': 'bg-green-500',
      'Pro': 'bg-purple-500',
      'Expert': 'bg-blue-500',
      'Rising Star': 'bg-orange-500',
      'Digital Expert': 'bg-cyan-500',
      'Wellness': 'bg-pink-500',
      'Aqua Expert': 'bg-blue-600',
      'Combat Pro': 'bg-red-500',
      'Home Trainer': 'bg-green-600',
      'Cycling Pro': 'bg-yellow-600',
      'PT Verificato': 'bg-purple-600'
    };
    return colors[badge] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento professionisti...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Professionisti - Best-Trainer | Directory Personal Trainer Certificati</title>
        <meta 
          name="description" 
          content="Trova il Personal Trainer perfetto per i tuoi obiettivi. Directory completa di professionisti certificati con specializzazioni, recensioni e programmi di allenamento." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta 
          name="keywords" 
          content="personal trainer certificati, professionisti fitness, allenatori qualificati, specializzazioni fitness, directory trainer" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Professionisti - Directory Personal Trainer | Best-Trainer" />
        <meta property="og:description" content="Directory completa di Personal Trainer certificati. Trova il professionista perfetto per i tuoi obiettivi fitness." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://best-trainer-mvp.vercel.app/professionisti" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://best-trainer-mvp.vercel.app/professionisti" />
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

        {/* Navigation Header con Home Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-sm mb-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Professionisti</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Trova il Tuo <span className="text-blue-300">Professionista</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              <strong>Personal Trainer certificati</strong> e <strong>preparatori qualificati</strong> con 
              anni di esperienza e specializzazioni comprovate 🏆
            </p>
            
            {/* Debug Info (solo in sviluppo - rimuovi in produzione) */}
            {process.env.NODE_ENV === 'development' && debugInfo && (
              <details className="max-w-2xl mx-auto mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg text-left">
                <summary className="cursor-pointer text-blue-200 font-medium flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Debug Info (solo sviluppo)
                </summary>
                <pre className="text-xs text-blue-100 mt-2 whitespace-pre-wrap">{debugInfo}</pre>
              </details>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">{personalTrainers.length}+</div>
                <div className="text-sm text-blue-100">Professionisti</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">98%</div>
                <div className="text-sm text-blue-100">Certificati</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">4.8/5</div>
                <div className="text-sm text-blue-100">Rating Medio</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-200">{specializzazioni.length - 1}</div>
                <div className="text-sm text-blue-100">Specializzazioni</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca per nome trainer o specializzazione..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Specializzazioni */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializzazione
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {specializzazioni.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.emoji} {spec.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Città */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Città
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {citta.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Minimo
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="tutti">Tutti i Rating</option>
                  <option value="4.5+">4.5+ Stelle</option>
                  <option value="4.0+">4.0+ Stelle</option>
                </select>
              </div>
            </div>

            <div className="text-center text-gray-600 mb-8">
              {trainersFiltered.length} professionisti trovati
              {personalTrainers.filter(t => t.isReal).length > 0 && (
                <span className="ml-2 text-purple-600 font-medium">
                  ({personalTrainers.filter(t => t.isReal).length} PT registrati)
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Grid Professionisti */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainersFiltered.map((trainer) => (
                <div key={trainer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100">
                  <div className="relative">
                    <img
                      src={trainer.immagine}
                      alt={trainer.nome}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </div>
                    <div className={`absolute top-4 left-4 ${getBadgeColor(trainer.badge)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {trainer.badge}
                    </div>
                    <div className={`absolute bottom-4 right-4 w-3 h-3 rounded-full ${trainer.disponibile ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {trainer.isReal && (
                      <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        🆕 Nuovo
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {trainer.nome}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{trainer.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({trainer.recensioni})</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {trainer.citta.charAt(0).toUpperCase() + trainer.citta.slice(1).replace('_', ' ')}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      {trainer.esperienza}
                    </div>

                    {trainer.slogan && (
                      <p className="text-blue-600 font-medium italic text-sm mb-2">
                        "{trainer.slogan}"
                      </p>
                    )}

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trainer.descrizione}
                    </p>

                    {/* Specializzazioni */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainer.specializzazioni.slice(0, 2).map((spec) => {
                        const specializzazione = specializzazioni.find(s => s.id === spec);
                        return (
                          <span key={spec} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            {specializzazione?.emoji} {specializzazione?.label || spec}
                          </span>
                        );
                      })}
                      {trainer.specializzazioni.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                          +{trainer.specializzazioni.length - 2} altre
                        </span>
                      )}
                    </div>

                    {/* Certificazioni */}
                    <div className="flex items-center mb-4">
                      <Award className="w-4 h-4 text-green-600 mr-2" />
                      <div className="flex gap-1">
                        {trainer.certificazioni.slice(0, 3).map((cert, index) => (
                          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            {cert}
                          </span>
                        ))}
                        {trainer.certificazioni.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                            +{trainer.certificazioni.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {trainer.programmiCreati} programmi
                      </div>
                      <span className="font-medium text-blue-600">{trainer.prezzo}</span>
                    </div>

                    {/* Disponibilità */}
                    <div className="text-xs text-gray-500 mb-4">
                      {trainer.disponibilitaOnline && trainer.disponibilitaPresenza && (
                        <span>🌐 Online + 📍 Presenza</span>
                      )}
                      {trainer.disponibilitaOnline && !trainer.disponibilitaPresenza && (
                        <span>🌐 Solo Online</span>
                      )}
                      {!trainer.disponibilitaOnline && trainer.disponibilitaPresenza && (
                        <span>📍 Solo Presenza</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${trainer.disponibile ? 'text-green-600' : 'text-red-600'}`}>
                        {trainer.disponibile ? '🟢 Disponibile' : '🔴 Non disponibile'}
                      </span>
                      <Link
                        href={`/professionisti/${trainer.isReal ? trainer.id : trainer.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        Profilo
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {trainersFiltered.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nessun professionista trovato
                </h3>
                <p className="text-gray-500 mb-6">
                  Prova a modificare i filtri di ricerca per trovare più risultati
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialization('tutti');
                    setSelectedCity('tutte');
                    setSelectedRating('tutti');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancella Filtri
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Sei un Personal Trainer? 💪
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Unisciti alla nostra community di professionisti certificati e fai crescere la tua attività
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/auth/pt-application"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Richiedi Accesso
              </Link>
              <Link
                href="/dashboard"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
              >
                <User className="w-5 h-5 mr-2" />
                Dashboard PT
              </Link>
            </div>
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