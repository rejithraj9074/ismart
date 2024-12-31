<?php
class invoice
{
    private $conn;
    private $table = 'invoice';
    private $table1 = 'invoicedetails';

      public $id;
      public $invNo;
      public $invDate;
      public $totalAmount;
      public $totalDiscount;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    public function invoiceid()
    {
        
        $query = 'SELECT MAX(Id) FROM '.$this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['MAX(Id)'];
        return true;
    }

    public function create($totalamount, $totaldiscount, $invoicenumber, $invoiceddate, $details)
    {
      $query = 'INSERT INTO '.$this->table.' (InvoiceNumber, InvoicedDate, TotalDiscount, TotalAmount) VALUES ("'.$invoicenumber.'", "'.$invoiceddate.'", "'.$totaldiscount.'","'.$totalamount.'")';
      //echo $query;     
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      $query1 = 'SELECT MAX(Id) FROM '.$this->table;
      $stmt1= $this->conn->prepare($query1);
      $stmt1->execute();
      $row = $stmt1->fetch(PDO::FETCH_ASSOC);
      $this->id = $row['MAX(Id)'];
      if($this->id >=1)
      {
          foreach ($details as &$invoice)
          {
            //echo $invoice->mrp;  
            $query2 = 'INSERT INTO '.$this->table1.' (InvoiceId, Price, Quantity, Discount, Total, ItemName, StockId) VALUES ("'.$this->id.'", "'.$invoice->mrp.'", "'.$invoice->qty.'", "'.$invoice->discount.'", "'.$invoice->price.'", "'.$invoice->name.'", "'.$invoice->stockid.'")';
            $stmt2 = $this->conn->prepare($query2);
            //echo $query2;
            $stmt2->execute();
            //return true;
          } 
          return true;
      }
    }  

    public function list($searchkey)
    {
     // SELECT * FROM invoice WHERE InvoiceNumber LIKE '%INV%' ORDER BY InvoicedDate
        $query = "SELECT * FROM ".$this->table." WHERE InvoiceNumber LIKE '%".$searchkey."%' ORDER BY InvoicedDate";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
       
    }

    public function getInvoiceDetails($id)
    {
      
      $query = 'SELECT id.ItemName, id.Quantity, id.Price, id.Discount, id.Total FROM invoice i INNER JOIN invoicedetails id ON id.InvoiceId = i.Id WHERE id.InvoiceId = "'.$id.'"';
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;     
    }

    public function getInvoice($id)
    {
      $query = 'SELECT * FROM '.$this->table.' WHERE ID = "'.$id.'"'; 
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      $this->id = $row['Id'];
      $this->invNo = $row['InvoiceNumber'];
      $this->invDate = $row['InvoicedDate'];
      $this->totalDiscount = $row['TotalDiscount']; 
      $this->totalAmount = $row['TotalAmount'];
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
             $query = 'DELETE FROM '.$this->table1.' WHERE InvoiceId = "'.$id.'"';
             $stmt = $this->conn->prepare($query);
             $stmt->execute();
             $query1 = 'DELETE FROM '.$this->table.' WHERE Id = "'.$id.'"';
             $stmt1 = $this->conn->prepare($query1);
              if($stmt1->execute())
              {
                return true;
              }
              else
              {
                 return false;
              }              
          }
      
      }


}    
?>