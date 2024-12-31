<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');


$data = json_decode(file_get_contents("php://input"));

$feature = new feature($db);

$feature->get($data->id);
if($feature->id > 0)
{
  $feature_data = array(
      'id'   => $feature->id,
      'name' => $feature->name
  );
  print_r(json_encode($feature_data));
}
else{

    echo json_encode(array('message' => 'no features'));   
}

?>