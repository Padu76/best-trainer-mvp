import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle, 
  Google,
  Facebook,
  Apple
} from 'lucide-react';

const AuthSystem = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
    newsletter: true
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email richiesta';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }

    // Password validation
    if (!formData.password && authMode !== 'forgot') {
      newErrors.password = 'Password richiesta';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password deve essere di almeno 6 caratteri';
    }

    // Registration specific validations
    if (authMode === 'register') {
      if (!formData.firstName) {
        newErrors.firstName = 'Nome richiesto';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Cognome richiesto';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Le password non coincidono';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Devi accettare i termini e condizioni';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      if (authMode === 'login') {
        // Redirect to dashboard
        window.location.href = '/user/dashboard';
      } else if (authMode === 'register') {
        // Show success message and switch to login
        alert('Registrazione completata! Controlla la tua email per verificare l\'account.');
        setAuthMode('login');
      } else if (authMode === 'forgot') {
        // Show success message
        alert('Email di reset inviata! Controlla la tua casella di posta.');
        setAuthMode('login');
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    alert(`Login con ${provider} - Funzionalità in sviluppo`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex">
      {/* Left Panel - Info/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative text-white text-center max-w-md">
          <h1 className="text-4xl font-bold mb-6">Benvenuto in <span className="text-blue-300">Best-Trainer</span></h1>
          
          {authMode === 'login' && (
            <>
              <p className="text-xl text-blue-100 mb-8">
                Accedi al tuo account per continuare il tuo percorso di fitness
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Accesso a tutti i tuoi programmi</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Tracciamento progressi</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Download illimitati</span>
                </div>
              </div>
            </>
          )}
          
          {authMode === 'register' && (
            <>
              <p className="text-xl text-blue-100 mb-8">
                Unisciti a migliaia di persone che hanno trasformato il loro corpo
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>500+ programmi professionali</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Personal Trainer certificati</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Risultati garantiti</span>
                </div>
              </div>
            </>
          )}
          
          {authMode === 'forgot' && (
            <>
              <p className="text-xl text-blue-100 mb-8">
                Non preoccuparti, recuperare l'accesso è semplice
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Reset sicuro via email</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Accesso immediato</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>Supporto 24/7</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <a href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Best-Trainer
            </a>
            <p className="text-gray-600 mt-2">
              {authMode === 'login' && 'Accedi al tuo account'}
              {authMode === 'register' && 'Crea il tuo account'}
              {authMode === 'forgot' && 'Recupera la password'}
            </p>
          </div>

          {/* Social Login Buttons */}
          {authMode !== 'forgot' && (
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Google className="h-5 w-5 mr-3 text-red-500" />
                <span className="text-gray-700 font-medium">
                  {authMode === 'login' ? 'Accedi' : 'Registrati'} con Google
                </span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Apple className="h-5 w-5 text-gray-900" />
                </button>
              </div>
            </div>
          )}

          {/* Divider */}
          {authMode !== 'forgot' && (
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">oppure</span>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Registration Fields */}
            {authMode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <div className="relative">
                    <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Mario"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Rossi"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="mario.rossi@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Fields */}
            {authMode !== 'forgot' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {authMode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conferma Password *</label>
                    <div className="relative">
                      <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}
              </>
            )}

            {/* Registration Checkboxes */}
            {authMode === 'register' && (
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                    Accetto i <a href="/terms" className="text-blue-600 hover:text-blue-500">Termini e Condizioni</a> e la <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a> *
                  </label>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                    Iscrivimi alla newsletter per ricevere aggiornamenti e offerte esclusive
                  </label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {authMode === 'login' && 'Accedi'}
                  {authMode === 'register' && 'Crea Account'}
                  {authMode === 'forgot' && 'Invia Email'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            {authMode === 'login' && (
              <>
                <button
                  onClick={() => setAuthMode('forgot')}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  Password dimenticata?
                </button>
                <p className="text-gray-600 text-sm">
                  Non hai un account?{' '}
                  <button
                    onClick={() => setAuthMode('register')}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Registrati qui
                  </button>
                </p>
              </>
            )}

            {authMode === 'register' && (
              <p className="text-gray-600 text-sm">
                Hai già un account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Accedi qui
                </button>
              </p>
            )}

            {authMode === 'forgot' && (
              <p className="text-gray-600 text-sm">
                Ricordi la password?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Torna al login
                </button>
              </p>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>Sicuro al 100%</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>Dati protetti</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;