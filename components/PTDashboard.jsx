import React, { useState, useEffect } from 'react';
import { 
  User, 
  FileText,
  Settings,
  Bot,
  BarChart3,
  LogOut,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react';

// Componenti modulari integrati inline per compatibilità ambiente

export default function PTDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Load profile data
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedProfile = localStorage.getItem('bt_profile_data');
        if (savedProfile) {
          setProfileData(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Errore caricamento dati:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Menu navigation items
  const navigationItems = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: BarChart3, 
      color: 'blue'
    },
    { 
      id: 'ai-assistant', 
      label: 'AI Assistant', 
      icon: Bot, 
      color: 'purple',
      badge: 'AI' 
    },
    { 
      id: 'profile', 
      label: 'Profilo', 
      icon: User, 
      color: 'green'
    },
    { 
      id: 'programs', 
      label: 'Programmi', 
      icon: FileText, 
      color: 'orange'
    },
    { 
      id: 'settings', 
      label: 'Impostazioni', 
      icon: Settings, 
      color: 'gray'
    }
  ];

  // Calculate completion stats
  const getCompletionStats = () => {
    const requiredFields = ['nome', 'email', 'telefono', 'bio'];
    const completed = requiredFields.filter(field => {
      const value = profileData[field];
      return value && value.toString().trim().length > 0;
    }).length;

    const hasSpecializations = profileData.specializzazioni?.length > 0;
    const hasPhoto = profileData.fotoProfile ? 1 : 0;
    
    const totalCompleted = completed + (hasSpecializations ? 1 : 0) + hasPhoto;
    const totalRequired = requiredFields.length + 2; // +2 for specializations and photo
    
    return Math.round((totalCompleted / totalRequired) * 100);
  };

  // Get breadcrumb for current view
  const getBreadcrumb = () => {
    const currentItem = navigationItems.find(item => item.id === activeView);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  // Render current component/view
  const renderCurrentComponent = () => {
    switch(activeView) {
      case 'overview':
        return <DashboardOverviewView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'profile':
        return <ProfileManagementView />;
      case 'programs':
        return <ProgramsManagementView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverviewView />;
    }
  };

  // Dashboard Overview Component
  const DashboardOverviewView = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5%
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Programmi Attivi</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-green-600">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">€2,450</p>
            <p className="text-sm text-gray-600">Revenue Totale</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs text-green-600">+8%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">148</p>
            <p className="text-sm text-gray-600">Clienti Attivi</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-xs text-gray-500">4.8/5</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">95%</p>
            <p className="text-sm text-gray-600">Soddisfazione</p>
          </div>
        </div>

        {getCompletionStats() < 100 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Completa il tuo profilo</h3>
                <p className="text-yellow-700 mb-4">
                  Un profilo completo aumenta la fiducia dei clienti e migliora le vendite.
                </p>
                <button
                  onClick={() => setActiveView('profile')}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Completa Profilo
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">🤖 AI Assistant</h3>
              <p className="text-purple-100">Ottimizza i tuoi contenuti con l'intelligenza artificiale</p>
            </div>
            <button
              onClick={() => setActiveView('ai-assistant')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Usa AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // AI Assistant Component
  const AIAssistantView = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-gray-600">Strumenti intelligenti per ottimizzare i tuoi contenuti</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 'bio', name: 'Bio Professionale', icon: User, desc: 'Bio Instagram/social personalizzata' },
          { id: 'program', name: 'Descrizione Programma', icon: FileText, desc: 'Descrizioni che convertono' },
          { id: 'social', name: 'Post Social', icon: Instagram, desc: 'Post Instagram/Facebook coinvolgenti' },
          { id: 'email', name: 'Email Marketing', icon: Mail, desc: 'Email persuasive per clienti' },
          { id: 'testimonial', name: 'Richiesta Testimonianza', icon: CheckCircle, desc: 'Template per richiedere recensioni' },
          { id: 'faq', name: 'FAQ Programmi', icon: Settings, desc: 'Risposte alle domande frequenti' }
        ].map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border hover:border-blue-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.desc}</p>
                </div>
              </div>
              
              <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <span>Genera contenuto</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
          Caratteristiche AI Avanzate
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">6 Personalità AI</h4>
            <p className="text-sm text-gray-600">Template per ogni stile di coaching</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Analisi Profilo</h4>
            <p className="text-sm text-gray-600">Considera specializzazioni ed esperienza</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Domande Smart</h4>
            <p className="text-sm text-gray-600">Contextualizza ogni generazione</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Instant Copy</h4>
            <p className="text-sm text-gray-600">Copia e usa subito ovunque</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Management Component
  const ProfileManagementView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestione Profilo</h2>
        <div className="flex items-center space-x-4">
          <button className="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition-colors">
            Reset
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Salva Tutto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Completamento Profilo</h3>
          <div className="text-sm text-gray-600">{getCompletionStats()}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${getCompletionStats()}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Foto Profilo</h3>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center relative">
            {profileData.fotoProfile ? (
              <img src={profileData.fotoProfile} className="w-full h-full rounded-full object-cover" alt="Profile" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
            <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
              <span className="sr-only">Carica foto</span>
              📷
            </label>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Carica una foto professionale</h4>
            <p className="text-sm text-gray-600">
              Una foto di qualità aumenta la fiducia dei clienti. JPG, PNG (max 5MB)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Base</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
            <input
              type="text"
              value={profileData.nome || ''}
              placeholder="Il tuo nome"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={profileData.email || ''}
              placeholder="la-tua-email@esempio.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
            <input
              type="tel"
              value={profileData.telefono || ''}
              placeholder="+39 123 456 7890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Città</label>
            <input
              type="text"
              value={profileData.citta || ''}
              placeholder="Milano, Roma, ecc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio Professionale</label>
          <textarea
            value={profileData.bio || ''}
            rows={4}
            placeholder="Racconta la tua esperienza, approccio e filosofia di allenamento..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  // Programs Management Component
  const ProgramsManagementView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestione Programmi</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
          ➕ Nuovo Programma
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">+2 questo mese</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-600">Programmi Totali</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600">+12%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">247</p>
          <p className="text-sm text-gray-600">Vendite Totali</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs text-gray-500">Rating medio</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.8</p>
          <p className="text-sm text-gray-600">Soddisfazione</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold">🎥</span>
            </div>
            <span className="text-xs text-gray-500">Videocorsi</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-600">Contenuti Video</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">I Tuoi Programmi</h3>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Nessun programma ancora</h4>
            <p className="text-gray-600 mb-6">
              Crea programmi, videocorsi o contenuti misti per iniziare a vendere
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto">
              ➕ Crea Primo Programma
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Component
  const SettingsView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Impostazioni</h1>
            <p className="text-gray-600">Gestisci il tuo account e le preferenze</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <nav className="space-y-2">
              {[
                { id: 'account', name: 'Account', icon: User },
                { id: 'notifications', name: 'Notifiche', icon: Settings },
                { id: 'privacy', name: 'Privacy', icon: CheckCircle },
                { id: 'payments', name: 'Pagamenti', icon: Settings },
                { id: 'dashboard', name: 'Dashboard', icon: Settings },
                { id: 'danger', name: 'Zona Pericolosa', icon: AlertCircle }
              ].map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className="w-full flex items-center px-3 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 text-left"
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {section.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informazioni Account
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Email Account</h4>
                  <p className="text-sm text-gray-600">{profileData.email || 'Nessuna email configurata'}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Modifica
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Password</h4>
                  <p className="text-sm text-gray-600">Ultima modifica: Mai</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Cambia Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Notifiche Email</h4>
                  <p className="text-sm text-gray-600">Ricevi email per aggiornamenti importanti</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Save status indicator
  const SaveStatusIndicator = () => {
    if (!saveStatus) return null;
    
    return (
      <div className={`flex items-center space-x-2 text-sm ${
        saveStatus === 'saved' ? 'text-green-600' : 
        saveStatus === 'saving' ? 'text-blue-600' : 'text-red-600'
      }`}>
        {saveStatus === 'saving' && (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Salvando...</span>
          </>
        )}
        {saveStatus === 'saved' && (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Salvato</span>
          </>
        )}
        {saveStatus === 'error' && (
          <>
            <AlertCircle className="w-4 h-4" />
            <span>Errore</span>
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } flex-shrink-0`}>
        <div className="p-6">
          {/* Logo & Brand */}
          <div className="flex items-center mb-8">
            {!sidebarCollapsed && (
              <>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">BT</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Best-Trainer</h1>
                  <p className="text-xs text-gray-500">PT Dashboard</p>
                </div>
              </>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                sidebarCollapsed ? 'mx-auto' : 'ml-auto'
              }`}
            >
              {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>

          {/* Profile Summary */}
          {!sidebarCollapsed && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center relative">
                  {profileData.fotoProfile ? (
                    <img 
                      src={profileData.fotoProfile} 
                      className="w-full h-full rounded-full object-cover" 
                      alt="Profile" 
                    />
                  ) : (
                    <User className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {profileData.nome || 'Completa profilo'}
                  </h3>
                  <p className="text-xs text-gray-500">Personal Trainer</p>
                </div>
              </div>
              
              {/* Completion Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Completamento</span>
                  <span className="font-medium">{getCompletionStats()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${getCompletionStats()}%` }}
                  ></div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1 text-xs text-gray-600">
                {profileData.email && (
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-2" />
                    <span className="truncate">{profileData.email}</span>
                  </div>
                )}
                {profileData.telefono && (
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-2" />
                    <span>{profileData.telefono}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {(profileData.instagram || profileData.facebook || profileData.youtube || profileData.sitoWeb) && (
                <div className="flex justify-center space-x-2 mt-3 pt-3 border-t border-gray-200">
                  {profileData.instagram && (
                    <a 
                      href={`https://instagram.com/${profileData.instagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-pink-600 hover:text-pink-800 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.facebook && (
                    <a 
                      href={profileData.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.youtube && (
                    <a 
                      href={profileData.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {profileData.sitoWeb && (
                    <a 
                      href={profileData.sitoWeb} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center transition-all duration-200 ${
                    sidebarCollapsed ? 'justify-center p-3' : 'px-4 py-3'
                  } rounded-lg group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'} ${
                    sidebarCollapsed ? '' : 'mr-3'
                  }`} />
                  
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Badges */}
                      <div className="ml-auto flex items-center space-x-2">
                        {item.badge && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.badge === 'AI' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        
                        {item.id === 'ai-assistant' && (
                          <Sparkles className="w-4 h-4 text-yellow-500" />
                        )}
                        
                        {isActive && (
                          <ChevronRight className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          {!sidebarCollapsed && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <a 
                  href="/" 
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Globe className="w-4 h-4 mr-3" />
                  Visualizza Sito
                </a>
                <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 mr-3" />
                  Esci
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Dashboard</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">{getBreadcrumb()}</span>
              </nav>
              
              {/* Active view indicator */}
              <div className="hidden sm:flex items-center space-x-2">
                {navigationItems.find(item => item.id === activeView) && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                    {React.createElement(
                      navigationItems.find(item => item.id === activeView).icon,
                      { className: "w-4 h-4 text-gray-600" }
                    )}
                    <span className="text-sm text-gray-700">
                      {navigationItems.find(item => item.id === activeView).label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <SaveStatusIndicator />
              
              {/* Quick stats */}
              {activeView === 'overview' && (
                <div className="hidden lg:flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Profilo {getCompletionStats()}% completo</span>
                  </div>
                </div>
              )}
              
              {/* Profile completion alert */}
              {getCompletionStats() < 100 && activeView !== 'profile' && (
                <button
                  onClick={() => setActiveView('profile')}
                  className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Completa profilo</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Error Boundary Wrapper */}
            <div className="min-h-full">
              {renderCurrentComponent()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>© 2024 Best-Trainer</span>
              <span>•</span>
              <span>Dashboard PT v2.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Ultimo salvataggio: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation Overlay */}
      {sidebarCollapsed && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarCollapsed(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white transform transition-transform">
            {/* Same sidebar content for mobile */}
          </div>
        </div>
      )}
    </div>
  );
}