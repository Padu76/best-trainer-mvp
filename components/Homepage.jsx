import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Download, 
  Play, 
  ChevronRight, 
  Trophy, 
  Target, 
  Clock,
  CheckCircle,
  TrendingUp,
  Heart,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  ChevronDown,
  User,
  UserPlus
} from 'lucide-react';

export default function BestTrainerMVP() {
  const [activeFilter, setActiveFilter] = useState('tutti');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filtriCategorie = [
    { id: 'tutti', label: 'Tutti i Programmi', emoji: '🏆' },
    { id: 'massa', label: 'Massa Muscolare', emoji: '💪' },
    { id: 'dimagrimento', label: 'Dimagrimento', emoji: '🔥' },
    { id: 'forza', label: 'Forza & Potenza', emoji: '⚡' },
    { id: 'cardio', label: 'Cardio & Resistenza', emoji: '❤️' },
  ];

  const programmiInEvidenza = [
    {
      id: 1,
      titolo: "Massa Muscolare Avanzato",
      trainer: "Marco Rossi",
      prezzo: 79.99,
      rating: 4.8,
      studenti: 1247,
      durata: "12 settimane",
      livello: "Avanzato",
      categoria: "massa",
      tipo: "Video Corso + PDF",
      immagine: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      titolo: "Dimagrimento Rapido",
      trainer: "Sofia Bianchi",
      prezzo: 59.99,
      rating: 4.9,
      studenti: 892,
      durata: "8 settimane",
      livello: "Intermedio",
      categoria: "dimagrimento",
      tipo: "Ebook + Video",
      immagine: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      titolo: "Powerlifting Foundation", 
      trainer: "Andrea Verdi",
      prezzo: 89.99,
      rating: 4.7,
      studenti: 654,
      durata: "16 settimane",
      livello: "Principiante",
      categoria: "forza",
      tipo: "Video Guida",
      immagine: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      titolo: "HIIT Cardio Intensive",
      trainer: "Elena Russo",
      prezzo: 49.99,
      rating: 4.6,
      studenti: 1456,
      durata: "6 settimane", 
      livello: "Tutti i livelli",
      categoria: "cardio",
      tipo: "Video Corso",
      immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      titolo: "Functional Training",
      trainer: "Luca Neri",
      prezzo: 69.99,
      rating: 4.8,
      studenti: 723,
      durata: "10 settimane",
      livello: "Intermedio", 
      categoria: "forza",
      tipo: "Ebook PDF",
      immagine: "https://images.unsplash.com/photo-1583500178690-f7e6a7c0ea54?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      titolo: "Yoga & Mindfulness",
      trainer: "Giulia Rossi",
      prezzo: 39.99,
      rating: 4.9,
      studenti: 987,
      durata: "4 settimane",
      livello: "Principiante",
      categoria: "cardio",
      tipo: "Video Guida",
      immagine: "https://images.unsplash.com/photo-1506629905607-c5b0df6e8863?w=400&h=300&fit=crop"
    }
  ];

  const categorieConImmagini = [
    {
      nome: "Palestra & Fitness",
      descrizione: "Massa, forza, tonificazione",
      immagine: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop",
      programmi: 156
    },
    {
      nome: "Yoga & Stretching", 
      descrizione: "Flessibilità, equilibrio",
      immagine: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
      programmi: 89
    },
    {
      nome: "Corsa & Cardio",
      descrizione: "Resistenza, dimagrimento", 
      immagine: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
      programmi: 74
    },
    {
      nome: "Home Workout",
      descrizione: "Senza attrezzi, a casa",
      immagine: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      programmi: 112
    },
    {
      nome: "Ciclismo",
      descrizione: "Road, MTB, indoor",
      immagine: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      programmi: 43
    },
    {
      nome: "Arti Marziali",
      descrizione: "Tecniche, combattimento",
      immagine: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=200&fit=crop",
      programmi: 37
    },
    {
      nome: "Preparazione Militare",
      descrizione: "Concorsi, test fisici",
      immagine: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=300&h=200&fit=crop",
      programmi: 28
    },
    {
      nome: "Nuoto",
      descrizione: "Tecnica, resistenza",
      immagine: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=200&fit=crop",
      programmi: 52
    }
  ];

  const programmiFiltered = programmiInEvidenza.filter(programma => {
    const matchFilter = activeFilter === 'tutti' || programma.categoria === activeFilter;
    const matchSearch = programma.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       programma.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
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
                <Link href="/professionisti" className="hover:text-blue-400 transition-colors">
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            La <span className="text-blue-300">Piattaforma</span><br />
            dei Programmi Fitness
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            <strong>I migliori programmi dai top trainer</strong> per trasformare il tuo fisico. 
            Video corsi, ebook e guide personalizzate di qualità! 💪
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link
              href="/programmi"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Cerca Programmi
            </Link>
            <Link
              href="/tutorial-esercizi"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Tutorial Gratuiti
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">500+</div>
              <div className="text-sm text-blue-100">Personal Trainer</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">1,200+</div>
              <div className="text-sm text-blue-100">Programmi Disponibili</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">15k+</div>
              <div className="text-sm text-blue-100">Clienti Attivi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-200">4.8/5</div>
              <div className="text-sm text-blue-100">Rating Medio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona - Solo per Utenti */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Come Funziona? 🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tre semplici passi per iniziare la tua trasformazione
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Solo sezione Per gli Utenti - centrata */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Trova il Programma Perfetto</h3>
                <p className="text-gray-600">Video corsi, ebook e guide per raggiungere i tuoi obiettivi</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">🔍 Cerca e Filtra</h4>
                    <p className="text-gray-600 text-sm">Usa i nostri filtri per trovare programmi per il tuo obiettivo, livello e sport preferito</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">⭐ Scegli il Migliore</h4>
                    <p className="text-gray-600 text-sm">Leggi recensioni, confronta trainer e scegli il programma che fa per te</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">🏆 Raggiungi i Tuoi Obiettivi</h4>
                    <p className="text-gray-600 text-sm">Download immediato e supporto del trainer per trasformare il tuo fisico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Qualità e Professionalità */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              La Qualità che <span className="text-blue-400">Meriti</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Programmi ed ebook creati da <strong className="text-white">Personal Trainer certificati</strong> e 
              <strong className="text-white"> preparatori qualificati</strong> con anni di esperienza 
              e risultati comprovati nel settore fitness.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Trainer Certificati */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all duration-300 group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Trainer Certificati
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Tutti i nostri Personal Trainer possiedono <strong className="text-white">certificazioni riconosciute</strong> 
                (CONI, FIPE, NASM) e vengono selezionati attraverso un <strong className="text-white">rigoroso processo di valutazione</strong>.
              </p>
            </div>

            {/* Card 2: Specializzazioni Diverse */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all duration-300 group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Specialisti del Settore
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Esperti in <strong className="text-white">ogni disciplina</strong>: dalla massa muscolare al dimagrimento, 
                dal functional training alla preparazione atletica. <strong className="text-white">Il trainer giusto per ogni obiettivo</strong>.
              </p>
            </div>

            {/* Card 3: Risultati Garantiti */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-800/70 transition-all duration-300 group">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Qualità Garantita
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Programmi testati</strong> e approvati da professionisti. 
                Sistema di <strong className="text-white">recensioni verificate</strong> e supporto continuo 
                per raggiungere i tuoi obiettivi.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300 text-sm">Trainer Certificati</div>
            </div>
            <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">15k+</div>
              <div className="text-gray-300 text-sm">Clienti Soddisfatti</div>
            </div>
            <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">4.9/5</div>
              <div className="text-gray-300 text-sm">Rating Medio</div>
            </div>
            <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
              <div className="text-gray-300 text-sm">Specializzazioni</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm mb-6">Certificazioni riconosciute:</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold text-sm">CONI</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold text-sm">FIPE</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold text-sm">NASM</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold text-sm">ISSA</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold text-sm">ASI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorie Sport */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trova il Tuo Sport 🏃‍♂️
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Video corsi, ebook e programmi specializzati per ogni disciplina e obiettivo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorieConImmagini.map((categoria, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveFilter(categoria.nome.toLowerCase().includes('palestra') ? 'massa' : 'tutti')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={categoria.immagine}
                    alt={categoria.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{categoria.nome}</h3>
                    <p className="text-sm text-gray-200">{categoria.descrizione}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{categoria.programmi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/programmi"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Esplora Tutti i Programmi
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programmi in Evidenza */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Programmi in Evidenza ⭐
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I programmi più popolari scelti dalla nostra community
            </p>
          </div>

          {/* Filtri */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filtriCategorie.map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => setActiveFilter(filtro.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filtro.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{filtro.emoji}</span>
                {filtro.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca programmi o trainer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Grid Programmi */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programmiFiltered.map((programma) => (
              <div key={programma.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={programma.immagine}
                    alt={programma.titolo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">{programma.livello}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-medium">{programma.tipo}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-blue-600 font-medium">{programma.trainer}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{programma.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {programma.titolo}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {programma.durata}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {programma.studenti}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">€{programma.prezzo}</span>
                    <Link
                      href={`/programmi/${programma.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      Dettagli
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programmi"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Vedi Tutti i Programmi
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto a Trasformare il Tuo Fisico? 💪
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di persone che hanno già raggiunto i loro obiettivi con Best-Trainer
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/programmi"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              Inizia Oggi
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/tutorial-esercizi"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Prova Gratis
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
  );
}