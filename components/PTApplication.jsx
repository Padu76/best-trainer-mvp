import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Users,
  Trophy,
  Briefcase,
  GraduationCap,
  FileText,
  Camera,
  Instagram,
  Facebook,
  Youtube,
  AlertCircle,
  Shield,
  Linkedin,
  Globe,
  Clock,
  Target
} from 'lucide-react';

export default function PTApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Info Personali
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    regione: '',
    dataNascita: '',
    codiceFiscale: '',
    
    // Step 2: Esperienza Professionale
    anniEsperienza: '',
    specializzazioni: [],
    clientiGestiti: '',
    descrizioneEsperienza: '',
    risultatiOttenuti: '',
    testimonialClienti: '',
    
    // Step 3: Certificazioni RIGOROSE
    certificazioni: [],
    numeroCertificazione: '',
    enteRilascio: '',
    dataScadenza: '',
    titoloDiStudio: '',
    università: '',
    annoLaurea: '',
    altreFormazioni: '',
    
    // Step 4: Verifica Online e Portfolio
    portfolioLink: '',
    linkedinProfile: '',
    instagramProfile: '',
    facebookProfile: '',
    youtubeChannel: '',
    videoPresentation: '',
    motivazione: '',
    obiettiviBestTrainer: '',
    disponibilitaOraria: '',
    
    // Files OBBLIGATORI
    certificazioniFiles: [],
    diplomaLaurea: null,
    fotoProfile: null,
    documentoIdentita: null,
    
    // Verifiche
    accettaTermini: false,
    accettaPrivacy: false,
    verificaEmailLinkedin: false
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const steps = [
    { number: 1, title: 'Info Personali', icon: User, description: 'Dati anagrafici e contatti' },
    { number: 2, title: 'Esperienza', icon: Briefcase, description: 'Background professionale' },
    { number: 3, title: 'Certificazioni', icon: GraduationCap, description: 'Qualifiche e documenti' },
    { number: 4, title: 'Verifica & Portfolio', icon: Shield, description: 'Presenza online e motivazioni' }
  ];

  const specializzazioniOptions = [
    'Bodybuilding & Massa Muscolare',
    'Dimagrimento & Tonificazione',
    'Functional Training',
    'Powerlifting & Forza',
    'Yoga & Stretching',
    'Pilates',
    'Crossfit',
    'Preparazione Atletica',
    'Riabilitazione & Posturale',
    'Allenamento Senior',
    'Preparazione Gare Bodybuilding',
    'Nutrizione Sportiva',
    'Allenamento Femminile',
    'Calisthenics',
    'Running & Endurance'
  ];

  const certificazioniOptions = [
    { id: 'coni', name: 'CONI - Certificazione Personal Trainer', required: true },
    { id: 'fipe', name: 'FIPE - Federazione Italiana Pesistica', required: true },
    { id: 'acsm', name: 'ACSM - American College of Sports Medicine', required: false },
    { id: 'nasm', name: 'NASM - National Academy of Sports Medicine', required: false },
    { id: 'issa', name: 'ISSA - International Sports Sciences Association', required: false },
    { id: 'asi', name: 'ASI - Associazioni Sportive Sociali Italiane', required: false },
    { id: 'csen', name: 'CSEN - Centro Sportivo Educativo Nazionale', required: false },
    { id: 'fif', name: 'FIF - Federazione Italiana Fitness', required: false },
    { id: 'scienze-motorie', name: 'Laurea in Scienze Motorie', required: false },
    { id: 'altro', name: 'Altra Certificazione Riconosciuta', required: false }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileChange = (field, files) => {
    setFormData(prev => ({
      ...prev,
      [field]: files
    }));
    
    // Simulate upload progress
    if (files && files.length > 0) {
      setUploadProgress(prev => ({ ...prev, [field]: 0 }));
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = (prev[field] || 0) + 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...prev, [field]: 100 };
          }
          return { ...prev, [field]: newProgress };
        });
      }, 300);
    }
  };

  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!formData.nome) errors.nome = 'Nome obbligatorio';
        if (!formData.cognome) errors.cognome = 'Cognome obbligatorio';
        if (!formData.email) errors.email = 'Email obbligatoria';
        if (!formData.telefono) errors.telefono = 'Telefono obbligatorio';
        if (!formData.citta) errors.citta = 'Città obbligatoria';
        if (!formData.dataNascita) errors.dataNascita = 'Data nascita obbligatoria';
        if (!formData.codiceFiscale) errors.codiceFiscale = 'Codice fiscale obbligatorio';
        break;
      case 2:
        if (!formData.anniEsperienza) errors.anniEsperienza = 'Anni esperienza obbligatori';
        if (formData.specializzazioni.length === 0) errors.specializzazioni = 'Seleziona almeno una specializzazione';
        if (!formData.descrizioneEsperienza) errors.descrizioneEsperienza = 'Descrizione esperienza obbligatoria';
        if (!formData.risultatiOttenuti) errors.risultatiOttenuti = 'Risultati ottenuti obbligatori';
        break;
      case 3:
        if (formData.certificazioni.length === 0) errors.certificazioni = 'Almeno una certificazione obbligatoria';
        if (!formData.titoloDiStudio) errors.titoloDiStudio = 'Titolo di studio obbligatorio';
        if (!formData.certificazioniFiles || formData.certificazioniFiles.length === 0) {
          errors.certificazioniFiles = 'Upload certificazioni obbligatorio';
        }
        if (!formData.documentoIdentita) errors.documentoIdentita = 'Documento identità obbligatorio';
        break;
      case 4:
        if (!formData.linkedinProfile) errors.linkedinProfile = 'Profilo LinkedIn obbligatorio per verifica';
        if (!formData.motivazione) errors.motivazione = 'Motivazione obbligatoria';
        if (!formData.obiettiviBestTrainer) errors.obiettiviBestTrainer = 'Obiettivi obbligatori';
        if (!formData.accettaTermini) errors.accettaTermini = 'Accettazione termini obbligatoria';
        if (!formData.accettaPrivacy) errors.accettaPrivacy = 'Accettazione privacy obbligatoria';
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateCompletionScore = () => {
    let score = 0;
    const totalFields = 25; // Total weighted fields
    
    // Basic info (weight: 1 each)
    if (formData.nome) score++;
    if (formData.email) score++;
    if (formData.telefono) score++;
    
    // Experience (weight: 2 each)
    if (formData.anniEsperienza) score += 2;
    if (formData.specializzazioni.length > 0) score += 2;
    if (formData.descrizioneEsperienza) score += 2;
    
    // Certifications (weight: 3 each)
    if (formData.certificazioni.length > 0) score += 3;
    if (formData.certificazioniFiles.length > 0) score += 3;
    if (formData.documentoIdentita) score += 3;
    
    // Portfolio (weight: 2 each)
    if (formData.linkedinProfile) score += 2;
    if (formData.motivazione) score += 2;
    if (formData.fotoProfile) score += 2;
    
    return Math.round((score / totalFields) * 100);
  };

  const handleSubmit = () => {
    if (!validateStep(4)) return;
    
    const applicationData = {
      ...formData,
      submissionDate: new Date().toISOString(),
      applicationId: 'PT-' + Date.now(),
      status: 'pending',
      completionScore: calculateCompletionScore()
    };
    
    console.log('Application submitted:', applicationData);
    setIsSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Candidatura inviata con successo! Riceverai una email di conferma entro 24 ore.');
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Candidatura Inviata! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Grazie per aver candidato a diventare parte di Best-Trainer. Il tuo application ID è: <strong>PT-{Date.now()}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Prossimi Passi:</h3>
              <div className="text-left text-blue-800 text-sm space-y-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Verifica documenti: 24-48 ore</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Controllo certificazioni: 2-3 giorni</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  <span>Colloquio finale: 3-5 giorni</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Torna alla Home
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium transition-colors"
              >
                Accedi alla Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Richiesta Accesso PT Network
              </h1>
              <p className="text-gray-600 mt-1">
                Processo di selezione rigoroso per professionisti qualificati
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-500" />
                98% Certificati
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                4.9/5 Qualità
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar Enhanced */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex items-center">
                  <div className="text-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      currentStep >= step.number 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 hidden md:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`text-xs ${
                        currentStep >= step.number ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {step.number < 4 && (
                    <div className={`w-16 h-1 mx-4 rounded ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Info Personali Enhanced */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Informazioni Personali
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Dati anagrafici completi per la verifica identità
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome * <span className="text-red-500">•</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.nome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Il tuo nome"
                  />
                  {validationErrors.nome && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.nome}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cognome * <span className="text-red-500">•</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cognome}
                    onChange={(e) => handleInputChange('cognome', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.cognome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Il tuo cognome"
                  />
                  {validationErrors.cognome && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.cognome}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email * <span className="text-red-500">•</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tua.email@esempio.com"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono * <span className="text-red-500">•</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                  {validationErrors.telefono && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.telefono}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Codice Fiscale * <span className="text-red-500">•</span>
                  </label>
                  <input
                    type="text"
                    value={formData.codiceFiscale}
                    onChange={(e) => handleInputChange('codiceFiscale', e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.codiceFiscale ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="RSSMRA80A01H501Z"
                    maxLength={16}
                  />
                  {validationErrors.codiceFiscale && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.codiceFiscale}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data di Nascita * <span className="text-red-500">•</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dataNascita}
                    onChange={(e) => handleInputChange('dataNascita', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.dataNascita ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {validationErrors.dataNascita && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.dataNascita}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Città * <span className="text-red-500">•</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.citta}
                      onChange={(e) => handleInputChange('citta', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.citta ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Roma, Milano, Napoli..."
                    />
                  </div>
                  {validationErrors.citta && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.citta}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regione
                  </label>
                  <select
                    value={formData.regione}
                    onChange={(e) => handleInputChange('regione', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleziona regione...</option>
                    <option value="lombardia">Lombardia</option>
                    <option value="lazio">Lazio</option>
                    <option value="campania">Campania</option>
                    <option value="sicilia">Sicilia</option>
                    <option value="veneto">Veneto</option>
                    <option value="emilia-romagna">Emilia-Romagna</option>
                    <option value="piemonte">Piemonte</option>
                    <option value="puglia">Puglia</option>
                    <option value="toscana">Toscana</option>
                    <option value="altra">Altra</option>
                  </select>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Informazioni Importanti</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Tutti i dati inseriti verranno verificati durante il processo di approvazione. 
                      Assicurati che siano corretti e aggiornati.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Esperienza Enhanced */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Esperienza Professionale
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Dettagli del tuo background nel fitness e risultati ottenuti
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anni di Esperienza * <span className="text-red-500">•</span>
                  </label>
                  <select
                    value={formData.anniEsperienza}
                    onChange={(e) => handleInputChange('anniEsperienza', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.anniEsperienza ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="0-1">Meno di 1 anno</option>
                    <option value="1-3">1-3 anni</option>
                    <option value="3-5">3-5 anni</option>
                    <option value="5-10">5-10 anni</option>
                    <option value="10+">Oltre 10 anni</option>
                  </select>
                  {validationErrors.anniEsperienza && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.anniEsperienza}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clienti Gestiti (circa)
                  </label>
                  <select
                    value={formData.clientiGestiti}
                    onChange={(e) => handleInputChange('clientiGestiti', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleziona...</option>
                    <option value="0-10">0-10 clienti</option>
                    <option value="10-50">10-50 clienti</option>
                    <option value="50-100">50-100 clienti</option>
                    <option value="100-500">100-500 clienti</option>
                    <option value="500+">Oltre 500 clienti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializzazioni * <span className="text-red-500">•</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">Seleziona tutte le tue aree di competenza (minimo 1)</p>
                <div className="grid md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {specializzazioniOptions.map((spec) => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.specializzazioni.includes(spec)}
                        onChange={() => handleArrayChange('specializzazioni', spec)}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
                {validationErrors.specializzazioni && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.specializzazioni}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrivi la tua Esperienza * <span className="text-red-500">•</span>
                </label>
                <textarea
                  value={formData.descrizioneEsperienza}
                  onChange={(e) => handleInputChange('descrizioneEsperienza', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.descrizioneEsperienza ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Racconta il tuo percorso professionale, le competenze acquisite, i contesti lavorativi..."
                />
                {validationErrors.descrizioneEsperienza && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.descrizioneEsperienza}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risultati Ottenuti con i Clienti * <span className="text-red-500">•</span>
                </label>
                <textarea
                  value={formData.risultatiOttenuti}
                  onChange={(e) => handleInputChange('risultatiOttenuti', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.risultatiOttenuti ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Esempi concreti di trasformazioni, obiettivi raggiunti, successi misurabili..."
                />
                {validationErrors.risultatiOttenuti && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.risultatiOttenuti}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonianze Clienti
                </label>
                <textarea
                  value={formData.testimonialClienti}
                  onChange={(e) => handleInputChange('testimonialClienti', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Copia qui alcune testimonianze dei tuoi clienti (opzionale ma consigliato)..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Certificazioni Enhanced */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Certificazioni e Documenti
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Verifica delle tue qualifiche professionali (richiesti documenti)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificazioni Possedute * <span className="text-red-500">•</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">Seleziona tutte le certificazioni che possiedi (minimo 1 obbligatoria)</p>
                <div className="space-y-3">
                  {certificazioniOptions.map((cert) => (
                    <label key={cert.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.certificazioni.includes(cert.id)}
                          onChange={() => handleArrayChange('certificazioni', cert.id)}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{cert.name}</span>
                      </div>
                      {cert.required && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                          Richiesta
                        </span>
                      )}
                    </label>
                  ))}
                </div>
                {validationErrors.certificazioni && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.certificazioni}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titolo di Studio * <span className="text-red-500">•</span>
                  </label>
                  <select
                    value={formData.titoloDiStudio}
                    onChange={(e) => handleInputChange('titoloDiStudio', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      validationErrors.titoloDiStudio ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="laurea-scienze-motorie">Laurea in Scienze Motorie</option>
                    <option value="laurea-fisioterapia">Laurea in Fisioterapia</option>
                    <option value="laurea-altra">Altra Laurea</option>
                    <option value="diploma">Diploma Superiore</option>
                  </select>
                  {validationErrors.titoloDiStudio && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.titoloDiStudio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Università/Istituto
                  </label>
                  <input
                    type="text"
                    value={formData.università}
                    onChange={(e) => handleInputChange('università', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome università o istituto"
                  />
                </div>
              </div>

              {/* File Uploads Enhanced */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Certificazioni * <span className="text-red-500">•</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    validationErrors.certificazioniFiles ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                  }`}>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Carica i file delle tue certificazioni
                      <button className="text-blue-600 hover:text-blue-500 ml-1">
                        Seleziona file
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, JPG, PNG fino a 10MB ciascuno. Minimo 1 certificazione obbligatoria.
                    </p>
                  </div>
                  {validationErrors.certificazioniFiles && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.certificazioniFiles}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento di Identità * <span className="text-red-500">•</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    validationErrors.documentoIdentita ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                  }`}>
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Carica fronte e retro del documento
                      <button className="text-blue-600 hover:text-blue-500 ml-1">
                        Seleziona file
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Carta d'identità, patente o passaporto. PDF o immagine chiara.
                    </p>
                  </div>
                  {validationErrors.documentoIdentita && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.documentoIdentita}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Verifica & Portfolio Enhanced */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Verifica Online e Motivazioni
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Presenza professionale online e motivazioni per entrare nel network
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Verifica Identità Online</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      Il profilo LinkedIn è obbligatorio per verificare la tua identità professionale e 
                      garantire la sicurezza della nostra community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profilo LinkedIn * <span className="text-red-500">•</span>
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={formData.linkedinProfile}
                      onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        validationErrors.linkedinProfile ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://linkedin.com/in/tuoprofilo"
                    />
                  </div>
                  {validationErrors.linkedinProfile && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.linkedinProfile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Sito Web
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://tuosito.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profilo Instagram
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.instagramProfile}
                      onChange={(e) => handleInputChange('instagramProfile', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@tuoprofilo"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivazione * <span className="text-red-500">•</span>
                </label>
                <textarea
                  value={formData.motivazione}
                  onChange={(e) => handleInputChange('motivazione', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.motivazione ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Perché vuoi entrare nel Best-Trainer Network? Cosa ti distingue dagli altri PT?"
                />
                {validationErrors.motivazione && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.motivazione}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Obiettivi con Best-Trainer * <span className="text-red-500">•</span>
                </label>
                <textarea
                  value={formData.obiettiviBestTrainer}
                  onChange={(e) => handleInputChange('obiettiviBestTrainer', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    validationErrors.obiettiviBestTrainer ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Quali sono i tuoi obiettivi a breve e lungo termine con la nostra piattaforma?"
                />
                {validationErrors.obiettiviBestTrainer && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.obiettiviBestTrainer}</p>
                )}
              </div>

              {/* Terms and Privacy */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.accettaTermini}
                    onChange={(e) => handleInputChange('accettaTermini', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label className="text-sm text-gray-700">
                    Accetto i <a href="/terms" className="text-blue-600 hover:underline">Termini e Condizioni</a> del servizio *
                  </label>
                </div>
                {validationErrors.accettaTermini && (
                  <p className="text-red-500 text-xs ml-7">{validationErrors.accettaTermini}</p>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.accettaPrivacy}
                    onChange={(e) => handleInputChange('accettaPrivacy', e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label className="text-sm text-gray-700">
                    Accetto l'<a href="/privacy" className="text-blue-600 hover:underline">Informativa Privacy</a> e 
                    il trattamento dei dati personali *
                  </label>
                </div>
                {validationErrors.accettaPrivacy && (
                  <p className="text-red-500 text-xs ml-7">{validationErrors.accettaPrivacy}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons Enhanced */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </button>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">
                Completamento: {calculateCompletionScore()}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateCompletionScore()}%` }}
                ></div>
              </div>
            </div>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                Avanti
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Invia Richiesta
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Benefits Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Perché il Best-Trainer Network?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <p className="font-medium">Community Selezionata</p>
              <p className="text-sm opacity-90">Solo PT certificati e verificati</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="font-medium">Visibilità Premium</p>
              <p className="text-sm opacity-90">Raggiungi migliaia di clienti qualificati</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6" />
              </div>
              <p className="font-medium">Crescita Professionale</p>
              <p className="text-sm opacity-90">Strumenti e supporto per il successo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}