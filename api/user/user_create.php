<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));
if($data->firstname == ""){
    echo json_encode(array('message'=>'name can not be empty'));

}
else{

 $user = new user($db);
 

 if($user->create($data->firstname, $data->lastname, $data->email, $data->mobile, $data->roles)){
    echo json_encode(array('message'=>'user added', 'status'=>true));
 }
 else{
    echo json_encode(array('message'=>'user not added'));
 }
}

?>