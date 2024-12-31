<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));
if($data->name == ""){
    echo json_encode(array('message'=>'name can not be empty'));

}
else{

 $feature = new feature($db);

 if($feature->create($data->name)){
    echo json_encode(array('message'=>'feature added', 'status'=>true));
 }
 else{
    echo json_encode(array('message'=>'feature not added', 'status'=>false));
 }
}

?>
