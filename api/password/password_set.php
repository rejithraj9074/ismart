<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$password = new password($db);

if($password->setPassword($data->id, $data->Password))
{
    echo json_encode(array('message'=>'password updated ', 'status'=>true));
}
else
{
    echo json_encode(array('message'=>'Incorrect password', 'status'=>false));
}

?>