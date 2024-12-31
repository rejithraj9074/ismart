<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$feature = new feature($db);

$result = $feature->read();

$num = $result->rowcount();

if($num > 0){
    //$feature_arr = array();
    $feature_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $feature_data = array(
           'id'   => $Id,
           'name' => $Name
        );

        array_push($feature_arr['data'], $feature_data);
    }
    echo json_encode($feature_arr['data']);

}
else{
    echo json_encode(array('message' => 'no features'));
}

?>