<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$roles = new roles($db);

if($roles->update($data->id, $data->name, $data->features)){
    echo json_encode(array('message'=>'updated', 'status'=>true));
}
else{
    echo json_encode(array('message'=>'not updated', 'status'=>false));
}
?>
