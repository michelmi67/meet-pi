<?php

require_once('controller/controller.php');


$controller = new Controller;

if(isset($_GET['action'])):
    switch ($_GET['action']):   
    case 'accueil': 
        $controller->accueil();
        break;
    endswitch;
else:
    $controller->accueil();
endif;