<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$data = json_decode(file_get_contents("php://input"));

$category = new category($db);

$results = $category->categorysubcategory($data->id);

$num = $results->rowcount();

if($num > 0){
    //$role_arr = array();
    $catsubcat_arr['data'] = array();
    
    while($row = $results->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $catsubcat_data = array(
           'id'   => $Id,
           'name' => $Name
        );

        array_push($catsubcat_arr['data'], $catsubcat_data);
    }
    echo json_encode(array('data' => $catsubcat_arr['data']));

}
else{
    echo json_encode(array('data' => array(),'message' => 'no subcategory'));
}


?>