import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Upload, 
  Save, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Star,
  Users,
  TrendingUp,
  Download,
  Settings,
  LogOut,
  Camera,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  Target,
  DollarSign,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Bot,
  Sparkles,
  Wand2,
  Copy,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function PTDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'saved', 'error'
  const [lastSaved, setLastSaved] = useState(null);
  
  // Dati profilo con valori di default
  const [profileData, setProfileData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    bio: '',
    specializzazioni: [],
    anniEsperienza: 0,
    certificazioni: [],
    fotoProfile: null,
    instagram: '',
    facebook: '',
    youtube: '',
    sitoWeb: ''
  });

  const [programmi, setProgrammi] = useState([
    {
      id: 1,
      titolo: 'Massa Muscolare Avanzato',
      descrizione: 'Programma di 12 settimane per massimizzare l\'ipertrofia muscolare',
      prezzo: 79.99,
      categoria: 'Massa Muscolare',
      livello: 'Avanzato',
      durata: '12 settimane',
      copertina: null,
      file: null,
      pubblicato: true,
      vendite: 47,
      rating: 4.8
    },
    {
      id: 2,
      titolo: 'Forza Esplosiva',
      descrizione: 'Programma specifico per aumentare la forza nei fondamentali',
      prezzo: 89.99,
      categoria: 'Forza & Potenza',
      livello: 'Intermedio',
      durata: '16 settimane',
      copertina: null,
      file: null,
      pubblicato: false,
      vendite: 0,
      rating: 0
    }
  ]);

  const [nuovoProgramma, setNuovoProgramma] = useState({
    titolo: '',
    descrizione: '',
    prezzo: '',
    categoria: '',
    livello: '',
    durata: '',
    copertina: null,
    file: null
  });

  const [showNewProgramForm, setShowNewProgramForm] = useState(false);
  const [aiContentType, setAiContentType] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  const categorie = [
    'Massa Muscolare', 'Dimagrimento', 'Forza & Potenza', 'Cardio & Resistenza',
    'Functional Training', 'Yoga & Stretching', 'Home Workout', 'Preparazione Atletica'
  ];

  const livelli = ['Principiante', 'Intermedio', 'Avanzato', 'Tutti i livelli'];

  const specializzazioniDisponibili = [
    'Bodybuilding', 'Powerlifting', 'Crossfit', 'Functional Training',
    'Dimagrimento', 'Tonificazione', 'Yoga', 'Pilates', 'Cardio',
    'Preparazione Atletica', 'Riabilitazione', 'Posturale'
  ];

  // Carica dati dal localStorage all'avvio
  useEffect(() => {
    const savedProfile = localStorage.getItem('bt_profile_data');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(parsedProfile);
        console.log('Profilo caricato dal localStorage');
      } catch (error) {
        console.error('Errore nel caricamento del profilo:', error);
      }
    }
  }, []);

  // Funzione per salvare nel localStorage
  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('bt_profile_data', JSON.stringify(data));
      setSaveStatus('saved');
      setLastSaved(new Date());
      
      // Reset save status dopo 3 secondi
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
      
      console.log('Profilo salvato nel localStorage');
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    }
  };

  // Validazione campi
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
      case 'anniEsperienza':
        if (value < 0 || value > 50) {
          errors.anniEsperienza = 'Anni esperienza non validi';
        } else {
          delete errors.anniEsperienza;
        }
        break;
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Aggiorna profilo con auto-save
  const handleProfileUpdate = (field, value) => {
    setSaveStatus('saving');
    
    // Valida il campo
    validateField(field, value);
    
    const updatedProfile = {
      ...profileData,
      [field]: value
    };
    
    setProfileData(updatedProfile);
    
    // Auto-save con debounce
    setTimeout(() => {
      saveToLocalStorage(updatedProfile);
    }, 500);
  };

  // Gestione specializzazioni
  const handleSpecializzazioniChange = (specializzazione) => {
    setSaveStatus('saving');
    
    const updatedSpecializzazioni = profileData.specializzazioni.includes(specializzazione)
      ? profileData.specializzazioni.filter(s => s !== specializzazione)
      : [...profileData.specializzazioni, specializzazione];
    
    const updatedProfile = {
      ...profileData,
      specializzazioni: updatedSpecializzazioni
    };
    
    setProfileData(updatedProfile);
    saveToLocalStorage(updatedProfile);
  };

  // Gestione certificazioni
  const handleCertificazioniChange = (index, value) => {
    setSaveStatus('saving');
    
    const updatedCertificazioni = [...profileData.certificazioni];
    if (value) {
      updatedCertificazioni[index] = value;
    } else {
      updatedCertificazioni.splice(index, 1);
    }
    
    const updatedProfile = {
      ...profileData,
      certificazioni: updatedCertificazioni.filter(cert => cert.trim())
    };
    
    setProfileData(updatedProfile);
    saveToLocalStorage(updatedProfile);
  };

  const addCertificazione = () => {
    const updatedProfile = {
      ...profileData,
      certificazioni: [...profileData.certificazioni, '']
    };
    setProfileData(updatedProfile);
  };

  // Gestione upload foto
  const handleFileUpload = (type, file) => {
    if (type === 'profile' && file) {
      setSaveStatus('saving');
      
      // Validazione file
      if (!file.type.startsWith('image/')) {
        alert('Seleziona solo file immagine');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File troppo grande. Max 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedProfile = {
          ...profileData,
          fotoProfile: e.target.result // Base64 string
        };
        setProfileData(updatedProfile);
        saveToLocalStorage(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  // Salvataggio manuale completo
  const handleSaveProfile = () => {
    setSaveStatus('saving');
    
    // Validazione completa
    const isValid = ['nome', 'email', 'telefono', 'anniEsperienza'].every(field => 
      validateField(field, profileData[field])
    );
    
    if (!isValid) {
      setSaveStatus('error');
      alert('Correggi gli errori evidenziati prima di salvare');
      return;
    }
    
    saveToLocalStorage(profileData);
    alert('Profilo salvato con successo!');
  };

  // Reset profilo
  const handleResetProfile = () => {
    if (confirm('Sei sicuro di voler resettare tutti i dati del profilo?')) {
      const emptyProfile = {
        nome: '', cognome: '', email: '', telefono: '', citta: '', bio: '',
        specializzazioni: [], anniEsperienza: 0, certificazioni: [],
        fotoProfile: null, instagram: '', facebook: '', youtube: '', sitoWeb: ''
      };
      setProfileData(emptyProfile);
      setProfileErrors({});
      localStorage.removeItem('bt_profile_data');
      setSaveStatus('');
    }
  };

  // Save Status Component
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

  // Simulazione chiamata AI API
  const generateAIContent = async (type, context = {}) => {
    setIsGenerating(true);
    
    // Simula chiamata API (in produzione sarà una chiamata reale)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let content = '';
    
    switch(type) {
      case 'program-description':
        content = `🔥 TRASFORMA IL TUO FISICO IN ${context.durata || '12 SETTIMANE'}!

Questo programma ${context.categoria?.toLowerCase() || 'di allenamento'} è stato scientificamente progettato per massimizzare i tuoi risultati in tempi record.

✅ COSA OTTERRAI:
• Aumento significativo della massa muscolare magra
• Miglioramento della forza e resistenza
• Definizione muscolare visibile già dalle prime settimane
• Piano nutrizionale incluso per ottimizzare i risultati

🎯 PERFETTO PER:
• Livello ${context.livello?.toLowerCase() || 'intermedio'}
• Chi vuole risultati concreti e duraturi
• Chi cerca un approccio professionale e strutturato

💪 INCLUDE:
• ${context.durata || '12 settimane'} di programmazione dettagliata
• Video tutorial per ogni esercizio
• Schede di allenamento scaricabili
• Supporto WhatsApp diretto
• Piano nutrizionale personalizzabile

⚡ GARANZIA: Se non sei soddisfatto al 100%, rimborso completo entro 30 giorni!

Non aspettare ancora. La tua trasformazione inizia ORA! 🚀`;
        break;
        
      case 'bio-professional':
        content = `🏆 Personal Trainer Certificato con ${profileData.anniEsperienza} anni di esperienza nel settore fitness

Specializzato in ${profileData.specializzazioni.join(', ').toLowerCase()}, ho aiutato centinaia di persone a raggiungere i loro obiettivi di trasformazione fisica e benessere.

✅ CERTIFICAZIONI: ${profileData.certificazioni.join(' • ')}
💪 ESPERIENZA: ${profileData.anniEsperienza}+ anni di coaching personalizzato
🎯 SPECIALIZZAZIONI: ${profileData.specializzazioni.join(' • ')}
📍 LOCATION: ${profileData.citta}

La mia filosofia è semplice: ogni persona è unica e merita un approccio personalizzato. Non esistono programmi standard, ma solo soluzioni su misura per te.

🚀 I MIEI RISULTATI PARLANO CHIARO:
• 500+ clienti trasformati
• 95% di successo negli obiettivi
• Metodologie scientificamente provate
• Supporto continuo e motivazione costante

Pronto a iniziare la tua trasformazione? Contattami e scopriamo insieme come raggiungere i tuoi obiettivi! 💪

${profileData.instagram ? `📸 ${profileData.instagram}` : ''}
${profileData.sitoWeb ? `🌐 ${profileData.sitoWeb}` : ''}`;
        break;
        
      case 'program-titles':
        const titles = [
          `${context.categoria} ESTREMO: Risultati in ${context.durata}`,
          `TRASFORMAZIONE ${context.categoria?.toUpperCase()}: Il Metodo Che Funziona`,
          `${context.categoria} REVOLUTION: Da Zero a Eroe`,
          `PROJECT ${context.categoria?.toUpperCase()}: Il Tuo Nuovo Fisico`,
          `${context.categoria} INTENSIVE: Massimi Risultati, Minimo Tempo`
        ];
        content = titles.join('\n');
        break;
        
      case 'social-post':
        content = `🔥 NUOVO PROGRAMMA DISPONIBILE! 🔥

${context.titolo || 'Il programma che cambierà il tuo fisico'}

💪 Stanco di allenarti senza vedere risultati?
⏰ Hai solo ${context.durata || '12 settimane'} per trasformarti?
🎯 Vuoi un metodo che FUNZIONA davvero?

✅ Questo programma ${context.categoria?.toLowerCase() || 'di allenamento'} ti darà:
• Risultati visibili già dalla 2a settimana
• Aumento della forza del 25%+ 
• Definizione muscolare da urlo
• Supporto personalizzato H24

⚡ OFFERTA LANCIO: €${context.prezzo || '79.99'} invece di €99.99
(Solo per i primi 50 clienti!)

👆 Link in bio per acquistare
💬 DM per info personalizzate

#fitness #transformation #${context.categoria?.toLowerCase().replace(' ', '')} #personaltrainer #results #workout #motivation #fitnessmotivation #transformation #strong #muscle #gymlife`;
        break;
        
      default:
        content = 'Contenuto generato dall\'AI...';
    }
    
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const handleAIGenerate = (type, context = {}) => {
    setAiContentType(type);
    setShowAiModal(true);
    generateAIContent(type, context);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Contenuto copiato negli appunti!');
  };

  const applyGeneratedContent = () => {
    if (aiContentType === 'program-description' && showNewProgramForm) {
      setNuovoProgramma(prev => ({ ...prev, descrizione: generatedContent }));
    } else if (aiContentType === 'bio-professional') {
      handleProfileUpdate('bio', generatedContent);
    }
    setShowAiModal(false);
    alert('Contenuto applicato con successo!');
  };

  const handleNewProgramChange = (field, value) => {
    setNuovoProgramma(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewProgramSubmit = (e) => {
    e.preventDefault();
    const newId = Math.max(...programmi.map(p => p.id)) + 1;
    const newProgram = {
      ...nuovoProgramma,
      id: newId,
      pubblicato: false,
      vendite: 0,
      rating: 0,
      prezzo: parseFloat(nuovoProgramma.prezzo)
    };
    
    setProgrammi(prev => [...prev, newProgram]);
    setNuovoProgramma({
      titolo: '', descrizione: '', prezzo: '', categoria: '', 
      livello: '', durata: '', copertina: null, file: null
    });
    setShowNewProgramForm(false);
    alert('Programma aggiunto con successo!');
  };

  const handleDeleteProgram = (id) => {
    if (confirm('Sei sicuro di voler eliminare questo programma?')) {
      setProgrammi(prev => prev.filter(p => p.id !== id));
    }
  };

  const togglePubblicazione = (id) => {
    setProgrammi(prev => prev.map(p => 
      p.id === id ? { ...p, pubblicato: !p.pubblicato } : p
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: TrendingUp },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'profile', label: 'Profilo', icon: User },
    { id: 'programs', label: 'Programmi', icon: FileText },
    { id: 'settings', label: 'Impostazioni', icon: Settings }
  ];

  const stats = {
    programmiPubblicati: programmi.filter(p => p.pubblicato).length,
    programmiTotali: programmi.length,
    venditeTotali: programmi.reduce((sum, p) => sum + p.vendite, 0),
    ratingMedio: programmi.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / 
                 programmi.filter(p => p.rating > 0).length || 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Best-Trainer <span className="text-blue-400">PT</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
              <SaveStatusIndicator />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Visualizza Sito
              </Link>
              <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4 mr-2" />
                Esci
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  {profileData.fotoProfile ? (
                    <img src={profileData.fotoProfile} className="w-full h-full rounded-full object-cover" alt="Profile" />
                  ) : (
                    <User className="w-10 h-10 text-blue-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{profileData.nome || 'Profilo non completato'}</h3>
                <p className="text-sm text-gray-500">Personal Trainer</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                      {tab.id === 'ai-assistant' && (
                        <Sparkles className="w-4 h-4 ml-auto text-yellow-400" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Panoramica</h2>
                  
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.programmiPubblicati}</p>
                      <p className="text-sm text-gray-600">Programmi Pubblicati</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.venditeTotali}</p>
                      <p className="text-sm text-gray-600">Vendite Totali</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.ratingMedio.toFixed(1)}</p>
                      <p className="text-sm text-gray-600">Rating Medio</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">€{(stats.venditeTotali * 60).toFixed(0)}</p>
                      <p className="text-sm text-gray-600">Ricavi Stimati</p>
                    </div>
                  </div>

                  {/* Profile Completion Alert */}
                  {(!profileData.nome || !profileData.email || profileData.specializzazioni.length === 0) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                      <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Completa il tuo profilo</h3>
                          <p className="text-yellow-700 mb-4">
                            Un profilo completo aumenta la fiducia dei clienti e migliora le vendite.
                          </p>
                          <button
                            onClick={() => setActiveTab('profile')}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Completa Profilo
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Quick Actions */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">🤖 AI Assistant</h3>
                        <p className="text-purple-100">Lascia che l'AI ottimizzi i tuoi contenuti</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('ai-assistant')}
                        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Usa AI
                      </button>
                    </div>
                  </div>

                  {/* Recent Programs */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Programmi Recenti</h3>
                    <div className="space-y-4">
                      {programmi.slice(0, 3).map((programma) => (
                        <div key={programma.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{programma.titolo}</h4>
                            <p className="text-sm text-gray-600">{programma.categoria} • €{programma.prezzo}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              programma.pubblicato 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {programma.pubblicato ? 'Pubblicato' : 'Bozza'}
                            </span>
                            <span className="text-sm text-gray-500">{programma.vendite} vendite</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Gestione Profilo</h2>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handleResetProfile}
                      className="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salva Tutto
                    </button>
                  </div>
                </div>

                {/* Foto Profilo */}
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
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('profile', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Carica una foto professionale</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Una foto di qualità aumenta la fiducia dei clienti. Formati supportati: JPG, PNG (max 5MB)
                      </p>
                      {profileData.fotoProfile && (
                        <button
                          onClick={() => handleProfileUpdate('fotoProfile', null)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Rimuovi foto
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informazioni Personali */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Personali</h3>
                  
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
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

                    <div className="grid grid-cols-2 gap-4">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Anni di Esperienza
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={profileData.anniEsperienza}
                          onChange={(e) => handleProfileUpdate('anniEsperienza', parseInt(e.target.value) || 0)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            profileErrors.anniEsperienza ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="5"
                        />
                        {profileErrors.anniEsperienza && (
                          <p className="text-red-500 text-xs mt-1">{profileErrors.anniEsperienza}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Bio Professionale</label>
                        <button
                          onClick={() => handleAIGenerate('bio-professional')}
                          className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors flex items-center"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI
                        </button>
                      </div>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Racconta la tua esperienza, approccio e filosofia di allenamento..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {profileData.bio.length}/500 caratteri
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specializzazioni */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Specializzazioni</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specializzazioniDisponibili.map((spec) => (
                      <label key={spec} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.specializzazioni.includes(spec)}
                          onChange={() => handleSpecializzazioniChange(spec)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{spec}</span>
                      </label>
                    ))}
                  </div>
                  {profileData.specializzazioni.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Selezionate:</strong> {profileData.specializzazioni.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Certificazioni */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Certificazioni</h3>
                  <div className="space-y-3">
                    {profileData.certificazioni.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => handleCertificazioniChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Es: NASM-CPT, CONI, FIPE..."
                        />
                        <button
                          onClick={() => handleCertificazioniChange(index, '')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addCertificazione}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Aggiungi Certificazione
                    </button>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media & Contatti</h3>
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
                          placeholder="Il tuo profilo Facebook"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                      <div className="relative">
                        <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.youtube}
                          onChange={(e) => handleProfileUpdate('youtube', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Il tuo canale YouTube"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sito Web</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={profileData.sitoWeb}
                          onChange={(e) => handleProfileUpdate('sitoWeb', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://tuosito.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Altri tab rimangono invariati */}
            {activeTab === 'ai-assistant' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Assistant</h2>
                <p className="text-gray-600">Funzionalità AI in sviluppo...</p>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestione Programmi</h2>
                <p className="text-gray-600">Gestione programmi in sviluppo...</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Impostazioni</h2>
                <p className="text-gray-600">Impostazioni in sviluppo...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Content Generator</h3>
                  <p className="text-sm text-gray-500">
                    {aiContentType === 'program-description' && 'Descrizione Programma'}
                    {aiContentType === 'bio-professional' && 'Bio Professionale'}
                    {aiContentType === 'program-titles' && 'Titoli Programma'}
                    {aiContentType === 'social-post' && 'Post Social Media'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">L'AI sta generando il contenuto...</p>
                    <p className="text-sm text-gray-500 mt-1">Questo richiederà solo qualche secondo</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Contenuto Generato</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => generateAIContent(aiContentType, {})}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors flex items-center"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Rigenera
                      </button>
                      <button
                        onClick={() => copyToClipboard(generatedContent)}
                        className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg transition-colors flex items-center"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copia
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Chiudi
              </button>
              {!isGenerating && (aiContentType === 'program-description' || aiContentType === 'bio-professional') && (
                <button
                  onClick={applyGeneratedContent}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Applica Contenuto
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}