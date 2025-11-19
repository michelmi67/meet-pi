<?php

class Controller
{
    public function accueil()
    {
        require('views/accueil.php');
    }

    // Ajout de la méthode inscription
    public function inscription()
    {
        require('views/inscription.php');
    }
    
    // Optionnel : Méthode pour traiter le formulaire plus tard
    public function saveInscription()
    {
        // Ici viendra la logique pour sauvegarder dans la base de données (Model)
        // Pour l'instant, on redirige ou on affiche les données brutes
        echo "<pre>"; print_r($_POST); echo "</pre>";
    }
}