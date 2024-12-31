<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$item = new item($db);

$result = $item->list($data -> searchkey);

$num = $result->rowcount();

if($num > 0){
    //$role_arr = array();
    $item_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $item_data = array(
           'stockid' => $StockId,
           'id'   => $Id,
           'itemname' => $Name,
           'category' => $Category,
           'subcategory' => $SubCategory,
           'expdate' => $ExpireyDate,
           'qty' => $Quantity,
           'mrp' => $Mrp,
           'dis' => $Discount,
           'price' => $Price,
           'batch' => $BatchNo
        );

        array_push($item_arr['data'], $item_data);
    }
    echo json_encode(array('data' => $item_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'no items'));
}


?>