<?php

class feature{
    private $conn;
    private $table = 'feature';

    public $id;
    public $name;

    public function __construct($db){

        $this->conn = $db;
    }

    public function read(){

        $query = 'SELECT * FROM '.$this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        

    return $stmt;
       
   }

    public function get($id){

       $query = 'SELECT *  FROM '.$this->table.' WHERE Id = "'.$id.'"';
       $stmt = $this->conn->prepare($query);
       $stmt->execute();
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
       $this->id = $row['Id'];
       $this->name = $row['Name']; 
   }

   public function create($name){
       $query = 'INSERT INTO '.$this->table.' (Name) VALUES ("'.$name.'")';
       $stmt = $this->conn->prepare($query);
       if($stmt->execute()){
           return true;
       }
       else{
           return false;
       }
   }

   public function update($id, $name){
       $query1 = 'SELECT COUNT(*) FROM '.$this->table.' WHERE Id = "'.$id.'"';
       $stmt1 = $this->conn->prepare($query1);
       $stmt1->execute();
       $row = $stmt1->fetch(PDO::FETCH_ASSOC);
       $this->id = $row['COUNT(*)'];
       if($this->id >= 1)
       {
        $query = 'UPDATE '.$this->table.' SET Name = "'.$name.'" WHERE Id = "'.$id.'"';
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
           return true;
        }
       } 
       else{
           return false;
       }
   }

   public function delete($id){
    $query1 = 'SELECT COUNT(*) FROM '.$this->table.' WHERE Id = "'.$id.'"';
    $stmt1 = $this->conn->prepare($query1);
    $stmt1->execute();
    $row = $stmt1->fetch(PDO::FETCH_ASSOC);
    $this->id = $row['COUNT(*)'];
    if($this->id >= 1)
    {
        $query = 'DELETE FROM '.$this->table.' WHERE Id = "'.$id.'"';
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
           return true;
        }
    }
    else{
        return false;
    }

   }

}

?>