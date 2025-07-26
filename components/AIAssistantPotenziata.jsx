import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Wand2, 
  Target, 
  Users, 
  TrendingUp,
  MessageSquare,
  FileText,
  Instagram,
  Mail,
  Star,
  Zap,
  Brain,
  Lightbulb,
  Copy,
  CheckCircle,
  RefreshCw,
  ChevronRight,
  User,
  Award,
  Heart,
  Dumbbell,
  Bike,
  Waves,
  Trophy,
  Apple,
  Clock,
  X,
  Play,
  Pause,
  Send,
  ArrowRight,
  Settings
} from 'lucide-react';

export default function AIAssistantPotenziata() {
  const [activeTemplate, setActiveTemplate] = useState('bio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showQuestions, setShowQuestions] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [contextAnswers, setContextAnswers] = useState({});
  const [selectedPersonality, setSelectedPersonality] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Carica profilo dal localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('bt_profile_data');
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Errore nel caricamento del profilo:', error);
      }
    }
  }, []);

  const personalities = [
    {
      id: 'bodybuilder',
      name: 'Bodybuilder Pro',
      icon: Dumbbell,
      color: 'red',
      description: 'Linguaggio tecnico, focus massa/forza',
      specialties: ['Bodybuilding', 'Powerlifting', 'Massa Muscolare'],
      tone: 'Tecnico e diretto',
      keywords: ['ipertrofia', 'volume', 'intensità', 'periodizzazione']
    },
    {
      id: 'wellness',
      name: 'Wellness Coach',
      icon: Heart,
      color: 'pink',
      description: 'Approccio olistico, body positive',
      specialties: ['Dimagrimento', 'Tonificazione', 'Yoga', 'Pilates'],
      tone: 'Motivazionale e inclusivo',
      keywords: ['benessere', 'equilibrio', 'autostima', 'lifestyle']
    },
    {
      id: 'beginner',
      name: 'Coach Principianti',
      icon: Users,
      color: 'green',
      description: 'Linguaggio semplice, motivazionale',
      specialties: ['Home Workout', 'Functional Training'],
      tone: 'Accessibile e incoraggiante',
      keywords: ['semplice', 'step-by-step', 'motivazione', 'progressione']
    },
    {
      id: 'sport',
      name: 'Performance Coach',
      icon: Trophy,
      color: 'blue',
      description: 'Preparazione atletica specifica',
      specialties: ['Preparazione Atletica', 'Ciclismo', 'Nuoto', 'Corsa', 'Calcio'],
      tone: 'Scientifico e performance-oriented',
      keywords: ['performance', 'specifico', 'periodizzazione', 'risultati']
    },
    {
      id: 'endurance',
      name: 'Endurance Expert',
      icon: Bike,
      color: 'orange',
      description: 'Specialista resistenza e sport di durata',
      specialties: ['Endurance', 'Triathlon', 'Corsa', 'Ciclismo'],
      tone: 'Motivazionale e scientifico',
      keywords: ['resistenza', 'soglie', 'VO2max', 'metabolismo']
    },
    {
      id: 'nutrition',
      name: 'Nutrition Coach',
      icon: Apple,
      color: 'emerald',
      description: 'Focus su alimentazione e lifestyle',
      specialties: ['Alimentazione', 'Dimagrimento'],
      tone: 'Educativo e pratico',
      keywords: ['nutrizione', 'macros', 'metabolismo', 'sostenibile']
    }
  ];

  const templates = [
    {
      id: 'bio',
      name: 'Bio Professionale',
      icon: User,
      description: 'Bio Instagram/social personalizzata',
      questions: [
        { id: 'target', label: 'Chi è il tuo cliente ideale?', type: 'select', options: ['Uomini 25-40', 'Donne 25-40', 'Principianti', 'Atleti', 'Over 50', 'Misto'] },
        { id: 'focus', label: 'Qual è il tuo focus principale?', type: 'select', options: ['Trasformazione fisica', 'Performance sportiva', 'Benessere generale', 'Riabilitazione', 'Preparazione gare'] },
        { id: 'unique', label: 'Cosa ti rende unico?', type: 'text', placeholder: 'Es: metodo scientifico, approccio olistico...' }
      ]
    },
    {
      id: 'program',
      name: 'Descrizione Programma',
      icon: FileText,
      description: 'Descrizioni che convertono',
      questions: [
        { id: 'goal', label: 'Obiettivo principale del programma?', type: 'select', options: ['Massa muscolare', 'Dimagrimento', 'Forza', 'Definizione', 'Resistenza', 'Ricomposizione'] },
        { id: 'duration', label: 'Durata del programma?', type: 'select', options: ['4 settimane', '8 settimane', '12 settimane', '16 settimane', '6 mesi'] },
        { id: 'level', label: 'Livello target?', type: 'select', options: ['Principiante', 'Intermedio', 'Avanzato', 'Tutti i livelli'] },
        { id: 'format', label: 'Formato contenuto?', type: 'select', options: ['Solo PDF', 'Solo Video', 'PDF + Video', 'App integrata'] }
      ]
    },
    {
      id: 'social',
      name: 'Post Social',
      icon: Instagram,
      description: 'Post Instagram/Facebook coinvolgenti',
      questions: [
        { id: 'platform', label: 'Piattaforma principale?', type: 'select', options: ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube'] },
        { id: 'content_type', label: 'Tipo di contenuto?', type: 'select', options: ['Motivazionale', 'Educativo', 'Trasformazione', 'Esercizi', 'Nutrizione', 'Behind the scenes'] },
        { id: 'call_to_action', label: 'Obiettivo del post?', type: 'select', options: ['Engagement', 'Vendita programma', 'Lead generation', 'Brand awareness', 'Community building'] }
      ]
    },
    {
      id: 'email',
      name: 'Email Marketing',
      icon: Mail,
      description: 'Email persuasive per clienti',
      questions: [
        { id: 'email_type', label: 'Tipo di email?', type: 'select', options: ['Welcome series', 'Lancio programma', 'Nurturing', 'Riattivazione', 'Testimonianza'] },
        { id: 'audience', label: 'A chi è rivolta?', type: 'select', options: ['Nuovi iscritti', 'Clienti attuali', 'Ex clienti', 'Lead interessati', 'Prospect freddi'] },
        { id: 'tone', label: 'Tono desiderato?', type: 'select', options: ['Professionale', 'Amichevole', 'Motivazionale', 'Urgente', 'Educativo'] }
      ]
    },
    {
      id: 'testimonial',
      name: 'Richiesta Testimonianza',
      icon: Star,
      description: 'Template per richiedere recensioni',
      questions: [
        { id: 'client_type', label: 'Tipo di cliente?', type: 'select', options: ['Appena finito programma', 'Risultati eccezionali', 'Cliente di lunga data', 'Trasformazione importante'] },
        { id: 'results', label: 'Principali risultati ottenuti?', type: 'text', placeholder: 'Es: -15kg in 3 mesi, +20% forza...' },
        { id: 'platform', label: 'Dove pubblicare?', type: 'select', options: ['Google Reviews', 'Instagram', 'Facebook', 'Sito web', 'Tutti'] }
      ]
    },
    {
      id: 'faq',
      name: 'FAQ Programmi',
      icon: MessageSquare,
      description: 'Risposte alle domande frequenti',
      questions: [
        { id: 'faq_type', label: 'Categoria FAQ?', type: 'select', options: ['Prezzi e pagamenti', 'Programmi e contenuti', 'Supporto e assistenza', 'Risultati attesi', 'Generale'] },
        { id: 'customer_concern', label: 'Preoccupazione principale?', type: 'select', options: ['Troppo difficile', 'Non funziona', 'Troppo caro', 'Poco tempo', 'Non adatto a me'] }
      ]
    }
  ];

  const getPersonalityColor = (personality) => {
    const colors = {
      red: 'from-red-500 to-red-600',
      pink: 'from-pink-500 to-pink-600',
      green: 'from-green-500 to-green-600', 
      blue: 'from-blue-500 to-blue-600',
      orange: 'from-orange-500 to-orange-600',
      emerald: 'from-emerald-500 to-emerald-600'
    };
    return colors[personality] || 'from-blue-500 to-blue-600';
  };

  const getPersonalityIcon = (personalityId) => {
    const personality = personalities.find(p => p.id === personalityId);
    return personality ? personality.icon : Bot;
  };

  const handleStartGeneration = (templateId) => {
    setActiveTemplate(templateId);
    setCurrentStep(1);
    setShowQuestions(true);
    setContextAnswers({});
    setShowResult(false);
  };

  const handleAnswerChange = (questionId, value) => {
    setContextAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handlePersonalitySelect = (personalityId) => {
    setSelectedPersonality(personalityId);
    setCurrentStep(2);
  };

  const generateAIContent = async () => {
    setIsGenerating(true);
    setCurrentStep(3);
    
    // Simula chiamata AI con delay realistico
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const template = templates.find(t => t.id === activeTemplate);
    const personality = personalities.find(p => p.id === selectedPersonality);
    
    let content = generateContentByTemplate(template, personality, contextAnswers, profileData);
    
    setGeneratedContent(content);
    setIsGenerating(false);
    setShowResult(true);
  };

  const generateContentByTemplate = (template, personality, answers, profile) => {
    const specializations = profile.specializzazioni || [];
    const experience = profile.anniEsperienza || 5;
    const name = profile.nome || 'Personal Trainer';
    const city = profile.citta || '';

    switch(template.id) {
      case 'bio':
        return generateBio(personality, answers, profile);
      case 'program':
        return generateProgramDescription(personality, answers, profile);
      case 'social':
        return generateSocialPost(personality, answers, profile);
      case 'email':
        return generateEmail(personality, answers, profile);
      case 'testimonial':
        return generateTestimonialRequest(personality, answers, profile);
      case 'faq':
        return generateFAQ(personality, answers, profile);
      default:
        return 'Contenuto generato con AI...';
    }
  };

  const generateBio = (personality, answers, profile) => {
    const name = profile.nome || 'Personal Trainer';
    const experience = profile.anniEsperienza || 5;
    const specializations = profile.specializzazioni?.slice(0, 3).join(' • ') || 'Fitness & Wellness';
    const city = profile.citta || '';
    const target = answers.target || 'clienti motivati';
    const focus = answers.focus || 'trasformazione fisica';
    const unique = answers.unique || 'approccio personalizzato';

    if (personality.id === 'bodybuilder') {
      return `💪 ${name} | IFBB Elite Coach
${experience}+ anni di esperienza nel BODYBUILDING COMPETITIVO

🎯 SPECIALIST: ${specializations}
📍 ${city} | Online Coaching Worldwide

🔥 METODO SCIENTIFICO:
• Periodizzazione avanzata per MASSA PURA
• Analisi composizione corporea DEXA
• Protocolli specifici forza/ipertrofia
• Preparazioni gare IFBB

📊 RISULTATI DOCUMENTATI:
• 200+ atleti seguiti
• 85% successo in gare regionali
• Metodo "HYPERTROPHY PROTOCOL 2.0"

💎 COSA TI OFFRO:
✅ Programmazione scientifica personalizzata  
✅ Coaching nutrizionale preciso
✅ Supporto H24 via WhatsApp
✅ Check-in settimanali con feedback

${unique.toUpperCase()} - ZERO COMPROMESSI

📱 DM per consulenza GRATUITA
🔗 Link programmi in bio
#bodybuilding #coaching #ipertrofia #massa`;
    }

    if (personality.id === 'wellness') {
      return `✨ ${name} | Wellness Coach Certificata
Aiuto donne a riscoprire la propria forza interiore 💫

🌸 SPECIALIZZATA IN: ${specializations}
📍 ${city} | Coaching online & in presenza
${experience} anni dedicati al TUO benessere

💕 LA MIA MISSIONE:
Trasformare la tua relazione con il corpo attraverso movimento consapevole e amore per te stessa

🌟 COSA FACCIAMO INSIEME:
• Allenamenti che rispettano il tuo corpo
• Nutrizione intuitiva (no diete estreme!)
• Mindset positivo e body acceptance
• Community di donne che si supportano

🦋 I MIEI VALORI:
✅ Ogni corpo è bello e unico
✅ Fitness = gioia, non punizione  
✅ Progresso > perfezione
✅ Self-care = priority

💖 RISULTATI CHE OTTERRAI:
• Più energia e vitalità
• Autostima alle stelle
• Corpo tonico e forte
• Relazione sana con il cibo

${unique} ✨

Pronta per il tuo glow up? 
DM me "PRONTA" 💌

#wellness #bodypositive #fitness #selflove`;
    }

    if (personality.id === 'beginner') {
      return `👋 Ciao, sono ${name}! 
Il tuo Personal Trainer per iniziare (davvero!) 🌟

🎯 SPECIALIZED IN: Fitness per principianti
📍 ${city} | Online & offline
${experience} anni ad aiutare chi parte da zero

💡 LA MIA FILOSOFIA:
"Non importa da dove parti, importa dove vuoi arrivare!"

🚀 PERFETTO SE:
✅ Non hai mai fatto palestra
✅ Hai paura di non farcela  
✅ Vuoi risultati senza stress
✅ Cerchi supporto e motivazione

🎁 COSA RICEVI:
• Programmi SEMPLICI e efficaci
• Video-spiegazioni passo-passo
• Supporto motivazionale quotidiano
• Community di persone come te

📈 I NOSTRI SUCCESSI:
• 500+ persone che hanno iniziato
• 90% continua dopo 3 mesi
• Media -8kg primi 2 mesi
• Livello energia +200%

${unique} 💪

🎯 ${focus} è il nostro focus
👥 Clienti tipo: ${target}

Ready to start? DM "INIZIAMO!" 🚀
Link primo programma GRATIS ⬇️

#beginners #fitness #motivation #support`;
    }

    if (personality.id === 'sport') {
      return `🏆 ${name} | Performance Coach
SPECIALIST: Sport-specific training & periodization

⚡ EXPERTISE: ${specializations}
📍 ${city} | Athletes coaching worldwide  
${experience}+ years high-performance training

🎯 METODOLOGIA EVIDENCE-BASED:
• Analisi biomeccanica avanzata
• Periodizzazione sport-specifica
• Monitoring carichi allenamento
• Recovery protocols scientifici

📊 TRACK RECORD:
• 150+ atleti seguiti
• 40+ medaglie/podi ottenuti
• Collaborazione federazioni nazionali
• Preparatore squadre professionali

⚙️ TECHNICAL APPROACH:
✅ Movement analysis & correction
✅ Power/strength development
✅ Injury prevention protocols  
✅ Competition peaking strategies

💯 RISULTATI MISURABILI:
• +15-25% performance indicators
• 90% injury reduction
• Optimal competition timing
• Data-driven progressions

${unique.toUpperCase()}

🎯 Target: ${target}
🔬 Focus: ${focus}

Contact for performance assessment 📈
Link academy programs below ⬇️

#performance #sportsscience #training #athletes`;
    }

    // Default personality
    return `🔥 ${name} | Certified Personal Trainer
${experience}+ anni trasformando vite attraverso il fitness

💪 SPECIALIZZAZIONI: ${specializations}
📍 ${city} | Coaching personalizzato

🎯 LA MIA MISSIONE:
Aiutarti a raggiungere i tuoi obiettivi con ${unique}

✨ APPROCCIO: ${focus}
👥 IDEALE PER: ${target}

📈 RISULTATI GARANTITI:
• Programmi su misura per te
• Supporto costante e motivazione
• Metodi scientificamente provati
• Community di successo

Pronto per la trasformazione? 💫
DM per consulenza gratuita!

#personaltrainer #fitness #transformation`;
  };

  const generateProgramDescription = (personality, answers, profile) => {
    const goal = answers.goal || 'trasformazione fisica';
    const duration = answers.duration || '12 settimane';
    const level = answers.level || 'intermedio';
    const format = answers.format || 'PDF + Video';

    if (personality.id === 'bodybuilder') {
      return `🔥 PROTOCOLLO MASSA ESTREMA ${duration.toUpperCase()}
Il sistema scientifico per IPERTROFIA MASSIMA

💪 OBIETTIVO: ${goal.toUpperCase()} PROFESSIONALE
🎯 LIVELLO: ${level} - ${format.replace('PDF', 'MANUALE TECNICO')}

⚡ METODOLOGIA AVANZATA:
• Periodizzazione DUP (Daily Undulating Periodization)
• Volume progressivo calibrato su intensità
• Split scientifico 6 giorni/settimana
• Tecniche intensità: Rest-Pause, Drop-set, Cluster

📊 COSA INCLUDE:
✅ ${duration} programmazione completa
✅ 150+ esercizi con biomeccanica dettagliata
✅ Calcolo carichi progressivi automatico
✅ Protocolli recupero e deload
✅ Piano nutrizionale per massa pulita
✅ Integrazione scientificamente supportata

🎬 FORMATO VIDEO HD:
• Tutorial tecnica esecuzione
• Analisi errori comuni
• Progressioni avanzate
• Q&A settimanali live

📈 RISULTATI ATTESI:
• +3-5kg massa magra in ${duration}
• +20-30% forza composti principali
• Definizione muscolare visibile
• Composizione corporea ottimizzata

⚠️ DISCLAIMER: Protocollo intensivo
Richiede dedizione totale e disciplina ferrea

💎 BONUS INCLUSI:
🎁 Calcolatore macro personalizzato
🎁 App tracking progressi
🎁 Accesso gruppo VIP Telegram
🎁 Check-in mensili personalizzati

⏰ EARLY BIRD: -40% primi 50 iscritti
💳 Garanzia 60 giorni o rimborso totale

Non aspettare. La stagione MASSA inizia ORA! 🚀`;
    }

    if (personality.id === 'wellness') {
      return `✨ GLOW UP PROGRAM ${duration}
Il percorso di trasformazione gentile per il tuo corpo e la tua mente 💫

🌸 OBIETTIVO: ${goal} con amore e rispetto
🦋 PERFETTO PER: ${level} che vogliono brillare
💕 FORMATO: ${format} - tutto a portata di cuore

💖 FILOSOFIA DEL PROGRAMMA:
Non si tratta di "distruggere" il tuo corpo, ma di nutrirlo, amarlo e permettergli di fiorire nella sua versione migliore

🌟 IL TUO VIAGGIO INCLUDE:
✅ ${duration} di allenamenti gioiosi
✅ Workout che celebrano il tuo corpo
✅ Nutrizione intuitiva (addio diete!)
✅ Pratiche mindfulness quotidiane
✅ Journal di gratitudine e progressi
✅ Community di sorelle motivanti

🌺 COSA SCOPRIRAI:
• Movimento come forma di self-care
• Come ascoltare i segnali del tuo corpo
• Ricette nutrienti e gustose
• Tecniche per gestire lo stress
• Come costruire abitudini sostenibili

💎 TRASFORMAZIONE A 360°:
🧘‍♀️ Mente: mindset positivo e autostima
💪 Corpo: tonico, forte e pieno di energia  
❤️ Anima: pace interiore e gioia di vivere

🎁 BONUS MAGICAL:
✨ Meditation pack "Body Love"
✨ Ricettario healthy & yummy
✨ Workout playlist motivazionali
✨ Live mensili Q&A e motivazione

👭 COMMUNITY ESCLUSIVA:
Gruppo privato con donne straordinarie che si supportano nel loro glow up journey

💕 PROMESSA:
Alla fine di questi ${duration}, non sarai solo più in forma, ma avrai sviluppato una relazione d'amore con te stessa che durerà per sempre

Ready to glow? Il tuo momento è ORA! ✨
#glowup #selflove #wellness #transformation`;
    }

    return `🎯 PROGRAMMA ${goal.toUpperCase()} ${duration}
La tua strada verso il successo fitness!

💪 OBIETTIVO: ${goal}
📚 FORMATO: ${format}
🎯 LIVELLO: ${level}

✅ COSA OTTERRAI:
• Programma completo ${duration}
• Allenamenti step-by-step
• Piano nutrizionale incluso
• Supporto costante
• Risultati garantiti

🚀 Inizia oggi la tua trasformazione!`;
  };

  const generateSocialPost = (personality, answers, profile) => {
    const platform = answers.platform || 'Instagram';
    const contentType = answers.content_type || 'motivazionale';
    const cta = answers.call_to_action || 'engagement';

    if (personality.id === 'wellness' && contentType === 'Motivazionale') {
      return `✨ REMEMBER BEAUTIFUL SOUL ✨

Il tuo corpo non è il tuo nemico 💕
È il tuo compagno di vita più fedele

🌸 Oggi invece di giudicarlo, RINGRAZIALO:
• Per ogni respiro che ti dona
• Per portarti ovunque tu voglia andare  
• Per la forza che hai anche quando non te ne accorgi
• Per essere casa della tua anima bella

💫 La vera trasformazione inizia dall'AMORE, non dall'odio

Non aspettare di essere "perfetta" per essere felice
Sei già abbastanza, proprio così come sei 🦋

❤️ COMMENTA con un 💕 se oggi scegli di essere gentile con te stessa

#selflove #bodypositive #wellness #transformation #loveyourself #fitness #motivation #empowerment #authenticity #mentalhealth

✨ PS: Se stai lottando con l'autostima, ti mando un abbraccio virtuale. Non sei sola in questo journey 💕`;
    }

    if (personality.id === 'bodybuilder' && contentType === 'Educativo') {
      return `💪 LEZIONE IPERTROFIA #001: VOLUME TRAINING

🔬 SCIENZA FACT:
Il volume (serie x reps x peso) è il driver principale della crescita muscolare

📊 RANGE OTTIMALI PER MASSA:
• 10-20 serie/settimana per gruppo muscolare
• 6-12 reps per serie (zona ipertrofia)
• 65-85% 1RM intensità
• 2-3 volte/settimana frequenza

⚡ PROGRESSIONE INTELLIGENTE:
Week 1-2: Volume base (10-12 serie)
Week 3-4: Volume medio (14-16 serie)  
Week 5-6: Volume alto (18-20 serie)
Week 7: Deload (6-8 serie)

🎯 ESEMPIO PRATICO PETTO:
• Panca piana: 4x8-10
• Panca inclinata: 3x8-12
• Croci cavi: 3x12-15
• Push-up: 2xAMRAP

TOTALE: 12 serie settimanali petto

💡 PRO TIP: Traccia SEMPRE il volume
Senza dati = zero progressi

❓ Quante serie fai a settimana per il petto?
Dimmi nei commenti 👇

#bodybuilding #ipertrofia #scienza #volume #massa #education #training`;
    }

    return `🔥 ${contentType.toUpperCase()} POST

💪 Contenuto ottimizzato per ${platform}
${cta === 'Vendita programma' ? '🎯 Obiettivo: Conversione' : '📈 Obiettivo: Engagement'}

✨ Call-to-action efficace inclusa!
#fitness #motivation #transformation`;
  };

  const generateEmail = (personality, answers, profile) => {
    const emailType = answers.email_type || 'Welcome series';
    const audience = answers.audience || 'Nuovi iscritti';
    const tone = answers.tone || 'Amichevole';

    if (emailType === 'Welcome series' && personality.id === 'wellness') {
      return `Subject: 💕 Benvenuta nella famiglia Glow Up, bella!

Ciao bellezza! ✨

Sono così FELICE che tu abbia deciso di unirti a noi in questo viaggio di trasformazione gentile! 🌸

Prima di tutto, voglio che tu sappia una cosa importante:

👑 SEI GIÀ ABBASTANZA, proprio così come sei

Questo percorso non è per "sistemarti" o "correggerti" - sei perfetta come natura ti ha creata. È per aiutarti a BRILLARE ancora di più e ritrovare quella connessione magica con il tuo corpo 💫

🌟 NEI PROSSIMI GIORNI RICEVERAI:

📧 Giorno 2: "Il tuo Glow Up mindset" - Come trasformare il dialogo interiore
📧 Giorno 4: "Movimento come amore" - I primi esercizi dolci per iniziare
📧 Giorno 6: "Nutrizione intuitiva" - Ascolta cosa ti chiede il corpo
📧 Giorno 8: "Self-care rituals" - Coccole quotidiane che cambiano tutto

💎 BONUS SPECIALE PER TE:
Ho preparato una meditazione guidata "Body Love" di 10 minuti - perfetta per iniziare ogni giornata con gratitudine verso te stessa

[SCARICA LA TUA MEDITAZIONE GRATUITA] 🎁

💕 RICORDA:
• Ogni piccolo passo conta
• Non esistono fallimenti, solo lezioni
• Il tuo ritmo è quello giusto
• Sei supportata e mai sola

Risponda pure a questa email se hai domande o vuoi semplicemente condividere la tua energia - leggo e rispondo personalmente a tutti! 

Tutto il mio amore e supporto,
[Nome] 💋

PS: Seguimi su Instagram [@handle] per dose quotidiana di amore e motivazione! ✨

---
💌 Hai ricevuto questa email perché hai richiesto info sui miei programmi wellness. 
Non vuoi più ricevere le email? [Unsubscribe] (ma mi mancherai! 💔)`;
    }

    return `Subject: [OGGETTO PERSONALIZZATO]

Ciao [NOME],

Email ${emailType} ottimizzata per ${audience}
Tono: ${tone}

[CONTENUTO PERSONALIZZATO BASATO SU PERSONALITÀ E CONTESTO]

Un abbraccio,
[FIRMA]`;
  };

  const generateTestimonialRequest = (personality, answers, profile) => {
    const clientType = answers.client_type || 'Risultati eccezionali';
    const results = answers.results || 'ottimi risultati';
    const platform = answers.platform || 'Google Reviews';

    return `Subject: 🌟 La tua trasformazione merita di essere raccontata!

Ciao [NOME],

Sono ancora emozionato/a pensando ai risultati incredibili che hai ottenuto: ${results} 🎉

La tua dedizione e i progressi che hai fatto sono stati davvero ispiranti per me come trainer, e sono sicuro/a che la tua storia potrebbe motivare tantissime altre persone che stanno lottando con gli stessi obiettivi che avevi tu all'inizio.

🌟 TI ANDREBBE DI CONDIVIDERE LA TUA ESPERIENZA?

Basterebbero poche righe su ${platform} per raccontare:
• Com'era la situazione prima
• Cosa ti ha colpito di più del percorso
• I risultati che hai ottenuto
• Come ti senti ora

💝 Non è obbligatorio ovviamente, ma se dovessi farlo mi faresti un regalo immenso e aiuteresti altre persone a credere che anche loro possono farcela!

[LINK DIRETTO RECENSIONE]

Grazie infinite per tutto, sei stato/a un cliente straordinario! 💪

[NOME TRAINER]

PS: Se preferisci, possiamo anche organizzare una breve intervista video - dimmi tu!`;
  };

  const generateFAQ = (personality, answers, profile) => {
    const faqType = answers.faq_type || 'Programmi e contenuti';
    const concern = answers.customer_concern || 'Non adatto a me';

    if (faqType === 'Programmi e contenuti' && concern === 'Troppo difficile') {
      return `❓ "SONO UN PRINCIPIANTE ASSOLUTO, RIUSCIRÒ A SEGUIRE IL PROGRAMMA?"

✅ ASSOLUTAMENTE SÌ! Ecco perché:

🎯 PROGETTATO PER TUTTI I LIVELLI:
• Ogni esercizio ha 3 varianti di difficoltà
• Video tutorial step-by-step per principianti
• Progressione graduale settimana dopo settimana
• Nessun movimento complesso o pericoloso

👥 LA MAGGIOR PARTE DEI MIEI CLIENTI ERANO PRINCIPIANTI:
• 78% non aveva mai fatto palestra prima
• 65% pensava "non fa per me"
• 92% ha completato il programma con successo
• 85% ha continuato anche dopo

🆘 SUPPORTO CONTINUO:
• Gruppo WhatsApp per domande immediate
• Video-correzioni personalizzate
• Call settimanali di motivazione
• Chat diretta 7/7 per dubbi

💡 IL MIO APPROCCIO:
"Non devi essere bravo per iniziare, ma devi iniziare per diventare bravo"

Iniziamo dal TUO livello attuale e costruiamo passo dopo passo la TUA versione migliore 💪

🎁 GARANZIA SPECIALE PRINCIPIANTI:
Se dopo 2 settimane senti che è troppo difficile, ti rimborso 100% + ti regalo una consulenza personalizzata gratuita

Ready to start? Il primo passo è sempre il più difficile, ma tu ce la puoi fare! 🚀`;
    }

    return `❓ FAQ: ${faqType}

${concern === 'Troppo caro' ? '💰' : concern === 'Non funziona' ? '⚡' : '❓'} DOMANDA FREQUENTE GESTITA

[RISPOSTA PERSONALIZZATA BASATA SU PERSONALITÀ E CONTESTO]

✅ Soluzione chiara e rassicurante fornita!`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Feedback visivo
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copiato!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  };

  const resetGeneration = () => {
    setShowQuestions(false);
    setCurrentStep(1);
    setContextAnswers({});
    setSelectedPersonality('');
    setGeneratedContent('');
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Assistant Potenziata</h1>
              <p className="text-gray-600">Contenuti personalizzati basati sulla tua specializzazione</p>
            </div>
          </div>
          
          {/* Profile Analysis */}
          {profileData.nome && (
            <div className="bg-white rounded-xl p-4 shadow-sm border inline-block">
              <p className="text-sm text-gray-600">
                🎯 Profilo rilevato: <span className="font-medium">{profileData.nome}</span> | 
                Specializzazioni: <span className="font-medium">{profileData.specializzazioni?.join(', ') || 'Non specificate'}</span> |
                Esperienza: <span className="font-medium">{profileData.anniEsperienza || 0} anni</span>
              </p>
            </div>
          )}
        </div>

        {/* Template Selection */}
        {!showQuestions && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border hover:border-blue-300"
                  onClick={() => handleStartGeneration(template.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <span>Inizia generazione</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Generation Process */}
        {showQuestions && (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Step {currentStep} di 3</span>
                <button
                  onClick={resetGeneration}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Personality Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Scegli la tua Personalità AI</h2>
                <p className="text-gray-600 mb-8">Seleziona lo stile che meglio rappresenta il tuo approccio professionale</p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personalities.map((personality) => {
                    const Icon = personality.icon;
                    const isRecommended = profileData.specializzazioni?.some(spec => 
                      personality.specialties.includes(spec)
                    );
                    
                    return (
                      <div
                        key={personality.id}
                        onClick={() => handlePersonalitySelect(personality.id)}
                        className={`relative cursor-pointer border-2 rounded-xl p-6 transition-all hover:scale-105 ${
                          selectedPersonality === personality.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                            CONSIGLIATO
                          </div>
                        )}
                        
                        <div className={`w-12 h-12 bg-gradient-to-r ${getPersonalityColor(personality.color)} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{personality.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{personality.description}</p>
                        
                        <div className="text-xs text-gray-500">
                          <p className="mb-1"><strong>Tone:</strong> {personality.tone}</p>
                          <p><strong>Specialties:</strong> {personality.specialties.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Context Questions */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getPersonalityColor(personalities.find(p => p.id === selectedPersonality)?.color)} rounded-lg flex items-center justify-center mr-4`}>
                    {React.createElement(getPersonalityIcon(selectedPersonality), { className: "w-5 h-5 text-white" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Personalizza il Contenuto</h2>
                    <p className="text-gray-600">Rispondi per ottenere contenuti su misura</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {templates.find(t => t.id === activeTemplate)?.questions.map((question) => (
                    <div key={question.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {question.label}
                      </label>
                      
                      {question.type === 'select' ? (
                        <select
                          value={contextAnswers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Seleziona...</option>
                          {question.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={contextAnswers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          placeholder={question.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Indietro
                  </button>
                  <button
                    onClick={generateAIContent}
                    disabled={Object.keys(contextAnswers).length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Genera Contenuto AI
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Generation & Results */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                {isGenerating ? (
                  <div className="text-center py-12">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                        <Sparkles className="w-3 h-3 text-yellow-900" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI sta generando il tuo contenuto...</h3>
                    <p className="text-gray-600 mb-6">Analizzo il tuo profilo e personalizzando per la tua specializzazione</p>
                    
                    <div className="max-w-md mx-auto">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Analisi profilo</span>
                        <span>✓</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Personalizzazione contenuto</span>
                        <span className="animate-pulse">...</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Ottimizzazione finale</span>
                        <span>⏳</span>
                      </div>
                    </div>
                  </div>
                ) : showResult && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getPersonalityColor(personalities.find(p => p.id === selectedPersonality)?.color)} rounded-lg flex items-center justify-center mr-4`}>
                          {React.createElement(getPersonalityIcon(selectedPersonality), { className: "w-5 h-5 text-white" })}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">Contenuto Generato</h3>
                          <p className="text-sm text-gray-600">
                            {templates.find(t => t.id === activeTemplate)?.name} • 
                            {personalities.find(p => p.id === selectedPersonality)?.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => generateAIContent()}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Rigenera
                        </button>
                        <button
                          onClick={() => copyToClipboard(generatedContent)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copia
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 border">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                        {generatedContent}
                      </pre>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={resetGeneration}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Genera Altro Contenuto
                      </button>
                      <div className="text-sm text-gray-500 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Contenuto ottimizzato per la tua specializzazione
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Features Footer */}
        {!showQuestions && (
          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">🚀 Caratteristiche AI Potenziata</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Analisi Profilo</h4>
                <p className="text-sm text-gray-600">Considera specializzazioni e esperienza</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">6 Personalità</h4>
                <p className="text-sm text-gray-600">Template per ogni stile di coaching</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Domande Smart</h4>
                <p className="text-sm text-gray-600">Contextualizza ogni generazione</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Instant Copy</h4>
                <p className="text-sm text-gray-600">Copia e usa subito ovunque</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}