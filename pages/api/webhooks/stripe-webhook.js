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

// Disable body parsing per webhook signature verification
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Per Next.js 14+, il body è già disponibile come stringa
    const rawBody = JSON.stringify(req.body);
    
    // Verifica signature del webhook
    event = stripe.webhooks.constructEvent(
      rawBody, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Webhook event received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
        
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
        
      case 'transfer.created':
        await handleTransferCreated(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(session) {
  console.log('Processing checkout session completed:', session.id);
  
  try {
    // Trova la transazione tramite stripe_session_id
    const transactionResponse = await airtableRequest(
      `transactions?filterByFormula={stripe_session_id}="${session.id}"`
    );
    
    if (!transactionResponse.records || transactionResponse.records.length === 0) {
      throw new Error(`Transaction not found for session ${session.id}`);
    }
    
    const transactionRecord = transactionResponse.records[0];
    
    // Aggiorna transazione come completata
    const updateData = {
      records: [
        {
          id: transactionRecord.id,
          fields: {
            status: 'completed',
            completed_at: new Date().toISOString(),
            stripe_payment_intent_id: session.payment_intent
          }
        }
      ]
    };
    
    await airtableRequest('transactions', 'PATCH', updateData);
    
    // Aggiorna wallet del PT: sposta da pending a available
    const ptId = transactionRecord.fields.pt_id;
    const ptAmount = parseFloat(transactionRecord.fields.pt_amount);
    
    await updatePTWallet(ptId, ptAmount, 'add_to_available');
    
    console.log(`Transaction completed: ${transactionRecord.fields.id}`);
    
  } catch (error) {
    console.error('Error processing checkout session completed:', error);
    throw error;
  }
}

// Handle successful payment intent
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Processing payment intent succeeded:', paymentIntent.id);
  
  try {
    // Verifica che la transazione sia già stata processata
    const transactionResponse = await airtableRequest(
      `transactions?filterByFormula={stripe_payment_intent_id}="${paymentIntent.id}"`
    );
    
    if (transactionResponse.records && transactionResponse.records.length > 0) {
      console.log(`Payment confirmed for transaction: ${transactionResponse.records[0].fields.id}`);
    }
    
  } catch (error) {
    console.error('Error processing payment intent succeeded:', error);
  }
}

// Handle failed payment intent
async function handlePaymentIntentFailed(paymentIntent) {
  console.log('Processing payment intent failed:', paymentIntent.id);
  
  try {
    // Trova la transazione tramite payment intent
    const transactionResponse = await airtableRequest(
      `transactions?filterByFormula={stripe_payment_intent_id}="${paymentIntent.id}"`
    );
    
    if (transactionResponse.records && transactionResponse.records.length > 0) {
      const transactionRecord = transactionResponse.records[0];
      
      // Aggiorna transazione come fallita
      const updateData = {
        records: [
          {
            id: transactionRecord.id,
            fields: {
              status: 'failed',
              completed_at: new Date().toISOString(),
              notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`
            }
          }
        ]
      };
      
      await airtableRequest('transactions', 'PATCH', updateData);
      
      // Rimuovi l'importo pending dal wallet del PT
      const ptId = transactionRecord.fields.pt_id;
      const ptAmount = parseFloat(transactionRecord.fields.pt_amount);
      
      await updatePTWallet(ptId, ptAmount, 'remove_from_pending');
      
      console.log(`Transaction failed: ${transactionRecord.fields.id}`);
    }
    
  } catch (error) {
    console.error('Error processing payment intent failed:', error);
  }
}

// Handle transfer created (quando i soldi vanno al PT)
async function handleTransferCreated(transfer) {
  console.log('Processing transfer created:', transfer.id);
  
  try {
    // Registra il payout nella tabella payouts
    const payoutData = {
      records: [
        {
          fields: {
            id: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            pt_id: transfer.metadata?.ptId || 'unknown',
            stripe_transfer_id: transfer.id,
            amount: transfer.amount / 100, // Converti da centesimi
            status: 'completed',
            created_at: new Date().toISOString(),
            completed_at: new Date().toISOString()
          }
        }
      ]
    };
    
    await airtableRequest('payouts', 'POST', payoutData);
    
    console.log(`Payout recorded: ${transfer.id}`);
    
  } catch (error) {
    console.error('Error processing transfer created:', error);
  }
}

// Helper function to update PT wallet
async function updatePTWallet(ptId, amount, operation) {
  try {
    // Trova il wallet del PT
    const walletResponse = await airtableRequest(`pt_wallets?filterByFormula={pt_id}="${ptId}"`);
    
    if (!walletResponse.records || walletResponse.records.length === 0) {
      throw new Error(`PT wallet not found for PT: ${ptId}`);
    }
    
    const walletRecord = walletResponse.records[0];
    const currentAvailable = parseFloat(walletRecord.fields.available_balance || 0);
    const currentPending = parseFloat(walletRecord.fields.pending_balance || 0);
    const currentTotal = parseFloat(walletRecord.fields.total_earned || 0);
    
    let newAvailable = currentAvailable;
    let newPending = currentPending;
    let newTotal = currentTotal;
    
    switch (operation) {
      case 'add_to_available':
        // Sposta da pending a available
        newAvailable = currentAvailable + amount;
        newPending = Math.max(0, currentPending - amount);
        newTotal = currentTotal + amount;
        break;
        
      case 'remove_from_pending':
        // Rimuovi da pending (per pagamenti falliti)
        newPending = Math.max(0, currentPending - amount);
        break;
        
      default:
        throw new Error(`Unknown wallet operation: ${operation}`);
    }
    
    // Aggiorna il wallet
    const updateData = {
      records: [
        {
          id: walletRecord.id,
          fields: {
            available_balance: newAvailable,
            pending_balance: newPending,
            total_earned: newTotal,
            updated_at: new Date().toISOString()
          }
        }
      ]
    };
    
    await airtableRequest('pt_wallets', 'PATCH', updateData);
    
    console.log(`PT wallet updated for ${ptId}:`, {
      available: newAvailable,
      pending: newPending,
      total: newTotal
    });
    
  } catch (error) {
    console.error('Error updating PT wallet:', error);
    throw error;
  }
}