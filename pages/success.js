import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  CheckCircle, 
  Download, 
  User, 
  Calendar,
  Euro,
  ArrowRight,
  Mail,
  FileText,
  Star,
  Home,
  Loader2,
  MessageCircle,
  Shield
} from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session_id) {
      fetchPaymentDetails();
    }
  }, [session_id]);

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`/api/get-payment-details?session_id=${session_id}`);
      const data = await response.json();
      
      if (response.ok) {
        setPaymentData(data);
      } else {
        setError(data.message || 'Errore nel recuperare i dettagli del pagamento');
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
      setError('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Caricamento dettagli pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Errore</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pagamento Completato!
          </h1>
          <p className="text-lg text-gray-600">
            Grazie per il tuo acquisto. Il programma è ora disponibile.
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">Dettagli Acquisto</h2>
                <p className="text-sm opacity-90">
                  {session_id && `ID Sessione: ${session_id.substring(0, 20)}...`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Importo Pagato</p>
                <p className="text-2xl font-bold">
                  €{paymentData?.amount || '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Program Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Programma Acquistato
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {paymentData?.programTitle || 'Programma Fitness'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Personal Trainer: {paymentData?.ptName || 'Trainer'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">Programma Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Euro className="w-5 h-5 mr-2" />
                Riepilogo Pagamento
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prezzo programma:</span>
                  <span className="font-medium">€{paymentData?.amount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Commissione piattaforma:</span>
                  <span>€{paymentData?.platformFee || '0.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Al Personal Trainer:</span>
                  <span>€{paymentData?.ptAmount || '0.00'}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data acquisto:</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Prossimi Passi</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Controlla la tua email</p>
                    <p className="text-sm text-gray-600">Riceverai i dettagli del programma e le istruzioni per iniziare</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Accedi al tuo programma</p>
                    <p className="text-sm text-gray-600">Vai alla dashboard per visualizzare e scaricare i contenuti</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Contatta il tuo PT</p>
                    <p className="text-sm text-gray-600">Inizia il supporto personalizzato con il tuo Personal Trainer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            href="/user/dashboard"
            className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <User className="w-4 h-4 mr-2" />
            Vai alla Dashboard
          </Link>
          
          <button 
            className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            onClick={() => alert('Funzionalità download in sviluppo')}
          >
            <Download className="w-4 h-4 mr-2" />
            Scarica Programma
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            onClick={() => alert('Chat con PT in sviluppo')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contatta PT
          </button>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Hai bisogno di aiuto?</h3>
          <p className="text-gray-600 mb-4">
            Il nostro team di supporto è sempre disponibile per assisterti
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a 
              href="mailto:support@best-trainer.it" 
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              support@best-trainer.it
            </a>
            <span className="hidden sm:block text-gray-300">|</span>
            <Link 
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              Torna alla Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Grazie per aver scelto Best-Trainer! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}