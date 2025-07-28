import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Euro,
  User,
  Star
} from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function ProgramCheckout({ program, pt, user, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Calcola split commissioni (25% platform, 75% PT)
  const platformFeePercent = 0.25;
  const platformFee = program.price * platformFeePercent;
  const ptAmount = program.price - platformFee;

  const handleCheckout = async () => {
    if (!user) {
      setError('Devi essere loggato per acquistare');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Crea checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: program.id,
          ptId: pt.id,
          userId: user.id,
          amount: program.price,
          programTitle: program.title,
          ptName: pt.name
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Errore nella creazione del checkout');
      }

      // Redirect a Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ 
        sessionId: data.sessionId 
      });
      
      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{pt.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span className="text-sm opacity-90">Personal Trainer</span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{program.title}</h2>
        <p className="text-sm opacity-90">{program.description}</p>
      </div>

      {/* Pricing Breakdown */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Euro className="w-4 h-4 mr-2" />
            Dettaglio Prezzo
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Prezzo programma:</span>
              <span className="font-medium">€{program.price.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Commissione piattaforma (25%):</span>
              <span>€{platformFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Al Personal Trainer (75%):</span>
              <span>€{ptAmount.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Totale da pagare:</span>
                <span className="text-lg text-blue-600">€{program.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Cosa ricevi:</h4>
          <div className="space-y-2">
            {[
              'Accesso immediato al programma',
              'Supporto del Personal Trainer',
              'Schede di allenamento dettagliate',
              'Aggiornamenti gratuiti'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading || !user}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Elaborazione...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Acquista Ora - €{program.price.toFixed(2)}</span>
            </>
          )}
        </button>

        {/* Login Required Message */}
        {!user && (
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              <a href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Accedi
              </a>
              {' '}per procedere con l'acquisto
            </p>
          </div>
        )}

        {/* Security Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Pagamento sicuro</span>
            </div>
            <div className="flex items-center space-x-1">
              <CreditCard className="w-3 h-3" />
              <span>Stripe</span>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            💳 Carta, Google Pay, Apple Pay supportati
          </p>
        </div>
      </div>
    </div>
  );
}