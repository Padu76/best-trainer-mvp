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
  Youtube
} from 'lucide-react';

export default function PTApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Info Personali
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    regione: '',
    dataNascita: '',
    
    // Step 2: Esperienza Professionale
    anniEsperienza: '',
    specializzazioni: [],
    clientiGestiti: '',
    descrizioneEsperienza: '',
    
    // Step 3: Certificazioni
    certificazioni: [],
    titoloDiStudio: '',
    altreFormazioni: '',
    
    // Step 4: Portfolio & Social
    portfolioLink: '',
    instagramProfile: '',
    facebookProfile: '',
    youtubeChannel: '',
    motivazione: '',
    
    // Files
    certificazioniFiles: [],
    fotoProfile: null
  });

  const steps = [
    { number: 1, title: 'Info Personali', icon: User },
    { number: 2, title: 'Esperienza', icon: Briefcase },
    { number: 3, title: 'Certificazioni', icon: GraduationCap },
    { number: 4, title: 'Portfolio', icon: Trophy }
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
    'Preparazione Gare',
    'Nutrizione Sportiva'
  ];

  const certificazioniOptions = [
    'CONI - Certificazione Personal Trainer',
    'FIPE - Federazione Italiana Pesistica',
    'ACSM - American College of Sports Medicine',
    'NASM - National Academy of Sports Medicine',
    'ISSA - International Sports Sciences Association',
    'ASI - Associazioni Sportive Sociali Italiane',
    'CSEN - Centro Sportivo Educativo Nazionale',
    'FIF - Federazione Italiana Fitness',
    'Laurea in Scienze Motorie',
    'Corso Istruttore Fitness',
    'Altro'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Candidatura inviata con successo! Ti contatteremo entro 48 ore.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Diventa Personal Trainer su Best-Trainer
              </h1>
              <p className="text-gray-600 mt-1">
                Unisciti alla community di professionisti del fitness più esclusiva d'Italia
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                500+ PT attivi
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                4.9/5 soddisfazione
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.number ? 'text-blue-500' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {step.number < 4 && (
                    <div className={`w-16 h-0.5 mx-4 ${
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
          {/* Step 1: Info Personali */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Informazioni Personali
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Iniziamo con le tue informazioni di base
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cognome *
                  </label>
                  <input
                    type="text"
                    value={formData.cognome}
                    onChange={(e) => handleInputChange('cognome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo cognome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tua.email@esempio.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Città *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.citta}
                      onChange={(e) => handleInputChange('citta', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Roma, Milano, Napoli..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data di Nascita *
                  </label>
                  <input
                    type="date"
                    value={formData.dataNascita}
                    onChange={(e) => handleInputChange('dataNascita', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Esperienza */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Esperienza Professionale
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Raccontaci della tua esperienza nel fitness
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anni di Esperienza *
                  </label>
                  <select
                    value={formData.anniEsperienza}
                    onChange={(e) => handleInputChange('anniEsperienza', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleziona...</option>
                    <option value="0-1">Meno di 1 anno</option>
                    <option value="1-3">1-3 anni</option>
                    <option value="3-5">3-5 anni</option>
                    <option value="5-10">5-10 anni</option>
                    <option value="10+">Oltre 10 anni</option>
                  </select>
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
                    <option value="100+">Oltre 100 clienti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializzazioni *
                </label>
                <p className="text-xs text-gray-500 mb-3">Seleziona tutte le tue aree di competenza</p>
                <div className="grid md:grid-cols-2 gap-3">
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrivi la tua Esperienza *
                </label>
                <textarea
                  value={formData.descrizioneEsperienza}
                  onChange={(e) => handleInputChange('descrizioneEsperienza', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Racconta il tuo percorso professionale, i risultati ottenuti con i clienti, le tue competenze principali..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Certificazioni */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Certificazioni e Formazione
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Le tue qualifiche professionali
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificazioni Possedute *
                </label>
                <p className="text-xs text-gray-500 mb-3">Seleziona tutte le certificazioni che possiedi</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {certificazioniOptions.map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.certificazioni.includes(cert)}
                        onChange={() => handleArrayChange('certificazioni', cert)}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titolo di Studio
                </label>
                <select
                  value={formData.titoloDiStudio}
                  onChange={(e) => handleInputChange('titoloDiStudio', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleziona...</option>
                  <option value="laurea-scienze-motorie">Laurea in Scienze Motorie</option>
                  <option value="laurea-altra">Altra Laurea</option>
                  <option value="diploma">Diploma</option>
                  <option value="altro">Altro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altre Formazioni
                </label>
                <textarea
                  value={formData.altreFormazioni}
                  onChange={(e) => handleInputChange('altreFormazioni', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Corsi, seminari, workshop, altre specializzazioni..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Certificazioni
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Trascina qui i file delle tue certificazioni o
                    <button className="text-blue-600 hover:text-blue-500 ml-1">
                      clicca per selezionare
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG fino a 10MB ciascuno
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Portfolio */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                  Portfolio e Social Media
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Mostra il tuo lavoro e la tua presenza online
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Sito Web
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioLink}
                    onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://tuosito.com"
                  />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pagina Facebook
                  </label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.facebookProfile}
                      onChange={(e) => handleInputChange('facebookProfile', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="facebook.com/tuapagina"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canale YouTube
                  </label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.youtubeChannel}
                      onChange={(e) => handleInputChange('youtubeChannel', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="youtube.com/channel/..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Profilo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Carica una foto professionale
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG o PNG, max 5MB
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivazione *
                </label>
                <textarea
                  value={formData.motivazione}
                  onChange={(e) => handleInputChange('motivazione', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Perché vuoi diventare parte di Best-Trainer? Quali sono i tuoi obiettivi? Cosa puoi offrire alla nostra community?"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
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
                Invia Candidatura
              </button>
            )}
          </div>
        </div>

        {/* Benefits Sidebar */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Perché scegliere Best-Trainer?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="font-medium">Visibilità Massima</p>
              <p className="text-sm opacity-90">Raggiungi migliaia di clienti</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6" />
              </div>
              <p className="font-medium">Community Esclusiva</p>
              <p className="text-sm opacity-90">Network di professionisti</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6" />
              </div>
              <p className="font-medium">Guadagni Elevati</p>
              <p className="text-sm opacity-90">Monetizza la tua esperienza</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}