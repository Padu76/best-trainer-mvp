import React, { useState } from 'react';
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
  
  const [profileData, setProfileData] = useState({
    nome: 'Marco Rossi',
    cognome: '',
    email: 'marco.rossi@email.com',
    telefono: '+39 123 456 7890',
    citta: 'Milano',
    bio: 'Personal Trainer specializzato in bodybuilding e powerlifting con 8 anni di esperienza. Appassionato di trasformazioni fisiche e crescita personale.',
    specializzazioni: ['Bodybuilding', 'Powerlifting', 'Dimagrimento'],
    anniEsperienza: 8,
    certificazioni: ['NASM-CPT', 'FIPE'],
    fotoProfile: null,
    instagram: '@marcorossifitness',
    facebook: 'MarcoRossiFitness',
    youtube: 'MarcoRossiPT',
    sitoWeb: 'www.marcorossifitness.com'
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
      setProfileData(prev => ({ ...prev, bio: generatedContent }));
    }
    setShowAiModal(false);
    alert('Contenuto applicato con successo!');
  };

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializzazioniChange = (specializzazione) => {
    setProfileData(prev => ({
      ...prev,
      specializzazioni: prev.specializzazioni.includes(specializzazione)
        ? prev.specializzazioni.filter(s => s !== specializzazione)
        : [...prev.specializzazioni, specializzazione]
    }));
  };

  const handleFileUpload = (type, file) => {
    if (type === 'profile') {
      setProfileData(prev => ({ ...prev, fotoProfile: file }));
    }
    console.log(`Upload ${type}:`, file);
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
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {profileData.fotoProfile ? (
                    <img src={URL.createObjectURL(profileData.fotoProfile)} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-blue-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{profileData.nome}</h3>
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

            {/* AI Assistant Tab */}
            {activeTab === 'ai-assistant' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Bot className="w-8 h-8 mr-3 text-blue-600" />
                    AI Content Assistant
                  </h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Zap className="w-4 h-4 mr-1" />
                    Powered by AI
                  </div>
                </div>

                {/* AI Tools Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Program Description Generator */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Descrizioni Programmi</h3>
                        <p className="text-sm text-gray-600">Genera descrizioni accattivanti</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Crea descrizioni professionali che convertono visitatori in clienti
                    </p>
                    <button
                      onClick={() => handleAIGenerate('program-description', {
                        categoria: 'Massa Muscolare',
                        livello: 'Avanzato',
                        durata: '12 settimane'
                      })}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Genera Descrizione
                    </button>
                  </div>

                  {/* Bio Professional Generator */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Bio Professionale</h3>
                        <p className="text-sm text-gray-600">Ottimizza il tuo profilo</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Bio professionale che trasmette autorevolezza e competenza
                    </p>
                    <button
                      onClick={() => handleAIGenerate('bio-professional')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Ottimizza Bio
                    </button>
                  </div>

                  {/* Title Generator */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <Target className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Titoli Accattivanti</h3>
                        <p className="text-sm text-gray-600">Titoli che vendono</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Genera titoli irresistibili per i tuoi programmi
                    </p>
                    <button
                      onClick={() => handleAIGenerate('program-titles', {
                        categoria: 'Massa Muscolare',
                        durata: '12 settimane'
                      })}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Genera Titoli
                    </button>
                  </div>

                  {/* Social Media Posts */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                        <Instagram className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Post Social</h3>
                        <p className="text-sm text-gray-600">Content per Instagram</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Post Instagram pronti per promuovere i tuoi programmi
                    </p>
                    <button
                      onClick={() => handleAIGenerate('social-post', {
                        titolo: 'Massa Muscolare Avanzato',
                        categoria: 'Massa Muscolare',
                        durata: '12 settimane',
                        prezzo: '79.99'
                      })}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Crea Post
                    </button>
                  </div>
                </div>

                {/* AI Tips */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Consigli AI</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Personalizza sempre</p>
                        <p className="text-sm text-gray-600">Modifica i contenuti AI per riflettere il tuo stile</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Testa e ottimizza</p>
                        <p className="text-sm text-gray-600">Prova versioni diverse per vedere cosa funziona meglio</p>
                      </div>
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
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Salva Modifiche
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Personali</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                        <input
                          type="text"
                          value={profileData.nome}
                          onChange={(e) => handleProfileUpdate('nome', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileUpdate('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
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
                        placeholder="Racconta la tua esperienza e specializzazioni..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Gestione Programmi</h2>
                  <button
                    onClick={() => setShowNewProgramForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuovo Programma
                  </button>
                </div>

                {/* Form Nuovo Programma */}
                {showNewProgramForm && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Nuovo Programma</h3>
                      <button
                        onClick={() => setShowNewProgramForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>

                    <form onSubmit={handleNewProgramSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Titolo Programma</label>
                        <input
                          type="text"
                          value={nuovoProgramma.titolo}
                          onChange={(e) => handleNewProgramChange('titolo', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Es: Massa Muscolare Avanzato"
                          required
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">Descrizione</label>
                          <button
                            type="button"
                            onClick={() => handleAIGenerate('program-description', {
                              categoria: nuovoProgramma.categoria,
                              livello: nuovoProgramma.livello,
                              durata: nuovoProgramma.durata
                            })}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center"
                          >
                            <Bot className="w-3 h-3 mr-1" />
                            AI
                          </button>
                        </div>
                        <textarea
                          value={nuovoProgramma.descrizione}
                          onChange={(e) => handleNewProgramChange('descrizione', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Descrivi il programma, gli obiettivi e cosa include..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo (€)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={nuovoProgramma.prezzo}
                            onChange={(e) => handleNewProgramChange('prezzo', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="29.99"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                          <select
                            value={nuovoProgramma.categoria}
                            onChange={(e) => handleNewProgramChange('categoria', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Seleziona categoria</option>
                            {categorie.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowNewProgramForm(false)}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Annulla
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salva Programma
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Lista Programmi */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">I Tuoi Programmi</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {programmi.map((programma) => (
                      <div key={programma.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{programma.titolo}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                programma.pubblicato 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {programma.pubblicato ? 'Pubblicato' : 'Bozza'}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{programma.descrizione}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <span>€{programma.prezzo}</span>
                              <span>{programma.vendite} vendite</span>
                              {programma.rating > 0 && (
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                                  {programma.rating}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-6">
                            <button
                              onClick={() => handleAIGenerate('social-post', {
                                titolo: programma.titolo,
                                categoria: programma.categoria,
                                durata: programma.durata,
                                prezzo: programma.prezzo
                              })}
                              className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                              title="Genera post social"
                            >
                              <Bot className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => togglePubblicazione(programma.id)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                programma.pubblicato
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {programma.pubblicato ? 'Nascondi' : 'Pubblica'}
                            </button>
                            <button 
                              onClick={() => handleDeleteProgram(programma.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Impostazioni</h2>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Impostazioni Account</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Notifiche Email</h4>
                        <p className="text-sm text-gray-600">Ricevi notifiche per nuove vendite e messaggi</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">AI Assistant</h4>
                        <p className="text-sm text-gray-600">Attiva i suggerimenti AI per migliorare i contenuti</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
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