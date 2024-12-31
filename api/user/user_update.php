<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$user = new user($db);

if($user->update($data->id, $data->firstname, $data->lastname, $data->email, $data->mobile, $data->roles)){
    echo json_encode(array('message'=>'updated', 'status'=>true));
}
else{
    echo json_encode(array('message'=>'not updated', 'status'=>false));
}
?>