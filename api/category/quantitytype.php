<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$category = new category($db);

$result = $category->quantitytype();

$num = $result->rowcount();

if($num > 0){
    //$role_arr = array();
    $qtytype_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $qtytype_data = array(
           'id'   => $Id,
           'name' => $Symbol
        );

        array_push($qtytype_arr['data'], $qtytype_data);
    }
    echo json_encode(array('data' => $qtytype_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'nothing to display'));
}


?>