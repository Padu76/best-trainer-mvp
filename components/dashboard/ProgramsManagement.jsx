// File upload handling - VERSIONE CORRETTA
  const handleFileUpload = (type, file) => {
    if (!file) return;

    console.log(`Uploading ${type}:`, file.name, file.type, file.size);
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
      copertina: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
      file: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      video: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/webm']
    };

    if (!allowedTypes[type].includes(file.type)) {
      alert(`Formato file non supportato per ${type}. Formati accettati: ${allowedTypes[type].join(', ')}`);
      setSaveStatus('error');
      return;
    }

    // Gestione upload basata sul tipo
    if (type === 'copertina') {
      // Per le immagini, crea URL preview
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Copertina caricata:', e.target.result.substring(0, 50) + '...');
        setProgramForm(prev => ({ 
          ...prev, 
          copertina: file,
          covertinaPreview: e.target.result
        }));
        setSaveStatus('saved');
      };
      reader.onerror = (error) => {
        console.error('Errore lettura copertina:', error);
        setSaveStatus('error');
      };
      reader.readAsDataURL(file);
      
    } else if (type === 'file') {
      // Per i documenti, salva il file e mostra il nome
      console.log('File documento caricato:', file.name);
      setProgramForm(prev => ({ 
        ...prev, 
        file: file,
        filePreview: file.name
      }));
      setSaveStatus('saved');
      
    } else if (type === 'video') {
      // Per i video, crea URL preview
      const videoURL = URL.createObjectURL(file);
      console.log('Video caricato:', file.name, 'URL:', videoURL);
      setProgramForm(prev => ({ 
        ...prev, 
        video: file,
        videoPreview: videoURL
      }));
      setSaveStatus('saved');
      
      // Cleanup URL quando il componente viene smontato
      return () => URL.revokeObjectURL(videoURL);
    }
  };