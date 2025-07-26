import React, { useState, useEffect } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Star,
  FileText,
  Video,
  Eye,
  Download,
  ShoppingCart,
  Calendar,
  Clock,
  Target,
  Award,
  Zap,
  Bell,
  Settings,
  Plus,
  Edit,
  Share2,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  Heart,
  MessageSquare,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Filter,
  Search,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  Globe,
  Smartphone,
  Monitor,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Upload,
  Save,
  X,
  Check,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

export default function DashboardOverview() {
  const [profileData, setProfileData] = useState({});
  const [programmi, setProgrammi] = useState([]);
  const [settings, setSettings] = useState({});
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  const [showNotifications, setShowNotifications] = useState(false);
  const [goals, setGoals] = useState({
    monthlyRevenue: 1000,
    programsToCreate: 5,
    newClients: 20
  });

  // Load data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('bt_profile_data');
    const savedPrograms = localStorage.getItem('bt_programs_data');
    const savedSettings = localStorage.getItem('bt_settings_data');
    
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Errore caricamento profilo:', error);
      }
    }
    
    if (savedPrograms) {
      try {
        setProgrammi(JSON.parse(savedPrograms));
      } catch (error) {
        console.error('Errore caricamento programmi:', error);
      }
    }

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Errore caricamento settings:', error);
      }
    }
  }, []);

  // Helper functions
  function getContentType(programma) {
    if (programma.tipoContenuto) return programma.tipoContenuto;
    if (programma.video && programma.file) return 'misto';
    if (programma.video) return 'video';
    return 'documento';
  }

  function getWeeklyStats() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return programmi.reduce((acc, p) => {
      const created = new Date(p.dataCreazione || 0);
      if (created >= oneWeekAgo) {
        acc.vendite += (p.vendite || 0);
        acc.revenue += ((p.vendite || 0) * parseFloat(p.prezzo || 0));
      }
      return acc;
    }, { vendite: 0, revenue: 0 });
  }

  function getMonthlyStats() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return programmi.reduce((acc, p) => {
      const created = new Date(p.dataCreazione || 0);
      if (created >= oneMonthAgo) {
        acc.vendite += (p.vendite || 0);
        acc.revenue += ((p.vendite || 0) * parseFloat(p.prezzo || 0));
      }
      return acc;
    }, { vendite: 0, revenue: 0 });
  }

  function calculateAverageRating() {
    const ratedPrograms = programmi.filter(p => p.rating > 0);
    if (ratedPrograms.length === 0) return 0;
    return ratedPrograms.reduce((sum, p) => sum + p.rating, 0) / ratedPrograms.length;
  }

  function getTopCategories() {
    const categoryStats = {};
    programmi.forEach(p => {
      if (p.categoria) {
        categoryStats[p.categoria] = (categoryStats[p.categoria] || 0) + (p.vendite || 0);
      }
    });
    
    return Object.entries(categoryStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([categoria, vendite]) => ({ categoria, vendite }));
  }

  function getTopPrograms() {
    return programmi
      .filter(p => p.pubblicato)
      .sort((a, b) => (b.vendite || 0) - (a.vendite || 0))
      .slice(0, 5);
  }

  function calculateConversionRate() {
    const totalViews = programmi.reduce((sum, p) => sum + (p.visualizzazioni || 0), 0);
    const totalSales = programmi.reduce((sum, p) => sum + (p.vendite || 0), 0);
    return totalViews > 0 ? (totalSales / totalViews * 100) : 0;
  }

  function getActiveClients() {
    // Simulate active clients based on recent sales
    const venditeTotali = programmi.reduce((sum, p) => sum + (p.vendite || 0), 0);
    return Math.floor(venditeTotali * 0.7) + Math.floor(Math.random() * 10);
  }

  function getNewClients() {
    // Simulate new clients this month
    const venditeMese = getMonthlyStats().vendite;
    return Math.floor(venditeMese * 0.8) + Math.floor(Math.random() * 5);
  }

  function calculateProfileCompletion() {
    const requiredFields = ['nome', 'email', 'telefono', 'bio', 'specializzazioni'];
    const completed = requiredFields.filter(field => {
      if (field === 'specializzazioni') {
        return profileData.specializzazioni?.length > 0;
      }
      return profileData[field] && profileData[field].toString().trim().length > 0;
    }).length;
    
    return Math.round((completed / requiredFields.length) * 100);
  }

  function getLastActivity() {
    if (programmi.length === 0) return null;
    
    const lastProgram = programmi.reduce((latest, current) => {
      const latestDate = new Date(latest.ultimaModifica || latest.dataCreazione || 0);
      const currentDate = new Date(current.ultimaModifica || current.dataCreazione || 0);
      return currentDate > latestDate ? current : latest;
    });
    
    return {
      type: 'program_update',
      title: lastProgram.titolo,
      date: new Date(lastProgram.ultimaModifica || lastProgram.dataCreazione),
      action: 'modificato'
    };
  }

  function calculateGoalProgress() {
    const venditeTotali = programmi.reduce((sum, p) => sum + (p.vendite || 0), 0);
    const revenueMese = getMonthlyStats().revenue;
    const nuoviClienti = getNewClients();
    
    return {
      revenue: {
        current: revenueMese,
        target: goals.monthlyRevenue,
        percentage: Math.min((revenueMese / goals.monthlyRevenue) * 100, 100)
      },
      programs: {
        current: programmi.length,
        target: goals.programsToCreate,
        percentage: Math.min((programmi.length / goals.programsToCreate) * 100, 100)
      },
      clients: {
        current: nuoviClienti,
        target: goals.newClients,
        percentage: Math.min((nuoviClienti / goals.newClients) * 100, 100)
      }
    };
  }

  // Calculate comprehensive stats
  const weeklyStats = getWeeklyStats();
  const monthlyStats = getMonthlyStats();
  const completamentoProfilo = calculateProfileCompletion();
  const goalProgress = calculateGoalProgress();
  
  const stats = {
    programmiTotali: programmi.length,
    programmiPubblicati: programmi.filter(p => p.pubblicato).length,
    programmiAttivi: programmi.filter(p => p.pubblicato && (p.vendite || 0) > 0).length,
    bozze: programmi.filter(p => !p.pubblicato).length,
    
    venditeTotali: programmi.reduce((sum, p) => sum + (p.vendite || 0), 0),
    venditeSettimana: weeklyStats.vendite,
    venditeMese: monthlyStats.vendite,
    
    revenueTotale: programmi.reduce((sum, p) => sum + ((p.vendite || 0) * parseFloat(p.prezzo || 0)), 0),
    revenueSettimana: weeklyStats.revenue,
    revenueMese: monthlyStats.revenue,
    
    ratingMedio: calculateAverageRating(),
    visualizzazioniTotali: programmi.reduce((sum, p) => sum + (p.visualizzazioni || 0), 0),
    downloadTotali: programmi.reduce((sum, p) => sum + (p.download || 0), 0),
    
    videocorsi: programmi.filter(p => getContentType(p) === 'video' || getContentType(p) === 'misto').length,
    categoriePiuVendute: getTopCategories(),
    programmiTopPerformance: getTopPrograms(),
    
    conversionRate: calculateConversionRate(),
    clientiAttivi: getActiveClients(),
    nuoviClienti: getNewClients(),
    
    completamentoProfilo: completamentoProfilo,
    ultimaAttivita: getLastActivity(),
    obiettivi: goalProgress
  };



  // Get greeting based on time
  function getGreeting() {
    const hour = new Date().getHours();
    const name = profileData.nome || 'Personal Trainer';
    
    if (hour < 12) return `Buongiorno, ${name}! ☀️`;
    if (hour < 18) return `Buon pomeriggio, ${name}! 🌤️`;
    return `Buonasera, ${name}! 🌙`;
  }

  // Generate recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'sale',
      title: 'Nuova vendita: Massa Muscolare Pro',
      description: 'Cliente: Marco R. - €49.99',
      time: '2 ore fa',
      icon: ShoppingCart,
      color: 'green'
    },
    {
      id: 2,
      type: 'review',
      title: 'Nuova recensione 5 stelle',
      description: 'Su "Dimagrimento Veloce" da Giulia M.',
      time: '5 ore fa',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'program',
      title: 'Programma pubblicato',
      description: '"Cardio HIIT Avanzato" ora disponibile',
      time: '1 giorno fa',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 4,
      type: 'view',
      title: 'Picco di visualizzazioni',
      description: '+127 views sui tuoi programmi oggi',
      time: '2 giorni fa',
      icon: Eye,
      color: 'purple'
    }
  ];

  // Generate notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Obiettivo raggiunto!',
      message: 'Hai superato il target di vendite mensili',
      time: '1 ora fa',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      title: 'Aggiorna il profilo',
      message: 'Completa la bio per migliorare la visibilità',
      time: '3 ore fa',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Programma in scadenza',
      message: 'L\'offerta su "Forza Massima" scade domani',
      time: '1 giorno fa',
      unread: false
    }
  ];

  const StatCard = ({ title, value, subtitle, trend, trendValue, icon: Icon, color, onClick }) => (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'up' && <ArrowUp className="w-4 h-4 mr-1" />}
            {trend === 'down' && <ArrowDown className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick, badge }) => (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {badge && (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <ArrowRight className="w-4 h-4 text-gray-400 mt-3 group-hover:text-gray-600 transition-colors" />
    </div>
  );

  const GoalProgressCard = ({ title, current, target, percentage, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mr-3`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="text-sm text-gray-600">{current}/{target}</span>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progresso</span>
          <span className="font-medium">{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              percentage >= 100 ? 'bg-green-500' : 
              percentage >= 75 ? 'bg-blue-500' :
              percentage >= 50 ? 'bg-yellow-500' : 'bg-gray-400'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {percentage >= 100 && (
        <div className="flex items-center text-green-600 text-sm">
          <CheckCircle className="w-4 h-4 mr-1" />
          Obiettivo raggiunto!
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header with Greeting */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getGreeting()}</h1>
          <p className="text-gray-600">
            Ecco un riepilogo delle tue attività e performance
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          {/* Time Range Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'week', label: '7G' },
              { key: 'month', label: '30G' },
              { key: 'year', label: '1A' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTimeRange(key)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeRange === key 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifiche</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Vedi tutte le notifiche
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Completion Alert */}
      {stats.completamentoProfilo < 100 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Completa il tuo profilo</h3>
                <p className="text-gray-600 mb-4">
                  Un profilo completo aumenta la fiducia dei clienti e migliora la visibilità.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Completamento</span>
                      <span className="font-medium">{stats.completamentoProfilo}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${stats.completamentoProfilo}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Completa Ora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Revenue Totale"
          value={`€${stats.revenueTotale.toFixed(2)}`}
          subtitle={`€${stats.revenueMese.toFixed(2)} questo mese`}
          trend="up"
          trendValue="+12%"
          icon={DollarSign}
          color="bg-green-500"
        />
        
        <StatCard
          title="Vendite Totali"
          value={stats.venditeTotali}
          subtitle={`${stats.venditeSettimana} questa settimana`}
          trend="up"
          trendValue="+8%"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Programmi Attivi"
          value={stats.programmiPubblicati}
          subtitle={`${stats.bozze} bozze in lavorazione`}
          trend="up"
          trendValue="+2"
          icon={FileText}
          color="bg-purple-500"
        />
        
        <StatCard
          title="Rating Medio"
          value={stats.ratingMedio.toFixed(1)}
          subtitle={`Da ${stats.venditeTotali} recensioni`}
          trend={stats.ratingMedio >= 4.5 ? "up" : "neutral"}
          trendValue="⭐"
          icon={Star}
          color="bg-yellow-500"
        />
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Obiettivi del Mese</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
            <Settings className="w-4 h-4 mr-1" />
            Modifica
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <GoalProgressCard
            title="Revenue Mensile"
            current={stats.obiettivi.revenue.current}
            target={stats.obiettivi.revenue.target}
            percentage={stats.obiettivi.revenue.percentage}
            icon={DollarSign}
            color="bg-green-500"
          />
          
          <GoalProgressCard
            title="Programmi Creati"
            current={stats.obiettivi.programs.current}
            target={stats.obiettivi.programs.target}
            percentage={stats.obiettivi.programs.percentage}
            icon={Target}
            color="bg-blue-500"
          />
          
          <GoalProgressCard
            title="Nuovi Clienti"
            current={stats.obiettivi.clients.current}
            target={stats.obiettivi.clients.target}
            percentage={stats.obiettivi.clients.percentage}
            icon={Users}
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Top Programs Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Programmi Top Performance</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Vedi tutti
            </button>
          </div>
          
          {stats.programmiTopPerformance.length > 0 ? (
            <div className="space-y-4">
              {stats.programmiTopPerformance.map((programma, index) => (
                <div key={programma.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {programma.covertinaPreview ? (
                        <img src={programma.covertinaPreview} className="w-full h-full object-cover" alt="Copertina" />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{programma.titolo}</h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <span>{programma.categoria}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          {getContentType(programma) === 'video' && <Video className="w-3 h-3 mr-1" />}
                          {getContentType(programma) === 'documento' && <FileText className="w-3 h-3 mr-1" />}
                          {getContentType(programma) === 'misto' && <Upload className="w-3 h-3 mr-1" />}
                          {getContentType(programma)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{programma.vendite || 0} vendite</p>
                    <p className="text-sm text-green-600">€{((programma.vendite || 0) * parseFloat(programma.prezzo || 0)).toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Nessun programma ancora</h4>
              <p className="text-gray-600 mb-6">Crea il tuo primo programma per iniziare a vendere</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto">
                <Plus className="w-4 h-4 mr-2" />
                Crea Programma
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attività Recente</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Vedi tutto
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.color === 'green' ? 'bg-green-100 text-green-600' :
                    activity.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                    activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    activity.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Azioni Rapide</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Nuovo Programma"
            description="Crea un nuovo programma di allenamento"
            icon={Plus}
            color="bg-blue-500"
            onClick={() => {/* Navigate to create program */}}
          />
          
          <QuickActionCard
            title="AI Assistant"
            description="Genera contenuti con l'intelligenza artificiale"
            icon={Zap}
            color="bg-purple-500"
            onClick={() => {/* Navigate to AI assistant */}}
            badge="Nuovo"
          />
          
          <QuickActionCard
            title="Analytics"
            description="Visualizza statistiche dettagliate"
            icon={BarChart3}
            color="bg-green-500"
            onClick={() => {/* Navigate to analytics */}}
          />
          
          <QuickActionCard
            title="Gestisci Profilo"
            description="Aggiorna informazioni e impostazioni"
            icon={Settings}
            color="bg-gray-500"
            onClick={() => {/* Navigate to profile */}}
            badge={stats.completamentoProfilo < 100 ? "!" : null}
          />
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Insights & Suggerimenti</h3>
            <p className="text-gray-600">Ottimizza le tue performance con questi consigli</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {stats.programmiPubblicati === 0 && (
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Pubblica il tuo primo programma</p>
                <p className="text-sm text-gray-600">Inizia a guadagnare pubblicando almeno un programma</p>
              </div>
            </div>
          )}
          
          {stats.videocorsi === 0 && stats.programmiTotali > 0 && (
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Aggiungi videocorsi</p>
                <p className="text-sm text-gray-600">I video aumentano le vendite del 40%</p>
              </div>
            </div>
          )}
          
          {stats.conversionRate < 2 && stats.visualizzazioniTotali > 0 && (
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Migliora la conversion rate</p>
                <p className="text-sm text-gray-600">Ottimizza descrizioni e prezzi per convertire meglio</p>
              </div>
            </div>
          )}
          
          {stats.completamentoProfilo < 100 && (
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Completa il profilo</p>
                <p className="text-sm text-gray-600">Profili completi ricevono il 60% di contatti in più</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}