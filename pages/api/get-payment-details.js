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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    // Recupera sessione da Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Trova la transazione corrispondente in Airtable
    const transactionResponse = await airtableRequest(
      `transactions?filterByFormula={stripe_session_id}="${session_id}"`
    );

    if (!transactionResponse.records || transactionResponse.records.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const transactionRecord = transactionResponse.records[0];
    const transactionData = transactionRecord.fields;

    // Recupera informazioni aggiuntive se necessario
    let programTitle = 'Programma Fitness';
    let ptName = 'Personal Trainer';

    // Estrai informazioni dai metadati Stripe o dalla transazione
    if (session.metadata) {
      programTitle = session.line_items?.data?.[0]?.description || transactionData.notes || programTitle;
    }

    // Puoi anche fare query aggiuntive per recuperare info PT/programma
    // Ad esempio, se hai tabelle separate per PT e programmi
    try {
      // Query per informazioni PT (esempio)
      if (transactionData.pt_id) {
        // const ptResponse = await airtableRequest(`personal_trainers?filterByFormula={id}="${transactionData.pt_id}"`);
        // if (ptResponse.records && ptResponse.records.length > 0) {
        //   ptName = ptResponse.records[0].fields.name || ptName;
        // }
      }
    } catch (error) {
      console.log('Could not fetch additional PT info:', error.message);
    }

    // Prepara dati di risposta
    const paymentDetails = {
      sessionId: session.id,
      transactionId: transactionData.id,
      amount: parseFloat(transactionData.amount),
      platformFee: parseFloat(transactionData.platform_fee),
      ptAmount: parseFloat(transactionData.pt_amount),
      status: transactionData.status,
      createdAt: transactionData.created_at,
      completedAt: transactionData.completed_at,
      programId: transactionData.program_id,
      programTitle: programTitle,
      ptId: transactionData.pt_id,
      ptName: ptName,
      userId: transactionData.user_id,
      paymentStatus: session.payment_status,
      paymentIntentId: transactionData.stripe_payment_intent_id,
      customerEmail: session.customer_details?.email,
      notes: transactionData.notes
    };

    // Verifica che il pagamento sia completato
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ 
        message: 'Payment not completed',
        status: session.payment_status,
        details: paymentDetails
      });
    }

    // Log per debug
    console.log('Payment details retrieved:', {
      sessionId: session.id,
      transactionId: transactionData.id,
      amount: transactionData.amount,
      status: transactionData.status
    });

    res.json(paymentDetails);

  } catch (error) {
    console.error('Error retrieving payment details:', error);
    
    // Gestione errori specifici
    if (error.type === 'stripe_invalid_request_error') {
      return res.status(404).json({ message: 'Invalid session ID' });
    }
    
    if (error.message.includes('Airtable')) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}