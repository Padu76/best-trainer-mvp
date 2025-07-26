import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Search, 
  Eye, 
  Download, 
  FileText, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  AlertTriangle, 
  Shield, 
  Star, 
  TrendingUp,
  Send,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Linkedin,
  Instagram,
  Globe,
  User,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ adminData }) {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    dateRange: 'all',
    score: 'all'
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    underReview: 0
  });

  // Mock data per demo
  const mockApplications = [
    {
      id: 'PT-1638123456789',
      nome: 'Marco',
      cognome: 'Rossi',
      email: 'marco.rossi@email.com',
      telefono: '+39 349 123 4567',
      citta: 'Milano',
      anniEsperienza: '5-10',
      specializzazioni: ['Bodybuilding & Massa Muscolare', 'Powerlifting & Forza'],
      certificazioni: ['coni', 'fipe', 'nasm'],
      titoloDiStudio: 'laurea-scienze-motorie',
      linkedinProfile: 'https://linkedin.com/in/marcorossi',
      instagramProfile: '@marco.trainer',
      motivazione: 'Voglio far parte di Best-Trainer perché credo nella qualità e nella professionalità. Ho aiutato oltre 200 clienti a raggiungere i loro obiettivi.',
      status: 'pending',
      submissionDate: '2024-01-15T10:30:00Z',
      completionScore: 95,
      documentsUploaded: 4,
      documentsRequired: 4,
      adminNotes: '',
      reviewedBy: null,
      reviewDate: null
    },
    {
      id: 'PT-1638123456790',
      nome: 'Sofia',
      cognome: 'Bianchi',
      email: 'sofia.bianchi@email.com',
      telefono: '+39 347 987 6543',
      citta: 'Roma',
      anniEsperienza: '3-5',
      specializzazioni: ['Dimagrimento & Tonificazione', 'Functional Training'],
      certificazioni: ['coni', 'asi', 'issa'],
      titoloDiStudio: 'laurea-scienze-motorie',
      linkedinProfile: 'https://linkedin.com/in/sofiabianchi',
      instagramProfile: '@sofia.fitness',
      motivazione: 'La mia passione è aiutare le donne a sentirsi sicure del proprio corpo attraverso l\'allenamento personalizzato.',
      status: 'under-review',
      submissionDate: '2024-01-14T14:15:00Z',
      completionScore: 88,
      documentsUploaded: 3,
      documentsRequired: 4,
      adminNotes: 'Manca certificazione CONI aggiornata',
      reviewedBy: 'Admin 1',
      reviewDate: '2024-01-16T09:00:00Z'
    },
    {
      id: 'PT-1638123456791',
      nome: 'Andrea',
      cognome: 'Verdi',
      email: 'andrea.verdi@email.com',
      telefono: '+39 335 456 7890',
      citta: 'Torino',
      anniEsperienza: '10+',
      specializzazioni: ['Preparazione Atletica', 'Functional Training', 'Crossfit'],
      certificazioni: ['coni', 'fipe', 'acsm', 'nasm'],
      titoloDiStudio: 'laurea-scienze-motorie',
      linkedinProfile: 'https://linkedin.com/in/andreaverdi',
      instagramProfile: '@andrea.coach',
      motivazione: 'Con 12 anni di esperienza nella preparazione atletica, voglio condividere le mie competenze con una community di professionisti.',
      status: 'approved',
      submissionDate: '2024-01-12T16:45:00Z',
      completionScore: 98,
      documentsUploaded: 5,
      documentsRequired: 4,
      adminNotes: 'Profilo eccellente, esperienza comprovata',
      reviewedBy: 'Admin 2',
      reviewDate: '2024-01-13T11:30:00Z'
    },
    {
      id: 'PT-1638123456792',
      nome: 'Elena',
      cognome: 'Russo',
      email: 'elena.russo@email.com',
      telefono: '+39 348 111 2222',
      citta: 'Napoli',
      anniEsperienza: '1-3',
      specializzazioni: ['Yoga & Stretching', 'Pilates'],
      certificazioni: ['asi'],
      titoloDiStudio: 'diploma',
      linkedinProfile: 'https://linkedin.com/in/elenarusso',
      instagramProfile: '@elena.yoga',
      motivazione: 'Sono appassionata di yoga e voglio diffondere i benefici di questa disciplina.',
      status: 'rejected',
      submissionDate: '2024-01-10T12:20:00Z',
      completionScore: 65,
      documentsUploaded: 2,
      documentsRequired: 4,
      adminNotes: 'Certificazioni insufficienti, esperienza limitata',
      reviewedBy: 'Admin 1',
      reviewDate: '2024-01-11T15:45:00Z'
    }
  ];

  useEffect(() => {
    // Simula caricamento dati
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
    
    // Calcola statistiche
    const newStats = {
      total: mockApplications.length,
      pending: mockApplications.filter(app => app.status === 'pending').length,
      approved: mockApplications.filter(app => app.status === 'approved').length,
      rejected: mockApplications.filter(app => app.status === 'rejected').length,
      underReview: mockApplications.filter(app => app.status === 'under-review').length
    };
    setStats(newStats);
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Filtro per status
    if (filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    // Filtro per ricerca
    if (filters.search) {
      filtered = filtered.filter(app => 
        app.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.cognome.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.citta.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro per score
    if (filters.score !== 'all') {
      if (filters.score === 'high') {
        filtered = filtered.filter(app => app.completionScore >= 90);
      } else if (filters.score === 'medium') {
        filtered = filtered.filter(app => app.completionScore >= 70 && app.completionScore < 90);
      } else if (filters.score === 'low') {
        filtered = filtered.filter(app => app.completionScore < 70);
      }
    }

    setFilteredApplications(filtered);
  }, [filters, applications]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under-review': return <Eye className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleStatusChange = (applicationId, newStatus, notes = '') => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: newStatus, 
            adminNotes: notes,
            reviewedBy: adminData?.username || 'Admin Current',
            reviewDate: new Date().toISOString()
          }
        : app
    ));
    
    // Simula invio email
    setTimeout(() => {
      alert(`Email di ${newStatus === 'approved' ? 'approvazione' : 'rifiuto'} inviata con successo!`);
    }, 500);
  };

  const sendMessage = (applicationId, message) => {
    // Simula invio messaggio
    alert(`Messaggio inviato a ${applications.find(app => app.id === applicationId)?.email}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totale Richieste</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Attesa</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Revisione</p>
              <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approvate</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rifiutate</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti gli Status</option>
              <option value="pending">In Attesa</option>
              <option value="under-review">In Revisione</option>
              <option value="approved">Approvate</option>
              <option value="rejected">Rifiutate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
            <select
              value={filters.score}
              onChange={(e) => setFilters(prev => ({ ...prev, score: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti i Score</option>
              <option value="high">Alto (90+)</option>
              <option value="medium">Medio (70-89)</option>
              <option value="low">Basso (&lt;70)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ricerca</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Cerca per nome, email, città..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Richieste ({filteredApplications.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Aggiornato: {new Date().toLocaleTimeString('it-IT')}
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedApplication?.id === application.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {application.nome} {application.cognome}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(application.completionScore)}`}>
                          {application.completionScore}%
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {application.email}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {application.citta}
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          {application.anniEsperienza} anni
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          {application.documentsUploaded}/{application.documentsRequired} docs
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {application.specializzazioni.slice(0, 2).map((spec, index) => (
                          <span key={index} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {spec}
                          </span>
                        ))}
                        {application.specializzazioni.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            +{application.specializzazioni.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right text-sm text-gray-500">
                      <div>{new Date(application.submissionDate).toLocaleDateString('it-IT')}</div>
                      <div className="text-xs">{new Date(application.submissionDate).toLocaleTimeString('it-IT')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Detail Panel */}
        <div className="lg:col-span-1">
          {selectedApplication ? (
            <div className="bg-white rounded-xl shadow-sm border sticky top-8">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dettagli Richiesta
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {selectedApplication.nome} {selectedApplication.cognome}
                    </h4>
                    <p className="text-sm text-gray-600">{selectedApplication.email}</p>
                  </div>
                </div>

                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedApplication.status)}`}>
                  {getStatusIcon(selectedApplication.status)}
                  <span className="ml-2 capitalize">{selectedApplication.status.replace('-', ' ')}</span>
                </span>
              </div>

              <div className="p-6 space-y-6">
                {/* Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Score</span>
                    <span className={`text-sm font-semibold ${selectedApplication.completionScore >= 90 ? 'text-green-600' : selectedApplication.completionScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedApplication.completionScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${selectedApplication.completionScore >= 90 ? 'bg-green-500' : selectedApplication.completionScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${selectedApplication.completionScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Info Personali */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Info Personali</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      {selectedApplication.telefono}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      {selectedApplication.citta}
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-gray-400 mr-2" />
                      {selectedApplication.anniEsperienza} anni esperienza
                    </div>
                  </div>
                </div>

                {/* Certificazioni */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Certificazioni</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.certificazioni.map((cert, index) => (
                      <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full uppercase font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Presenza Online</h4>
                  <div className="space-y-2">
                    {selectedApplication.linkedinProfile && (
                      <a 
                        href={selectedApplication.linkedinProfile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:underline"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn Profile
                      </a>
                    )}
                    {selectedApplication.instagramProfile && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Instagram className="w-4 h-4 mr-2" />
                        {selectedApplication.instagramProfile}
                      </div>
                    )}
                  </div>
                </div>

                {/* Motivazione */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Motivazione</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedApplication.motivazione}
                  </p>
                </div>

                {/* Admin Notes */}
                {selectedApplication.adminNotes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Note Admin</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedApplication.adminNotes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                {selectedApplication.status === 'pending' || selectedApplication.status === 'under-review' ? (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'approved', 'Richiesta approvata - profilo conforme ai requisiti')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Approva
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedApplication.id, 'rejected', 'Richiesta rifiutata - requisiti non soddisfatti')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Rifiuta
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleStatusChange(selectedApplication.id, 'under-review', 'Richiesta in fase di revisione')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Metti in Revisione
                    </button>

                    <button
                      onClick={() => sendMessage(selectedApplication.id, 'Richiesta informazioni aggiuntive')}
                      className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Invia Messaggio
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedApplication.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedApplication.status === 'approved' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Richiesta Approvata
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Richiesta Rifiutata
                        </>
                      )}
                    </div>
                    {selectedApplication.reviewDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Revisionato il {new Date(selectedApplication.reviewDate).toLocaleDateString('it-IT')} 
                        da {selectedApplication.reviewedBy}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seleziona una Richiesta
              </h3>
              <p className="text-gray-600">
                Clicca su una richiesta dalla lista per visualizzare i dettagli e gestire l'approvazione.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}