import React, { useState, useEffect } from 'react';
import { 
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  BarChart3,
  Link2,
  AlertTriangle,
  Key,
  Mail,
  Phone,
  Globe,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  UserX,
  Save,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Languages,
  DollarSign,
  Calendar,
  Instagram,
  Facebook,
  Youtube,
  Zap,
  RefreshCw,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  X,
  Check,
  Info
} from 'lucide-react';

export default function SettingsPanel() {
  const [activeSection, setActiveSection] = useState('account');
  const [saveStatus, setSaveStatus] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    account: {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false,
      backupEmail: ''
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      newSales: true,
      newReviews: true,
      marketing: false,
      weeklyReport: true,
      monthlyReport: true,
      systemUpdates: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      showSocial: true,
      indexProfile: true,
      allowMessages: true,
      showOnlineStatus: true,
      dataAnalytics: true
    },
    payments: {
      defaultMethod: '',
      autoWithdraw: false,
      withdrawThreshold: 100,
      currency: 'EUR',
      taxRegion: 'IT',
      vatNumber: '',
      invoiceEmail: ''
    },
    dashboard: {
      theme: 'light',
      language: 'it',
      timezone: 'Europe/Rome',
      currency: 'EUR',
      startPage: 'overview',
      compactMode: false,
      animations: true
    },
    integrations: {
      instagramConnected: false,
      facebookConnected: false,
      youtubeConnected: false,
      googleCalendarConnected: false,
      mailchimpConnected: false,
      zapierConnected: false
    }
  });

  const [profileData, setProfileData] = useState({});

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('bt_settings_data');
    const savedProfile = localStorage.getItem('bt_profile_data');
    
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Errore caricamento impostazioni:', error);
      }
    }
    
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
        setSettings(prev => ({
          ...prev,
          account: {
            ...prev.account,
            email: JSON.parse(savedProfile).email || ''
          }
        }));
      } catch (error) {
        console.error('Errore caricamento profilo:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings = settings) => {
    try {
      localStorage.setItem('bt_settings_data', JSON.stringify(newSettings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Errore salvataggio impostazioni:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Handle setting changes
  const handleSettingChange = (section, key, value) => {
    setSaveStatus('saving');
    const newSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value
      }
    };
    setSettings(newSettings);
    
    setTimeout(() => {
      saveSettings(newSettings);
    }, 500);
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (settings.account.newPassword !== settings.account.confirmPassword) {
      alert('Le password non coincidono');
      return;
    }
    
    if (settings.account.newPassword.length < 8) {
      alert('La password deve essere di almeno 8 caratteri');
      return;
    }

    // Simulate password change
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setShowPasswordForm(false);
      setSettings(prev => ({
        ...prev,
        account: {
          ...prev.account,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      }));
      alert('Password cambiata con successo!');
    }, 1000);
  };

  // Handle integrations
  const handleIntegrationToggle = (integration) => {
    const newStatus = !settings.integrations[integration];
    
    if (newStatus) {
      // Simulate connection process
      setSaveStatus('saving');
      setTimeout(() => {
        handleSettingChange('integrations', integration, true);
        alert(`${integration} connesso con successo!`);
      }, 2000);
    } else {
      setShowConfirmDialog({
        type: 'disconnect',
        integration,
        title: `Disconnetti ${integration}?`,
        message: 'Perderai l\'accesso alle funzionalità integrate.',
        onConfirm: () => {
          handleSettingChange('integrations', integration, false);
          setShowConfirmDialog(null);
        }
      });
    }
  };

  // Handle dangerous actions
  const handleDangerousAction = (action) => {
    const actions = {
      resetData: {
        title: 'Reset Tutti i Dati',
        message: 'Questa azione eliminerà TUTTI i tuoi dati: profilo, programmi, impostazioni. Azione irreversibile!',
        onConfirm: () => {
          localStorage.clear();
          alert('Tutti i dati sono stati eliminati. La pagina verrà ricaricata.');
          window.location.reload();
        }
      },
      deleteAccount: {
        title: 'Elimina Account Definitivamente',
        message: 'Il tuo account verrà eliminato permanentemente insieme a tutti i programmi e dati. Questa azione NON può essere annullata!',
        onConfirm: () => {
          localStorage.clear();
          alert('Account eliminato. Verrai reindirizzato alla homepage.');
          window.location.href = '/';
        }
      },
      exportData: {
        title: 'Esporta Tutti i Dati',
        message: 'Scaricherai un file JSON con tutti i tuoi dati.',
        onConfirm: () => {
          const allData = {
            profile: JSON.parse(localStorage.getItem('bt_profile_data') || '{}'),
            programs: JSON.parse(localStorage.getItem('bt_programs_data') || '[]'),
            settings: JSON.parse(localStorage.getItem('bt_settings_data') || '{}'),
            exportDate: new Date().toISOString()
          };
          
          const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `best-trainer-data-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          setShowConfirmDialog(null);
          alert('Dati esportati con successo!');
        }
      }
    };

    setShowConfirmDialog({
      type: action,
      ...actions[action]
    });
  };

  const sections = [
    { id: 'account', name: 'Account', icon: User, color: 'blue' },
    { id: 'notifications', name: 'Notifiche', icon: Bell, color: 'yellow' },
    { id: 'privacy', name: 'Privacy', icon: Shield, color: 'green' },
    { id: 'payments', name: 'Pagamenti', icon: CreditCard, color: 'purple' },
    { id: 'dashboard', name: 'Dashboard', icon: Palette, color: 'pink' },
    { id: 'integrations', name: 'Integrazioni', icon: Link2, color: 'indigo' },
    { id: 'danger', name: 'Zona Pericolosa', icon: AlertTriangle, color: 'red' }
  ];

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
            <span>Errore salvataggio</span>
          </>
        )}
      </div>
    );
  };

  // Debug per verificare activeSection
  console.log('Active Section:', activeSection);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Impostazioni</h1>
              <p className="text-gray-600">Gestisci il tuo account e le preferenze</p>
            </div>
          </div>
          <SaveStatusIndicator />
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const colors = {
                    blue: 'bg-blue-100 text-blue-700',
                    yellow: 'bg-yellow-100 text-yellow-700',
                    green: 'bg-green-100 text-green-700',
                    purple: 'bg-purple-100 text-purple-700',
                    pink: 'bg-pink-100 text-pink-700',
                    indigo: 'bg-indigo-100 text-indigo-700',
                    red: 'bg-red-100 text-red-700'
                  };
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        console.log('Clicked section:', section.id); // Debug click
                        setActiveSection(section.id);
                      }}
                      className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors text-left ${
                        activeSection === section.id
                          ? `${colors[section.color]} font-medium`
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {section.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Debug indicator */}
            <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
              Sezione attiva: {activeSection}
            </div>

            {/* Account Settings */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informazioni Account
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Account</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="email"
                          value={settings.account.email}
                          onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Verifica
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email di Backup</label>
                      <input
                        type="email"
                        value={settings.account.backupEmail}
                        onChange={(e) => handleSettingChange('account', 'backupEmail', e.target.value)}
                        placeholder="email-backup@esempio.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Settings */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      Sicurezza
                    </h3>
                  </div>

                  {!showPasswordForm ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Password</h4>
                          <p className="text-sm text-gray-600">Ultima modifica: Mai</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordForm(true)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Cambia Password
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Autenticazione a Due Fattori</h4>
                          <p className="text-sm text-gray-600">Proteggi il tuo account con 2FA</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.account.twoFactorEnabled}
                            onChange={(e) => handleSettingChange('account', 'twoFactorEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Attuale</label>
                        <input
                          type="password"
                          value={settings.account.currentPassword}
                          onChange={(e) => handleSettingChange('account', 'currentPassword', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nuova Password</label>
                        <input
                          type="password"
                          value={settings.account.newPassword}
                          onChange={(e) => handleSettingChange('account', 'newPassword', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Conferma Nuova Password</label>
                        <input
                          type="password"
                          value={settings.account.confirmPassword}
                          onChange={(e) => handleSettingChange('account', 'confirmPassword', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={handlePasswordChange}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Cambia Password
                        </button>
                        <button
                          onClick={() => setShowPasswordForm(false)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Annulla
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Gestione Notifiche
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Canali di Notifica</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email', desc: 'Notifiche via email', icon: Mail },
                        { key: 'push', label: 'Push', desc: 'Notifiche browser/app', icon: Smartphone },
                        { key: 'sms', label: 'SMS', desc: 'Messaggi di testo (premium)', icon: Phone }
                      ].map(({ key, label, desc, icon: Icon }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <Icon className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <h5 className="font-medium text-gray-900">{label}</h5>
                              <p className="text-sm text-gray-600">{desc}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[key]}
                              onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Tipi di Notifica</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'newSales', label: 'Nuove Vendite', desc: 'Quando qualcuno acquista un programma' },
                        { key: 'newReviews', label: 'Nuove Recensioni', desc: 'Recensioni sui tuoi programmi' },
                        { key: 'weeklyReport', label: 'Report Settimanale', desc: 'Statistiche vendite e performance' },
                        { key: 'monthlyReport', label: 'Report Mensile', desc: 'Riepilogo completo del mese' },
                        { key: 'marketing', label: 'Marketing & Promozioni', desc: 'Novità e offerte da Best-Trainer' },
                        { key: 'systemUpdates', label: 'Aggiornamenti Sistema', desc: 'Nuove funzionalità e manutenzioni' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-900">{label}</h5>
                            <p className="text-sm text-gray-600">{desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[key]}
                              onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy e Visibilità
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Visibilità Profilo</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'profileVisible', label: 'Profilo Pubblico', desc: 'Il tuo profilo è visibile agli utenti', icon: Eye },
                        { key: 'showEmail', label: 'Mostra Email', desc: 'Email visibile nel profilo pubblico', icon: Mail },
                        { key: 'showPhone', label: 'Mostra Telefono', desc: 'Numero visibile nel profilo pubblico', icon: Phone },
                        { key: 'showSocial', label: 'Mostra Social', desc: 'Link social nel profilo pubblico', icon: Instagram },
                        { key: 'indexProfile', label: 'Indicizzazione SEO', desc: 'Permetti ai motori di ricerca di indicizzare', icon: Globe }
                      ].map(({ key, label, desc, icon: Icon }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <Icon className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <h5 className="font-medium text-gray-900">{label}</h5>
                              <p className="text-sm text-gray-600">{desc}</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy[key]}
                              onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Interazioni</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'allowMessages', label: 'Messaggi Diretti', desc: 'Permetti ai clienti di contattarti direttamente' },
                        { key: 'showOnlineStatus', label: 'Stato Online', desc: 'Mostra quando sei online' },
                        { key: 'dataAnalytics', label: 'Analytics Dati', desc: 'Permetti analisi anonime per migliorare il servizio' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-900">{label}</h5>
                            <p className="text-sm text-gray-600">{desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy[key]}
                              onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeSection === 'payments' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Metodi di Pagamento
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <CreditCard className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 mb-4">Nessun metodo di pagamento configurato</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Aggiungi Metodo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Prelievi e Commissioni</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Prelievo Automatico</h4>
                        <p className="text-sm text-gray-600">Preleva automaticamente quando raggiungi la soglia</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.payments.autoWithdraw}
                          onChange={(e) => handleSettingChange('payments', 'autoWithdraw', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Soglia Prelievo (€)</label>
                      <input
                        type="number"
                        min="50"
                        max="1000"
                        value={settings.payments.withdrawThreshold}
                        onChange={(e) => handleSettingChange('payments', 'withdrawThreshold', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partita IVA</label>
                      <input
                        type="text"
                        value={settings.payments.vatNumber}
                        onChange={(e) => handleSettingChange('payments', 'vatNumber', e.target.value)}
                        placeholder="IT12345678901"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Fatturazione</label>
                      <input
                        type="email"
                        value={settings.payments.invoiceEmail}
                        onChange={(e) => handleSettingChange('payments', 'invoiceEmail', e.target.value)}
                        placeholder="fatturazione@tuazienda.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard Settings */}
            {activeSection === 'dashboard' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Preferenze Dashboard
                </h3>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'light', label: 'Chiaro', icon: Sun },
                          { value: 'dark', label: 'Scuro', icon: Moon },
                          { value: 'auto', label: 'Auto', icon: Monitor }
                        ].map(({ value, label, icon: Icon }) => (
                          <button
                            key={value}
                            onClick={() => handleSettingChange('dashboard', 'theme', value)}
                            className={`p-3 border rounded-lg flex flex-col items-center transition-colors ${
                              settings.dashboard.theme === value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-5 h-5 mb-1" />
                            <span className="text-xs">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lingua</label>
                      <select
                        value={settings.dashboard.language}
                        onChange={(e) => handleSettingChange('dashboard', 'language', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="it">Italiano</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Orario</label>
                      <select
                        value={settings.dashboard.timezone}
                        onChange={(e) => handleSettingChange('dashboard', 'timezone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Europe/Rome">Europe/Rome (GMT+1)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Valuta</label>
                      <select
                        value={settings.dashboard.currency}
                        onChange={(e) => handleSettingChange('dashboard', 'currency', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'compactMode', label: 'Modalità Compatta', desc: 'Interfaccia più densa' },
                      { key: 'animations', label: 'Animazioni', desc: 'Abilita animazioni interfaccia' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{label}</h4>
                          <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.dashboard[key]}
                            onChange={(e) => handleSettingChange('dashboard', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeSection === 'integrations' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Link2 className="w-5 h-5 mr-2" />
                  Integrazioni
                </h3>

                <div className="space-y-4">
                  {[
                    { key: 'instagramConnected', name: 'Instagram', desc: 'Sincronizza post e statistiche', icon: Instagram, color: 'bg-pink-500' },
                    { key: 'facebookConnected', name: 'Facebook', desc: 'Gestisci pagina e inserzioni', icon: Facebook, color: 'bg-blue-600' },
                    { key: 'youtubeConnected', name: 'YouTube', desc: 'Carica e gestisci video', icon: Youtube, color: 'bg-red-600' },
                    { key: 'googleCalendarConnected', name: 'Google Calendar', desc: 'Sincronizza appuntamenti', icon: Calendar, color: 'bg-green-600' },
                    { key: 'mailchimpConnected', name: 'Mailchimp', desc: 'Email marketing automatico', icon: Mail, color: 'bg-yellow-500' },
                    { key: 'zapierConnected', name: 'Zapier', desc: 'Automazioni avanzate', icon: Zap, color: 'bg-orange-500' }
                  ].map(({ key, name, desc, icon: Icon, color }) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mr-4`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{name}</h4>
                          <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleIntegrationToggle(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          settings.integrations[key]
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {settings.integrations[key] ? 'Disconnetti' : 'Connetti'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-red-900 mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Zona Pericolosa
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-900">Esporta Tutti i Dati</h4>
                      <p className="text-sm text-red-700">Scarica un backup completo dei tuoi dati</p>
                    </div>
                    <button
                      onClick={() => handleDangerousAction('exportData')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Esporta
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-900">Reset Tutti i Dati</h4>
                      <p className="text-sm text-red-700">Elimina tutti i dati e ricomincia da zero</p>
                    </div>
                    <button
                      onClick={() => handleDangerousAction('resetData')}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Dati
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-900">Elimina Account</h4>
                      <p className="text-sm text-red-700">Elimina permanentemente il tuo account e tutti i dati</p>
                    </div>
                    <button
                      onClick={() => handleDangerousAction('deleteAccount')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Elimina Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{showConfirmDialog.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{showConfirmDialog.message}</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={showConfirmDialog.onConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}