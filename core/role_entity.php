<?php
class roles{
    private $conn;
    private $table = 'roles';
    private $table1 = 'rolesfeature';

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

   public function create($name, $features){
       $querycheck = 'SELECT COUNT(*) FROM '.$this->table.' WHERE Name = "'.$name.'"';
       $stmtcheck = $this->conn->prepare($querycheck);
       $stmtcheck->execute();
       $row = $stmtcheck->fetch(PDO::FETCH_ASSOC);
       $this->id = $row['COUNT(*)'];
       if($this->id == 0)
       {
            $query = 'INSERT INTO '.$this->table.' (Name) VALUES ("'.$name.'")';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $query1 = 'SELECT MAX(Id) FROM '.$this->table;
            $stmt1= $this->conn->prepare($query1);
            $stmt1->execute();
            $row = $stmt1->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['MAX(Id)'];
            if($this->id >=1)
            {
                foreach ($features as &$feature) {
                $query3 = 'INSERT INTO '.$this->table1.' (RoleId, FeatureId) VALUES ("'.$this->id.'", "'.$feature.'")';
                $stmt2= $this->conn->prepare($query3);
                $stmt2->execute();
                
                
                }
                return true;
            }
       }
       else
       {
           return false;
       }    
   }

   public function update($id, $name, $features){
       $query1 = 'SELECT COUNT(*) FROM '.$this->table.' WHERE Name = "'.$name.'" AND Id != '.$id;
       $stmt1 = $this->conn->prepare($query1);
       $stmt1->execute();
       $row = $stmt1->fetch(PDO::FETCH_ASSOC);
       $this->id = $row['COUNT(*)'];
       if($this->id == 0)
       {
            $query1 = 'DELETE FROM '.$this->table1.' WHERE RoleId = "'.$id.'"';
            $stmt1 = $this->conn->prepare($query1);
            $stmt1->execute();
            foreach ($features as &$feature) {
                $query3 = 'INSERT INTO '.$this->table1.' (RoleId, FeatureId) VALUES ("'.$id.'", "'.$feature.'")';
                $stmt2= $this->conn->prepare($query3);
                $stmt2->execute();  }
            $query = 'UPDATE '.$this->table.' SET Name = "'.$name.'" WHERE Id = "'.$id.'"';
            $stmt = $this->conn->prepare($query);
            if($stmt->execute()){
            return true;
            }
       } 
       else
       {
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
        $query1 = 'DELETE FROM '.$this->table1.' WHERE RoleId = "'.$id.'"';
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

   public function rolefeature($id){
        $query = 'SELECT f.Id, f.Name FROM '.$this->table1.' rf INNER JOIN feature f on rf.FeatureId = f.Id where rf.RoleId = "'.$id.'"'; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;

    }
}

?>