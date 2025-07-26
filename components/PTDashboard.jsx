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

// Import dei componenti completi
import DashboardOverview from './dashboard/DashboardOverview';
import ProfileManagement from './ProfileManagement';
import ProgramsManagement from './ProgramsManagement';
import SettingsPanel from './SettingsPanel';
import AIAssistantPotenziata from './AIAssistantPotenziata';

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

  // Update profile data when changed by components
  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData);
  };

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

  // Calculate completion stats (aligned with ProfileManagement.jsx)
  const getCompletionStats = () => {
    const requiredFields = ['nome', 'email', 'telefono', 'bio', 'anniEsperienza'];
    const optionalFields = ['cognome', 'citta', 'sitoWeb', 'instagram', 'slogan'];
    
    const requiredCompleted = requiredFields.filter(field => {
      const value = profileData[field];
      return value && value.toString().trim().length > 0;
    }).length;
    
    const optionalCompleted = optionalFields.filter(field => {
      const value = profileData[field];
      return value && value.toString().trim().length > 0;
    }).length;
    
    const specializations = profileData.specializzazioni?.length || 0;
    const certifications = profileData.certificazioni?.length || 0;
    const hasPhoto = profileData.fotoProfile ? 1 : 0;
    
    const totalRequired = requiredFields.length;
    const totalOptional = optionalFields.length + 3; // +3 for spec, cert, photo
    
    const requiredPercentage = Math.round((requiredCompleted / totalRequired) * 100);
    const overallCompleted = requiredCompleted + optionalCompleted + Math.min(specializations, 1) + Math.min(certifications, 1) + hasPhoto;
    const overallTotal = totalRequired + totalOptional;
    const overallPercentage = Math.round((overallCompleted / overallTotal) * 100);
    
    return {
      required: requiredPercentage,
      overall: overallPercentage,
      percentage: overallPercentage, // For backward compatibility
      missing: requiredFields.filter(field => !profileData[field]?.toString().trim()),
      level: overallPercentage >= 90 ? 'expert' : overallPercentage >= 70 ? 'advanced' : overallPercentage >= 50 ? 'intermediate' : 'beginner'
    };
  };

  // Get breadcrumb for current view
  const getBreadcrumb = () => {
    const currentItem = navigationItems.find(item => item.id === activeView);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  // Render current component/view
  const renderCurrentComponent = () => {
    const completionStats = getCompletionStats();
    
    switch(activeView) {
      case 'overview':
        return (
          <DashboardOverview 
            profileData={profileData}
            onNavigate={setActiveView}
            completionStats={completionStats}
          />
        );
      case 'ai-assistant':
        return (
          <AIAssistantPotenziata 
            profileData={profileData}
          />
        );
      case 'profile':
        return (
          <ProfileManagement 
            profileData={profileData}
            onProfileUpdate={handleProfileUpdate}
            completionStats={completionStats}
          />
        );
      case 'programs':
        return (
          <ProgramsManagement 
            profileData={profileData}
          />
        );
      case 'settings':
        return (
          <SettingsPanel 
            profileData={profileData}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      default:
        return (
          <DashboardOverview 
            profileData={profileData}
            onNavigate={setActiveView}
            completionStats={completionStats}
          />
        );
    }
  };

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

  const completionStats = getCompletionStats();

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
                  <span className="font-medium">{completionStats.overall}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${completionStats.overall}%` }}
                  ></div>
                </div>
                <div className="flex items-center mt-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    completionStats.level === 'expert' ? 'bg-green-500' :
                    completionStats.level === 'advanced' ? 'bg-blue-500' :
                    completionStats.level === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs text-gray-600 capitalize">
                    {completionStats.level}
                  </span>
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
                    <span>Profilo {completionStats.overall}% completo</span>
                  </div>
                </div>
              )}
              
              {/* Profile completion alert */}
              {completionStats.overall < 100 && activeView !== 'profile' && (
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
      {sidebarCollapsed && window.innerWidth < 1024 && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarCollapsed(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white transform transition-transform">
            {/* Mobile sidebar content would go here */}
          </div>
        </div>
      )}
    </div>
  );
}