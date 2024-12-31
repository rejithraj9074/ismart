<?php
 
 class user{
      private $conn;
      private $table = 'user';
      private $table1 = 'userroles';

      public $id;
      public $firstname;
      public $lastname;
      public $email;
      public $mobile;
      public $isSet;
      public $isAdmin;

      public function __construct($db){
           $this->conn = $db;
      }
      public function login($username, $password)
      {
          $query ='SELECT * FROM '.$this->table.' WHERE Email = "'.$username.'" AND Password = "'.$password.'"';
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['Id'];
          $this->firstname = $row['FirstName'];
          $this->lastname = $row['LastName'];
          $this->email = $row['Email'];
          $this->mobile = $row['Mobile'];
          $this->isSet = $row['IsSet'];
          $this->isAdmin = $row['IsAdmin'];
      }

      public function list()
      {

          $query = 'SELECT Id, FirstName, LastName, Email, Mobile FROM '.$this->table;
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          
          return $stmt;
         
      }

      public function get($id)
      {

          $query = 'SELECT *  FROM '.$this->table.' WHERE Id = "'.$id.'"';
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['Id'];
          $this->firstname = $row['FirstName'];
          $this->lastname = $row['LastName'];
          $this->email = $row['Email']; 
      }

      public function getUserDetails($id)
    {
      $query = 'SELECT DISTINCT rf.FeatureId, f.Name FROM userroles ur INNER JOIN rolesfeature rf on ur.RoleId = rf.RoleId INNER JOIN feature f on rf.FeatureId = f.Id WHERE ur.UserId = "'.$id.'"';
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;     
    }

      public function create($firstname, $lastname, $email, $mobile, $roles)
      {
          $query = 'INSERT INTO '.$this->table.' (FirstName, LastName, Email, Mobile, IsSet, IsAdmin, Password) VALUES ("'.$firstname.'", "'.$lastname.'", "'.$email.'", "'.$mobile.'",0,0,"ismart")';
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          $query1 = 'SELECT MAX(Id) FROM '.$this->table;
          $stmt1= $this->conn->prepare($query1);
          $stmt1->execute();
          $row = $stmt1->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['MAX(Id)'];
          if($this->id >=1)
          {
           foreach ($roles as &$role) {
           $query3 = 'INSERT INTO '.$this->table1.' (UserId, RoleId) VALUES ("'.$this->id.'", "'.$role.'")';
           $stmt2= $this->conn->prepare($query3);
           $stmt2->execute();
           
           
           }
           return true;
          }
      }

      public function delete($id)
      {
          $query1 = 'SELECT COUNT(*) FROM '.$this->table.' WHERE Id = "'.$id.'"';
          $stmt1 = $this->conn->prepare($query1);
          $stmt1->execute();
          $row = $stmt1->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['COUNT(*)'];
          if($this->id >= 1)
          {
              $query1 = 'DELETE FROM '.$this->table1.' WHERE UserId = "'.$id.'"';
              $stmt1 = $this->conn->prepare($query1);
              if($stmt1->execute()){ 
              $query = 'DELETE FROM '.$this->table.' WHERE Id = "'.$id.'"';
              $stmt = $this->conn->prepare($query);
              if($stmt->execute())
              {
                 return true;
              }
              else{
                  return false;
              } 
              } 
              else{
                  return false;
              }   
              
          }
      
      }

      public function update($id, $firstname, $lastname, $email, $mobile, $roles)
      {
          $query1 = 'SELECT COUNT(*) FROM '.$this->table.' WHERE Id = "'.$id.'"';
          $stmt1 = $this->conn->prepare($query1);
          $stmt1->execute();
          $row = $stmt1->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['COUNT(*)'];
          if($this->id >= 1)
          {
            $query1 = 'DELETE FROM '.$this->table1.' WHERE UserId = "'.$id.'"';
            $stmt1 = $this->conn->prepare($query1);
            $stmt1->execute();
            foreach ($roles as &$role) {
            $query3 = 'INSERT INTO '.$this->table1.' (UserId, RoleId) VALUES ("'.$id.'", "'.$role.'")';
            $stmt2= $this->conn->prepare($query3);
            $stmt2->execute();  }
           $query = 'UPDATE '.$this->table.' SET FirstName = "'.$firstname.'", LastName = "'.$lastname.'", Email = "'.$email.'", Mobile = "'.$mobile.'" WHERE Id = "'.$id.'"';
           $stmt = $this->conn->prepare($query);
           if($stmt->execute()){
              return true;
           }
          } 
          else{
              return false;
          }
      }

      public function userrole($id)
      {
          $query = 'SELECT r.Id, r.Name FROM '.$this->table1.' ur INNER JOIN roles r on ur.RoleId = r.Id where ur.UserId = "'.$id.'"'; 
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          return $stmt;
  
      }
      
 }

?>
