<?php
class password
{
    private $conn;
    private $table = 'user';

    public $password;
    public $password1;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    public function passwordreset($id, $currentpassword, $newpassword)
    {
        
        $query = 'SELECT Password FROM '.$this->table.' WHERE Id = '.$id;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->password = $row['Password'];
        if($this->password == $currentpassword)
        {
            $querysetpass = 'UPDATE '.$this->table.' SET Password ="'.$newpassword.'" WHERE Id = '.$id;
            $stmtsetpass = $this->conn->prepare($querysetpass);
            $stmtsetpass->execute();
            return true;
        }
        else
        {
             return false;
        }
    }

    public function setPassword($id, $password)
    {
            $querysetpass = 'UPDATE '.$this->table.' SET Password ="'.$password.'", IsSet = 1 WHERE Id = '.$id;
            $stmtsetpass = $this->conn->prepare($querysetpass);
            $stmtsetpass->execute();
            return true;
     }

}
?> 