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
  AlertCircle
} from 'lucide-react';

export default function PTDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
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
    // Per ora simuliamo l'upload
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
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Salva Modifiche
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Info Personali */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Personali</h3>
                    
                    {/* Foto Profilo */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Foto Profilo</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {profileData.fotoProfile ? (
                            <img src={URL.createObjectURL(profileData.fotoProfile)} className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('profile', e.target.files[0])}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Carica Foto
                          </label>
                        </div>
                      </div>
                    </div>

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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
                          <input
                            type="text"
                            value={profileData.cognome}
                            onChange={(e) => handleProfileUpdate('cognome', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                        <input
                          type="tel"
                          value={profileData.telefono}
                          onChange={(e) => handleProfileUpdate('telefono', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Città</label>
                        <input
                          type="text"
                          value={profileData.citta}
                          onChange={(e) => handleProfileUpdate('citta', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio Professionale</label>
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

                  {/* Info Professionali & Social */}
                  <div className="space-y-6">
                    {/* Info Professionali */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Informazioni Professionali</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Anni di Esperienza</label>
                          <input
                            type="number"
                            value={profileData.anniEsperienza}
                            onChange={(e) => handleProfileUpdate('anniEsperienza', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Specializzazioni</label>
                          <div className="grid grid-cols-2 gap-2">
                            {specializzazioniDisponibili.map((spec) => (
                              <label key={spec} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={profileData.specializzazioni.includes(spec)}
                                  onChange={() => handleSpecializzazioniChange(spec)}
                                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">{spec}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Certificazioni</label>
                          <input
                            type="text"
                            value={profileData.certificazioni.join(', ')}
                            onChange={(e) => handleProfileUpdate('certificazioni', e.target.value.split(', '))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Es: NASM-CPT, FIPE, ISSA"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Link Social e Contatti</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={profileData.instagram}
                              onChange={(e) => handleProfileUpdate('instagram', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="@tuoaccount"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                          <div className="relative">
                            <Facebook className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={profileData.facebook}
                              onChange={(e) => handleProfileUpdate('facebook', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="TuaPagina"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                          <div className="relative">
                            <Youtube className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={profileData.youtube}
                              onChange={(e) => handleProfileUpdate('youtube', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="TuoCanale"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sito Web</label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="url"
                              value={profileData.sitoWeb}
                              onChange={(e) => handleProfileUpdate('sitoWeb', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="www.tuosito.com"
                            />
                          </div>
                        </div>
                      </div>
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
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Titolo Programma *</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione *</label>
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
                              <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo (€) *</label>
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
                              <label className="block text-sm font-medium text-gray-700 mb-2">Durata *</label>
                              <input
                                type="text"
                                value={nuovoProgramma.durata}
                                onChange={(e) => handleNewProgramChange('durata', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="8 settimane"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
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
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Livello *</label>
                              <select
                                value={nuovoProgramma.livello}
                                onChange={(e) => handleNewProgramChange('livello', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              >
                                <option value="">Seleziona livello</option>
                                {livelli.map(livello => (
                                  <option key={livello} value={livello}>{livello}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Copertina Programma</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">
                                Trascina qui l'immagine di copertina o
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleNewProgramChange('copertina', e.target.files[0])}
                                  className="hidden"
                                  id="copertina-upload"
                                />
                                <label htmlFor="copertina-upload" className="text-blue-600 hover:text-blue-500 ml-1 cursor-pointer">
                                  clicca per selezionare
                                </label>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG fino a 10MB</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">File Programma (PDF)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                              <FileText className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">
                                Trascina qui il file PDF o
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={(e) => handleNewProgramChange('file', e.target.files[0])}
                                  className="hidden"
                                  id="file-upload"
                                />
                                <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-500 ml-1 cursor-pointer">
                                  clicca per selezionare
                                </label>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">PDF fino a 50MB</p>
                            </div>
                          </div>
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
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">{programma.descrizione}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                {programma.categoria}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {programma.durata}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                €{programma.prezzo}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {programma.vendite} vendite
                              </span>
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
                              onClick={() => togglePubblicazione(programma.id)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                programma.pubblicato
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {programma.pubblicato ? 'Nascondi' : 'Pubblica'}
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Eye className="w-4 h-4" />
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
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Profilo Pubblico</h4>
                        <p className="text-sm text-gray-600">Rendi visibile il tuo profilo nella directory trainer</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">Zona Pericolosa</h3>
                  <p className="text-red-700 mb-4">
                    Queste azioni sono irreversibili. Procedi con cautela.
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Elimina Account
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