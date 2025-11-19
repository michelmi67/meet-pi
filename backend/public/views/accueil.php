<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Meet‑Pi Dating App</title>
  <script src="https://sdk.minepi.com/pi-sdk.js"></script>
  <script>
    // Initialise le SDK Pi : sandbox=true en dev (Netlify branch test)
    const isSandbox = window.location.hostname.includes('sandbox.minepi.com');
    Pi.init({ version: '2.0', sandbox: isSandbox });

    // URL du backend
    window.API_URL = isSandbox
      ? '6875218901094e00081caf6e--meet-pi.netlify.app'
      : 'https://pi-backend-76hz.onrender.com';
  </script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="status">Authenticating…</div>
  <div id="log" style="max-height:200px; overflow:auto; border:1px solid #ccc; padding:8px; margin:8px;"></div>
  <button id="payBtn" disabled>Pay with Pi</button>
  <script src="../js/main.js"></script>
</body>
</html>