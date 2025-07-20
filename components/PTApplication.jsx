import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Camera, FileText, Award, Users, Star, ArrowRight } from 'lucide-react';

const PTApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dati personali
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    dataNascita: '',
    
    // Dati professionali
    certificazioni: [],
    specializzazioni: [],
    anniEsperienza: '',
    descrizione: '',
    
    // Social e portfolio
    instagram: '',
    facebook: '',
    linkedin: '',
    sito: '',
    
    // Documenti
    fotoProfilo: null,
    certificazioniFiles: [],
    portfolioFiles: [],
    
    // Programmi di esempio
    programmiEsempio: []
  });

  const steps = [
    { id: 1, title: 'Dati Personali', icon: Users },
    { id: 2, title: 'Esperienza', icon: Award },
    { id: 3, title: 'Portfolio', icon: FileText },
    { id: 4, title: 'Riepilogo', icon: CheckCircle }
  ];

  const specializzazioni = [
    'Bodybuilding', 'Powerlifting', 'Crossfit', 'Yoga', 'Pilates',
    'Functional Training', 'HIIT', 'Cardio', 'Riabilitazione',
    'Preparazione Atletica', 'Nutrizione Sportiva', 'Mobility',
    'Preparazione Concorsi', 'Terza Età', 'Gravidanza'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializzazioneToggle = (spec) => {
    setFormData(prev => ({
      ...prev,
      specializzazioni: prev.specializzazioni.includes(spec)
        ? prev.specializzazioni.filter(s => s !== spec)
        : [...prev.specializzazioni, spec]
    }));
  };

  const handleFileUpload = (field, files) => {
    setFormData(prev => ({
      ...prev,
      [field]: files
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitApplication = () => {
    // Qui implementeremo l'invio ad Airtable
    alert('Candidatura inviata con successo! Ti contatteremo entro 48 ore.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Best-Trainer</a>
            <div className="text-sm text-gray-600">
              Candidatura Personal Trainer
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unisciti a <span className="text-blue-600">Best-Trainer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trasforma la tua esperienza in una fonte di reddito scalabile. 
            Condividi i tuoi programmi con migliaia di persone.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Reach Illimitato</h3>
            <p className="text-gray-600">Raggiungi clienti in tutta Italia senza limiti geografici</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Reputazione</h3>
            <p className="text-gray-600">Costruisci la tua autorevolezza con recensioni verificate</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Reddito Passivo</h3>
            <p className="text-gray-600">I tuoi programmi lavorano per te 24/7</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {step.id < steps.length && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Dati Personali */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dati Personali</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                  <input
                    type="text"
                    value={formData.cognome}
                    onChange={(e) => handleInputChange('cognome', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Il tuo cognome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tua@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+39 123 456 7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Città *</label>
                  <input
                    type="text"
                    value={formData.citta}
                    onChange={(e) => handleInputChange('citta', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Milano, Roma, Napoli..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data di Nascita</label>
                  <input
                    type="date"
                    value={formData.dataNascita}
                    onChange={(e) => handleInputChange('dataNascita', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Esperienza */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Esperienza Professionale</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Anni di Esperienza *</label>
                <select
                  value={formData.anniEsperienza}
                  onChange={(e) => handleInputChange('anniEsperienza', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleziona...</option>
                  <option value="1-2">1-2 anni</option>
                  <option value="3-5">3-5 anni</option>
                  <option value="6-10">6-10 anni</option>
                  <option value="10+">Più di 10 anni</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Specializzazioni *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specializzazioni.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => handleSpecializzazioneToggle(spec)}
                      className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                        formData.specializzazioni.includes(spec)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione Professionale *</label>
                <textarea
                  value={formData.descrizione}
                  onChange={(e) => handleInputChange('descrizione', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Racconta la tua esperienza, il tuo approccio all'allenamento e cosa ti rende unico come Personal Trainer..."
                />
                <p className="text-sm text-gray-500 mt-2">Questa descrizione apparirà nel tuo profilo pubblico</p>
              </div>
            </div>
          )}

          {/* Step 3: Portfolio */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio e Social</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://instagram.com/tuoprofilo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/tuoprofilo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/tuoprofilo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sito Web</label>
                  <input
                    type="url"
                    value={formData.sito}
                    onChange={(e) => handleInputChange('sito', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://tuosito.com"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Foto Profilo *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Carica una foto professionale</p>
                    <input type="file" accept="image/*" className="hidden" id="foto-profilo" />
                    <label htmlFor="foto-profilo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                      Scegli File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Certificazioni *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Carica le tue certificazioni (PDF, JPG, PNG)</p>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className="hidden" id="certificazioni" />
                    <label htmlFor="certificazioni" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                      Scegli File
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Riepilogo */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Riepilogo Candidatura</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="font-bold text-blue-900">Candidatura Quasi Completa!</h3>
                </div>
                <p className="text-blue-800">
                  Abbiamo ricevuto i tuoi dati. Il nostro team li esaminerà entro 48 ore e ti contatteremo 
                  via email con l'esito della selezione.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dati Personali</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>Nome:</strong> {formData.nome} {formData.cognome}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Città:</strong> {formData.citta}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Esperienza</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>Anni di esperienza:</strong> {formData.anniEsperienza}</p>
                    <p><strong>Specializzazioni:</strong> {formData.specializzazioni.join(', ')}</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      Accetto i termini e condizioni di Best-Trainer per Personal Trainer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Indietro
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                Avanti
                