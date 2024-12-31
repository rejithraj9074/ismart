<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$user = new user($db);

$result = $user->list();

$num = $result->rowcount();

if($num > 0){
    //$role_arr = array();
    $user_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $user_data = array(
           'id'   => $Id,
           'firstname' => $FirstName,
           'lastname' => $LastName,
           'email' => $Email,
           'phone' => $Mobile
        );

        array_push($user_arr['data'], $user_data);
    }
    echo json_encode($user_arr['data']);

}
else{
    echo json_encode(array('message' => 'no users'));
}


?>