import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Upload, 
  TrendingUp, 
  Users, 
  Download, 
  Star, 
  Euro, 
  Eye,
  Edit,
  Settings,
  Bell,
  MessageSquare,
  Calendar,
  Award,
  Plus
} from 'lucide-react';

const PTDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dati fittizi per il dashboard
  const statsData = {
    totalEarnings: 2847.50,
    thisMonth: 687.30,
    totalSales: 156,
    thisMonthSales: 23,
    totalDownloads: 1247,
    averageRating: 4.8,
    totalReviews: 89,
    profileViews: 2341
  };

  const salesData = [
    { month: 'Gen', vendite: 45, guadagni: 425 },
    { month: 'Feb', vendite: 52, guadagni: 567 },
    { month: 'Mar', vendite: 38, guadagni: 389 },
    { month: 'Apr', vendite: 61, guadagni: 645 },
    { month: 'Mag', vendite: 49, guadagni: 523 },
    { month: 'Giu', vendite: 67, guadagni: 687 }
  ];

  const programsData = [
    { name: 'Massa 12 Settimane', value: 45, color: '#3B82F6' },
    { name: 'HIIT Cardio', value: 32, color: '#10B981' },
    { name: 'Forza Funzionale', value: 28, color: '#F59E0B' },
    { name: 'Mobility & Stretch', value: 18, color: '#EF4444' }
  ];

  const recentPrograms = [
    {
      id: 1,
      title: "Massa Muscolare 12 Settimane",
      price: 19.90,
      sales: 45,
      rating: 4.8,
      reviews: 23,
      status: "Attivo",
      lastUpdate: "2 giorni fa"
    },
    {
      id: 2,
      title: "HIIT Cardio Intensivo",
      price: 15.90,
      sales: 32,
      rating: 4.7,
      reviews: 18,
      status: "Attivo",
      lastUpdate: "1 settimana fa"
    },
    {
      id: 3,
      title: "Forza Funzionale",
      price: 24.90,
      sales: 28,
      rating: 4.9,
      reviews: 15,
      status: "In Revisione",
      lastUpdate: "3 giorni fa"
    }
  ];

  const recentReviews = [
    {
      id: 1,
      user: "Marco R.",
      program: "Massa Muscolare 12 Settimane",
      rating: 5,
      comment: "Programma fantastico! Ho visto risultati già dalla terza settimana.",
      date: "2 ore fa"
    },
    {
      id: 2,
      user: "Sara T.",
      program: "HIIT Cardio Intensivo",
      rating: 4,
      comment: "Molto intenso, perfetto per chi vuole sudare davvero!",
      date: "1 giorno fa"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Best-Trainer</a>
              <span className="ml-3 text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">Dashboard PT</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Profile" />
                <span className="ml-2 text-sm font-medium text-gray-700">Marco Fitness</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: '📊 Panoramica', icon: TrendingUp },
              { id: 'programs', label: '📁 I Miei Programmi', icon: Upload },
              { id: 'sales', label: '💰 Vendite', icon: Euro },
              { id: 'reviews', label: '⭐ Recensioni', icon: MessageSquare },
              { id: 'profile', label: '👤 Profilo', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Guadagni Totali</p>
                    <p className="text-3xl font-bold text-gray-900">€{statsData.totalEarnings}</p>
                    <p className="text-sm text-green-600 mt-1">+€{statsData.thisMonth} questo mese</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Euro className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vendite Totali</p>
                    <p className="text-3xl font-bold text-gray-900">{statsData.totalSales}</p>
                    <p className="text-sm text-blue-600 mt-1">+{statsData.thisMonthSales} questo mese</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Download Totali</p>
                    <p className="text-3xl font-bold text-gray-900">{statsData.totalDownloads}</p>
                    <p className="text-sm text-gray-500 mt-1">Tutti i programmi</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Download className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Rating Medio</p>
                    <p className="text-3xl font-bold text-gray-900">{statsData.averageRating}</p>
                    <p className="text-sm text-yellow-600 mt-1">{statsData.totalReviews} recensioni</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-xl">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Sales Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Andamento Vendite</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vendite" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Programs Performance */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Programmi</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={programsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {programsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Programs */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">I Tuoi Programmi</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuovo Programma
                  </button>
                </div>
                <div className="space-y-4">
                  {recentPrograms.map((program) => (
                    <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{program.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          program.status === 'Attivo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {program.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>€{program.price}</div>
                        <div>{program.sales} vendite</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {program.rating} ({program.reviews})
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Aggiornato {program.lastUpdate}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recensioni Recenti</h3>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.user}</h4>
                          <p className="text-sm text-gray-600">{review.program}</p>
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
                      <p className="text-gray-700 text-sm mb-2">"{review.comment}"</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">I Miei Programmi</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Carica Nuovo Programma
              </button>
            </div>
            <div className="text-center text-gray-500 py-12">
              <Upload className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Area di gestione programmi in sviluppo</p>
              <p>Qui potrai caricare, modificare e gestire tutti i tuoi programmi</p>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Analisi Vendite</h2>
            <div className="text-center text-gray-500 py-12">
              <Euro className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Dashboard vendite in sviluppo</p>
              <p>Analytics dettagliate, report e gestione pagamenti</p>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Gestione Recensioni</h2>
            <div className="text-center text-gray-500 py-12">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Sistema recensioni in sviluppo</p>
              <p>Visualizza e rispondi alle recensioni dei tuoi clienti</p>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Impostazioni Profilo</h2>
            <div className="text-center text-gray-500 py-12">
              <Settings className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Gestione profilo in sviluppo</p>
              <p>Modifica bio, certificazioni, foto e informazioni di contatto</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PTDashboard;