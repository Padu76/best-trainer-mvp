import React, { useState } from 'react';
import { 
  Download, 
  Star, 
  Clock, 
  CheckCircle, 
  Heart, 
  Search,
  Filter,
  Calendar,
  FileText,
  Video,
  User,
  Settings,
  LogOut,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('purchases');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dati utente (normalmente da API/auth)
  const user = {
    name: "Alessandro Bianchi",
    email: "alessandro.bianchi@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    memberSince: "Marzo 2024",
    totalPurchases: 8,
    totalSpent: 147.20,
    completedPrograms: 3,
    inProgress: 2
  };

  // Acquisti dell'utente
  const purchases = [
    {
      id: 1,
      programId: "massa-12-settimane",
      title: "Massa Muscolare 12 Settimane",
      trainer: "Marco Fitness",
      trainerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      price: 19.90,
      purchaseDate: "15 Gen 2025",
      downloadDate: "15 Gen 2025",
      status: "in_progress", // completed, in_progress, not_started
      progress: 65,
      currentWeek: 8,
      totalWeeks: 12,
      rating: null,
      files: [
        { name: "Programma_Completo.pdf", size: "2.1 MB", type: "pdf" },
        { name: "Video_Tutorial.mp4", size: "45.7 MB", type: "video" },
        { name: "Schede_Settimana_1-4.pdf", size: "856 KB", type: "pdf" }
      ]
    },
    {
      id: 2,
      programId: "yoga-principianti",
      title: "Yoga Flow per Principianti",
      trainer: "Elena Serenity",
      trainerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1506629905607-c7a4fcbc3915?w=300&h=200&fit=crop",
      price: 9.90,
      purchaseDate: "08 Gen 2025",
      downloadDate: "08 Gen 2025",
      status: "completed",
      progress: 100,
      currentWeek: 4,
      totalWeeks: 4,
      rating: 5,
      files: [
        { name: "Yoga_Flow_Completo.pdf", size: "1.8 MB", type: "pdf" },
        { name: "Sequenze_Video.mp4", size: "67.2 MB", type: "video" }
      ]
    },
    {
      id: 3,
      programId: "hiit-dimagrimento",
      title: "HIIT Dimagrimento a Casa",
      trainer: "Luca Energy",
      trainerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=300&h=200&fit=crop",
      price: 15.90,
      purchaseDate: "03 Gen 2025",
      downloadDate: "04 Gen 2025",
      status: "in_progress",
      progress: 33,
      currentWeek: 2,
      totalWeeks: 6,
      rating: null,
      files: [
        { name: "HIIT_Program.pdf", size: "1.5 MB", type: "pdf" },
        { name: "Workout_Videos.zip", size: "89.3 MB", type: "archive" }
      ]
    },
    {
      id: 4,
      programId: "functional-training",
      title: "Functional Training Base",
      trainer: "Roberto Strong",
      trainerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop",
      price: 12.90,
      purchaseDate: "28 Dic 2024",
      downloadDate: "29 Dic 2024",
      status: "not_started",
      progress: 0,
      currentWeek: 0,
      totalWeeks: 6,
      rating: null,
      files: [
        { name: "Functional_Training.pdf", size: "2.3 MB", type: "pdf" }
      ]
    },
    {
      id: 5,
      programId: "nutrizione-sportiva",
      title: "Guida Nutrizione Sportiva",
      trainer: "Dott.ssa Nutrition",
      trainerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=200&fit=crop",
      price: 24.90,
      purchaseDate: "20 Dic 2024",
      downloadDate: "20 Dic 2024",
      status: "completed",
      progress: 100,
      currentWeek: null,
      totalWeeks: null,
      rating: 4,
      files: [
        { name: "Nutrizione_Completa.pdf", size: "4.7 MB", type: "pdf" },
        { name: "Calcolatori_Excel.xlsx", size: "1.2 MB", type: "excel" }
      ]
    }
  ];

  const wishlist = [
    {
      id: 6,
      title: "Preparazione Concorsi Militari",
      trainer: "Andrea Tactical",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop",
      price: 24.90,
      rating: 5.0,
      addedDate: "10 Gen 2025"
    },
    {
      id: 7,
      title: "Ciclismo Endurance Road",
      trainer: "Stefano Wheels",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      price: 29.90,
      rating: 4.8,
      addedDate: "05 Gen 2025"
    }
  ];

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || purchase.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completato';
      case 'in_progress': return 'In Corso';
      case 'not_started': return 'Non Iniziato';
      default: return 'Sconosciuto';
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'video': return <Video className="h-5 w-5 text-purple-500" />;
      case 'excel': return <FileText className="h-5 w-5 text-green-500" />;
      case 'archive': return <FileText className="h-5 w-5 text-orange-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Best-Trainer</a>
              <span className="ml-3 text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">I Miei Programmi</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src={user.avatar} alt="Profile" />
                <span className="ml-2 text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="text-center mb-6">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-2">Membro dal {user.memberSince}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{user.totalPurchases}</p>
                  <p className="text-xs text-gray-600">Programmi</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">€{user.totalSpent}</p>
                  <p className="text-xs text-gray-600">Spesi</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'purchases', label: 'I Miei Acquisti', icon: Download },
                  { id: 'wishlist', label: 'Lista Desideri', icon: Heart },
                  { id: 'progress', label: 'Progressi', icon: TrendingUp },
                  { id: 'profile', label: 'Profilo', icon: User },
                  { id: 'settings', label: 'Impostazioni', icon: Settings }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut className="h-5 w-5 mr-3" />
                  Esci
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">I Miei Acquisti</h2>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative">
                        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Cerca programmi..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">Tutti gli stati</option>
                        <option value="completed">Completati</option>
                        <option value="in_progress">In Corso</option>
                        <option value="not_started">Non Iniziati</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {filteredPurchases.map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="grid md:grid-cols-4 gap-6">
                          {/* Program Info */}
                          <div className="md:col-span-2">
                            <div className="flex">
                              <img 
                                src={purchase.image} 
                                alt={purchase.title}
                                className="w-20 h-16 object-cover rounded-lg mr-4 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{purchase.title}</h3>
                                <div className="flex items-center mb-2">
                                  <img 
                                    src={purchase.trainerAvatar} 
                                    alt={purchase.trainer}
                                    className="w-6 h-6 rounded-full mr-2"
                                  />
                                  <span className="text-sm text-gray-600">{purchase.trainer}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span>Acquistato il {purchase.purchaseDate}</span>
                                  <span>€{purchase.price}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Status & Progress */}
                          <div className="space-y-3">
                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(purchase.status)}`}>
                              {getStatusText(purchase.status)}
                            </span>
                            
                            {purchase.status !== 'not_started' && purchase.totalWeeks && (
                              <div>
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Progresso</span>
                                  <span>{purchase.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${purchase.progress}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Settimana {purchase.currentWeek} di {purchase.totalWeeks}
                                </p>
                              </div>
                            )}

                            {purchase.rating && (
                              <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-2">La tua valutazione:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < purchase.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900 mb-3">File disponibili:</h4>
                            <div className="space-y-2">
                              {purchase.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                  <div className="flex items-center">
                                    {getFileIcon(file.type)}
                                    <div className="ml-2">
                                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                      <p className="text-xs text-gray-500">{file.size}</p>
                                    </div>
                                  </div>
                                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            {!purchase.rating && purchase.status === 'completed' && (
                              <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors mt-3">
                                Lascia una Recensione
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista Desideri ({wishlist.length})</h2>
                
                {wishlist.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">by {item.trainer}</p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm text-gray-600">{item.rating}</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">€{item.price}</span>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                              Acquista Ora
                            </button>
                            <button className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors">
                              <Heart className="h-5 w-5 fill-current" />
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-3">Aggiunto il {item.addedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun programma nella wishlist</h3>
                    <p className="text-gray-600 mb-6">Inizia a esplorare i programmi e aggiungi quelli che ti interessano!</p>
                    <a 
                      href="/programmi"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Esplora Programmi
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">I Tuoi Progressi</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-2">{user.completedPrograms}</p>
                    <p className="text-green-800 font-medium">Programmi Completati</p>
                  </div>
                  
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{user.inProgress}</p>
                    <p className="text-blue-800 font-medium">In Corso</p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600 mb-2">87%</p>
                    <p className="text-purple-800 font-medium">Tasso Completamento</p>
                  </div>
                </div>

                <div className="text-center text-gray-500 py-12">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Dashboard progressi dettagliata in sviluppo</p>
                  <p>Qui potrai tracciare i tuoi miglioramenti e obiettivi raggiunti</p>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Il Mio Profilo</h2>
                <div className="text-center text-gray-500 py-12">
                  <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Gestione profilo in sviluppo</p>
                  <p>Aggiorna le tue informazioni personali e preferenze</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Impostazioni</h2>
                <div className="text-center text-gray-500 py-12">
                  <Settings className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Impostazioni account in sviluppo</p>
                  <p>Gestisci notifiche, privacy e preferenze dell'account</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;