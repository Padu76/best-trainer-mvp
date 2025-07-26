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
  Zap,
  X,
  Play,
  Video
} from 'lucide-react';

export default function PTDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'saved', 'error'
  const [programSaveStatus, setProgramSaveStatus] = useState('');
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

  const [programmi, setProgrammi] = useState([]);

  const [nuovoProgramma, setNuovoProgramma] = useState({
    titolo: '',
    descrizione: '',
    prezzo: '',
    categoria: '',
    livello: '',
    durata: '',
    tipoContenuto: '', // 'documento', 'video', 'misto'
    copertina: null,
    file: null,
    video: null,
    covertinaPreview: null,
    filePreview: null,
    videoPreview: null
  });

  const [showNewProgramForm, setShowNewProgramForm] = useState(false);
  const [aiContentType, setAiContentType] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [programErrors, setProgramErrors] = useState({});

  const categorie = [
    'Massa Muscolare', 'Dimagrimento', 'Forza & Potenza', 'Cardio & Resistenza',
    'Functional Training', 'Yoga & Stretching', 'Home Workout', 'Preparazione Atletica',
    'Ciclismo', 'Nuoto', 'Triathlon', 'Corsa', 'Calcio'
  ];

  const livelli = ['Principiante', 'Intermedio', 'Avanzato', 'Tutti i livelli'];

  const tipiContenuto = [
    { value: 'documento', label: 'Solo Documenti (PDF, DOC)', icon: FileText },
    { value: 'video', label: 'Solo Videocorso', icon: Video },
    { value: 'misto', label: 'Documenti + Video', icon: Upload }
  ];

  const specializzazioniDisponibili = [
    'Bodybuilding', 'Powerlifting', 'Crossfit', 'Functional Training',
    'Dimagrimento', 'Tonificazione', 'Yoga', 'Pilates', 'Cardio',
    'Preparazione Atletica', 'Riabilitazione', 'Posturale',
    'Ciclismo', 'Nuoto', 'Triathlon', 'Alimentazione', 'Endurance', 'Corsa', 'Calcio'
  ];

  // Carica dati dal localStorage all'avvio
  useEffect(() => {
    // Carica profilo
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

    // Carica programmi
    const savedPrograms = localStorage.getItem('bt_programs_data');
    if (savedPrograms) {
      try {
        const parsedPrograms = JSON.parse(savedPrograms);
        setProgrammi(parsedPrograms);
        console.log('Programmi caricati dal localStorage');
      } catch (error) {
        console.error('Errore nel caricamento dei programmi:', error);
      }
    }
  }, []);

  // Funzione per salvare profilo nel localStorage
  const saveProfileToLocalStorage = (data) => {
    try {
      localStorage.setItem('bt_profile_data', JSON.stringify(data));
      setSaveStatus('saved');
      setLastSaved(new Date());
      
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
      
      console.log('Profilo salvato nel localStorage');
    } catch (error) {
      console.error('Errore nel salvataggio profilo:', error);
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    }
  };

  // Funzione per salvare programmi nel localStorage
  const saveProgramsToLocalStorage = (data) => {
    try {
      localStorage.setItem('bt_programs_data', JSON.stringify(data));
      setProgramSaveStatus('saved');
      
      setTimeout(() => {
        setProgramSaveStatus('');
      }, 3000);
      
      console.log('Programmi salvati nel localStorage');
    } catch (error) {
      console.error('Errore nel salvataggio programmi:', error);
      setProgramSaveStatus('error');
      setTimeout(() => {
        setProgramSaveStatus('');
      }, 3000);
    }
  };

  // Validazione campi profilo
  const validateProfileField = (field, value) => {
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
      case 'sitoWeb':
        if (value && !value.startsWith('http')) {
          errors.sitoWeb = 'URL deve iniziare con http:// o https://';
        } else {
          delete errors.sitoWeb;
        }
        break;
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validazione campi programma
  const validateProgramField = (field, value) => {
    const errors = { ...programErrors };
    
    switch (field) {
      case 'titolo':
        if (!value || value.trim().length < 5) {
          errors.titolo = 'Titolo richiesto (min 5 caratteri)';
        } else {
          delete errors.titolo;
        }
        break;
      case 'descrizione':
        if (!value || value.trim().length < 20) {
          errors.descrizione = 'Descrizione richiesta (min 20 caratteri)';
        } else {
          delete errors.descrizione;
        }
        break;
      case 'prezzo':
        const price = parseFloat(value);
        if (!value || price <= 0 || price > 999) {
          errors.prezzo = 'Prezzo deve essere tra 0.01 e 999€';
        } else {
          delete errors.prezzo;
        }
        break;
      case 'categoria':
        if (!value) {
          errors.categoria = 'Categoria richiesta';
        } else {
          delete errors.categoria;
        }
        break;
      case 'livello':
        if (!value) {
          errors.livello = 'Livello richiesto';
        } else {
          delete errors.livello;
        }
        break;
      case 'durata':
        if (!value || value.trim().length < 3) {
          errors.durata = 'Durata richiesta (es: 8 settimane)';
        } else {
          delete errors.durata;
        }
        break;
      case 'tipoContenuto':
        if (!value) {
          errors.tipoContenuto = 'Tipo contenuto richiesto';
        } else {
          delete errors.tipoContenuto;
        }
        break;
    }
    
    setProgramErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Aggiorna profilo con auto-save
  const handleProfileUpdate = (field, value) => {
    setSaveStatus('saving');
    
    // Valida il campo
    validateProfileField(field, value);
    
    const updatedProfile = {
      ...profileData,
      [field]: value
    };
    
    setProfileData(updatedProfile);
    
    // Auto-save con debounce
    setTimeout(() => {
      saveProfileToLocalStorage(updatedProfile);
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
    saveProfileToLocalStorage(updatedProfile);
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
    saveProfileToLocalStorage(updatedProfile);
  };

  const addCertificazione = () => {
    const updatedProfile = {
      ...profileData,
      certificazioni: [...profileData.certificazioni, '']
    };
    setProfileData(updatedProfile);
  };

  // Gestione upload foto profilo
  const handleProfilePhotoUpload = (file) => {
    if (file) {
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
        saveProfileToLocalStorage(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestione upload file programma
  const handleProgramFileUpload = (type, file) => {
    if (!file) return;

    if (type === 'copertina') {
      if (!file.type.startsWith('image/')) {
        alert('Seleziona solo file immagine per la copertina');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Immagine troppo grande. Max 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setNuovoProgramma(prev => ({
          ...prev,
          copertina: file,
          covertinaPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }

    if (type === 'file') {
      // Accetta PDF, DOC, DOCX
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Formato file non supportato. Usa PDF, DOC o DOCX');
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB
        alert('File troppo grande. Max 50MB');
        return;
      }

      setNuovoProgramma(prev => ({
        ...prev,
        file: file,
        filePreview: file.name
      }));
    }

    if (type === 'video') {
      // Accetta MP4, MOV, AVI, WMV
      const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
      if (!allowedVideoTypes.includes(file.type)) {
        alert('Formato video non supportato. Usa MP4, MOV, AVI o WMV');
        return;
      }
      if (file.size > 200 * 1024 * 1024) { // 200MB
        alert('Video troppo grande. Max 200MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setNuovoProgramma(prev => ({
          ...prev,
          video: file,
          videoPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Aggiorna campo nuovo programma
  const handleNewProgramChange = (field, value) => {
    validateProgramField(field, value);
    
    // Se cambia tipo contenuto, reset files
    if (field === 'tipoContenuto') {
      setNuovoProgramma(prev => ({
        ...prev,
        [field]: value,
        file: null,
        video: null,
        filePreview: null,
        videoPreview: null
      }));
    } else {
      setNuovoProgramma(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Salva nuovo programma
  const handleNewProgramSubmit = (e) => {
    e.preventDefault();
    setProgramSaveStatus('saving');

    // Validazione completa
    const fieldsToValidate = ['titolo', 'descrizione', 'prezzo', 'categoria', 'livello', 'durata', 'tipoContenuto'];
    const isValid = fieldsToValidate.every(field => 
      validateProgramField(field, nuovoProgramma[field])
    );

    if (!isValid) {
      setProgramSaveStatus('error');
      alert('Correggi gli errori evidenziati prima di salvare');
      return;
    }

    if (!nuovoProgramma.copertina) {
      alert('Carica una copertina per il programma');
      setProgramSaveStatus('error');
      return;
    }

    // Validazione contenuti basata sul tipo
    if (nuovoProgramma.tipoContenuto === 'documento' && !nuovoProgramma.file) {
      alert('Carica il file del programma');
      setProgramSaveStatus('error');
      return;
    }

    if (nuovoProgramma.tipoContenuto === 'video' && !nuovoProgramma.video) {
      alert('Carica il video del programma');
      setProgramSaveStatus('error');
      return;
    }

    if (nuovoProgramma.tipoContenuto === 'misto' && (!nuovoProgramma.file || !nuovoProgramma.video)) {
      alert('Carica sia il file che il video per il contenuto misto');
      setProgramSaveStatus('error');
      return;
    }

    const newId = Date.now(); // Usa timestamp come ID
    const newProgram = {
      ...nuovoProgramma,
      id: newId,
      pubblicato: false,
      vendite: 0,
      rating: 0,
      prezzo: parseFloat(nuovoProgramma.prezzo),
      dataCreazione: new Date().toISOString(),
      ultimaModifica: new Date().toISOString()
    };
    
    const updatedPrograms = [...programmi, newProgram];
    setProgrammi(updatedPrograms);
    saveProgramsToLocalStorage(updatedPrograms);
    
    // Reset form
    setNuovoProgramma({
      titolo: '', descrizione: '', prezzo: '', categoria: '', 
      livello: '', durata: '', tipoContenuto: '', copertina: null, file: null, video: null,
      covertinaPreview: null, filePreview: null, videoPreview: null
    });
    setProgramErrors({});
    setShowNewProgramForm(false);
    
    alert('Programma salvato con successo!');
  };

  // Elimina programma
  const handleDeleteProgram = (id) => {
    if (confirm('Sei sicuro di voler eliminare questo programma?')) {
      setProgramSaveStatus('saving');
      const updatedPrograms = programmi.filter(p => p.id !== id);
      setProgrammi(updatedPrograms);
      saveProgramsToLocalStorage(updatedPrograms);
    }
  };

  // Toggle pubblicazione
  const togglePubblicazione = (id) => {
    setProgramSaveStatus('saving');
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

  // Salvataggio manuale profilo completo
  const handleSaveProfile = () => {
    setSaveStatus('saving');
    
    // Validazione completa
    const fieldsToValidate = ['nome', 'email', 'telefono', 'anniEsperienza', 'sitoWeb'];
    const isValid = fieldsToValidate.every(field => 
      validateProfileField(field, profileData[field])
    );
    
    if (!isValid) {
      setSaveStatus('error');
      alert('Correggi gli errori evidenziati prima di salvare');
      return;
    }
    
    saveProfileToLocalStorage(profileData);
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

  // Reset programmi
  const handleResetPrograms = () => {
    if (confirm('Sei sicuro di voler eliminare tutti i programmi?')) {
      setProgrammi([]);
      localStorage.removeItem('bt_programs_data');
      setProgramSaveStatus('');
    }
  };

  // Save Status Component
  const SaveStatusIndicator = ({ type = 'profile' }) => {
    const status = type === 'profile' ? saveStatus : programSaveStatus;
    
    if (!status) return null;
    
    return (
      <div className={`flex items-center space-x-2 text-sm ${
        status === 'saved' ? 'text-green-600' : 
        status === 'saving' ? 'text-blue-600' : 'text-red-600'
      }`}>
        {status === 'saving' && (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Salvando...</span>
          </>
        )}
        {status === 'saved' && (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Salvato {type === 'profile' && lastSaved && `alle ${lastSaved.toLocaleTimeString()}`}</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-4 h-4" />
            <span>Errore nel salvataggio</span>
          </>
        )}
      </div>
    );
  };

  // Funzione per determinare il tipo di contenuto del programma
  const getContentTypeLabel = (programma) => {
    if (programma.tipoContenuto) {
      return programma.tipoContenuto;
    }
    // Retrocompatibilità per programmi precedenti
    if (programma.video && programma.file) return 'misto';
    if (programma.video) return 'video';
    return 'documento';
  };

  // Simulazione chiamata AI API
  const generateAIContent = async (type, context = {}) => {
    setIsGenerating(true);
    
    // Simula chiamata API (in produzione sarà una chiamata reale)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let content = '';
    
    switch(type) {
      case 'program-description':
        const isVideo = context.tipoContenuto === 'video' || context.tipoContenuto === 'misto';
        content = `🔥 TRASFORMA IL TUO FISICO IN ${context.durata || '12 SETTIMANE'}!

${isVideo ? '🎥 VIDEOCORSO COMPLETO 🎥' : '📚 PROGRAMMA DETTAGLIATO 📚'}

Questo ${isVideo ? 'videocorso' : 'programma'} ${context.categoria?.toLowerCase() || 'di allenamento'} è stato scientificamente progettato per massimizzare i tuoi risultati in tempi record.

✅ COSA OTTERRAI:
• Aumento significativo della massa muscolare magra
• Miglioramento della forza e resistenza
• Definizione muscolare visibile già dalle prime settimane
${isVideo ? '• Video tutorial HD per ogni esercizio\n• Spiegazioni dettagliate della tecnica corretta' : '• Schede di allenamento dettagliate\n• Guide illustrate per ogni esercizio'}

🎯 PERFETTO PER:
• Livello ${context.livello?.toLowerCase() || 'intermedio'}
• Chi vuole risultati concreti e duraturi
• Chi cerca un approccio professionale e strutturato

💪 INCLUDE:
• ${context.durata || '12 settimane'} di programmazione completa
${isVideo ? '• Video lezioni in HD per ogni workout\n• Tutorial tecnica corretta\n• Progressioni filmate step-by-step' : '• Schede PDF scaricabili\n• Immagini esplicative\n• Progressioni dettagliate'}
• Piano nutrizionale personalizzabile
• Supporto WhatsApp diretto

${isVideo ? '🎬 FORMATO VIDEO: Accesso illimitato, qualità HD, visualizzabile su tutti i dispositivi!' : '📱 FORMATO DIGITALE: Download immediato, stampabile, sempre con te!'}

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
        const hasVideo = context.tipoContenuto === 'video' || context.tipoContenuto === 'misto';
        content = `🔥 NUOVO ${hasVideo ? 'VIDEOCORSO' : 'PROGRAMMA'} DISPONIBILE! 🔥

${context.titolo || 'Il programma che cambierà il tuo fisico'}

💪 Stanco di allenarti senza vedere risultati?
⏰ Hai solo ${context.durata || '12 settimane'} per trasformarti?
🎯 Vuoi un metodo che FUNZIONA davvero?

${hasVideo ? '🎥 QUESTO VIDEOCORSO' : '📚 QUESTO PROGRAMMA'} ${context.categoria?.toLowerCase() || 'di allenamento'} ti darà:
• Risultati visibili già dalla 2a settimana
• Aumento della forza del 25%+ 
• Definizione muscolare da urlo
${hasVideo ? '• Video tutorial in HD per ogni esercizio\n• Tecnica perfetta spiegata nel dettaglio' : '• Schede dettagliate scaricabili\n• Guide illustrate step-by-step'}
• Supporto personalizzato H24

⚡ OFFERTA LANCIO: €${context.prezzo || '79.99'} invece di €99.99
(Solo per i primi 50 clienti!)

${hasVideo ? '🎬 Accesso immediato ai video in qualità HD!' : '📱 Download immediato dei documenti!'}

👆 Link in bio per acquistare
💬 DM per info personalizzate

#fitness #transformation #${context.categoria?.toLowerCase().replace(' ', '')} #personaltrainer #results #workout #motivation #fitnessmotivation #transformation #strong #muscle #gymlife ${hasVideo ? '#videocorso #onlinetraining' : '#programma #ebook'}`;
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
                 programmi.filter(p => p.rating > 0).length || 0,
    videocorsi: programmi.filter(p => getContentTypeLabel(p) === 'video' || getContentTypeLabel(p) === 'misto').length
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
              <SaveStatusIndicator type="profile" />
              {activeTab === 'programs' && <SaveStatusIndicator type="programs" />}
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
                
                {/* Contact Info in Sidebar */}
                <div className="mt-4 space-y-2 text-xs text-gray-600">
                  {profileData.telefono && (
                    <div className="flex items-center justify-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {profileData.telefono}
                    </div>
                  )}
                  {profileData.email && (
                    <div className="flex items-center justify-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {profileData.email}
                    </div>
                  )}
                  {profileData.sitoWeb && (
                    <div className="flex items-center justify-center">
                      <Globe className="w-3 h-3 mr-1" />
                      <a href={profileData.sitoWeb} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        Sito Web
                      </a>
                    </div>
                  )}
                  
                  {/* Social Links */}
                  {(profileData.instagram || profileData.facebook || profileData.youtube) && (
                    <div className="flex justify-center space-x-3 mt-3">
                      {profileData.instagram && (
                        <a href={`https://instagram.com/${profileData.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {profileData.facebook && (
                        <a href={profileData.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {profileData.youtube && (
                        <a href={profileData.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                          <Youtube className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stats.videocorsi}</p>
                      <p className="text-sm text-gray-600">Videocorsi</p>
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
                      <p className="text-2xl font-bold text-gray-900">{stats.ratingMedio ? stats.ratingMedio.toFixed(1) : '0.0'}</p>
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
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Programmi Recenti</h3>
                      <button
                        onClick={() => setActiveTab('programs')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Vedi tutti
                      </button>
                    </div>
                    <div className="space-y-4">
                      {programmi.length === 0 ? (
                        <div className="text-center py-8">
                          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500 mb-4">Nessun programma creato ancora</p>
                          <button
                            onClick={() => setActiveTab('programs')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Crea il tuo primo programma
                          </button>
                        </div>
                      ) : (
                        programmi.slice(0, 3).map((programma) => (
                          <div key={programma.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3 flex-1">
                              {/* Icona Tipo Contenuto */}
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                                {getContentTypeLabel(programma) === 'video' && <Video className="w-4 h-4 text-red-600" />}
                                {getContentTypeLabel(programma) === 'documento' && <FileText className="w-4 h-4 text-blue-600" />}
                                {getContentTypeLabel(programma) === 'misto' && <Upload className="w-4 h-4 text-purple-600" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{programma.titolo}</h4>
                                <p className="text-sm text-gray-600">
                                  {getContentTypeLabel(programma) === 'video' && '🎥 '}
                                  {getContentTypeLabel(programma) === 'misto' && '📚🎥 '}
                                  {programma.categoria} • €{programma.prezzo}
                                </p>
                              </div>
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
                        ))
                      )}
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
                          onChange={(e) => handleProfilePhotoUpload(e.target.files[0])}
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
                          placeholder="https://facebook.com/tuoprofilo"
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
                          placeholder="https://youtube.com/@tuocanale"
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
                  </div>
                </div>
              </div>
            )}

            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Gestione Programmi</h2>
                  <div className="flex items-center space-x-4">
                    {programmi.length > 0 && (
                      <button
                        onClick={handleResetPrograms}
                        className="text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg transition-colors"
                      >
                        Elimina Tutti
                      </button>
                    )}
                    <button
                      onClick={() => setShowNewProgramForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nuovo Programma
                    </button>
                  </div>
                </div>

                {/* Form Nuovo Programma */}
                {showNewProgramForm && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Nuovo Programma</h3>
                      <button
                        onClick={() => {
                          setShowNewProgramForm(false);
                          setProgramErrors({});
                          setNuovoProgramma({
                            titolo: '', descrizione: '', prezzo: '', categoria: '', 
                            livello: '', durata: '', tipoContenuto: '', copertina: null, file: null, video: null,
                            covertinaPreview: null, filePreview: null, videoPreview: null
                          });
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleNewProgramSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Titolo Programma *</label>
                        <input
                          type="text"
                          value={nuovoProgramma.titolo}
                          onChange={(e) => handleNewProgramChange('titolo', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            programErrors.titolo ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Es: Massa Muscolare Avanzato"
                        />
                        {programErrors.titolo && (
                          <p className="text-red-500 text-xs mt-1">{programErrors.titolo}</p>
                        )}
                      </div>

                      {/* Tipo Contenuto */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tipo Contenuto *</label>
                        <div className="grid grid-cols-3 gap-4">
                          {tipiContenuto.map((tipo) => {
                            const Icon = tipo.icon;
                            return (
                              <label
                                key={tipo.value}
                                className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-colors ${
                                  nuovoProgramma.tipoContenuto === tipo.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={tipo.value}
                                  checked={nuovoProgramma.tipoContenuto === tipo.value}
                                  onChange={(e) => handleNewProgramChange('tipoContenuto', e.target.value)}
                                  className="hidden"
                                />
                                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                                  nuovoProgramma.tipoContenuto === tipo.value ? 'text-blue-600' : 'text-gray-400'
                                }`} />
                                <p className={`text-sm font-medium ${
                                  nuovoProgramma.tipoContenuto === tipo.value ? 'text-blue-600' : 'text-gray-700'
                                }`}>
                                  {tipo.label}
                                </p>
                              </label>
                            );
                          })}
                        </div>
                        {programErrors.tipoContenuto && (
                          <p className="text-red-500 text-xs mt-1">{programErrors.tipoContenuto}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">Descrizione *</label>
                          <button
                            type="button"
                            onClick={() => handleAIGenerate('program-description', {
                              categoria: nuovoProgramma.categoria,
                              livello: nuovoProgramma.livello,
                              durata: nuovoProgramma.durata,
                              tipoContenuto: nuovoProgramma.tipoContenuto
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
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            programErrors.descrizione ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Descrivi il programma, gli obiettivi e cosa include..."
                        />
                        {programErrors.descrizione && (
                          <p className="text-red-500 text-xs mt-1">{programErrors.descrizione}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {nuovoProgramma.descrizione.length}/1000 caratteri
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prezzo (€) *</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="999"
                            value={nuovoProgramma.prezzo}
                            onChange={(e) => handleNewProgramChange('prezzo', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              programErrors.prezzo ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="29.99"
                          />
                          {programErrors.prezzo && (
                            <p className="text-red-500 text-xs mt-1">{programErrors.prezzo}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                          <select
                            value={nuovoProgramma.categoria}
                            onChange={(e) => handleNewProgramChange('categoria', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              programErrors.categoria ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Seleziona categoria</option>
                            {categorie.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          {programErrors.categoria && (
                            <p className="text-red-500 text-xs mt-1">{programErrors.categoria}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Livello *</label>
                          <select
                            value={nuovoProgramma.livello}
                            onChange={(e) => handleNewProgramChange('livello', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              programErrors.livello ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Seleziona livello</option>
                            {livelli.map(liv => (
                              <option key={liv} value={liv}>{liv}</option>
                            ))}
                          </select>
                          {programErrors.livello && (
                            <p className="text-red-500 text-xs mt-1">{programErrors.livello}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Durata *</label>
                        <input
                          type="text"
                          value={nuovoProgramma.durata}
                          onChange={(e) => handleNewProgramChange('durata', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            programErrors.durata ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Es: 8 settimane, 3 mesi, 12 settimane..."
                        />
                        {programErrors.durata && (
                          <p className="text-red-500 text-xs mt-1">{programErrors.durata}</p>
                        )}
                      </div>

                      {/* Upload Files */}
                      <div className="space-y-6">
                        {/* Upload Copertina - Sempre visibile */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Copertina Programma *</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            {nuovoProgramma.covertinaPreview ? (
                              <div className="text-center">
                                <img src={nuovoProgramma.covertinaPreview} className="w-full h-32 object-cover rounded-lg mb-2" alt="Preview copertina" />
                                <p className="text-sm text-gray-600 mb-2">{nuovoProgramma.copertina?.name}</p>
                                <button
                                  type="button"
                                  onClick={() => setNuovoProgramma(prev => ({ ...prev, copertina: null, covertinaPreview: null }))}
                                  className="text-red-600 hover:text-red-700 text-sm"
                                >
                                  Rimuovi
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block text-center">
                                <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-1">Clicca per caricare copertina</p>
                                <p className="text-xs text-gray-500">JPG, PNG (max 5MB)</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleProgramFileUpload('copertina', e.target.files[0])}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Contenuti - Condizionali in base al tipo */}
                        <div className="grid grid-cols-1 gap-6">
                          {/* Upload Documento - Se tipo è 'documento' o 'misto' */}
                          {(nuovoProgramma.tipoContenuto === 'documento' || nuovoProgramma.tipoContenuto === 'misto') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                File Programma * {nuovoProgramma.tipoContenuto === 'misto' && '(Documenti)'}
                              </label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                {nuovoProgramma.filePreview ? (
                                  <div className="text-center">
                                    <FileText className="w-12 h-12 mx-auto text-gray-600 mb-2" />
                                    <p className="text-sm text-gray-600 mb-2">{nuovoProgramma.filePreview}</p>
                                    <p className="text-xs text-gray-500 mb-2">
                                      {(nuovoProgramma.file?.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => setNuovoProgramma(prev => ({ ...prev, file: null, filePreview: null }))}
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
                                      onChange={(e) => handleProgramFileUpload('file', e.target.files[0])}
                                      className="hidden"
                                    />
                                  </label>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Upload Video - Se tipo è 'video' o 'misto' */}
                          {(nuovoProgramma.tipoContenuto === 'video' || nuovoProgramma.tipoContenuto === 'misto') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video Programma * {nuovoProgramma.tipoContenuto === 'misto' && '(Videocorso)'}
                              </label>
                              <div className="border-2 border-dashed border-red-200 rounded-lg p-4 bg-red-50">
                                {nuovoProgramma.videoPreview ? (
                                  <div className="text-center">
                                    <video
                                      src={nuovoProgramma.videoPreview}
                                      className="w-full h-40 object-cover rounded-lg mb-2"
                                      controls
                                      preload="metadata"
                                    />
                                    <p className="text-sm text-gray-600 mb-2">{nuovoProgramma.video?.name}</p>
                                    <p className="text-xs text-gray-500 mb-2">
                                      {(nuovoProgramma.video?.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => setNuovoProgramma(prev => ({ ...prev, video: null, videoPreview: null }))}
                                      className="text-red-600 hover:text-red-700 text-sm"
                                    >
                                      Rimuovi Video
                                    </button>
                                  </div>
                                ) : (
                                  <label className="cursor-pointer block text-center">
                                    <Video className="w-12 h-12 mx-auto text-red-600 mb-2" />
                                    <p className="text-sm text-red-700 mb-1 font-medium">🎥 Clicca per caricare video</p>
                                    <p className="text-xs text-red-600">MP4, MOV, AVI, WMV (max 200MB)</p>
                                    <input
                                      type="file"
                                      accept="video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv"
                                      onChange={(e) => handleProgramFileUpload('video', e.target.files[0])}
                                      className="hidden"
                                    />
                                  </label>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewProgramForm(false);
                            setProgramErrors({});
                            setNuovoProgramma({
                              titolo: '', descrizione: '', prezzo: '', categoria: '', 
                              livello: '', durata: '', tipoContenuto: '', copertina: null, file: null, video: null,
                              covertinaPreview: null, filePreview: null, videoPreview: null
                            });
                          }}
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
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">I Tuoi Programmi ({programmi.length})</h3>
                      <div className="text-sm text-gray-500">
                        {stats.programmiPubblicati} pubblicati • {programmi.length - stats.programmiPubblicati} bozze • {stats.videocorsi} videocorsi
                      </div>
                    </div>
                  </div>
                  
                  {programmi.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="flex justify-center space-x-4 mb-4">
                        <FileText className="w-12 h-12 text-gray-300" />
                        <Video className="w-12 h-12 text-gray-300" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Nessun programma ancora</h4>
                      <p className="text-gray-600 mb-6">
                        Crea programmi, videocorsi o contenuti misti per iniziare a vendere su Best-Trainer
                      </p>
                      <button
                        onClick={() => setShowNewProgramForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Crea Primo Programma
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {programmi.map((programma) => (
                        <div key={programma.id} className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex space-x-4 flex-1">
                              {/* Copertina Thumbnail */}
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                                {programma.covertinaPreview ? (
                                  <img src={programma.covertinaPreview} className="w-full h-full object-cover" alt="Copertina" />
                                ) : (
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                )}
                                
                                {/* Badge Tipo Contenuto */}
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

                              {/* Info Programma */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">{programma.titolo}</h4>
                                  
                                  {/* Badge Tipo */}
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    getContentTypeLabel(programma) === 'video' ? 'bg-red-100 text-red-800' :
                                    getContentTypeLabel(programma) === 'misto' ? 'bg-purple-100 text-purple-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}>
                                    {getContentTypeLabel(programma) === 'video' && '🎥 Video'}
                                    {getContentTypeLabel(programma) === 'misto' && '📚🎥 Misto'}
                                    {getContentTypeLabel(programma) === 'documento' && '📚 Doc'}
                                  </span>
                                  
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    programma.pubblicato 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {programma.pubblicato ? 'Pubblicato' : 'Bozza'}
                                  </span>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-2">{programma.descrizione}</p>
                                
                                <div className="grid grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Categoria:</span>
                                    <p className="font-medium">{programma.categoria}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Prezzo:</span>
                                    <p className="font-medium">€{programma.prezzo}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Vendite:</span>
                                    <p className="font-medium">{programma.vendite}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Rating:</span>
                                    <p className="font-medium flex items-center">
                                      {programma.rating > 0 ? (
                                        <>
                                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                                          {programma.rating}
                                        </>
                                      ) : (
                                        'Nessuna recensione'
                                      )}
                                    </p>
                                  </div>
                                </div>

                                {/* File Info */}
                                <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                                  {programma.filePreview && (
                                    <span className="flex items-center">
                                      <FileText className="w-3 h-3 mr-1" />
                                      Doc: {programma.filePreview}
                                    </span>
                                  )}
                                  {programma.video && (
                                    <span className="flex items-center">
                                      <Video className="w-3 h-3 mr-1" />
                                      Video: {programma.video.name || 'video-corso.mp4'}
                                    </span>
                                  )}
                                  <span>
                                    Creato: {new Date(programma.dataCreazione).toLocaleDateString()}
                                  </span>
                                  <span>
                                    Modificato: {new Date(programma.ultimaModifica).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Azioni */}
                            <div className="flex items-center space-x-2 ml-6">
                              <button
                                onClick={() => handleAIGenerate('social-post', {
                                  titolo: programma.titolo,
                                  categoria: programma.categoria,
                                  durata: programma.durata,
                                  prezzo: programma.prezzo,
                                  tipoContenuto: getContentTypeLabel(programma)
                                })}
                                className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                                title="Genera post social"
                              >
                                <Bot className="w-4 h-4" />
                              </button>
                              
                              <button
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Visualizza"
                              >
                                <Eye className="w-4 h-4" />
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
                                title="Elimina"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                <X className="w-6 h-6" />
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