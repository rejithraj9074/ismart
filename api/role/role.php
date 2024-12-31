<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../core/initialize.php');

$roles = new roles($db);

$result = $roles->read();

$num = $result->rowcount();

if($num > 0){
    //$role_arr = array();
    $role_arr['data'] = array();
    
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $role_data = array(
           'id'   => $Id,
           'name' => $Name
        );

        array_push($role_arr['data'], $role_data);
    }
    echo json_encode($role_arr['data']);

}
else{
    echo json_encode(array('message' => 'no roles'));
}


?>