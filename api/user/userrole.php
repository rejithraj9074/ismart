<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$user = new user($db);

$results = $user->userrole($data->id);

$num = $results->rowcount();

if($num > 0){
    //$role_arr = array();
    $role_arr['data'] = array();
    
    while($row = $results->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $role_data = array(
           'id'   => $Id,
           'name' => $Name
        );

        array_push($role_arr['data'], $role_data);
    }
    echo json_encode(array('data' => $role_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'no roles'));
}


?>