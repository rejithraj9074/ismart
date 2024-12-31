<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');


$data = json_decode(file_get_contents("php://input"));

$user = new user($db);

$user->login($data->username, $data->password);
if($user->id > 0)
{

    $result = $user->getUserDetails($user -> id);

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
        'id' => $user->id,
        'name' => $user->firstname . ' ' . $user->lastname,
        'mobile' => $user->mobile,
        'email' => $user->email,
        'isSet' => $user->isSet,
        'isAdmin' => $user->isAdmin,
        'features' => $details_arr['data']
    );
    
    print_r(json_encode($user_data));
}
else
{
    echo json_encode(array('message' => 'invalid username or password'));
}
?>