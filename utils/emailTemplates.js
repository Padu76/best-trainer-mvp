// Email Templates per il sistema di notifiche PT
export const EmailTemplates = {
  
  // Template di conferma ricezione candidatura
  applicationReceived: (candidateData) => ({
    subject: '✅ Candidatura ricevuta - Best-Trainer PT Network',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Candidatura Ricevuta</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
            .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; }
            .status-badge { background-color: #fef3c7; color: #d97706; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; }
            .info-box { background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Candidatura Ricevuta!</h1>
              <p>Grazie per aver richiesto l'accesso al Best-Trainer PT Network</p>
            </div>
            
            <div class="content">
              <p>Ciao <strong>${candidateData.nome}</strong>,</p>
              
              <p>La tua candidatura per entrare nel <strong>Best-Trainer PT Network</strong> è stata ricevuta con successo!</p>
              
              <div class="info-box">
                <h3>📋 Dettagli della tua candidatura:</h3>
                <ul>
                  <li><strong>ID Candidatura:</strong> ${candidateData.applicationId}</li>
                  <li><strong>Data invio:</strong> ${new Date(candidateData.submissionDate).toLocaleDateString('it-IT')}</li>
                  <li><strong>Score completamento:</strong> ${candidateData.completionScore}%</li>
                  <li><strong>Status:</strong> <span class="status-badge">In Attesa di Revisione</span></li>
                </ul>
              </div>
              
              <h3>🔍 Processo di Valutazione</h3>
              <p>La tua candidatura seguirà questo processo:</p>
              <ol>
                <li><strong>Verifica Documenti</strong> (24-48 ore) - Controllo certificazioni e documenti</li>
                <li><strong>Valutazione Profilo</strong> (2-3 giorni) - Analisi esperienza e competenze</li>
                <li><strong>Controlli Finali</strong> (1-2 giorni) - Verifica referenze e presenza online</li>
                <li><strong>Decisione Finale</strong> - Comunicazione esito entro 7 giorni lavorativi</li>
              </ol>
              
              <div class="info-box">
                <h4>⚡ Cosa succede ora?</h4>
                <p>Il nostro team di validazione inizierà la revisione della tua candidatura. Riceverai aggiornamenti via email ad ogni step del processo.</p>
              </div>
              
              <p>Se hai domande o vuoi aggiungere informazioni alla tua candidatura, puoi rispondere a questa email.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://best-trainer-mvp.vercel.app/dashboard" class="button">
                  Accedi alla Dashboard
                </a>
              </div>
              
              <p>Grazie per voler far parte della community Best-Trainer!</p>
              
              <p>Il Team Best-Trainer</p>
            </div>
            
            <div class="footer">
              <p>© 2024 Best-Trainer. Tutti i diritti riservati.</p>
              <p>Se non hai richiesto questa candidatura, ignora questa email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Candidatura Ricevuta - Best-Trainer PT Network
      
      Ciao ${candidateData.nome},
      
      La tua candidatura per entrare nel Best-Trainer PT Network è stata ricevuta con successo!
      
      ID Candidatura: ${candidateData.applicationId}
      Data invio: ${new Date(candidateData.submissionDate).toLocaleDateString('it-IT')}
      Score completamento: ${candidateData.completionScore}%
      
      Riceverai aggiornamenti via email durante il processo di valutazione.
      
      Grazie,
      Il Team Best-Trainer
    `
  }),

  // Template di approvazione candidatura
  applicationApproved: (candidateData) => ({
    subject: '🎉 Candidatura APPROVATA - Benvenuto nel Best-Trainer PT Network!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Candidatura Approvata</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
            .button { background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; margin: 10px; }
            .success-badge { background-color: #d1fae5; color: #065f46; padding: 8px 16px; border-radius: 20px; font-size: 16px; font-weight: 600; }
            .welcome-box { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; }
            .feature-list { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 COMPLIMENTI!</h1>
              <p style="font-size: 18px;">La tua candidatura è stata <strong>APPROVATA</strong></p>
              <div style="margin-top: 15px;">
                <span class="success-badge">✅ PT NETWORK MEMBER</span>
              </div>
            </div>
            
            <div class="content">
              <div class="welcome-box">
                <h2>🚀 Benvenuto nel Best-Trainer PT Network!</h2>
                <p style="font-size: 16px; margin: 15px 0;">
                  <strong>${candidateData.nome} ${candidateData.cognome}</strong>, sei ora ufficialmente parte della 
                  community di Personal Trainer più esclusiva d'Italia!
                </p>
              </div>
              
              <h3>🎁 Cosa hai sbloccato:</h3>
              <div class="feature-list">
                <ul style="margin: 0; padding-left: 20px;">
                  <li><strong>Profilo Verificato</strong> - Badge di certificazione PT Network</li>
                  <li><strong>Dashboard Professionale</strong> - Gestisci clienti e programmi</li>
                  <li><strong>Visibilità Premium</strong> - Appari nella directory professionisti</li>
                  <li><strong>Strumenti Marketing</strong> - Promuovi i tuoi servizi</li>
                  <li><strong>Community Esclusiva</strong> - Network con altri PT certificati</li>
                  <li><strong>Supporto Dedicato</strong> - Assistenza prioritaria 24/7</li>
                </ul>
              </div>
              
              <h3>🔥 Primi passi da fare:</h3>
              <ol>
                <li><strong>Accedi alla tua Dashboard</strong> e completa il profilo pubblico</li>
                <li><strong>Carica i tuoi primi programmi</strong> per iniziare a vendere</li>
                <li><strong>Connettiti con la community</strong> nel nostro gruppo privato</li>
                <li><strong>Imposta le tue tariffe</strong> e disponibilità</li>
              </ol>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://best-trainer-mvp.vercel.app/dashboard" class="button">
                  🚀 Accedi alla Dashboard
                </a>
                <a href="https://best-trainer-mvp.vercel.app/professionisti" class="button" style="background-color: #2563eb;">
                  👀 Vedi il tuo Profilo
                </a>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #92400e;">📧 Prossime comunicazioni:</h4>
                <p style="margin-bottom: 0; color: #92400e;">
                  Riceverai a breve le credenziali per accedere al gruppo Telegram privato e 
                  il link per il webinar di onboarding della prossima settimana.
                </p>
              </div>
              
              <p>Siamo entusiasti di averti nel team e non vediamo l'ora di vedere i risultati che otterrai con la nostra piattaforma!</p>
              
              <p><strong>Welcome to the family! 💪</strong></p>
              
              <p>
                Il Team Best-Trainer<br>
                <small>support@best-trainer.com | WhatsApp: +39 123 456 7890</small>
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Best-Trainer PT Network. Tutti i diritti riservati.</p>
              <p>Hai domande? Rispondi a questa email o contattaci su WhatsApp!</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      🎉 CANDIDATURA APPROVATA - Best-Trainer PT Network
      
      COMPLIMENTI ${candidateData.nome}!
      
      La tua candidatura è stata APPROVATA e sei ora ufficialmente parte del Best-Trainer PT Network!
      
      Accedi alla tua dashboard: https://best-trainer-mvp.vercel.app/dashboard
      
      Prossimi passi:
      1. Completa il profilo pubblico
      2. Carica i tuoi primi programmi
      3. Connettiti con la community
      
      Welcome to the family!
      Il Team Best-Trainer
    `
  }),

  // Template di rifiuto candidatura
  applicationRejected: (candidateData, reason) => ({
    subject: '❌ Aggiornamento candidatura - Best-Trainer PT Network',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Aggiornamento Candidatura</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
            .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; }
            .rejection-box { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
            .improvement-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📄 Aggiornamento Candidatura</h1>
              <p>Best-Trainer PT Network - Revisione Completata</p>
            </div>
            
            <div class="content">
              <p>Ciao <strong>${candidateData.nome}</strong>,</p>
              
              <p>Grazie per aver inviato la tua candidatura per entrare nel Best-Trainer PT Network. 
              Abbiamo completato la revisione del tuo profilo e, dopo attenta valutazione, 
              <strong>al momento non possiamo procedere con l'approvazione</strong>.</p>
              
              <div class="rejection-box">
                <h4 style="margin-top: 0; color: #dc2626;">📋 Motivo della decisione:</h4>
                <p style="margin-bottom: 0; color: #dc2626;">${reason}</p>
              </div>
              
              <h3>🔍 Cosa significa questo?</h3>
              <p>Questa decisione non riflette le tue competenze come Personal Trainer, ma indica che 
              attualmente non soddisfi tutti i criteri specifici richiesti per il nostro network premium.</p>
              
              <div class="improvement-box">
                <h4 style="margin-top: 0; color: #0369a1;">💡 Come migliorare per una futura candidatura:</h4>
                <ul style="color: #0369a1; margin-bottom: 0;">
                  <li>Ottieni certificazioni aggiuntive riconosciute (CONI, FIPE, NASM)</li>
                  <li>Accumula più esperienza pratica con clienti</li>
                  <li>Sviluppa una presenza online professionale più forte</li>
                  <li>Crea un portfolio di risultati ottenuti con i clienti</li>
                  <li>Partecipa a corsi di aggiornamento e specializzazione</li>
                </ul>
              </div>
              
              <h3>🚀 Opportunità Alternative</h3>
              <p>Nel frattempo, ti invitiamo a:</p>
              <ul>
                <li>Seguire i nostri <strong>tutorial gratuiti</strong> per migliorare le tue competenze</li>
                <li>Partecipare ai nostri <strong>webinar formativi</strong> per Personal Trainer</li>
                <li>Unirti alla nostra <strong>community aperta</strong> su social media</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://best-trainer-mvp.vercel.app/tutorial-esercizi" class="button">
                  📚 Accedi ai Tutorial Gratuiti
                </a>
              </div>
              
              <h3>🔄 Riapplicare in Futuro</h3>
              <p>Potrai inviare una nuova candidatura tra <strong>6 mesi</strong>. 
              Ti incoraggiamo a utilizzare questo tempo per rafforzare le aree indicate sopra.</p>
              
              <p>Apprezziamo il tuo interesse per Best-Trainer e ti auguriamo il meglio nel tuo percorso professionale!</p>
              
              <p>
                Il Team Best-Trainer<br>
                <small>Per domande: support@best-trainer.com</small>
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Best-Trainer. Tutti i diritti riservati.</p>
              <p>Questa decisione è finale per questo periodo di valutazione.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Aggiornamento Candidatura - Best-Trainer PT Network
      
      Ciao ${candidateData.nome},
      
      Dopo attenta valutazione, al momento non possiamo procedere con l'approvazione della tua candidatura.
      
      Motivo: ${reason}
      
      Potrai riapplicare tra 6 mesi. Nel frattempo, ti invitiamo a rafforzare le tue competenze attraverso i nostri tutorial gratuiti.
      
      Grazie per l'interesse,
      Il Team Best-Trainer
    `
  }),

  // Template richiesta informazioni aggiuntive
  requestMoreInfo: (candidateData, requestedInfo) => ({
    subject: '📋 Richiesta informazioni aggiuntive - Best-Trainer PT Network',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Richiesta Informazioni</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
            .button { background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; }
            .info-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; }
            .urgent-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Richiesta Informazioni</h1>
              <p>La tua candidatura è in revisione</p>
            </div>
            
            <div class="content">
              <p>Ciao <strong>${candidateData.nome}</strong>,</p>
              
              <p>Grazie per la tua candidatura al Best-Trainer PT Network. Il nostro team di valutazione 
              sta esaminando il tuo profilo e abbiamo bisogno di alcune <strong>informazioni aggiuntive</strong> 
              per completare la revisione.</p>
              
              <div class="info-box">
                <h4 style="margin-top: 0; color: #0369a1;">📝 Informazioni richieste:</h4>
                <p style="margin-bottom: 0; color: #0369a1;">${requestedInfo}</p>
              </div>
              
              <div class="urgent-box">
                <h4 style="margin-top: 0; color: #92400e;">⏰ Tempo per rispondere:</h4>
                <p style="margin-bottom: 0; color: #92400e;">
                  Hai <strong>5 giorni lavorativi</strong> per fornire le informazioni richieste. 
                  Dopo questo periodo, la candidatura potrebbe essere chiusa automaticamente.
                </p>
              </div>
              
              <h3>📧 Come rispondere:</h3>
              <ol>
                <li><strong>Rispondi direttamente a questa email</strong> con le informazioni richieste</li>
                <li><strong>Allega i documenti necessari</strong> in formato PDF o immagine</li>
                <li><strong>Includi il tuo ID candidatura</strong>: ${candidateData.applicationId}</li>
              </ol>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:support@best-trainer.com?subject=Risposta candidatura ${candidateData.applicationId}" class="button">
                  📧 Rispondi via Email
                </a>
              </div>
              
              <p>Apprezziamo la tua collaborazione e non vediamo l'ora di ricevere le informazioni richieste!</p>
              
              <p>
                Il Team Best-Trainer<br>
                <small>ID Candidatura: ${candidateData.applicationId}</small>
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Best-Trainer. Tutti i diritti riservati.</p>
              <p>Se hai problemi a rispondere, contattaci su WhatsApp: +39 123 456 7890</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Richiesta Informazioni Aggiuntive - Best-Trainer PT Network
      
      Ciao ${candidateData.nome},
      
      Abbiamo bisogno di informazioni aggiuntive per completare la revisione della tua candidatura:
      
      ${requestedInfo}
      
      Hai 5 giorni per rispondere a questa email con le informazioni richieste.
      
      ID Candidatura: ${candidateData.applicationId}
      
      Grazie,
      Il Team Best-Trainer
    `
  })
};

// Funzione helper per inviare email (simulata)
export const sendEmail = async (to, template) => {
  console.log('📧 Sending email to:', to);
  console.log('📋 Subject:', template.subject);
  console.log('✉️ Content preview:', template.text.substring(0, 100) + '...');
  
  // Simula invio email (in produzione usare servizio come SendGrid, AWS SES, etc.)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Email sent successfully!');
      resolve({ success: true, messageId: 'msg_' + Date.now() });
    }, 1000);
  });
};

// Funzione per inviare notifiche email basate sullo status
export const sendStatusNotification = async (candidateData, newStatus, additionalInfo = '') => {
  let template;
  
  switch (newStatus) {
    case 'received':
      template = EmailTemplates.applicationReceived(candidateData);
      break;
    case 'approved':
      template = EmailTemplates.applicationApproved(candidateData);
      break;
    case 'rejected':
      template = EmailTemplates.applicationRejected(candidateData, additionalInfo);
      break;
    case 'more-info-needed':
      template = EmailTemplates.requestMoreInfo(candidateData, additionalInfo);
      break;
    default:
      console.error('Unknown status for email notification:', newStatus);
      return;
  }
  
  return await sendEmail(candidateData.email, template);
};