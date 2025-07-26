import React, { useState, useEffect } from 'react';
import { 
  User,
  Camera,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  TrendingUp,
  Zap,
  RefreshCw,
  Upload,
  X,
  Check,
  Edit,
  ExternalLink,
  Copy,
  Share2,
  Download,
  Image,
  AlertTriangle,
  Info,
  Target,
  Calendar,
  Clock,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function ProfileManagement() {
  const [profileData, setProfileData] = useState({
    // Informazioni base
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    regione: '',
    dataNascita: '',
    
    // Esperienza professionale
    anniEsperienza: 0,
    bio: '',
    specializzazioni: [],
    certificazioni: [],
    lingueParlate: [],
    
    // Foto e media
    fotoProfile: null,
    fotoCopertina: null,
    videoPresentation: null,
    
    // Contatti e social
    email2: '', // Email secondaria
    sitoWeb: '',
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    tiktok: '',
    
    // Preferenze business
    prezzoMedioOra: 0,
    disponibilitaOnline: true,
    disponibilitaPresenza: true,
    raggio_km: 20,
    
    // Campi aggiuntivi
    slogan: '',
    obiettivi: '',
    metodiAllenamento: [],
    targetCliente: []
  });

  const [saveStatus, setSaveStatus] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [profileErrors, setProfileErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [completionStats, setCompletionStats] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  // Opzioni predefinite
  const specializzazioniDisponibili = [
    'Bodybuilding', 'Powerlifting', 'Crossfit', 'Functional Training',
    'Dimagrimento', 'Tonificazione', 'Yoga', 'Pilates', 'Cardio',
    'Preparazione Atletica', 'Riabilitazione', 'Posturale',
    'Ciclismo', 'Nuoto', 'Triathlon', 'Alimentazione', 'Endurance', 
    'Corsa', 'Calcio', 'Tennis', 'Boxe', 'Arti Marziali'
  ];

  const metodiAllenamentoOptions = [
    'HIIT', 'Circuit Training', 'Superserie', 'Drop Set',
    'Rest-Pause', 'Piramidale', 'Cluster Training', 'Isometrico',
    'Concentrico', 'Eccentrico', 'Plyometrico', 'Tabata'
  ];

  const targetClienteOptions = [
    'Principianti', 'Intermedi', 'Avanzati', 'Atleti',
    'Donne', 'Uomini', 'Over 50', 'Adolescenti',
    'Riabilitazione', 'Post-gravidanza', 'Terza età'
  ];

  const lingueParlateOptions = [
    'Italiano', 'Inglese', 'Francese', 'Spagnolo', 
    'Tedesco', 'Portoghese', 'Russo', 'Arabo'
  ];

  // Carica dati dal localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('bt_profile_data');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('Errore nel caricamento del profilo:', error);
      }
    }
  }, []);

  // Calcola stats completamento
  useEffect(() => {
    const requiredFields = [
      'nome', 'email', 'telefono', 'bio', 'anniEsperienza'
    ];
    const optionalFields = [
      'cognome', 'citta', 'sitoWeb', 'instagram', 'slogan'
    ];
    
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
    const totalOptional = optionalFields.length + 3; // +3 per spec, cert, photo
    
    const requiredPercentage = Math.round((requiredCompleted / totalRequired) * 100);
    const overallCompleted = requiredCompleted + optionalCompleted + Math.min(specializations, 1) + Math.min(certifications, 1) + hasPhoto;
    const overallTotal = totalRequired + totalOptional;
    const overallPercentage = Math.round((overallCompleted / overallTotal) * 100);
    
    setCompletionStats({
      required: requiredPercentage,
      overall: overallPercentage,
      missing: requiredFields.filter(field => !profileData[field]?.toString().trim()),
      level: overallPercentage >= 90 ? 'expert' : overallPercentage >= 70 ? 'advanced' : overallPercentage >= 50 ? 'intermediate' : 'beginner'
    });
  }, [profileData]);

  // Salvataggio
  const saveProfileToLocalStorage = (data) => {
    try {
      localStorage.setItem('bt_profile_data', JSON.stringify(data));
      setSaveStatus('saved');
      setLastSaved(new Date());
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Errore nel salvataggio profilo:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Validazione
  const validateField = (field, value) => {
    const errors = { ...profileErrors };
    
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          errors.email = 'Email non valida';
        } else {
          delete errors.email;
        }
        break;
      case 'telefono':
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (value && !phoneRegex.test(value)) {
          errors.telefono = 'Numero di telefono non valido';
        } else {
          delete errors.telefono;
        }
        break;
      case 'nome':
        if (!value || value.trim().length < 2) {
          errors.nome = 'Nome richiesto (min 2 caratteri)';
        } else {
          delete errors.nome;
        }
        break;
      case 'sitoWeb':
        if (value && !value.match(/^https?:\/\/.+/)) {
          errors.sitoWeb = 'URL deve iniziare con http:// o https://';
        } else {
          delete errors.sitoWeb;
        }
        break;
      case 'prezzoMedioOra':
        if (value && (value < 10 || value > 200)) {
          errors.prezzoMedioOra = 'Prezzo deve essere tra 10€ e 200€';
        } else {
          delete errors.prezzoMedioOra;
        }
        break;
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Gestione aggiornamenti
  const handleProfileUpdate = (field, value) => {
    setSaveStatus('saving');
    validateField(field, value);
    
    const updatedProfile = { ...profileData, [field]: value };
    setProfileData(updatedProfile);
    
    setTimeout(() => {
      saveProfileToLocalStorage(updatedProfile);
    }, 500);
  };

  // Gestione array
  const handleArrayToggle = (field, item) => {
    setSaveStatus('saving');
    
    const currentArray = profileData[field] || [];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    
    const updatedProfile = { ...profileData, [field]: updatedArray };
    setProfileData(updatedProfile);
    saveProfileToLocalStorage(updatedProfile);
  };

  const handleArrayItemChange = (field, index, value) => {
    setSaveStatus('saving');
    
    const updatedArray = [...(profileData[field] || [])];
    if (value) {
      updatedArray[index] = value;
    } else {
      updatedArray.splice(index, 1);
    }
    
    const updatedProfile = {
      ...profileData,
      [field]: updatedArray.filter(item => item.trim())
    };
    
    setProfileData(updatedProfile);
    saveProfileToLocalStorage(updatedProfile);
  };

  const addArrayItem = (field) => {
    const updatedProfile = {
      ...profileData,
      [field]: [...(profileData[field] || []), '']
    };
    setProfileData(updatedProfile);
  };

  // Upload file
  const handleFileUpload = (type, file) => {
    if (!file) return;

    setSaveStatus('saving');
    
    const maxSize = type === 'fotoProfile' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB per foto, 10MB per video
    
    if (file.size > maxSize) {
      alert(`File troppo grande. Max ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    if (type === 'fotoProfile' || type === 'fotoCopertina') {
      if (!file.type.startsWith('image/')) {
        alert('Seleziona solo file immagine');
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedProfile = { ...profileData, [type]: e.target.result };
      setProfileData(updatedProfile);
      saveProfileToLocalStorage(updatedProfile);
    };
    reader.readAsDataURL(file);
  };

  // Export profilo
  const exportProfile = () => {
    const exportData = {
      ...profileData,
      exportDate: new Date().toISOString(),
      completionStats
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profilo-${profileData.nome || 'personal-trainer'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset profilo
  const resetProfile = () => {
    if (confirm('Sei sicuro di voler resettare tutti i dati del profilo?')) {
      setProfileData({
        nome: '', cognome: '', email: '', telefono: '', citta: '', regione: '',
        dataNascita: '', anniEsperienza: 0, bio: '', specializzazioni: [],
        certificazioni: [], lingueParlate: [], fotoProfile: null, fotoCopertina: null,
        videoPresentation: null, email2: '', sitoWeb: '', instagram: '', facebook: '',
        youtube: '', linkedin: '', tiktok: '', prezzoMedioOra: 0, disponibilitaOnline: true,
        disponibilitaPresenza: true, raggio_km: 20, slogan: '', obiettivi: '',
        metodiAllenamento: [], targetCliente: []
      });
      setProfileErrors({});
      localStorage.removeItem('bt_profile_data');
      setSaveStatus('');
    }
  };

  const sections = [
    { id: 'basic', name: 'Info Base', icon: User, fields: ['nome', 'cognome', 'email', 'telefono'] },
    { id: 'experience', name: 'Esperienza', icon: Award, fields: ['anniEsperienza', 'bio', 'certificazioni'] },
    { id: 'specializations', name: 'Specializzazioni', icon: Target, fields: ['specializzazioni', 'metodiAllenamento'] },
    { id: 'media', name: 'Foto & Media', icon: Camera, fields: ['fotoProfile', 'fotoCopertina'] },
    { id: 'contacts', name: 'Contatti', icon: Globe, fields: ['sitoWeb', 'instagram', 'facebook'] },
    { id: 'business', name: 'Business', icon: TrendingUp, fields: ['prezzoMedioOra', 'disponibilitaOnline'] }
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
            <span>Salvato {lastSaved && `alle ${lastSaved.toLocaleTimeString()}`}</span>
          </>
        )}
        {saveStatus === 'error' && (
          <>
            <AlertCircle className="w-4 h-4" />
            <span>Errore nel salvataggio</span>
          </>
        )}
      </div>
    );
  };

  const CompletionProgress = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Completamento Profilo</h3>
        <div className="flex items-center space-x-4">
          <SaveStatusIndicator />
          <div className="flex space-x-2">
            <button
              onClick={exportProfile}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Campi Obbligatori</span>
            <span className="text-sm text-gray-600">{completionStats.required}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                completionStats.required >= 100 ? 'bg-green-500' : 
                completionStats.required >= 80 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${completionStats.required}%` }}
            ></div>
          </div>
          {completionStats.missing?.length > 0 && (
            <p className="text-xs text-red-600 mt-1">
              Mancanti: {completionStats.missing.join(', ')}
            </p>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completamento Generale</span>
            <span className="text-sm text-gray-600">{completionStats.overall}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${completionStats.overall}%` }}
            ></div>
          </div>
          <div className="flex items-center mt-2">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              completionStats.level === 'expert' ? 'bg-green-500' :
              completionStats.level === 'advanced' ? 'bg-blue-500' :
              completionStats.level === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-600 capitalize">
              Livello: {completionStats.level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestione Profilo</h2>
          <p className="text-gray-600">Completa il tuo profilo per massimizzare le opportunità</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={resetProfile}
            className="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={() => saveProfileToLocalStorage(profileData)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Salva Tutto
          </button>
        </div>
      </div>

      <CompletionProgress />

      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex space-x-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            const sectionCompleted = section.fields.every(field => {
              if (Array.isArray(profileData[field])) {
                return profileData[field].length > 0;
              }
              return profileData[field] && profileData[field].toString().trim().length > 0;
            });
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {section.name}
                {sectionCompleted && activeSection !== section.id && (
                  <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Basic Info */}
      {activeSection === 'basic' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Base</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={profileData.nome}
                  onChange={(e) => handleProfileUpdate('nome', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    profileErrors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Il tuo nome"
                />
                {profileErrors.nome && (
                  <p className="text-red-500 text-xs mt-1">{profileErrors.nome}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
                <input
                  type="text"
                  value={profileData.cognome}
                  onChange={(e) => handleProfileUpdate('cognome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Il tuo cognome"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    profileErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="la-tua-email@esempio.com"
                />
                {profileErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefono *</label>
                <input
                  type="tel"
                  value={profileData.telefono}
                  onChange={(e) => handleProfileUpdate('telefono', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    profileErrors.telefono ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+39 123 456 7890"
                />
                {profileErrors.telefono && (
                  <p className="text-red-500 text-xs mt-1">{profileErrors.telefono}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Città</label>
                <input
                  type="text"
                  value={profileData.citta}
                  onChange={(e) => handleProfileUpdate('citta', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Milano, Roma, ecc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regione</label>
                <input
                  type="text"
                  value={profileData.regione}
                  onChange={(e) => handleProfileUpdate('regione', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lombardia, Lazio, ecc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data di Nascita</label>
                <input
                  type="date"
                  value={profileData.dataNascita}
                  onChange={(e) => handleProfileUpdate('dataNascita', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slogan Professionale</label>
              <input
                type="text"
                value={profileData.slogan}
                onChange={(e) => handleProfileUpdate('slogan', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Es: 'Trasformo vite attraverso il movimento' o 'Il tuo successo è la mia missione'"
                maxLength="100"
              />
              <p className="text-xs text-gray-500 mt-1">
                {profileData.slogan?.length || 0}/100 caratteri
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Experience */}
      {activeSection === 'experience' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Esperienza Professionale</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anni di Esperienza *
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={profileData.anniEsperienza}
                  onChange={(e) => handleProfileUpdate('anniEsperienza', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lingue Parlate</label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {lingueParlateOptions.map((lingua) => (
                    <label key={lingua} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.lingueParlate?.includes(lingua)}
                        onChange={() => handleArrayToggle('lingueParlate', lingua)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{lingua}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio Professionale *</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Racconta la tua esperienza, approccio e filosofia di allenamento. Cosa ti rende unico come Personal Trainer?"
                maxLength="1000"
              />
              <p className="text-xs text-gray-500 mt-1">
                {profileData.bio?.length || 0}/1000 caratteri
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Obiettivi Professionali</label>
              <textarea
                value={profileData.obiettivi}
                onChange={(e) => handleProfileUpdate('obiettivi', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Quali sono i tuoi obiettivi come Personal Trainer? Dove vuoi arrivare?"
                maxLength="500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {profileData.obiettivi?.length || 0}/500 caratteri
              </p>
            </div>

            {/* Certificazioni */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Certificazioni</label>
                <button
                  onClick={() => addArrayItem('certificazioni')}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Aggiungi
                </button>
              </div>
              <div className="space-y-3">
                {(profileData.certificazioni || []).map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => handleArrayItemChange('certificazioni', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Es: NASM-CPT, CONI, FIPE, ISSA..."
                    />
                    <button
                      onClick={() => handleArrayItemChange('certificazioni', index, '')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {(!profileData.certificazioni || profileData.certificazioni.length === 0) && (
                  <p className="text-gray-500 text-sm italic">Nessuna certificazione aggiunta</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specializations */}
      {activeSection === 'specializations' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Specializzazioni & Metodi</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Specializzazioni</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specializzazioniDisponibili.map((spec) => (
                  <label key={spec} className="flex items-center space-x-3 cursor-pointer p-2 rounded border hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={profileData.specializzazioni?.includes(spec)}
                      onChange={() => handleArrayToggle('specializzazioni', spec)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{spec}</span>
                  </label>
                ))}
              </div>
              {profileData.specializzazioni?.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Selezionate:</strong> {profileData.specializzazioni.join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Metodi di Allenamento</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {metodiAllenamentoOptions.map((metodo) => (
                  <label key={metodo} className="flex items-center space-x-3 cursor-pointer p-2 rounded border hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={profileData.metodiAllenamento?.includes(metodo)}
                      onChange={() => handleArrayToggle('metodiAllenamento', metodo)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{metodo}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Target Cliente</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {targetClienteOptions.map((target) => (
                  <label key={target} className="flex items-center space-x-3 cursor-pointer p-2 rounded border hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={profileData.targetCliente?.includes(target)}
                      onChange={() => handleArrayToggle('targetCliente', target)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{target}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media */}
      {activeSection === 'media' && (
        <div className="space-y-6">
          {/* Foto Profilo */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Foto Profilo</h3>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                {profileData.fotoProfile ? (
                  <img src={profileData.fotoProfile} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
                <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('fotoProfile', e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Carica una foto professionale</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Una foto di qualità aumenta la fiducia dei clienti del 40%. 
                  Formati supportati: JPG, PNG (max 5MB)
                </p>
                <div className="flex space-x-3">
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 mr-2 inline" />
                    Carica Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('fotoProfile', e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  {profileData.fotoProfile && (
                    <button
                      onClick={() => handleProfileUpdate('fotoProfile', null)}
                      className="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Foto Copertina */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Foto Copertina</h3>
            <div className="space-y-4">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {profileData.fotoCopertina ? (
                  <img src={profileData.fotoCopertina} className="w-full h-full object-cover" alt="Cover" />
                ) : (
                  <div className="text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Nessuna foto copertina</p>
                  </div>
                )}
                {profileData.fotoCopertina && (
                  <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('fotoCopertina', e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <div className="flex space-x-3">
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 mr-2 inline" />
                  {profileData.fotoCopertina ? 'Cambia' : 'Carica'} Copertina
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('fotoCopertina', e.target.files[0])}
                    className="hidden"
                  />
                </label>
                {profileData.fotoCopertina && (
                  <button
                    onClick={() => handleProfileUpdate('fotoCopertina', null)}
                    className="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    Rimuovi
                  </button>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                Dimensioni consigliate: 1200x400px. Formato: JPG, PNG (max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contacts */}
      {activeSection === 'contacts' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Contatti & Social Media</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Secondaria</label>
              <input
                type="email"
                value={profileData.email2}
                onChange={(e) => handleProfileUpdate('email2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email-backup@esempio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sito Web</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={profileData.sitoWeb}
                  onChange={(e) => handleProfileUpdate('sitoWeb', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    profileErrors.sitoWeb ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://tuosito.com"
                />
                {profileErrors.sitoWeb && (
                  <p className="text-red-500 text-xs mt-1">{profileErrors.sitoWeb}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.instagram}
                    onChange={(e) => handleProfileUpdate('instagram', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="@tuousername"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.facebook}
                    onChange={(e) => handleProfileUpdate('facebook', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/tuoprofilo"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.youtube}
                    onChange={(e) => handleProfileUpdate('youtube', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://youtube.com/@tuocanale"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.linkedin}
                    onChange={(e) => handleProfileUpdate('linkedin', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/tuoprofilo"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
              <input
                type="text"
                value={profileData.tiktok}
                onChange={(e) => handleProfileUpdate('tiktok', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="@tuousername"
              />
            </div>
          </div>
        </div>
      )}

      {/* Business */}
      {activeSection === 'business' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Impostazioni Business</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo Medio/Ora (€)</label>
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={profileData.prezzoMedioOra}
                  onChange={(e) => handleProfileUpdate('prezzoMedioOra', parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    profileErrors.prezzoMedioOra ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="50"
                />
                {profileErrors.prezzoMedioOra && (
                  <p className="text-red-500 text-xs mt-1">{profileErrors.prezzoMedioOra}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Raggio Azione (km)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={profileData.raggio_km}
                  onChange={(e) => handleProfileUpdate('raggio_km', parseInt(e.target.value) || 20)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Disponibile Online</h4>
                  <p className="text-sm text-gray-600">Offri sessioni di coaching online</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.disponibilitaOnline}
                    onChange={(e) => handleProfileUpdate('disponibilitaOnline', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Disponibile in Presenza</h4>
                  <p className="text-sm text-gray-600">Offri sessioni di persona nella tua zona</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.disponibilitaPresenza}
                    onChange={(e) => handleProfileUpdate('disponibilitaPresenza', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Preview Profilo Pubblico</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Cover Photo */}
              {profileData.fotoCopertina && (
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <img src={profileData.fotoCopertina} className="w-full h-full object-cover" alt="Cover" />
                </div>
              )}

              {/* Profile Info */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden">
                  {profileData.fotoProfile ? (
                    <img src={profileData.fotoProfile} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {profileData.nome} {profileData.cognome}
                  </h2>
                  <p className="text-gray-600">Personal Trainer</p>
                  {profileData.slogan && (
                    <p className="text-blue-600 font-medium italic mt-1">"{profileData.slogan}"</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    {profileData.citta && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.citta}
                      </span>
                    )}
                    {profileData.anniEsperienza > 0 && (
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {profileData.anniEsperienza} anni exp
                      </span>
                    )}
                    {profileData.prezzoMedioOra > 0 && (
                      <span className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {profileData.prezzoMedioOra}€/h
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {profileData.bio && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Chi sono</h3>
                  <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                </div>
              )}

              {/* Specializations */}
              {profileData.specializzazioni?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Specializzazioni</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specializzazioni.map((spec) => (
                      <span key={spec} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Contatti</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {profileData.email && (
                    <a href={`mailto:${profileData.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  )}
                  {profileData.telefono && (
                    <a href={`tel:${profileData.telefono}`} className="flex items-center text-gray-600 hover:text-blue-600">
                      <Phone className="w-4 h-4 mr-2" />
                      Telefono
                    </a>
                  )}
                  {profileData.sitoWeb && (
                    <a href={profileData.sitoWeb} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600">
                      <Globe className="w-4 h-4 mr-2" />
                      Sito Web
                    </a>
                  )}
                  {profileData.instagram && (
                    <a href={`https://instagram.com/${profileData.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600">
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Chiudi
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  window.open('/personal-trainer/' + (profileData.nome?.toLowerCase() || 'profilo'), '_blank');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Vedi Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}