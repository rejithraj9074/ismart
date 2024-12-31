<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$feature = new feature($db);

if($feature->update($data->id,$data->name)){
    echo json_encode(array('message'=>'updated', 'status'=>true));
}
else{
    echo json_encode(array('message'=>'not updated', 'status'=>false));
}
?>


