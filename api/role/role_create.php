<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));
if($data->name == ""){
    echo json_encode(array('message'=>'name can not be empty'));

}
else{

 $roles = new roles($db);
 

 if($roles->create($data->name, $data->features)){
    echo json_encode(array('message'=>'role added', 'status'=>true));
 }
 else{
    echo json_encode(array('message'=>'role not added', 'status'=>false));
 }
}

?>