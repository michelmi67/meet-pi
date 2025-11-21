// main.js
document.addEventListener('DOMContentLoaded', async () => {
  const status = document.getElementById('status');
  const logDiv = document.getElementById('log');
  const payBtn = document.getElementById('payBtn');

  function log(msg) {
    const p = document.createElement('p'); p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logDiv.appendChild(p); logDiv.scrollTop = logDiv.scrollHeight;
  }

  // Authentification Pi
  try {
    log('Starting authentication');
    const auth = await Pi.authenticate(['username','wallet_address','payments'], payment => {
      // Sur paiement incomplet, tenter completion
      /*log(`Incomplete payment ${payment.identifier}`);
      fetch(`${API_URL}/api/complete-payment`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction?.txid })
      }).then(r=>log(`complete fetched ${r.status}`));*/
    });
    status.textContent = `Connected: ${auth.user.username}`;
    payBtn.disabled = false;
    log(`Authenticated as ${auth.user.username}`);
  } catch (e) {
    status.textContent = 'Auth failed'; log(`Auth error: ${e.message}`);
    return;
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