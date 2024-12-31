<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$category = new category($db);

$result = $category->read();

$num = $result->rowcount();

if($num > 0){
    //$role_arr = array();
    $category_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $category_data = array(
           'id'   => $Id,
           'name' => $Name
        );

        array_push($category_arr['data'], $category_data);
    }
    echo json_encode(array('data' => $category_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'nothing to display'));
}


?>