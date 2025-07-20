import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  Download, 
  Instagram, 
  Facebook, 
  Globe,
  CheckCircle,
  Heart,
  Filter,
  Grid,
  List
} from 'lucide-react';

const PTProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Dati del Personal Trainer (normalmente da API)
  const trainer = {
    username: "marcofitness",
    name: "Marco Fitness",
    fullName: "Marco Rossi", 
    title: "Personal Trainer & Preparatore Atletico",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
    location: "Milano, Italy",
    memberSince: "Gennaio 2023",
    rating: 4.9,
    totalReviews: 156,
    totalPrograms: 12,
    totalStudents: 3400,
    totalEarnings: "25k+", // Nascosto in produzione
    
    bio: `Personal Trainer certificato CONI con 8 anni di esperienza nel settore del fitness e bodybuilding. 

Specializzato in:
• Aumento massa muscolare
• Preparazione gare di bodybuilding
• Ricomposizione corporea
• Allenamento funzionale

Ho aiutato oltre 3000 persone a raggiungere i loro obiettivi di forma fisica attraverso programmi personalizzati e scientificamente provati. La mia filosofia si basa su progressioni graduali, consistenza e approccio olistico al benessere.

Laureato in Scienze Motorie presso l'Università Statale di Milano, certificato ISSA Personal Trainer e Nutrition Coach.`,

    certifications: [
      "CONI Personal Trainer",
      "ISSA Certified",
      "Nutrition Coach",
      "Functional Training Specialist",
      "Laurea Scienze Motorie"
    ],

    specialties: [
      "Bodybuilding",
      "Powerlifting", 
      "Nutrizione Sportiva",
      "Functional Training",
      "Ricomposizione Corporea",
      "Preparazione Gare"
    ],

    socialLinks: {
      instagram: "https://instagram.com/marcofitness",
      facebook: "https://facebook.com/marcofitness",
      website: "https://marcofitness.com"
    },

    achievements: [
      { icon: "🏆", title: "Top Seller 2024", description: "Miglior venditore dell'anno" },
      { icon: "⭐", title: "5 Stelle", description: "Rating perfetto per 6 mesi" },
      { icon: "📈", title: "3000+ Clienti", description: "Persone trasformate" },
      { icon: "🎯", title: "Expert Badge", description: "Riconoscimento professionale" }
    ]
  };

  const programs = [
    {
      id: 1,
      title: "Massa Muscolare 12 Settimane",
      category: "Massa",
      price: 19.90,
      rating: 4.8,
      reviews: 156,
      downloads: 1247,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      bestseller: true,
      level: "Intermedio",
      duration: "12 settimane"
    },
    {
      id: 2,
      title: "Forza e Potenza 8 Settimane", 
      category: "Forza",
      price: 16.90,
      rating: 4.7,
      reviews: 89,
      downloads: 743,
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=200&fit=crop",
      bestseller: false,
      level: "Avanzato",
      duration: "8 settimane"
    },
    {
      id: 3,
      title: "Definizione Estiva",
      category: "Definizione", 
      price: 14.90,
      rating: 4.9,
      reviews: 67,
      downloads: 542,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop",
      bestseller: false,
      level: "Intermedio",
      duration: "10 settimane"
    },
    {
      id: 4,
      title: "Functional Training Base",
      category: "Functional",
      price: 12.90,
      rating: 4.6,
      reviews: 45,
      downloads: 324,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop",
      bestseller: false,
      level: "Principiante",
      duration: "6 settimane"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Alessandro M.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "2 settimane fa",
      program: "Massa Muscolare 12 Settimane",
      comment: "Marco è un vero professionista! Il suo programma di massa mi ha fatto guadagnare 5kg di muscoli puri in 3 mesi. Consigli nutrizionali perfetti e sempre disponibile per domande.",
      verified: true
    },
    {
      id: 2,
      user: "Giulia R.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face", 
      rating: 5,
      date: "1 mese fa",
      program: "Definizione Estiva",
      comment: "Incredibile trasformazione! Ho perso 8kg mantenendo tutta la massa muscolare. Il programma è dettagliato e i video tutorial sono chiarissimi.",
      verified: true
    },
    {
      id: 3,
      user: "Roberto T.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      rating: 4,
      date: "2 mesi fa", 
      program: "Forza e Potenza",
      comment: "Programma molto impegnativo ma efficace. Ho aumentato tutti i massimali in 8 settimane. Marco risponde sempre velocemente ai messaggi.",
      verified: true
    },
    {
      id: 4,
      user: "Sofia B.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "3 mesi fa",
      program: "Functional Training",
      comment: "Perfetto per chi inizia! Spiegazioni chiare, progressioni graduali. Mi ha cambiato l'approccio all'allenamento completamente.",
      verified: true
    },
    {
      id: 5,
      user: "Matteo K.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      date: "4 mesi fa",
      program: "Massa Muscolare 12 Settimane", 
      comment: "Questo programma vale ogni centesimo! Risultati visibili già dalla terza settimana. Marco è sempre professionale e competente.",
      verified: true
    }
  ];

  const categories = ['all', 'Massa', 'Forza', 'Definizione', 'Functional'];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(p => p.category === selectedCategory);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

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
              <a href="/personal-trainer" className="text-gray-300 hover:text-blue-400 transition-colors">Personal Trainer</a>
              <a href="/auth/pt-application" className="text-gray-300 hover:text-blue-400 transition-colors">Diventa Creatore</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Cover & Profile Section */}
      <div className="relative">
        <div className="h-64 md:h-80 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
          <img 
            src={trainer.coverImage} 
            alt="Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src={trainer.avatar} 
                alt={trainer.name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white"
              />
              
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{trainer.name}</h1>
                      <p className="text-xl text-gray-600 mb-2">{trainer.title}</p>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="mr-4">{trainer.location}</span>
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Membro dal {trainer.memberSince}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {trainer.socialLinks.instagram && (
                        <a href={trainer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                           className="p-3 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition-colors">
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {trainer.socialLinks.facebook && (
                        <a href={trainer.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                           className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {trainer.socialLinks.website && (
                        <a href={trainer.socialLinks.website} target="_blank" rel="noopener noreferrer"
                           className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                        <span className="text-2xl font-bold text-gray-900">{trainer.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{trainer.totalReviews} recensioni</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-900 mb-1">{trainer.totalPrograms}</p>
                      <p className="text-sm text-gray-600">Programmi</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-900 mb-1">{trainer.totalStudents}</p>
                      <p className="text-sm text-gray-600">Studenti</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-900 mb-1">{trainer.totalEarnings}</p>
                      <p className="text-sm text-gray-600">Vendite</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Chi Sono</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{trainer.bio}</p>
              </div>
            </div>

            {/* Programs */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">I Miei Programmi ({programs.length})</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'Tutti' : category}
                  </button>
                ))}
              </div>

              {/* Programs Grid/List */}
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredPrograms.map((program) => (
                  <div key={program.id} className={`group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-32 h-24 flex-shrink-0' : 'w-full h-48'}`}>
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {program.bestseller && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Bestseller
                        </span>
                      )}
                      <button className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
                        <div className={viewMode === 'list' ? 'flex-1 mr-4' : ''}>
                          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {program.title}
                          </h3>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {program.level}
                            </span>
                            <span>{program.duration}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span>{program.rating} ({program.reviews})</span>
                              </div>
                              <div className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                <span>{program.downloads}</span>
                              </div>
                            </div>
                            {viewMode === 'grid' && (
                              <span className="text-xl font-bold text-gray-900">€{program.price}</span>
                            )}
                          </div>
                        </div>
                        
                        {viewMode === 'list' && (
                          <div className="text-right">
                            <span className="text-xl font-bold text-gray-900 block mb-2">€{program.price}</span>
                            <a 
                              href={`/programmi/${program.id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Dettagli
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {viewMode === 'grid' && (
                        <a 
                          href={`/programmi/${program.id}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block mt-4"
                        >
                          Vedi Dettagli
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recensioni ({trainer.totalReviews})</h2>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(trainer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{trainer.rating}</span>
                </div>
              </div>

              <div className="space-y-6">
                {displayedReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <img 
                          src={review.avatar} 
                          alt={review.user}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            {review.user}
                            {review.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                            )}
                          </h4>
                          <p className="text-sm text-gray-600">{review.date}</p>
                          <p className="text-sm text-blue-600 font-medium">{review.program}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>

              {!showAllReviews && reviews.length > 3 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllReviews(true)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Mostra Tutte le Recensioni ({reviews.length - 3} rimanenti)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Statistiche</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Livello risposta</span>
                  <span className="text-green-600 font-semibold">Entro 2h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasso soddisfazione</span>
                  <span className="text-green-600 font-semibold">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Clienti ripetenti</span>
                  <span className="text-blue-600 font-semibold">76%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Membro da</span>
                  <span className="text-gray-900 font-semibold">2+ anni</span>
                </div>
              </div>

              <hr className="my-6" />

              <h4 className="font-bold text-gray-900 mb-4">Specializzazioni</h4>
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((specialty) => (
                  <span key={specialty} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>

              <hr className="my-6" />

              <h4 className="font-bold text-gray-900 mb-4">Certificazioni</h4>
              <div className="space-y-2">
                {trainer.certifications.map((cert) => (
                  <div key={cert} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PTProfile;