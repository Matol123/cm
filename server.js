const express = require('express');
const app = express();
const stripe = require('stripe')('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'); // zamień na swój klucz tajny

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { payment_method_id } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 6000, // 60 PLN w groszach
      currency: 'pln',
      payment_method: payment_method_id,
      confirmation_method: 'manual',
      confirm: true,
    });

    if (paymentIntent.status === 'requires_action') {
      res.json({ requires_action: true, payment_intent_client_secret: paymentIntent.client_secret });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Serwer działa na porcie 3000'));
