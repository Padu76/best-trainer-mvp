import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Star,
  Clock,
  Users,
  Target,
  TrendingUp,
  Award,
  Play,
  Download,
  Heart,
  Share2,
  ChevronDown,
  Grid,
  List,
  Zap,
  Eye,
  User,
  MapPin,
  Calendar,
  CheckCircle,
  FileText,
  Video,
  Upload
} from 'lucide-react';

export default function ProgrammiListing() {
  const [programmi, setProgrammi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('');
  const [filterLivello, setFilterLivello] = useState('');
  const [filterDurata, setFilterDurata] = useState('');
  const [filterPrezzo, setFilterPrezzo] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Mock user per demo
  const currentUser = {
    id: 'user_123',
    nome: 'Mario Rossi'
  };

  // Carica programmi dal localStorage della dashboard PT + dati mock
  useEffect(() => {
    const loadProgrammi = () => {
      setLoading(true);
      try {
        // Carica programmi reali dalla dashboard PT
        const savedPrograms = localStorage.getItem('bt_programs_data');
        let realPrograms = [];
        
        if (savedPrograms) {
          const parsedPrograms = JSON.parse(savedPrograms);
          // Filtra solo i programmi pubblicati
          realPrograms = Array.isArray(parsedPrograms) 
            ? parsedPrograms.filter(p => p.pubblicato === true)
            : [];
          
          console.log('Programmi caricati dalla dashboard PT:', realPrograms);
        }

        // Dati mock per demo (puoi rimuoverli quando hai abbastanza programmi reali)
        const mockPrograms = [
          {
            id: 'mock_1',
            titolo: 'Massa Muscolare 12 Settimane',
            descrizione: 'Programma completo per aumentare la massa muscolare in 12 settimane con tecniche avanzate.',
            prezzo: 19.9,
            categoria: 'Massa Muscolare',
            livello: 'Intermedio',
            durata: '12 settimane',
            tipoContenuto: 'misto',
            covertinaPreview: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            rating: 4.8,
            numeroRecensioni: 156,
            vendite: 145,
            trainer: {
              id: 'pt_mock_1',
              nome: 'Marco Fitness',
              foto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
              rating: 4.9,
              numeroStudenti: 450
            },
            tags: ['massa', 'forza', 'intermedio'],
            equipmentRequired: ['Bilanciere', 'Manubri', 'Panca'],
            dataCreazione: '2024-01-15T10:00:00Z',
            pubblicato: true,
            isMock: true
          },
          {
            id: 'mock_2', 
            titolo: 'Cardio Intenso HIIT',
            descrizione: 'Allenamento cardio ad alta intensità per bruciare grassi e migliorare la resistenza.',
            prezzo: 15.9,
            categoria: 'Cardio & Resistenza',
            livello: 'Avanzato',
            durata: '8 settimane',
            tipoContenuto: 'video',
            covertinaPreview: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop',
            rating: 4.6,
            numeroRecensioni: 89,
            vendite: 92,
            trainer: {
              id: 'pt_mock_2',
              nome: 'Sara Cardio',
              foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face',
              rating: 4.7,
              numeroStudenti: 280
            },
            tags: ['cardio', 'hiit', 'dimagrimento'],
            equipmentRequired: ['Nessun attrezzo'],
            dataCreazione: '2024-01-10T14:00:00Z',
            pubblicato: true,
            isMock: true
          }
        ];

        // Combina programmi reali e mock
        const allPrograms = [...realPrograms, ...mockPrograms];
        
        // Trasforma i programmi reali per avere la stessa struttura dei mock
        const normalizedPrograms = allPrograms.map(p => ({
          ...p,
          // Assicurati che ogni programma abbia tutti i campi necessari
          rating: p.rating || 0,
          numeroRecensioni: p.numeroRecensioni || 0,
          vendite: p.vendite || 0,
          trainer: p.trainer || {
            id: 'pt_unknown',
            nome: 'Personal Trainer',
            foto: null,
            rating: 0,
            numeroStudenti: 0
          },
          tags: p.tags || [],
          equipmentRequired: p.equipmentRequired || [],
          // Aggiungi campi mancanti per retrocompatibilità
          sport: p.categoria,
          download: p.vendite || 0
        }));

        setProgrammi(normalizedPrograms);
        console.log('Tutti i programmi caricati:', normalizedPrograms);
        
      } catch (error) {
        console.error('Errore nel caricamento programmi:', error);
        setProgrammi([]);
      } finally {
        setLoading(false);
      }
    };

    loadProgrammi();

    // Ricarica ogni 30 secondi per sincronizzare con la dashboard PT
    const interval = setInterval(loadProgrammi, 30000);
    return () => clearInterval(interval);
  }, []);

  // Carica wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem('bt_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Errore caricamento wishlist:', error);
      }
    }
  }, []);

  // Salva wishlist
  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('bt_wishlist', JSON.stringify(newWishlist));
  };

  // Options per filtri
  const sportOptions = [...new Set(programmi.map(p => p.categoria).filter(Boolean))];
  const livelloOptions = [...new Set(programmi.map(p => p.livello).filter(Boolean))];
  const durataOptions = [...new Set(programmi.map(p => p.durata).filter(Boolean))];

  // Filtering e sorting
  const getFilteredAndSortedPrograms = () => {
    let filtered = [...programmi];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.titolo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descrizione?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.trainer?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filters
    if (filterSport) {
      filtered = filtered.filter(p => p.categoria === filterSport);
    }

    if (filterLivello) {
      filtered = filtered.filter(p => p.livello === filterLivello);
    }

    if (filterDurata) {
      filtered = filtered.filter(p => p.durata === filterDurata);
    }

    if (filterPrezzo) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.prezzo);
        switch (filterPrezzo) {
          case 'free': return price === 0;
          case 'under20': return price > 0 && price < 20;
          case '20to50': return price >= 20 && price <= 50;
          case 'over50': return price > 50;
          default: return true;
        }
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'popularity':
          aValue = (a.vendite || 0) + (a.numeroRecensioni || 0) * 2;
          bValue = (b.vendite || 0) + (b.numeroRecensioni || 0) * 2;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'price':
          aValue = parseFloat(a.prezzo || 0);
          bValue = parseFloat(b.prezzo || 0);
          break;
        case 'date':
          aValue = new Date(a.dataCreazione || 0);
          bValue = new Date(b.dataCreazione || 0);
          break;
        case 'name':
          aValue = a.titolo?.toLowerCase() || '';
          bValue = b.titolo?.toLowerCase() || '';
          break;
        default:
          aValue = (a.vendite || 0) + (a.numeroRecensioni || 0) * 2;
          bValue = (b.vendite || 0) + (b.numeroRecensioni || 0) * 2;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // Wishlist functions
  const toggleWishlist = (programId) => {
    const newWishlist = wishlist.includes(programId)
      ? wishlist.filter(id => id !== programId)
      : [...wishlist, programId];
    saveWishlist(newWishlist);
  };

  // Get content type icon
  const getContentTypeIcon = (tipoContenuto) => {
    switch (tipoContenuto) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'misto': return <Upload className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Get content type label
  const getContentTypeLabel = (tipoContenuto) => {
    switch (tipoContenuto) {
      case 'video': return 'Video';
      case 'misto': return 'Misto';
      default: return 'Documenti';
    }
  };

  const filteredPrograms = getFilteredAndSortedPrograms();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento programmi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tutti i Programmi</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trova il programma perfetto per i tuoi obiettivi tra {programmi.length} opzioni disponibili
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Cerca programmi, trainer, obiettivi..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtri
                </h3>
                <button
                  onClick={() => {
                    setFilterSport('');
                    setFilterLivello('');
                    setFilterDurata('');
                    setFilterPrezzo('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Cancella
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cerca</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="massa"
                    />
                  </div>
                </div>

                {/* Sport/Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                  <select
                    value={filterSport}
                    onChange={(e) => setFilterSport(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tutti gli sport</option>
                    {sportOptions.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Livello</label>
                  <select
                    value={filterLivello}
                    onChange={(e) => setFilterLivello(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tutti i livelli</option>
                    {livelloOptions.map(livello => (
                      <option key={livello} value={livello}>{livello}</option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durata</label>
                  <select
                    value={filterDurata}
                    onChange={(e) => setFilterDurata(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Qualsiasi durata</option>
                    {durataOptions.map(durata => (
                      <option key={durata} value={durata}>{durata}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo</label>
                  <select
                    value={filterPrezzo}
                    onChange={(e) => setFilterPrezzo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tutti i prezzi</option>
                    <option value="free">Gratuiti</option>
                    <option value="under20">Sotto €20</option>
                    <option value="20to50">€20 - €50</option>
                    <option value="over50">Oltre €50</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Applica Filtri
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredPrograms.length} programmi trovati
                </h2>
                <p className="text-sm text-gray-600">
                  {searchTerm && `Risultati per "${searchTerm}"`}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="popularity">Più Popolari</option>
                    <option value="rating">Migliore Rating</option>
                    <option value="price">Prezzo</option>
                    <option value="date">Più Recenti</option>
                    <option value="name">Nome A-Z</option>
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

            {/* Results */}
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessun programma trovato</h3>
                <p className="text-gray-600 mb-4">
                  Prova a modificare i filtri di ricerca o esplorare tutte le categorie
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterSport('');
                    setFilterLivello('');
                    setFilterDurata('');
                    setFilterPrezzo('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mostra tutti i programmi
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredPrograms.map((programma) => (
                  <div
                    key={programma.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'}`}>
                      {programma.covertinaPreview ? (
                        <img
                          src={programma.covertinaPreview}
                          alt={programma.titolo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FileText className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {programma.categoria}
                        </span>
                        {programma.isMock && (
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Demo
                          </span>
                        )}
                      </div>
                      
                      {/* Content Type */}
                      <div className="absolute top-3 right-3">
                        <div className={`p-2 rounded-full text-white ${
                          programma.tipoContenuto === 'video' ? 'bg-red-600' :
                          programma.tipoContenuto === 'misto' ? 'bg-purple-600' : 'bg-blue-600'
                        }`}>
                          {getContentTypeIcon(programma.tipoContenuto)}
                        </div>
                      </div>

                      {/* Wishlist */}
                      <button
                        onClick={() => toggleWishlist(programma.id)}
                        className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Heart className={`w-4 h-4 ${
                          wishlist.includes(programma.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                      {/* Trainer */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {programma.trainer?.foto ? (
                            <img src={programma.trainer.foto} className="w-full h-full object-cover" alt="Trainer" />
                          ) : (
                            <User className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{programma.trainer?.nome}</p>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">
                              {programma.trainer?.rating?.toFixed(1)} ({programma.trainer?.numeroStudenti})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Program Info */}
                      <Link href={`/programmi/${programma.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                          {programma.titolo}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {programma.descrizione}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {programma.tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {programma.livello && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                            {programma.livello}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{programma.durata}</span>
                          </div>
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            <span>{programma.vendite}</span>
                          </div>
                          {programma.rating > 0 && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                              <span>{programma.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {getContentTypeLabel(programma.tipoContenuto)}
                        </span>
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">€{programma.prezzo}</span>
                          <span className="text-sm text-gray-500 ml-1">una tantum</span>
                        </div>
                        <Link href={`/programmi/${programma.id}`}>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            Dettagli
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}