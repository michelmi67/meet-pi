// main.js
document.addEventListener('DOMContentLoaded', async () => {
  const status = document.getElementById('status');
  const logDiv = document.getElementById('log');
  const payBtn = document.getElementById('payBtn');

  function log(msg) {
    const p = document.createElement('p'); p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logDiv.appendChild(p); logDiv.scrollTop = logDiv.scrollHeight;
  }

// Script inline simplifié pour gérer l'auth 

    async function authPi() {
      try {
            const scopes = ['username'];
            const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
            
            // Remplissage des champs cachés et de l'interface
            document.getElementById('pi_username').value = auth.user.username;
            document.getElementById('pi_uid').value = auth.user.uid;
            
            document.getElementById('pi-user-status').className = 'alert alert-success';
            document.getElementById('pi-user-status').textContent = `Authentifié en tant que : @${auth.user.username}`;
            
            // Activer le bouton
            document.getElementById('btn-submit').disabled = false;
            
            } catch (err) {
                console.error(err);
                document.getElementById('pi-user-status').className = 'alert alert-danger';
                // Détail ajouté : rappeler à l'utilisateur d'utiliser le Pi Browser
                document.getElementById('pi-user-status').textContent = "Erreur d'authentification Pi. Assurez-vous d'être dans le Pi Browser.";
            }
    }

  /*// Paiement
  payBtn.addEventListener('click', () => {
    payBtn.disabled = true; status.textContent = 'Processing payment…';
    log('Initiating payment…');
    Pi.createPayment({ amount:0.1, memo:'Test sub', metadata:{purpose:'sub'} }, {
      onReadyForServerApproval: id => {
        log(`onReadyForServerApproval ${id}`);
        fetch(`${API_URL}/api/approve-payment`, {
          method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ paymentId:id })
        }).then(res=>log(`approved ${res.status}`));
      },
      onReadyForServerCompletion: (id,txid) => {
        log(`onReadyForServerCompletion ${id}, txid ${txid}`);
        fetch(`${API_URL}/api/complete-payment`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ paymentId:id, txid })
        })
        .then(res=>res.json())
        .then(json=>{
          log(`completion res: ${JSON.stringify(json)}`);
          status.textContent = json.success ? 'Payment successful!' : 'Payment failed';
          if (!json.success) payBtn.disabled = false;
        });
      },
      onCancel: id => { status.textContent='Payment cancelled'; payBtn.disabled=false; log(`Canceled ${id}`); },
      onError: (err,pm)=>(status.textContent='Error', log(`Error ${err.message}`))
    });
  });*/
});