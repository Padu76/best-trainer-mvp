import React, { useState } from 'react';
import { Search, Star, Users, Play, Filter, ArrowRight, CheckCircle, Trophy, Target, Zap, Heart, Download, Award } from 'lucide-react';

const BestTrainerMVP = () => {
  const [selectedFilter, setSelectedFilter] = useState('');

  // Dati fittizi per l'MVP
  const programmi = [
    {
      id: 1,
      titolo: "Massa Muscolare 12 Settimane",
      trainer: "Marco Fitness",
      obiettivo: "Massa",
      durata: "12 settimane",
      attrezzatura: "Palestra completa",
      prezzo: "19.90",
      rating: 4.8,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      titolo: "Tonificazione Home Workout",
      trainer: "Sara PT",
      obiettivo: "Tonificazione",
      durata: "8 settimane",
      attrezzatura: "Senza attrezzi",
      prezzo: "12.90",
      rating: 4.9,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      titolo: "Dimagrimento HIIT Intensivo",
      trainer: "Luca Coach",
      obiettivo: "Dimagrimento",
      durata: "6 settimane",
      attrezzatura: "Manubri",
      prezzo: "15.90",
      rating: 4.7,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      titolo: "Preparazione Test Militari",
      trainer: "Andrea PT",
      obiettivo: "Preparazione",
      durata: "10 settimane",
      attrezzatura: "Corpo libero",
      prezzo: "22.90",
      rating: 5.0,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      titolo: "Yoga Flow Principianti",
      trainer: "Elena Yoga",
      obiettivo: "Flessibilità",
      durata: "4 settimane",
      attrezzatura: "Tappetino",
      prezzo: "9.90",
      rating: 4.6,
      reviews: 27,
      image: "https://images.unsplash.com/photo-1506629905607-c7a4fcbc3915?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      titolo: "Forza Funzionale",
      trainer: "Roberto Strong",
      obiettivo: "Forza",
      durata: "16 settimane",
      attrezzatura: "Kettlebell",
      prezzo: "24.90",
      rating: 4.8,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop"
    }
  ];

  const tags = ["Tonificazione", "Massa", "Dimagrimento", "Senza attrezzi", "Home gym", "Preparazione"];

  const filteredProgrammi = selectedFilter 
    ? programmi.filter(p => p.obiettivo.toLowerCase().includes(selectedFilter.toLowerCase()) || 
                           p.attrezzatura.toLowerCase().includes(selectedFilter.toLowerCase()))
    : programmi;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Best-Trainer</h1>
              <span className="ml-2 text-sm text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded-full">BETA</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#programmi" className="text-gray-300 hover:text-blue-400 transition-colors">Programmi</a>
              <a href="#creatori" className="text-gray-300 hover:text-blue-400 transition-colors">Personal Trainer</a>
              <a href="#diventa-creatore" className="text-gray-300 hover:text-blue-400 transition-colors">Diventa Creatore</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Più dinamico e colorato */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-flex items-center bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Il primo marketplace italiano dei Personal Trainer
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Trova il <span className="text-blue-300">programma perfetto</span><br />
            per i tuoi obiettivi
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Centinaia di programmi di allenamento professionali creati da Personal Trainer certificati. 
            <strong className="text-white"> Filtra, scegli, scarica e inizia subito.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Cerca Programmi
            </button>
            <button className="border-2 border-blue-300 hover:bg-blue-300 hover:text-blue-900 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105">
              Sono un Personal Trainer
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Nuova sezione colorata */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600 font-medium">Personal Trainer</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600 font-medium">Programmi Disponibili</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10k+</h3>
              <p className="text-gray-600 font-medium">Utenti Soddisfatti</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8★</h3>
              <p className="text-gray-600 font-medium">Rating Medio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona - Ridisegnata con più colore */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Come Funziona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Il marketplace dove trovare programmi professionali e condividere la tua esperienza come Personal Trainer.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Per gli Utenti */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border border-blue-200">
              <div className="text-center mb-8">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Per Te che Vuoi Allenarti</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">🔍 Filtra per i tuoi obiettivi</h4>
                    <p className="text-gray-700 leading-relaxed">Cerca per sport, livello, durata, attrezzatura - trova esattamente quello che ti serve</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">⭐ Leggi le recensioni e valutazioni</h4>
                    <p className="text-gray-700 leading-relaxed">Ogni programma ha recensioni verificate da utenti reali che l'hanno già provato</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">📥 Acquista e scarica subito</h4>
                    <p className="text-gray-700 leading-relaxed">Pagamento sicuro, download immediato del PDF con video tutorial inclusi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Per i PT */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200">
              <div className="text-center mb-8">
                <div className="bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Per Te Personal Trainer</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">📝 Candidati come creatore</h4>
                    <p className="text-gray-700 leading-relaxed">Invia portfolio e certificazioni - processo di selezione rapido e trasparente</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">⬆️ Carica i tuoi programmi</h4>
                    <p className="text-gray-700 leading-relaxed">Dashboard semplice per upload, gestione prezzi e monitoraggio vendite</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-6 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">💰 Monetizza la tua esperienza</h4>
                    <p className="text-gray-700 leading-relaxed">Trasforma la tua competenza in una fonte di reddito ricorrente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorie Sport - Completamente riprogettata */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Scegli il Tuo Sport</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Programmi professionali per ogni disciplina e obiettivo. Dai principianti agli atleti agonisti.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {/* Palestra & Fitness */}
            <div 
              onClick={() => setSelectedFilter('Massa')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center" 
                alt="Palestra & Fitness"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">💪 Palestra & Fitness</h3>
                <p className="text-sm text-gray-200">Massa, forza, tonificazione</p>
              </div>
            </div>

            {/* Yoga & Stretching */}
            <div 
              onClick={() => setSelectedFilter('Flessibilità')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1506629905607-c7a4fcbc3915?w=300&h=200&fit=crop&crop=center" 
                alt="Yoga & Stretching"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🧘‍♀️ Yoga & Stretching</h3>
                <p className="text-sm text-gray-200">Flessibilità, equilibrio</p>
              </div>
            </div>

            {/* Corsa & Cardio */}
            <div 
              onClick={() => setSelectedFilter('Dimagrimento')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&crop=center" 
                alt="Corsa & Cardio"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🏃‍♂️ Corsa & Cardio</h3>
                <p className="text-sm text-gray-200">Resistenza, dimagrimento</p>
              </div>
            </div>

            {/* Home Workout */}
            <div 
              onClick={() => setSelectedFilter('Senza attrezzi')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop&crop=center" 
                alt="Home Workout"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🏠 Home Workout</h3>
                <p className="text-sm text-gray-200">Senza attrezzi, a casa</p>
              </div>
            </div>

            {/* Ciclismo */}
            <div 
              onClick={() => setSelectedFilter('')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center" 
                alt="Ciclismo"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🚴‍♂️ Ciclismo</h3>
                <p className="text-sm text-gray-200">Road, MTB, indoor</p>
              </div>
            </div>

            {/* Arti Marziali */}
            <div 
              onClick={() => setSelectedFilter('')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?w=300&h=200&fit=crop&crop=center" 
                alt="Arti Marziali"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🥋 Arti Marziali</h3>
                <p className="text-sm text-gray-200">Tecniche, combattimento</p>
              </div>
            </div>

            {/* Preparazione Militare */}
            <div 
              onClick={() => setSelectedFilter('Preparazione')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center" 
                alt="Preparazione Militare"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🎖️ Prep. Militare</h3>
                <p className="text-sm text-gray-200">Concorsi, test fisici</p>
              </div>
            </div>

            {/* Nuoto */}
            <div 
              onClick={() => setSelectedFilter('')}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=200&fit=crop&crop=center" 
                alt="Nuoto"
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">🏊‍♀️ Nuoto</h3>
                <p className="text-sm text-gray-200">Tecnica, resistenza</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setSelectedFilter('')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🔍 Esplora Tutti i Programmi
            </button>
          </div>
        </div>
      </section>

      {/* Programmi Top - Cards ridisegnate */}
      <section id="programmi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Programmi in Evidenza</h2>
            <p className="text-xl text-gray-600">I più venduti e meglio recensiti dai nostri utenti</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProgrammi.map((programma) => (
              <div key={programma.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden border border-gray-100">
                <div className="relative">
                  <img 
                    src={programma.image} 
                    alt={programma.titolo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {programma.obiettivo}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-800 ml-1 font-bold">{programma.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{programma.titolo}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-4">by {programma.trainer}</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">⏱️ Durata:</span>
                      <span className="text-gray-900 font-bold">{programma.durata}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">🏋️ Attrezzatura:</span>
                      <span className="text-gray-900 font-bold">{programma.attrezzatura}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">👥 Recensioni:</span>
                      <span className="text-gray-900 font-bold">{programma.reviews} persone</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">€{programma.prezzo}</span>
                      <span className="text-gray-500 text-sm ml-1">una tantum</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg">
                      Acquista Ora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Creator - Completamente ridisegnata */}
      <section id="diventa-creatore" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Trasforma la tua <span className="text-blue-400">Passione</span><br />
              in <span className="text-blue-400">Business</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unisciti a centinaia di Personal Trainer che hanno già scelto Best-Trainer per 
              <strong className="text-white"> scalare il proprio business</strong> e raggiungere migliaia di persone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-gray-700 backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-4">Raggiungi Migliaia di Clienti</h3>
              <p className="text-gray-300 leading-relaxed">Espandi il tuo business oltre i limiti geografici e temporali. I tuoi programmi lavorano per te 24/7.</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-gray-700 backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-4">Reddito Passivo Garantito</h3>
              <p className="text-gray-300 leading-relaxed">Crea una volta, vendi per sempre. I tuoi programmi continuano a generare ricavi anche mentre dormi.</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-gray-700 backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="bg-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl mb-4">Costruisci la Tua Reputazione</h3>
              <p className="text-gray-300 leading-relaxed">Sistema di recensioni professionale, badge di qualità e visibilità garantita per i migliori creator.</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white p-8 rounded-2xl inline-block mb-8">
              <h3 className="text-2xl font-bold mb-2">🎯 Opportunità Uniche</h3>
              <p className="text-blue-100 mb-4">Condividi la tua esperienza con migliaia di persone</p>
              <div className="text-4xl font-bold">∞</div>
              <p className="text-blue-100">Crescita illimitata</p>
            </div>
            
            <div className="space-y-4">
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg mx-2">
                🚀 Candidati Ora come Creatore
              </button>
              <p className="text-gray-400 text-sm">Processo di selezione rapido • Supporto dedicato • Community esclusiva</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Nuova sezione */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cosa Dicono di Noi</h2>
            <p className="text-xl text-gray-600">La soddisfazione dei nostri utenti è la nostra priorità</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">M</div>
                <div>
                  <h4 className="font-bold text-gray-900">Marco F.</h4>
                  <p className="text-gray-600 text-sm">Utente da 6 mesi</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">"Finalmente ho trovato programmi di qualità a prezzi onesti. Il programma di Marco mi ha fatto raggiungere i miei obiettivi in 3 mesi!"</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">S</div>
                <div>
                  <h4 className="font-bold text-gray-900">Sara P.</h4>
                  <p className="text-gray-600 text-sm">Personal Trainer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">"Best-Trainer ha rivoluzionato il mio business. In 4 mesi ho già guadagnato €2.500 vendendo i miei programmi!"</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-4 font-bold">L</div>
                <div>
                  <h4 className="font-bold text-gray-900">Luca R.</h4>
                  <p className="text-gray-600 text-sm">Utente Premium</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">"La varietà di programmi è incredibile. Ho trovato tutto quello che cercavo per la preparazione al test dei Carabinieri!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Ridisegnato */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Best-Trainer</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Il primo marketplace italiano per programmi di allenamento creati da Personal Trainer certificati.
              </p>
              <div className="flex space-x-4">
                <div className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors cursor-pointer">
                  <Users className="h-5 w-5" />
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors cursor-pointer">
                  <Heart className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Per Te</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">🎯 Esplora Programmi</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">❓ Come Funziona</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">💡 FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">📞 Supporto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Per Personal Trainer</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">🚀 Diventa Creatore</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">📋 Linee Guida</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">💰 Come Guadagnare</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">🎓 Formazione</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Community</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">👥 Facebook Best-Trainer</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">📸 Instagram</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">📧 Newsletter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">📱 Contatti</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 Best-Trainer. Tutti i diritti riservati. Made with ❤️ in Italy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BestTrainerMVP;