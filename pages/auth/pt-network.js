import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Lock, 
  ArrowRight, 
  Shield, 
  Users,
  Trophy,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function PTNetworkLogin() {
  const router = useRouter();
  const [codiceAccesso, setCodiceAccesso] = useState('');
  const [errore, setErrore] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrore('');

    // Simula una chiamata API
    setTimeout(() => {
      if (codiceAccesso.toLowerCase() === 'admin') {
        // Successo - redirect alla dashboard PT
        router.push('/dashboard');
      } else {
        setErrore('Codice di accesso non valido. Verifica di aver inserito il codice corretto.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header semplice */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Best-Trainer <span className="text-blue-400">BETA</span>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              ← Torna alla Homepage
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {/* Header della pagina */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              PT Network
            </h1>
            <p className="text-gray-600">
              Area riservata ai Personal Trainer del network Best-Trainer
            </p>
          </div>

          {/* Card principale */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Codice di Accesso PT *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={codiceAccesso}
                    onChange={(e) => setCodiceAccesso(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Inserisci il tuo codice"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Il codice ti è stato fornito via email dal team Best-Trainer
                </p>
              </div>

              {/* Messaggio di errore */}
              {errore && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-red-800">{errore}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !codiceAccesso}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                  isLoading || !codiceAccesso
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifica in corso...
                  </>
                ) : (
                  <>
                    Accedi al Network
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Info non hai codice */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Non hai ancora ricevuto il codice di accesso?
                </p>
                <p className="text-xs text-gray-500">
                  Contatta il team Best-Trainer per richiedere l'invito al network
                </p>
              </div>
            </div>
          </div>

          {/* Benefici del Network */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Vantaggi del PT Network
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Dashboard dedicata per gestire i tuoi programmi</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Accesso alla piattaforma di vendita</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Community esclusiva di professionisti</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Visibilità garantita sulla piattaforma</span>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              L'accesso al PT Network è riservato esclusivamente ai Personal Trainer 
              selezionati e invitati dal team Best-Trainer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}