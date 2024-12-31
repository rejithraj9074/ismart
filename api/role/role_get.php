<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');


$data = json_decode(file_get_contents("php://input"));

$roles = new roles($db);

$roles->get($data->id);
if($roles->id > 0)
{
  $roles_data = array(
      'id'   => $roles->id,
      'name' => $roles->name
  );
  print_r(json_encode($roles_data));
}
else{

    echo json_encode(array('message' => 'no roles'));   
}

?>