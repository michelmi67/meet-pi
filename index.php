<?php

require_once('controller/controller.php');


$controller = new Controller;

if(isset($_GET['action'])):
    switch ($_GET['action']):
    //Page d'acceuil       
    case 'accueil': 
        $controller->accueil();
        break;
    //Page d'inscription    
    case 'inscription':
        $controller->inscription();
        break;    
    endswitch;
else:
    $controller->accueil();
endif;