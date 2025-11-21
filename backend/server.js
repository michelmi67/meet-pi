// server.js
require('dotenv').config({ path: __dirname + '/.env' }); // Charger les variables depuis .env
const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch').default;

const app = express();
app.use(express.json());

// Configuration CORS : autorise Netlify, Pi Wallet et sandbox Pi
app.use(cors({
  origin: [
    'https://meet-pi.free.nf',    // Front prod
    'https://wallet.pinet.com',        // Pi Wallet
    'https://sandbox.minepi.com'       // Sandbox
  ]
}));

// Base URL de l'API Pi (testnet ou mainnet)
const PI_API_BASE_URL = process.env.PI_API_BASE_URL;

// --- AJOUTER CETTE LIGNE TEMPORAIRE ---
console.log('API Pi URL utilisée:', PI_API_BASE_URL);

// Clé API serveur Pi
const API_KEY = process.env.PI_API_KEY;
if (!API_KEY) {
  console.error('🛑 ERREUR : PI_API_KEY manquante');
  process.exit(1);
}

// Header d'authentification réutilisable
const headers = { Authorization: `Key ${API_KEY}` };

// Approve-payment
app.post('/api/approve-payment', async (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({ success: false, error: 'paymentId manquant' });
  try {
    const resp = await fetch(`${PI_API_BASE_URL}/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({ paymentId })
    });
    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); } catch {
      return res.status(502).json({ success: false, error: 'Réponse Pi non-JSON' });
    }
    if (!resp.ok || !data.approved) {
      return res.status(400).json({ success: false, error: data.error || 'Échec approval' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Complete-payment
app.post('/api/complete-payment', async (req, res) => {
  const { paymentId, txid } = req.body;
  if (!paymentId || !txid) return res.status(400).json({ success: false, error: 'paymentId ou txid manquant' });
  try {
    const resp = await fetch(`${PI_API_BASE_URL}/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify({ paymentId, txid })
    });
    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); } catch {
      return res.status(502).json({ success: false, error: 'Réponse Pi non-JSON' });
    }
    if (!resp.ok || !data.completed) {
      return res.status(400).json({ success: false, error: data.error || 'Échec completion' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Complete error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route de bienvenue pour la racine
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Meet-Pi API is running. Use /api/approve-payment or /api/complete-payment' });
});

// 404
app.use((req, res) => res.status(404).json({ success: false, error: 'Route introuvable' }));

// Error handler
app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({ success: false, error: 'Erreur interne serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));