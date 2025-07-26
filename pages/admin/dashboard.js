import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminDashboard from '../../components/AdminDashboard';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  AlertTriangle,
  CheckCircle,
  LogOut
} from 'lucide-react';

// Componente di autenticazione admin
function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Credenziali demo (in produzione usare sistema sicuro)
  const ADMIN_CREDENTIALS = {
    'admin': 'besttrainer2024',
    'supervisor': 'supervisor123',
    'manager': 'manager456'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simula chiamata API
    setTimeout(() => {
      if (ADMIN_CREDENTIALS[credentials.username] === credentials.password) {
        const adminData = {
          username: credentials.username,
          role: credentials.username === 'admin' ? 'Super Admin' : 
                credentials.username === 'supervisor' ? 'Supervisor' : 'Manager',
          loginTime: new Date().toISOString(),
          permissions: credentials.username === 'admin' ? 'full' : 'limited'
        };
        
        // Salva in localStorage (in produzione usare JWT/session sicura)
        localStorage.setItem('admin_session', JSON.stringify(adminData));
        onLogin(adminData);
      } else {
        setError('Credenziali non valide');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Accesso riservato agli amministratori</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Inserisci username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Inserisci password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifica in corso...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Accedi alla Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Credenziali Demo:</h3>
            <div className="text-xs text-yellow-700 space-y-1">
              <div><strong>admin</strong> / besttrainer2024 (Accesso completo)</div>
              <div><strong>supervisor</strong> / supervisor123 (Accesso limitato)</div>
              <div><strong>manager</strong> / manager456 (Accesso base)</div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Accesso protetto da crittografia SSL e autenticazione a due fattori
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente header admin con logout
function AdminHeader({ adminData, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Best-Trainer Admin</h1>
              <p className="text-blue-200 text-sm">Sistema di gestione PT Network</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{adminData.username}</div>
                <div className="text-xs text-blue-200">{adminData.role}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">{adminData.username}</div>
                  <div className="text-xs text-gray-500">{adminData.role}</div>
                </div>
                
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    alert('Funzionalità profilo in sviluppo');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Profilo
                </button>
                
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    alert('Funzionalità impostazioni in sviluppo');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Impostazioni
                </button>
                
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principale della pagina
export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Controlla se c'è una sessione admin attiva
    const checkAuthStatus = () => {
      try {
        const session = localStorage.getItem('admin_session');
        if (session) {
          const data = JSON.parse(session);
          // Verifica se la sessione è ancora valida (es. non scaduta)
          const loginTime = new Date(data.loginTime);
          const now = new Date();
          const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
          
          if (hoursSinceLogin < 8) { // Sessione valida per 8 ore
            setAdminData(data);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin_session');
          }
        }
      } catch (error) {
        console.error('Errore nel controllo autenticazione:', error);
        localStorage.removeItem('admin_session');
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (adminData) => {
    setAdminData(adminData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setAdminData(null);
    setIsAuthenticated(false);
    router.push('/'); // Redirect alla home
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifica autenticazione...</p>
        </div>
      </div>
    );
  }

  // Se non autenticato, mostra login
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login - Best-Trainer</title>
          <meta name="description" content="Accesso riservato agli amministratori Best-Trainer" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <AdminLogin onLogin={handleLogin} />
      </>
    );
  }

  // Se autenticato, mostra dashboard
  return (
    <>
      <Head>
        <title>Admin Dashboard - Gestione PT Network | Best-Trainer</title>
        <meta name="description" content="Dashboard amministrativa per la gestione delle richieste Personal Trainer" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Security Headers per admin */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <AdminHeader adminData={adminData} onLogout={handleLogout} />
        
        {/* Success notification per login */}
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-green-700 text-sm">
                <strong>Accesso effettuato con successo!</strong> Benvenuto nella dashboard admin, {adminData.username}.
                <span className="ml-2 text-xs">
                  Login: {new Date(adminData.loginTime).toLocaleString('it-IT')}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Permission notice per ruoli limitati */}
        {adminData.permissions !== 'full' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                <p className="text-yellow-700 text-sm">
                  <strong>Accesso limitato:</strong> Il tuo ruolo ({adminData.role}) ha permessi limitati. 
                  Alcune funzionalità potrebbero non essere disponibili.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Component */}
        <AdminDashboard adminData={adminData} />

        {/* Footer admin */}
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                © 2024 Best-Trainer Admin Panel. Sistema sicuro protetto.
              </div>
              <div className="flex items-center space-x-4">
                <span>Sessione attiva: {adminData.username}</span>
                <span>•</span>
                <span>Ultima attività: {new Date().toLocaleTimeString('it-IT')}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}