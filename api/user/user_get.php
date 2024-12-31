<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');


$data = json_decode(file_get_contents("php://input"));

$user = new user($db);

$user->get($data->id);
if($user->id > 0)
{
  $result = $user->getUserDetails($data -> id);

    $num = $result->rowcount();

    $details_arr['data'] = array();

    if($num > 0)
    {
       
        
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $details_data = array(
            'featureid' => $FeatureId,  
            'featurename' => $Name
            );

            array_push($details_arr['data'], $details_data);
        }
      
    }
  $user_data = array(
      'id'   => $user->id,
      'name' => $user->firstname . ' ' . $user->lastname,
      'email' => $user->email,
      'userdetails' => $details_arr['data']
  );
  print_r(json_encode($user_data));
}
else{

    echo json_encode(array('message' => 'no users'));   
}

?>