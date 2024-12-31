<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

 $invoice = new invoice($db);

 if($invoice->create($data->TotalAmount, $data->TotalDiscount, $data->InvoiceNumber, $data->InvoicedDate, $data->Details)){
    echo json_encode(array('message'=>'invoice added', 'status'=>true));
 }
 else{
    echo json_encode(array('message'=>'invoice not added', 'status'=>false));
 }


?>