import React, { useState } from 'react';
import { Search, Star, Filter, ChevronDown, Heart, Download, Users, Clock, Target } from 'lucide-react';

const ProgrammiListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const programmi = [
    {
      id: 1,
      slug: "massa-muscolare-12-settimane",
      titolo: "Massa Muscolare 12 Settimane",
      trainer: {
        nome: "Marco Fitness",
        username: "marcofitness",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        totalReviews: 156
      },
      sport: "Palestra",
      livello: "Intermedio",
      obiettivo: "Massa Muscolare",
      durata: "12 settimane",
      attrezzatura: "Palestra completa",
      prezzo: 19.90,
      rating: 4.8,
      reviews: 23,
      downloads: 145,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      tags: ["Massa", "Forza", "Intermedio"],
      description: "Programma completo per aumentare la massa muscolare in 12 settimane con progressioni scientifiche."
    },
    {
      id: 2,
      slug: "yoga-flow-principianti",
      titolo: "Yoga Flow per Principianti",
      trainer: {
        nome: "Elena Serenity",
        username: "elenayoga",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.95,
        totalReviews: 89
      },
      sport: "Yoga",
      livello: "Principiante",
      obiettivo: "Flessibilità",
      durata: "4 settimane",
      attrezzatura: "Tappetino",
      prezzo: 9.90,
      rating: 4.9,
      reviews: 31,
      downloads: 278,
      image: "https://images.unsplash.com/photo-1506629905607-c7a4fcbc3915?w=400&h=250&fit=crop",
      tags: ["Yoga", "Principiante", "Relax"],
      description: "Sequenze dolci di yoga flow per iniziare il tuo percorso di benessere e flessibilità."
    },
    {
      id: 3,
      slug: "hiit-dimagrimento-casa",
      titolo: "HIIT Dimagrimento a Casa",
      trainer: {
        nome: "Luca Energy",
        username: "lucaenergy",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        totalReviews: 203
      },
      sport: "Home Workout",
      livello: "Intermedio",
      obiettivo: "Dimagrimento",
      durata: "6 settimane", 
      attrezzatura: "Senza attrezzi",
      prezzo: 15.90,
      rating: 4.7,
      reviews: 18,
      downloads: 92,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop",
      tags: ["HIIT", "Cardio", "Casa"],
      description: "Allenamenti HIIT intensivi per bruciare grassi velocemente, ovunque tu sia."
    },
    {
      id: 4,
      slug: "preparazione-concorsi-militari",
      titolo: "Preparazione Concorsi Militari",
      trainer: {
        nome: "Andrea Tactical",
        username: "andreatactical",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
        rating: 5.0,
        totalReviews: 67
      },
      sport: "Preparazione",
      livello: "Avanzato",
      obiettivo: "Test Fisici",
      durata: "10 settimane",
      attrezzatura: "Corpo libero",
      prezzo: 24.90,
      rating: 5.0,
      reviews: 12,
      downloads: 56,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop",
      tags: ["Militare", "Resistenza", "Test"],
      description: "Preparazione specifica per superare i test fisici dei concorsi militari e delle forze dell'ordine."
    },
    {
      id: 5,
      slug: "ciclismo-endurance",
      titolo: "Ciclismo Endurance Road",
      trainer: {
        nome: "Stefano Wheels",
        username: "stefanowheels",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        totalReviews: 134
      },
      sport: "Ciclismo",
      livello: "Intermedio",
      obiettivo: "Resistenza",
      durata: "16 settimane",
      attrezzatura: "Bicicletta",
      prezzo: 29.90,
      rating: 4.8,
      reviews: 21,
      downloads: 87,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      tags: ["Ciclismo", "Endurance", "Road"],
      description: "Programma completo per migliorare resistenza e performance nel ciclismo su strada."
    },
    {
      id: 6,
      slug: "nuoto-tecnica-perfetta",
      titolo: "Nuoto - Tecnica Perfetta",
      trainer: {
        nome: "Michela Aqua",
        username: "michelaaqua",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        totalReviews: 92
      },
      sport: "Nuoto",
      livello: "Tutti i livelli",
      obiettivo: "Tecnica",
      durata: "8 settimane",
      attrezzatura: "Piscina",
      prezzo: 18.90,
      rating: 4.9,
      reviews: 15,
      downloads: 63,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop",
      tags: ["Nuoto", "Tecnica", "Stili"],
      description: "Perfeziona la tecnica di tutti e quattro gli stili del nuoto con esercizi progressivi."
    }
  ];

  const filteredProgrammi = programmi.filter(programma => {
    const matchesSearch = programma.titolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programma.trainer.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programma.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSport = !selectedSport || programma.sport === selectedSport;
    const matchesLevel = !selectedLevel || programma.livello === selectedLevel;
    const matchesDuration = !selectedDuration || programma.durata.includes(selectedDuration);
    
    return matchesSearch && matchesSport && matchesLevel && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">Best-Trainer</a>
              <span className="ml-2 text-sm text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded-full">BETA</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/programmi" className="text-blue-400 font-medium">Programmi</a>
              <a href="/personal-trainer" className="text-gray-300 hover:text-blue-400 transition-colors">Personal Trainer</a>
              <a href="/auth/pt-application" className="text-gray-300 hover:text-blue-400 transition-colors">Diventa Creatore</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutti i Programmi</h1>
          <p className="text-xl text-gray-600">Trova il programma perfetto per i tuoi obiettivi tra {programmi.length} opzioni disponibili</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filtri */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtri
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cerca</label>
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cerca programmi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sport */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tutti gli sport</option>
                  <option value="Palestra">Palestra & Fitness</option>
                  <option value="Yoga">Yoga & Stretching</option>
                  <option value="Home Workout">Home Workout</option>
                  <option value="Ciclismo">Ciclismo</option>
                  <option value="Nuoto">Nuoto</option>
                  <option value="Preparazione">Preparazione Militare</option>
                </select>
              </div>

              {/* Livello */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Livello</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tutti i livelli</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzato">Avanzato</option>
                  <option value="Tutti i livelli">Tutti i livelli</option>
                </select>
              </div>

              {/* Durata */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Durata</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Qualsiasi durata</option>
                  <option value="4">4 settimane o meno</option>
                  <option value="8">5-8 settimane</option>
                  <option value="12">9-12 settimane</option>
                  <option value="16">Più di 12 settimane</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Applica Filtri
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
              <span className="text-gray-600">
                {filteredProgrammi.length} programmi trovati
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Più popolari</option>
                <option value="rating">Migliore valutazione</option>
                <option value="price-low">Prezzo crescente</option>
                <option value="price-high">Prezzo decrescente</option>
                <option value="newest">Più recenti</option>
              </select>
            </div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProgrammi.map((programma) => (
                <div key={programma.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={programma.image} 
                      alt={programma.titolo}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {programma.sport}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 rounded-full px-3 py-1">
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-bold">{programma.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <img 
                        src={programma.trainer.avatar} 
                        alt={programma.trainer.nome}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-blue-600">{programma.trainer.nome}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          {programma.trainer.rating} ({programma.trainer.totalReviews})
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {programma.titolo}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {programma.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {programma.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        {programma.livello}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {programma.durata}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {programma.downloads} download
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {programma.reviews} recensioni
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">€{programma.prezzo}</span>
                        <span className="text-gray-500 text-sm ml-1">una tantum</span>
                      </div>
                      <a 
                        href={`/programmi/${programma.slug}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Dettagli
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammiListing;