import React, { useState, useEffect } from 'react';
import { 
  FileText,
  Video,
  Plus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  Save,
  X,
  Check,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Target,
  BarChart3,
  Zap,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  Award,
  ShoppingCart,
  Heart,
  MessageSquare,
  ExternalLink,
  RefreshCw,
  Settings,
  Archive,
  Globe,
  Lock,
  Unlock,
  Image,
  PenTool,
  Layers,
  Bookmark
} from 'lucide-react';

export default function ProgramsManagement() {
  const [programmi, setProgrammi] = useState([]);
  const [activeView, setActiveView] = useState('list'); // list, create, edit, analytics
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // Form states
  const [programForm, setProgramForm] = useState({
    titolo: '',
    descrizione: '',
    prezzo: '',
    categoria: '',
    livello: '',
    durata: '',
    tipoContenuto: '',
    copertina: null,
    file: null,
    video: null,
    covertinaPreview: null,
    filePreview: null,
    videoPreview: null,
    tags: [],
    difficolta: 1,
    equipmentRequired: [],
    pubblicazioneSchedulata: '',
    limitedTime: false,
    scontoPercentuale: 0
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Options
  const categorie = [
    'Massa Muscolare', 'Dimagrimento', 'Forza & Potenza', 'Cardio & Resistenza',
    'Functional Training', 'Yoga & Stretching', 'Home Workout', 'Preparazione Atletica',
    'Ciclismo', 'Nuoto', 'Triathlon', 'Corsa', 'Calcio', 'Tennis', 'Boxe', 'Crossfit',
    'Riabilitazione', 'Posturale', 'Pilates', 'Danza', 'Arti Marziali'
  ];

  const livelli = ['Principiante', 'Intermedio', 'Avanzato', 'Tutti i livelli', 'Elite'];

  const tipiContenuto = [
    { value: 'documento', label: 'Solo Documenti (PDF, DOC)', icon: FileText, color: 'blue' },
    { value: 'video', label: 'Solo Videocorso', icon: Video, color: 'red' },
    { value: 'misto', label: 'Documenti + Video', icon: Upload, color: 'purple' }
  ];

  const equipmentOptions = [
    'Nessun attrezzo', 'Manubri', 'Bilanciere', 'Kettlebell', 'Elastici',
    'Palla medica', 'TRX', 'Panca', 'Rack', 'Macchine', 'Cardio equipment'
  ];

  const difficultyLabels = {
    1: 'Molto Facile',
    2: 'Facile', 
    3: 'Moderato',
    4: 'Difficile',
    5: 'Molto Difficile'
  };

  // Load data from localStorage con error handling migliorato
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        console.log('Caricamento programmi dal localStorage...');
        const savedPrograms = localStorage.getItem('bt_programs_data');
        
        if (savedPrograms) {
          const parsedPrograms = JSON.parse(savedPrograms);
          console.log('Programmi caricati:', parsedPrograms);
          setProgrammi(Array.isArray(parsedPrograms) ? parsedPrograms : []);
        } else {
          console.log('Nessun programma trovato nel localStorage');
          setProgrammi([]);
        }
      } catch (error) {
        console.error('Errore nel caricamento dei programmi:', error);
        setProgrammi([]);
        setSaveStatus('error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to localStorage con error handling migliorato
  const saveProgramsToLocalStorage = (data) => {
    try {
      console.log('Salvando programmi nel localStorage:', data);
      localStorage.setItem('bt_programs_data', JSON.stringify(data));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Errore nel salvataggio programmi:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Calculate stats
  const stats = {
    totali: programmi.length,
    pubblicati: programmi.filter(p => p.pubblicato).length,
    bozze: programmi.filter(p => !p.pubblicato).length,
    videocorsi: programmi.filter(p => getContentTypeLabel(p) === 'video' || getContentTypeLabel(p) === 'misto').length,
    venditeTotal: programmi.reduce((sum, p) => sum + (p.vendite || 0), 0),
    revenueTotal: programmi.reduce((sum, p) => sum + ((p.vendite || 0) * parseFloat(p.prezzo || 0)), 0),
    ratingMedio: programmi.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / 
                 Math.max(programmi.filter(p => p.rating > 0).length, 1),
    topCategory: getTopCategory(),
    thisMonth: getThisMonthStats()
  };

  function getContentTypeLabel(programma) {
    if (programma.tipoContenuto) return programma.tipoContenuto;
    if (programma.video && programma.file) return 'misto';
    if (programma.video) return 'video';
    return 'documento';
  }

  function getTopCategory() {
    if (programmi.length === 0) return 'N/A';
    
    const categoryCount = {};
    programmi.forEach(p => {
      if (p.categoria) {
        categoryCount[p.categoria] = (categoryCount[p.categoria] || 0) + (p.vendite || 0);
      }
    });
    
    return Object.keys(categoryCount).length ? 
           Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b) : 
           'N/A';
  }

  function getThisMonthStats() {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    return programmi.filter(p => {
      const created = new Date(p.dataCreazione || 0);
      return created.getMonth() === thisMonth && created.getFullYear() === thisYear;
    }).length;
  }

  // Filtering and sorting
  const getFilteredPrograms = () => {
    let filtered = [...programmi];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.titolo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descrizione?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(p => getContentTypeLabel(p) === filterType);
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.categoria === filterCategory);
    }

    // Status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'published') {
        filtered = filtered.filter(p => p.pubblicato);
      } else if (filterStatus === 'draft') {
        filtered = filtered.filter(p => !p.pubblicato);
      } else if (filterStatus === 'scheduled') {
        filtered = filtered.filter(p => p.pubblicazioneSchedulata && new Date(p.pubblicazioneSchedulata) > new Date());
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.dataCreazione || 0);
          bValue = new Date(b.dataCreazione || 0);
          break;
        case 'vendite':
          aValue = a.vendite || 0;
          bValue = b.vendite || 0;
          break;
        case 'prezzo':
          aValue = parseFloat(a.prezzo || 0);
          bValue = parseFloat(b.prezzo || 0);
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'titolo':
          aValue = a.titolo?.toLowerCase() || '';
          bValue = b.titolo?.toLowerCase() || '';
          break;
        default:
          aValue = new Date(a.dataCreazione || 0);
          bValue = new Date(b.dataCreazione || 0);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!programForm.titolo || programForm.titolo.length < 5) {
      errors.titolo = 'Titolo richiesto (min 5 caratteri)';
    }
    
    if (!programForm.descrizione || programForm.descrizione.length < 20) {
      errors.descrizione = 'Descrizione richiesta (min 20 caratteri)';
    }
    
    if (!programForm.prezzo || parseFloat(programForm.prezzo) <= 0) {
      errors.prezzo = 'Prezzo deve essere maggiore di 0';
    }
    
    if (!programForm.categoria) {
      errors.categoria = 'Categoria richiesta';
    }
    
    if (!programForm.livello) {
      errors.livello = 'Livello richiesto';
    }
    
    if (!programForm.durata) {
      errors.durata = 'Durata richiesta';
    }
    
    if (!programForm.tipoContenuto) {
      errors.tipoContenuto = 'Tipo contenuto richiesto';
    }

    if (!programForm.copertina && !editingProgram) {
      errors.copertina = 'Copertina richiesta';
    }

    // Content validation based on type
    if (programForm.tipoContenuto === 'documento' && !programForm.file && !editingProgram?.file) {
      errors.file = 'File programma richiesto';
    }
    
    if (programForm.tipoContenuto === 'video' && !programForm.video && !editingProgram?.video) {
      errors.video = 'Video richiesto';
    }
    
    if (programForm.tipoContenuto === 'misto') {
      if (!programForm.file && !editingProgram?.file) {
        errors.file = 'File documento richiesto per contenuto misto';
      }
      if (!programForm.video && !editingProgram?.video) {
        errors.video = 'Video richiesto per contenuto misto';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // File upload handling
  const handleFileUpload = (type, file) => {
    if (!file) return;

    setSaveStatus('saving');
    
    const maxSizes = {
      copertina: 5 * 1024 * 1024, // 5MB
      file: 50 * 1024 * 1024,     // 50MB
      video: 500 * 1024 * 1024    // 500MB
    };

    if (file.size > maxSizes[type]) {
      alert(`File troppo grande. Max ${maxSizes[type] / (1024 * 1024)}MB`);
      setSaveStatus('error');
      return;
    }

    // Validate file types
    const allowedTypes = {
      copertina: ['image/jpeg', 'image/png', 'image/webp'],
      file: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv']
    };

    if (!allowedTypes[type].includes(file.type)) {
      alert(`Formato file non supportato per ${type}`);
      setSaveStatus('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const updates = {
        [type]: file,
        [`${type}Preview`]: type === 'file' ? file.name : e.target.result
      };
      
      setProgramForm(prev => ({ ...prev, ...updates }));
      setSaveStatus('saved');
    };
    
    if (type === 'file') {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  // Reset form function
  const resetForm = () => {
    setProgramForm({
      titolo: '',
      descrizione: '',
      prezzo: '',
      categoria: '',
      livello: '',
      durata: '',
      tipoContenuto: '',
      copertina: null,
      file: null,
      video: null,
      covertinaPreview: null,
      filePreview: null,
      videoPreview: null,
      tags: [],
      difficolta: 1,
      equipmentRequired: [],
      pubblicazioneSchedulata: '',
      limitedTime: false,
      scontoPercentuale: 0
    });
    setFormErrors({});
    setEditingProgram(null);
  };

  // Program actions
  const handleCreateProgram = () => {
    setSaveStatus('saving');
    
    if (!validateForm()) {
      setSaveStatus('error');
      return;
    }

    const newProgram = {
      ...programForm,
      id: Date.now(),
      pubblicato: false,
      vendite: 0,
      rating: 0,
      recensioni: [],
      visualizzazioni: 0,
      download: 0,
      prezzo: parseFloat(programForm.prezzo),
      dataCreazione: new Date().toISOString(),
      ultimaModifica: new Date().toISOString(),
      tags: programForm.tags || [],
      equipmentRequired: programForm.equipmentRequired || []
    };

    const updatedPrograms = [...programmi, newProgram];
    setProgrammi(updatedPrograms);
    saveProgramsToLocalStorage(updatedPrograms);
    
    resetForm();
    setActiveView('list');
  };

  const handleUpdateProgram = () => {
    setSaveStatus('saving');
    
    if (!validateForm()) {
      setSaveStatus('error');
      return;
    }

    const updatedProgram = {
      ...editingProgram,
      ...programForm,
      prezzo: parseFloat(programForm.prezzo),
      ultimaModifica: new Date().toISOString()
    };

    const updatedPrograms = programmi.map(p => 
      p.id === editingProgram.id ? updatedProgram : p
    );

    setProgrammi(updatedPrograms);
    saveProgramsToLocalStorage(updatedPrograms);
    setEditingProgram(null);
    resetForm();
    setActiveView('list');
  };

  const handleDeleteProgram = (id) => {
    if (confirm('Sei sicuro di voler eliminare questo programma?')) {
      const updatedPrograms = programmi.filter(p => p.id !== id);
      setProgrammi(updatedPrograms);
      saveProgramsToLocalStorage(updatedPrograms);
    }
  };

  const handleDuplicateProgram = (program) => {
    const duplicatedProgram = {
      ...program,
      id: Date.now(),
      titolo: `${program.titolo} (Copia)`,
      pubblicato: false,
      vendite: 0,
      rating: 0,
      dataCreazione: new Date().toISOString(),
      ultimaModifica: new Date().toISOString()
    };

    const updatedPrograms = [...programmi, duplicatedProgram];
    setProgrammi(updatedPrograms);
    saveProgramsToLocalStorage(updatedPrograms);
  };

  const togglePubblicazione = (id) => {
    const updatedPrograms = programmi.map(p => 
      p.id === id ? { 
        ...p, 
        pubblicato: !p.pubblicato,
        ultimaModifica: new Date().toISOString()
      } : p
    );
    setProgrammi(updatedPrograms);
    saveProgramsToLocalStorage(updatedPrograms);
  };

  // Bulk actions
  const handleBulkAction = (action) => {
    const updatedPrograms = programmi.map(p => {
      if (selectedPrograms.includes(p.id)) {
        switch (action) {
          case 'publish':
            return { ...p, pubblicato: true, ultimaModifica: new Date().toISOString() };
          case 'unpublish':
            return { ...p, pubblicato: false, ultimaModifica: new Date().toISOString() };
          case 'delete':
            return null;
          default:
            return p;
        }
      }
      return p;
    }).filter(Boolean);

    setProgrammi(updatedPrograms);
    saveProgramsToLocalStorage(updatedPrograms);
    setSelectedPrograms([]);
    setShowBulkActions(false);
  };

  const handleEditProgram = (program) => {
    console.log('Editing program:', program);
    setEditingProgram(program);
    setProgramForm({
      ...program,
      tags: program.tags || [],
      equipmentRequired: program.equipmentRequired || [],
      difficolta: program.difficolta || 1
    });
    setFormErrors({});
    setActiveView('edit');
  };

  // UI Components
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

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento programmi...</p>
        </div>
      </div>
    );
  }

  const StatsCards = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs text-gray-500">+{stats.thisMonth} questo mese</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totali}</p>
        <p className="text-sm text-gray-600">Programmi Totali</p>
        <div className="mt-2 text-xs text-gray-500">
          {stats.pubblicati} pubblicati • {stats.bozze} bozze
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-xs text-green-600">+12% vs ieri</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.venditeTotal}</p>
        <p className="text-sm text-gray-600">Vendite Totali</p>
        <div className="mt-2 text-xs text-gray-500">
          €{stats.revenueTotal.toFixed(2)} revenue
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-xs text-gray-500">Rating medio</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.ratingMedio.toFixed(1)}</p>
        <p className="text-sm text-gray-600">Soddisfazione</p>
        <div className="mt-2 text-xs text-gray-500">
          Categoria top: {stats.topCategory}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <Video className="w-6 h-6 text-red-600" />
          </div>
          <span className="text-xs text-gray-500">Videocorsi</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.videocorsi}</p>
        <p className="text-sm text-gray-600">Contenuti Video</p>
        <div className="mt-2 text-xs text-gray-500">
          {Math.round((stats.videocorsi / Math.max(stats.totali, 1)) * 100)}% del totale
        </div>
      </div>
    </div>
  );

  const FiltersBar = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cerca programmi, categorie, tag..."
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">Tutti i tipi</option>
            <option value="documento">📚 Documenti</option>
            <option value="video">🎥 Video</option>
            <option value="misto">📚🎥 Misti</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">Tutte le categorie</option>
            {categorie.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">Tutti gli stati</option>
            <option value="published">Pubblicati</option>
            <option value="draft">Bozze</option>
            <option value="scheduled">Programmati</option>
          </select>

          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="date">Data</option>
              <option value="titolo">Titolo</option>
              <option value="vendite">Vendite</option>
              <option value="prezzo">Prezzo</option>
              <option value="rating">Rating</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPrograms.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedPrograms.length} programmi selezionati
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('publish')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
              >
                Pubblica
              </button>
              <button
                onClick={() => handleBulkAction('unpublish')}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
              >
                Nascondi
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Elimina
              </button>
              <button
                onClick={() => setSelectedPrograms([])}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
              >
                Deseleziona
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestione Programmi</h2>
          <p className="text-gray-600">Crea, modifica e gestisci i tuoi programmi di allenamento</p>
        </div>
        <div className="flex items-center space-x-4">
          <SaveStatusIndicator />
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('analytics')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeView === 'analytics' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-purple-600 hover:bg-purple-50 border border-purple-600'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                activeView === 'list' 
                  ? 'bg-gray-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50 border border-gray-600'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Lista
            </button>
            <button
              onClick={() => {
                resetForm();
                setActiveView('create');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuovo Programma
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeView === 'list' && (
        <>
          <StatsCards />
          <FiltersBar />

          {/* Programs List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  I Tuoi Programmi ({getFilteredPrograms().length}
                  {programmi.length !== getFilteredPrograms().length && ` di ${programmi.length}`})
                </h3>
                <div className="text-sm text-gray-500">
                  {stats.pubblicati} pubblicati • {stats.bozze} bozze
                </div>
              </div>
            </div>
            
            {getFilteredPrograms().length === 0 ? (
              <div className="text-center py-12">
                {programmi.length === 0 ? (
                  <>
                    <div className="flex justify-center space-x-4 mb-4">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <Video className="w-12 h-12 text-gray-300" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Nessun programma ancora</h4>
                    <p className="text-gray-600 mb-6">
                      Crea il tuo primo programma di allenamento per iniziare a vendere
                    </p>
                    <button
                      onClick={() => {
                        resetForm();
                        setActiveView('create');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crea Primo Programma
                    </button>
                  </>
                ) : (
                  <>
                    <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Nessun risultato</h4>
                    <p className="text-gray-600 mb-4">
                      Prova a modificare i filtri di ricerca
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterType('all');
                        setFilterCategory('all');
                        setFilterStatus('all');
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Cancella filtri
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {getFilteredPrograms().map((programma) => (
                  <div key={programma.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedPrograms.includes(programma.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPrograms([...selectedPrograms, programma.id]);
                            } else {
                              setSelectedPrograms(selectedPrograms.filter(id => id !== programma.id));
                            }
                          }}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />

                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                          {programma.covertinaPreview ? (
                            <img src={programma.covertinaPreview} className="w-full h-full object-cover" alt="Copertina" />
                          ) : (
                            <Image className="w-8 h-8 text-gray-400" />
                          )}
                          
                          {/* Content Type Badge */}
                          <div className="absolute top-1 right-1">
                            {getContentTypeLabel(programma) === 'video' && (
                              <div className="bg-red-600 text-white p-1 rounded-full">
                                <Video className="w-3 h-3" />
                              </div>
                            )}
                            {getContentTypeLabel(programma) === 'misto' && (
                              <div className="bg-purple-600 text-white p-1 rounded-full">
                                <Upload className="w-3 h-3" />
                              </div>
                            )}
                            {getContentTypeLabel(programma) === 'documento' && (
                              <div className="bg-blue-600 text-white p-1 rounded-full">
                                <FileText className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Program Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{programma.titolo}</h4>
                            
                            {/* Type Badge */}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getContentTypeLabel(programma) === 'video' ? 'bg-red-100 text-red-800' :
                              getContentTypeLabel(programma) === 'misto' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {getContentTypeLabel(programma) === 'video' && '🎥 Video'}
                              {getContentTypeLabel(programma) === 'misto' && '📚🎥 Misto'}
                              {getContentTypeLabel(programma) === 'documento' && '📚 Doc'}
                            </span>
                            
                            {/* Status Badge */}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              programma.pubblicato 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {programma.pubblicato ? '✅ Pubblicato' : '📝 Bozza'}
                            </span>

                            {/* Difficulty */}
                            {programma.difficolta && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {difficultyLabels[programma.difficolta]}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{programma.descrizione}</p>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-5 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Categoria:</span>
                              <p className="font-medium">{programma.categoria}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Prezzo:</span>
                              <p className="font-medium text-green-600">€{programma.prezzo}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Vendite:</span>
                              <p className="font-medium">{programma.vendite || 0}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Rating:</span>
                              <p className="font-medium flex items-center">
                                {programma.rating > 0 ? (
                                  <>
                                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                    {programma.rating.toFixed(1)}
                                  </>
                                ) : (
                                  'Nessuna'
                                )}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Durata:</span>
                              <p className="font-medium">{programma.durata}</p>
                            </div>
                          </div>

                          {/* Tags */}
                          {programma.tags?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {programma.tags.slice(0, 5).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                  #{tag}
                                </span>
                              ))}
                              {programma.tags.length > 5 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{programma.tags.length - 5} altri
                                </span>
                              )}
                            </div>
                          )}

                          {/* Meta Info */}
                          <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Creato: {new Date(programma.dataCreazione).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Modificato: {new Date(programma.ultimaModifica).toLocaleDateString()}
                            </span>
                            {programma.visualizzazioni > 0 && (
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {programma.visualizzazioni} visualizzazioni
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-6">
                        {/* Quick Actions */}
                        <button
                          onClick={() => {/* Preview logic */}}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleEditProgram(programma)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDuplicateProgram(programma)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Duplica"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        
                        {/* Dropdown Actions */}
                        <div className="relative group">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {/* Share logic */}}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Condividi
                              </button>
                              <button
                                onClick={() => {/* Download logic */}}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </button>
                              <button
                                onClick={() => {/* Analytics logic */}}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Analytics
                              </button>
                              <hr className="my-1" />
                              <button
                                onClick={() => handleDeleteProgram(programma.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Elimina
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Publish Toggle */}
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Create/Edit Form */}
      {(activeView === 'create' || activeView === 'edit') && (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-900">
              {activeView === 'create' ? 'Nuovo Programma' : 'Modifica Programma'}
            </h3>
            <button
              onClick={() => {
                resetForm();
                setActiveView('list');
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            activeView === 'create' ? handleCreateProgram() : handleUpdateProgram();
          }} className="space-y-8">
            
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titolo Programma *</label>
                <input
                  type="text"
                  value={programForm.titolo}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, titolo: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.titolo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Es: Massa Muscolare Avanzato"
                />
                {formErrors.titolo && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.titolo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo (€) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={programForm.prezzo}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, prezzo: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.prezzo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="29.99"
                />
                {formErrors.prezzo && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.prezzo}</p>
                )}
              </div>
            </div>

            {/* Category and Level */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                <select
                  value={programForm.categoria}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, categoria: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.categoria ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleziona categoria</option>
                  {categorie.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {formErrors.categoria && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.categoria}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Livello *</label>
                <select
                  value={programForm.livello}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, livello: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.livello ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleziona livello</option>
                  {livelli.map(liv => (
                    <option key={liv} value={liv}>{liv}</option>
                  ))}
                </select>
                {formErrors.livello && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.livello}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durata *</label>
                <input
                  type="text"
                  value={programForm.durata}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, durata: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.durata ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Es: 8 settimane, 3 mesi..."
                />
                {formErrors.durata && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.durata}</p>
                )}
              </div>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipo Contenuto *</label>
              <div className="grid grid-cols-3 gap-4">
                {tipiContenuto.map((tipo) => {
                  const Icon = tipo.icon;
                  return (
                    <label
                      key={tipo.value}
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-colors ${
                        programForm.tipoContenuto === tipo.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={tipo.value}
                        checked={programForm.tipoContenuto === tipo.value}
                        onChange={(e) => setProgramForm(prev => ({ ...prev, tipoContenuto: e.target.value }))}
                        className="hidden"
                      />
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        programForm.tipoContenuto === tipo.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-sm font-medium ${
                        programForm.tipoContenuto === tipo.value ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {tipo.label}
                      </p>
                    </label>
                  );
                })}
              </div>
              {formErrors.tipoContenuto && (
                <p className="text-red-500 text-xs mt-1">{formErrors.tipoContenuto}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione *</label>
              <textarea
                value={programForm.descrizione}
                onChange={(e) => setProgramForm(prev => ({ ...prev, descrizione: e.target.value }))}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.descrizione ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Descrivi il programma, gli obiettivi e cosa include..."
                maxLength="2000"
              />
              {formErrors.descrizione && (
                <p className="text-red-500 text-xs mt-1">{formErrors.descrizione}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {programForm.descrizione.length}/2000 caratteri
              </p>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copertina Programma *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {programForm.covertinaPreview ? (
                    <div className="text-center">
                      <img src={programForm.covertinaPreview} className="w-full h-40 object-cover rounded-lg mb-4" alt="Preview copertina" />
                      <p className="text-sm text-gray-600 mb-2">{programForm.copertina?.name}</p>
                      <button
                        type="button"
                        onClick={() => setProgramForm(prev => ({ ...prev, copertina: null, covertinaPreview: null }))}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Rimuovi
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block text-center">
                      <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Clicca per caricare copertina</p>
                      <p className="text-xs text-gray-500">JPG, PNG, WebP (max 5MB)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('copertina', e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {formErrors.copertina && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.copertina}</p>
                )}
              </div>

              {/* Conditional Content Uploads */}
              {(programForm.tipoContenuto === 'documento' || programForm.tipoContenuto === 'misto') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Programma * {programForm.tipoContenuto === 'misto' && '(Documenti)'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    {programForm.filePreview ? (
                      <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto text-gray-600 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">{programForm.filePreview}</p>
                        <button
                          type="button"
                          onClick={() => setProgramForm(prev => ({ ...prev, file: null, filePreview: null }))}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Rimuovi
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Clicca per caricare documenti</p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX (max 50MB)</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload('file', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {formErrors.file && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.file}</p>
                  )}
                </div>
              )}

              {(programForm.tipoContenuto === 'video' || programForm.tipoContenuto === 'misto') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Programma * {programForm.tipoContenuto === 'misto' && '(Videocorso)'}
                  </label>
                  <div className="border-2 border-dashed border-red-200 rounded-lg p-6 bg-red-50">
                    {programForm.videoPreview ? (
                      <div className="text-center">
                        <video
                          src={programForm.videoPreview}
                          className="w-full h-60 object-cover rounded-lg mb-4"
                          controls
                          preload="metadata"
                        />
                        <p className="text-sm text-gray-600 mb-2">{programForm.video?.name}</p>
                        <button
                          type="button"
                          onClick={() => setProgramForm(prev => ({ ...prev, video: null, videoPreview: null }))}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Rimuovi Video
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block text-center">
                        <Video className="w-12 h-12 mx-auto text-red-600 mb-2" />
                        <p className="text-sm text-red-700 mb-1 font-medium">🎥 Clicca per caricare video</p>
                        <p className="text-xs text-red-600">MP4, MOV, AVI, WMV (max 500MB)</p>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload('video', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {formErrors.video && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.video}</p>
                  )}
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Impostazioni Avanzate</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficoltà</label>
                  <select
                    value={programForm.difficolta}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, difficolta: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(difficultyLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Scheduled Publishing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pubblicazione Programmata</label>
                  <input
                    type="datetime-local"
                    value={programForm.pubblicazioneSchedulata}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, pubblicazioneSchedulata: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lascia vuoto per pubblicazione immediata</p>
                </div>
              </div>

              {/* Equipment Required */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Attrezzatura Richiesta</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {equipmentOptions.map((equipment) => (
                    <label key={equipment} className="flex items-center space-x-2 cursor-pointer p-2 rounded border hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={programForm.equipmentRequired?.includes(equipment)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProgramForm(prev => ({ 
                              ...prev, 
                              equipmentRequired: [...(prev.equipmentRequired || []), equipment] 
                            }));
                          } else {
                            setProgramForm(prev => ({ 
                              ...prev, 
                              equipmentRequired: (prev.equipmentRequired || []).filter(eq => eq !== equipment) 
                            }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{equipment}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (separati da virgola)</label>
                <input
                  type="text"
                  value={programForm.tags?.join(', ') || ''}
                  onChange={(e) => setProgramForm(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="es: massa, avanzato, palestra, forza"
                />
                <p className="text-xs text-gray-500 mt-1">I tag aiutano gli utenti a trovare il tuo programma</p>
              </div>

              {/* Discount Settings */}
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="limitedTime"
                    checked={programForm.limitedTime}
                    onChange={(e) => setProgramForm(prev => ({ ...prev, limitedTime: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="limitedTime" className="text-sm font-medium text-gray-700">
                    Offerta a Tempo Limitato
                  </label>
                </div>

                {programForm.limitedTime && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sconto (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={programForm.scontoPercentuale}
                      onChange={(e) => setProgramForm(prev => ({ ...prev, scontoPercentuale: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveView('list');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {activeView === 'create' ? 'Crea Programma' : 'Salva Modifiche'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && (
        <div className="space-y-8">
          <StatsCards />
          
          {/* Performance Charts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Programs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Programmi Top Performance</h3>
              <div className="space-y-4">
                {programmi
                  .filter(p => p.pubblicato)
                  .sort((a, b) => (b.vendite || 0) - (a.vendite || 0))
                  .slice(0, 5)
                  .map((programma, index) => (
                    <div key={programma.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{programma.titolo}</h4>
                          <p className="text-sm text-gray-600">{programma.categoria}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{programma.vendite || 0} vendite</p>
                        <p className="text-sm text-green-600">€{((programma.vendite || 0) * parseFloat(programma.prezzo || 0)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                }
                {programmi.filter(p => p.pubblicato).length === 0 && (
                  <p className="text-gray-500 text-center py-8">Nessun programma pubblicato ancora</p>
                )}
              </div>
            </div>

            {/* Categories Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance per Categoria</h3>
              <div className="space-y-4">
                {Object.entries(
                  programmi.reduce((acc, p) => {
                    if (p.categoria) {
                      acc[p.categoria] = (acc[p.categoria] || 0) + (p.vendite || 0);
                    }
                    return acc;
                  }, {})
                )
                .sort(([,a], [,b]) => b - a)
                .slice(0, 6)
                .map(([categoria, vendite]) => (
                  <div key={categoria} className="flex items-center justify-between">
                    <span className="text-gray-700">{categoria}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((vendite / Math.max(...Object.values(programmi.reduce((acc, p) => {
                            if (p.categoria) {
                              acc[p.categoria] = (acc[p.categoria] || 0) + (p.vendite || 0);
                            }
                            return acc;
                          }, {})), 1)) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">{vendite}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Trends */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Tendenze Revenue</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">€{stats.revenueTotal.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Revenue Totale</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">€{(stats.revenueTotal / Math.max(stats.venditeTotal, 1)).toFixed(2)}</p>
                <p className="text-sm text-gray-600">Revenue Media/Vendita</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{Math.round((stats.venditeTotal / Math.max(stats.pubblicati, 1)) * 100) / 100}</p>
                <p className="text-sm text-gray-600">Vendite Media/Programma</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{Math.round(((stats.venditeTotal / Math.max(programmi.reduce((sum, p) => sum + (p.visualizzazioni || 0), 0), 1)) * 100) * 100) / 100}%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Suggerimenti per Migliorare
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stats.pubblicati === 0 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Pubblica il tuo primo programma</p>
                    <p className="text-sm text-gray-600">Inizia a vendere pubblicando almeno un programma</p>
                  </div>
                </div>
              )}
              
              {stats.videocorsi === 0 && stats.totali > 0 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Crea videocorsi</p>
                    <p className="text-sm text-gray-600">I video aumentano le vendite del 40%</p>
                  </div>
                </div>
              )}
              
              {stats.ratingMedio < 4 && stats.venditeTotal > 0 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Migliora la qualità</p>
                    <p className="text-sm text-gray-600">Rating sotto 4.0, richiedi feedback ai clienti</p>
                  </div>
                </div>
              )}
              
              {categorie.filter(cat => programmi.some(p => p.categoria === cat)).length < 3 && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Diversifica l'offerta</p>
                    <p className="text-sm text-gray-600">Crea programmi in più categorie per raggiungere più clienti</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Preview Programma</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Preview Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start space-x-6">
                  {programForm.covertinaPreview && (
                    <img src={programForm.covertinaPreview} className="w-32 h-32 object-cover rounded-lg" alt="Copertina" />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{programForm.titolo}</h2>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {programForm.categoria}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {programForm.livello}
                      </span>
                      <span className="text-2xl font-bold text-green-600">€{programForm.prezzo}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {programForm.durata}
                      </span>
                      <span className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {difficultyLabels[programForm.difficolta]}
                      </span>
                      <span className="flex items-center">
                        {programForm.tipoContenuto === 'video' && <Video className="w-4 h-4 mr-1" />}
                        {programForm.tipoContenuto === 'documento' && <FileText className="w-4 h-4 mr-1" />}
                        {programForm.tipoContenuto === 'misto' && <Upload className="w-4 h-4 mr-1" />}
                        {tipiContenuto.find(t => t.value === programForm.tipoContenuto)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrizione</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{programForm.descrizione}</p>
                </div>

                {/* Equipment */}
                {programForm.equipmentRequired?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Attrezzatura Richiesta</h3>
                    <div className="flex flex-wrap gap-2">
                      {programForm.equipmentRequired.map((equipment) => (
                        <span key={equipment} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {programForm.tags?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {programForm.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Preview */}
                {programForm.videoPreview && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Video Preview</h3>
                    <video
                      src={programForm.videoPreview}
                      className="w-full h-60 object-cover rounded-lg"
                      controls
                      preload="metadata"
                    />
                  </div>
                )}
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
                  // Logic to view live preview
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