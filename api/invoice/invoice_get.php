<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$invoice = new invoice($db);

$invoice->getInvoice($data->id);
if($invoice->id >0)
{
    $result = $invoice->getInvoiceDetails($data -> id);

    $num = $result->rowcount();

    if($num > 0)
    {
        $invoiceDetails_arr['data'] = array();
        
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $invoiceDetails_data = array(
            'name' => $ItemName,
            'qty' => $Quantity,
            'dis' => $Discount,
            'price' => $Price,
            'total' => $Total
            );

            array_push($invoiceDetails_arr['data'], $invoiceDetails_data);
        }
      

    }
    $invoice_data = array(
        'id'   => $invoice->id,
        'invNo' => $invoice->invNo,
        'invDate' => $invoice->invDate,
        'totalAmount' => $invoice->totalAmount,
        'totalDiscount' => $invoice->totalDiscount,
        'invoicedetails' => $invoiceDetails_arr['data']
    );
    print_r(json_encode($invoice_data));
}
?>