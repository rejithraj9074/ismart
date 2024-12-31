<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$roles = new roles($db);

$results = $roles->rolefeature($data->id);

$num = $results->rowcount();

if($num > 0){
    //$role_arr = array();
    $feature_arr['data'] = array();
    
    while($row = $results->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $feature_data = array(
           'id'   => $Id,
           'name' => $Name
        );

        array_push($feature_arr['data'], $feature_data);
    }
    echo json_encode(array('data' => $feature_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'no features'));
}


?>