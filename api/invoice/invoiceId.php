<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$invoice = new invoice($db);

 if($invoice->invoiceid())
 {
    $invoice_data = array(
        'id'   => $invoice->id
    );
    print_r(json_encode($invoice_data));
 }    
 

?>