import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Target, 
  Heart,
  BookOpen,
  ChevronRight,
  Users,
  Star
} from 'lucide-react';

const VideoLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');

  // Dati video esercizi (normalmente da API)
  const videos = [
    {
      id: 1,
      title: "Squat Perfetto - Tecnica Base",
      duration: "3:45",
      difficulty: "Principiante",
      muscles: ["Quadricipiti", "Glutei", "Core"],
      equipment: "Corpo libero",
      discipline: "Functional Training",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      trainer: "Marco Fitness",
      views: 12500,
      likes: 890,
      description: "Impara la tecnica perfetta dello squat, l'esercizio fondamentale per gambe e glutei.",
      commonErrors: ["Ginocchia che cedono verso l'interno", "Schiena troppo inclinata", "Discesa insufficiente"]
    },
    {
      id: 2,
      title: "Panca Piana - Setup e Esecuzione",
      duration: "4:20",
      difficulty: "Intermedio",
      muscles: ["Pettorali", "Tricipiti", "Deltoidi"],
      equipment: "Bilanciere",
      discipline: "Powerlifting",
      thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=250&fit=crop",
      trainer: "Roberto Strong",
      views: 8700,
      likes: 654,
      description: "Tecnica avanzata per la panca piana: setup, arco lombare e traiettoria del bilanciere.",
      commonErrors: ["Bilanciere troppo alto sul petto", "Piedi instabili", "Perdita dell'arco lombare"]
    },
    {
      id: 3,
      title: "Saluto al Sole - Sequenza Completa",
      duration: "8:15",
      difficulty: "Principiante",
      muscles: ["Tutto il corpo", "Core", "Flessibilità"],
      equipment: "Tappetino",
      discipline: "Yoga",
      thumbnail: "https://images.unsplash.com/photo-1506629905607-c7a4fcbc3915?w=400&h=250&fit=crop",
      trainer: "Elena Serenity",
      views: 15600,
      likes: 1250,
      description: "La sequenza yoga più famosa al mondo, perfetta per iniziare la giornata.",
      commonErrors: ["Respirazione non sincronizzata", "Transizioni troppo veloci", "Allineamento scorretto"]
    },
    {
      id: 4,
      title: "Deadlift Rumeno - Catena Posteriore",
      duration: "5:30",
      difficulty: "Intermedio",
      muscles: ["Glutei", "Femorali", "Lombari"],
      equipment: "Bilanciere",
      discipline: "Powerlifting",
      thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=250&fit=crop",
      trainer: "Marco Fitness",
      views: 6800,
      likes: 420,
      description: "Variant del deadlift per sviluppare la catena posteriore in modo specifico.",
      commonErrors: ["Ginocchia troppo piegate", "Bilanciere lontano dal corpo", "Ipercompensazione lombare"]
    },
    {
      id: 5,
      title: "Plank Variations - Core Stability",
      duration: "6:00",
      difficulty: "Tutti i livelli",
      muscles: ["Core", "Addominali", "Stabilizzatori"],
      equipment: "Corpo libero",
      discipline: "Functional Training",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop",
      trainer: "Sara Functional",
      views: 9300,
      likes: 780,
      description: "5 varianti del plank per allenare il core a 360 gradi, dal principiante all'avanzato.",
      commonErrors: ["Bacino troppo alto", "Perdita dell'allineamento", "Respirazione bloccata"]
    },
    {
      id: 6,
      title: "Burpees - Tecnica e Progressioni",
      duration: "4:45",
      difficulty: "Intermedio",
      muscles: ["Tutto il corpo", "Cardiovascolare"],
      equipment: "Corpo libero",
      discipline: "HIIT",
      thumbnail: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=250&fit=crop",
      trainer: "Luca Energy",
      views: 11200,
      likes: 890,
      description: "L'esercizio cardio più completo: tecnica perfetta e progressioni per tutti i livelli.",
      commonErrors: ["Salto della fase push-up", "Atterraggio pesante", "Ritmo troppo veloce"]
    },
    {
      id: 7,
      title: "Mobilità Spalle - 10 Minuti",
      duration: "10:30",
      difficulty: "Principiante",
      muscles: ["Spalle", "Collo", "Torace"],
      equipment: "Corpo libero",
      discipline: "Mobility",
      thumbnail: "https://images.unsplash.com/photo-1506629905607-c7a4fcbc3915?w=400&h=250&fit=crop",
      trainer: "Elena Serenity",
      views: 18700,
      likes: 1450,
      description: "Sequenza di mobilità per spalle e collo, perfetta dopo lunghe ore al computer.",
      commonErrors: ["Movimenti troppo bruschi", "Range di movimento limitato", "Tensione nel collo"]
    },
    {
      id: 8,
      title: "Pull-up Progression - Da Zero all'Eroe",
      duration: "7:20",
      difficulty: "Avanzato",
      muscles: ["Dorsali", "Bicipiti", "Core"],
      equipment: "Sbarra",
      discipline: "Calisthenics",
      thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop",
      trainer: "Andrea Calisthenic",
      views: 14500,
      likes: 1100,
      description: "Progressione completa per arrivare al primo pull-up e oltre.",
      commonErrors: ["Kipping eccessivo", "Range di movimento parziale", "Perdita della hollow position"]
    }
  ];

  const muscleGroups = ['Tutti', 'Pettorali', 'Dorsali', 'Spalle', 'Braccia', 'Core', 'Glutei', 'Quadricipiti', 'Femorali', 'Polpacci'];
  const equipmentOptions = ['Tutti', 'Corpo libero', 'Bilanciere', 'Manubri', 'Tappetino', 'Sbarra', 'Elastici', 'Kettlebell'];
  const disciplines = ['Tutte', 'Functional Training', 'Powerlifting', 'Yoga', 'HIIT', 'Calisthenics', 'Mobility', 'Bodybuilding'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.muscles.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesMuscle = !selectedMuscle || selectedMuscle === 'Tutti' || 
                         video.muscles.some(muscle => muscle.includes(selectedMuscle));
    
    const matchesEquipment = !selectedEquipment || selectedEquipment === 'Tutti' || 
                           video.equipment === selectedEquipment;
    
    const matchesDiscipline = !selectedDiscipline || selectedDiscipline === 'Tutte' || 
                            video.discipline === selectedDiscipline;
    
    return matchesSearch && matchesMuscle && matchesEquipment && matchesDiscipline;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Principiante': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzato': return 'bg-red-100 text-red-800';
      case 'Tutti i livelli': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <a href="/programmi" className="text-gray-300 hover:text-blue-400 transition-colors">Programmi</a>
              <a href="/video-library" className="text-blue-400 font-medium">Video Gratuiti</a>
              <a href="/personal-trainer" className="text-gray-300 hover:text-blue-400 transition-colors">Personal Trainer</a>
              <a href="/auth/pt-application" className="text-gray-300 hover:text-blue-400 transition-colors">Diventa Creatore</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Libreria Video Gratuita</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Libreria Video <span className="text-blue-600">Gratuita</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Centinaia di video tutorial professionali per imparare la tecnica perfetta di ogni esercizio. 
            <strong className="text-gray-900"> Completamente gratuiti, sempre aggiornati.</strong>
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Video HD Professionali</h3>
            <p className="text-gray-600">Tutti i video sono girati in alta definizione con angolazioni multiple</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Spiegazioni Dettagliate</h3>
            <p className="text-gray-600">Ogni esercizio include setup, esecuzione ed errori comuni da evitare</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Tutti i Livelli</h3>
            <p className="text-gray-600">Dai principianti agli atleti avanzati, progressioni per ogni livello</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
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
                    placeholder="Cerca esercizi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Muscle Groups */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gruppo Muscolare</label>
                <select
                  value={selectedMuscle}
                  onChange={(e) => setSelectedMuscle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {muscleGroups.map(muscle => (
                    <option key={muscle} value={muscle}>{muscle}</option>
                  ))}
                </select>
              </div>

              {/* Equipment */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Attrezzatura</label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {equipmentOptions.map(equipment => (
                    <option key={equipment} value={equipment}>{equipment}</option>
                  ))}
                </select>
              </div>

              {/* Discipline */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {disciplines.map(discipline => (
                    <option key={discipline} value={discipline}>{discipline}</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">💡 Suggerimento</h4>
                <p className="text-blue-800 text-sm">
                  Guarda i video prima di iniziare un nuovo programma per padroneggiare la tecnica!
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
              <span className="text-gray-600">
                {filteredVideos.length} video trovati
              </span>
              <span className="text-sm text-gray-500">
                🎥 Tutti i video sono gratuiti e senza pubblicità
              </span>
            </div>

            {/* Videos Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white/90 hover:bg-white p-4 rounded-full transition-colors transform hover:scale-110">
                        <Play className="h-8 w-8 text-blue-600" />
                      </button>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>

                    {/* Difficulty */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                        {video.discipline}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {video.equipment}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>by {video.trainer}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {video.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {video.likes}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2">Muscoli coinvolti:</p>
                      <div className="flex flex-wrap gap-1">
                        {video.muscles.slice(0, 3).map((muscle) => (
                          <span key={muscle} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {muscle}
                          </span>
                        ))}
                        {video.muscles.length > 3 && (
                          <span className="text-gray-500 text-xs">+{video.muscles.length - 3}</span>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                      <Play className="h-4 w-4 mr-2" />
                      Guarda Video
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors">
                Carica Altri Video
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mt-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Hai imparato la tecnica?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Ora è il momento di mettere tutto insieme con un programma completo!
          </p>
          <a 
            href="/programmi"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center"
          >
            Esplora i Programmi
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;