<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$invoice = new invoice($db);


if($invoice->delete($data->id))
{
    echo json_encode(array('message'=>'deleted', 'status'=>true));
}
else
{
    echo json_encode(array('message'=>'invalid id', 'status'=>false));
}

?>