<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$dashboard = new dashboard($db);

$dashboard->dashdetails();

$result = $dashboard->topSelling();

$num = $result->rowcount();

if($num > 0)
{
    $topSellingDetails_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $topSellingDetails_data = array(
        'name' => $Name,
        'qty' => $Quantity,
        'profit' => $Profit
        );

        array_push($topSellingDetails_arr['data'], $topSellingDetails_data);
    }
  

}

$result1 = $dashboard->topProfitable();

$num1 = $result1->rowcount();

if($num1 > 0)
{
    $topProfitableDetails_arr['data'] = array();
    
    while($row = $result1->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $topProfitableDetails_data = array(
        'name' => $Name,
        'qty' => $Quantity,
        'profit' => $Profit
        );

        array_push($topProfitableDetails_arr['data'], $topProfitableDetails_data);
    }
  

}

    $dashboard_data = array(
        'sales'   => $dashboard->sales,
        'orders'   => $dashboard->orders,
        'profit'   => $dashboard->profit,
        'invValue'   => $dashboard->inventoryValue,
        'topSelling' => $topSellingDetails_arr['data'],
        'topProfitable' => $topProfitableDetails_arr['data']
    );
    print_r(json_encode($dashboard_data));


?>