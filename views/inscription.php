<!DOCTYPE html>
<html lang="fr">
<head>
    <?php require_once('views/include/head.php'); ?>
    <title>Inscription - Meet Pi</title>
</head>
<body>

<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header">
                    <h4 class="mb-0">Créer votre profil Meet Pi</h4>
                </div>
                <div class="card-body">
                    <div id="pi-user-status" class="alert alert-info text-center">
                        Authentification Pi en cours...
                    </div>

                    <form action="index.php?action=save_inscription" method="POST" id="registrationForm">
                        
                        <input type="hidden" id="pi_username" name="pi_username">
                        <input type="hidden" id="pi_uid" name="pi_uid">

                        <div class="form-group">
                            <label for="prenom">Prénom</label>
                            <input type="text" class="form-control" id="prenom" name="prenom" required placeholder="Votre prénom">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="sexe">Je suis</label>
                                <select id="sexe" name="sexe" class="form-control" required>
                                    <option value="" selected disabled>Choisir...</option>
                                    <option value="homme">Un Homme</option>
                                    <option value="femme">Une Femme</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="age">Âge</label>
                                <input type="date" class="form-control" id="date_naissance" name="date_naissance" required>
                                <small class="form-text text-muted">Vous devez avoir au moins 18 ans.</small>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="genre_recherche">Je recherche</label>
                            <select id="genre_recherche" name="genre_recherche" class="form-control" required>
                                <option value="" selected disabled>Choisir...</option>
                                <option value="homme">Un Homme</option>
                                <option value="femme">Une Femme</option>
                                <option value="tous">Tout le monde</option>
                            </select>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="region">Région</label>
                                <input type="text" class="form-control" id="region" name="region" placeholder="Ex: Alsace" required>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="pays">Pays</label>
                                <input type="text" class="form-control" id="pays" name="pays" placeholder="Ex: France" required>
                            </div>
                        </div>

                        <hr>
                        <button type="submit" id="btn-submit" class="btn btn-success btn-lg btn-block" disabled>
                            Valider l'inscription
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!--<script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>
    // Script inline simplifié pour gérer l'auth sur la page d'inscription
    // Idéalement, déplacez ceci dans views/js/main.js en vérifiant la page active
    const isSandbox = window.location.hostname.includes('sandbox.minepi.com');
    Pi.init({ version: '2.0', sandbox: isSandbox });

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
            document.getElementById('pi-user-status').textContent = "Erreur d'authentification Pi.";
        }
    }

    function onIncompletePaymentFound(payment) {
        // Gestion des paiements incomplets si nécessaire ici
    }

    authPi();
</script>-->

</body>
</html>