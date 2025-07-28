import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Airtable configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

// Helper function to make Airtable requests
async function airtableRequest(table, method = 'GET', data = null) {
  const url = `${AIRTABLE_BASE_URL}/${table}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  if (data && (method === 'POST' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Airtable error: ${error.error?.message || response.statusText}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { programId, ptId, userId, amount, programTitle, ptName } = req.body;

  // Validazione input
  if (!programId || !ptId || !userId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    // Calcola commissioni
    const platformFeePercent = 0.25; // 25%
    const platformFee = Math.round(amount * platformFeePercent * 100); // in centesimi
    const totalAmount = Math.round(amount * 100); // in centesimi
    const ptAmount = (totalAmount - platformFee) / 100; // convertito in euro per il DB

    // Verifica se il PT ha un account Stripe Connect (simulato per ora)
    // In futuro, recupererai questo da Airtable pt_wallets
    let ptStripeAccountId = null;
    
    try {
      // Cerca il PT nella tabella pt_wallets
      const ptWalletResponse = await airtableRequest(`pt_wallets?filterByFormula={pt_id}="${ptId}"`);
      
      if (ptWalletResponse.records && ptWalletResponse.records.length > 0) {
        ptStripeAccountId = ptWalletResponse.records[0].fields.stripe_account_id;
      }
    } catch (error) {
      console.log('PT wallet not found, creating mock data');
      // Per ora, usiamo un account di test
      ptStripeAccountId = 'acct_test123'; // In produzione, dovrai gestire l'onboarding Stripe Connect
    }

    // Genera un ID univoco per la transazione
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Crea Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: programTitle || `Programma ${programId}`,
              description: `Personal Trainer: ${ptName || ptId}`,
              images: [], // Potresti aggiungere l'immagine del programma
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      // Split payment configuration (commentato per ora - richiede Stripe Connect configurato)
      /*
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: ptStripeAccountId,
        },
        metadata: {
          programId,
          ptId,
          userId,
          transactionId,
          type: 'program_purchase'
        }
      },
      */
      success_url: `${process.env.NEXTAUTH_URL || 'https://best-trainer-mvp.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'https://best-trainer-mvp.vercel.app'}/programmi/${programId}`,
      metadata: {
        programId,
        ptId,
        userId,
        transactionId,
        type: 'program_purchase'
      }
    });

    // Salva transazione pendente in Airtable
    const transactionData = {
      records: [
        {
          fields: {
            id: transactionId,
            user_id: userId,
            pt_id: ptId,
            program_id: programId,
            amount: amount,
            platform_fee: platformFee / 100, // convertito in euro
            pt_amount: ptAmount,
            stripe_payment_intent_id: '', // Sarà popolato dal webhook
            stripe_session_id: session.id,
            status: 'pending',
            created_at: new Date().toISOString(),
            notes: `${programTitle} - ${ptName}`
          }
        }
      ]
    };

    await airtableRequest('transactions', 'POST', transactionData);

    // Aggiorna o crea il wallet del PT
    try {
      const ptWalletResponse = await airtableRequest(`pt_wallets?filterByFormula={pt_id}="${ptId}"`);
      
      if (ptWalletResponse.records && ptWalletResponse.records.length > 0) {
        // Aggiorna wallet esistente - incrementa pending_balance
        const existingRecord = ptWalletResponse.records[0];
        const currentPendingBalance = parseFloat(existingRecord.fields.pending_balance || 0);
        
        const updateData = {
          records: [
            {
              id: existingRecord.id,
              fields: {
                pending_balance: currentPendingBalance + ptAmount,
                updated_at: new Date().toISOString()
              }
            }
          ]
        };
        
        await airtableRequest('pt_wallets', 'PATCH', updateData);
      } else {
        // Crea nuovo wallet per il PT
        const walletData = {
          records: [
            {
              fields: {
                pt_id: ptId,
                available_balance: 0,
                pending_balance: ptAmount,
                total_earned: 0,
                stripe_account_id: ptStripeAccountId,
                updated_at: new Date().toISOString(),
                status: 'active'
              }
            }
          ]
        };
        
        await airtableRequest('pt_wallets', 'POST', walletData);
      }
    } catch (walletError) {
      console.error('Error updating PT wallet:', walletError);
      // Non blocchiamo il checkout per questo errore
    }

    // Log per debug
    console.log('Checkout session created:', {
      sessionId: session.id,
      transactionId,
      amount: amount,
      platformFee: platformFee / 100,
      ptAmount
    });

    res.json({ 
      sessionId: session.id,
      transactionId: transactionId
    });

  } catch (error) {
    console.error('Checkout session error:', error);
    
    // Gestione errori specifici
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ message: 'Errore nella carta di credito' });
    }
    
    if (error.message.includes('Airtable')) {
      return res.status(500).json({ message: 'Errore nel database' });
    }

    res.status(500).json({ 
      message: 'Errore interno del server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}