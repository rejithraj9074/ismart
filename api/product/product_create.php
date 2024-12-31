<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

if($data->ProductName == ""){
    echo json_encode(array('message'=>'productname can not be empty'));

}
else{

 $item = new item($db);
 

 if($item->create($data->ProductName, $data->CategoryId, $data->SubCategoryId, $data->MfgDate, $data->ExpDate, $data->BatchNo, $data->BuyPrice, $data->SellPrice, $data->Discount, $data->QtyTypeId, $data->Qty, $data->MinQty)){
    echo json_encode(array('message'=>'item added', 'status'=>true));
 }
 else{
    echo json_encode(array('message'=>'item not added'));
 }
}

?>