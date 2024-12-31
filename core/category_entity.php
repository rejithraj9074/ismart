<?php
class category{
    private $conn;
    private $table = 'category';
    private $table1 = 'subcategory';
    private $table2 = 'quantitytype';

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

   public function readsubcategory(){

    $query = 'SELECT * FROM '.$this->table1;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    
    return $stmt;  
   
    }

    public function categorysubcategory($id){
        $query = 'SELECT sc.Id, sc.Name FROM '.$this->table1.' sc INNER JOIN category c on sc.CategoryId = c.Id where sc.CategoryId = "'.$id.'"'; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;

    }

    public function quantitytype(){

        $query = 'SELECT * FROM '.$this->table2;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;  
       
    }
}
?>   