<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');


$data = json_decode(file_get_contents("php://input"));

$item = new item($db);
$stock = new Stock($db);
$item->get($data->id);
if($item->id > 0)
{
  $result = $stock->list($data->id);
  $num = $result->rowcount();
  $stock_arr['data'] = array();

  if($num > 0){
      //$role_arr = array();
     
      
      while($row = $result->fetch(PDO::FETCH_ASSOC)){
          extract($row);
          $stock_data = array(
            'id' => $Id,
            'quantity'   => $Quantity,
            'minimumQuantityRequired' => $MinimumQuantityRequired,
            'mfgDate' => $MfgDate,
            'expDate' => $ExpDate,
            'batchNo' => $BatchNo,
            'buyingPrice' => $BuyingPrice,
            'sellingPrice' => $SellingPrice,
            'discount' => $Discount,
            'availableStock' => $availableStock
          );

          array_push($stock_arr['data'], $stock_data);
      }
     

  }
  $item_data = array(
      'id'   => $item->id,
      'name' => $item->itemname,
      'catid' => $item->catid,
      'subcatid' => $item->subcatid,
      'qtyid' => $item->quantityTypeId,
      'stock' => $stock_arr['data']
  );
  print_r(json_encode($item_data));
}
else{

    echo json_encode(array('message' => 'invalid id'));   
}

?>