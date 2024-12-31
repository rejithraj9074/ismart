<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$item = new item($db);

if($item->update($data->ItemId, $data->ProductName, $data->CategoryId, $data->SubCategoryId, $data->QtyTypeId, $data->Details)){
    echo json_encode(array('message'=>'updated', 'status'=>true));
}
else{
    echo json_encode(array('message'=>'not updated', 'status'=>false));
}
?>