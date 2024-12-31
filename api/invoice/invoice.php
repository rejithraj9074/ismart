<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$invoice = new invoice($db);

$result = $invoice->list($data -> searchkey);

$num = $result->rowcount();

if($num > 0){
    //$role_arr = array();
    $invoice_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $invoice_data = array(
           'id'   => $Id,
           'invoiceNo' => $InvoiceNumber,
           'invoicedDate' => $InvoicedDate,
           'totalDiscount' => $TotalDiscount,
           'totalAmount' => $TotalAmount
        );

        array_push($invoice_arr['data'], $invoice_data);
    }
    echo json_encode(array('data' => $invoice_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'no items'));
}


?>