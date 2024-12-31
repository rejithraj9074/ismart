<?php
 
 class item{
      private $conn;
      private $table = 'stock';
      private $table1 = 'item';

      public $id;
      public $itemname;
      public $catid;
      public $subcatid;
      public $quantityTypeId;

      public function __construct($db){
           $this->conn = $db;
      }  

      public function create($name, $catid, $subcatid, $mfgdate, $expdate, $batchno, $buyprice, $sellprice, $dis, $qtyid, $qty, $minqty)
      {
        $query = 'INSERT INTO '.$this->table1.' (Name, CategoryId, SubCategoryId, QuantityTypeId) VALUES ("'.$name.'", "'.$catid.'", "'.$subcatid.'","'.$qtyid.'")';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $query1 = 'SELECT MAX(Id) FROM '.$this->table1;
        $stmt1= $this->conn->prepare($query1);
        $stmt1->execute();
        $row = $stmt1->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['MAX(Id)'];
        if($this->id >=1)
        {
            $query2 = 'INSERT INTO '.$this->table.' (ItemId, MfgDate, ExpDate, BatchNo, BuyingPrice, SellingPrice, Discount, Quantity, StockUpdatedOn, MinimumQuantityRequired) VALUES ("'.$this->id.'", "'.$mfgdate.'", "'.$expdate.'", "'.$batchno.'", "'.$buyprice.'", "'.$sellprice.'", "'.$dis.'", "'.$qty.'", "'.date('Y-m-d').'", "'.$minqty.'")';
            $stmt2 = $this->conn->prepare($query2);
            $stmt2->execute();
            return true;
        }
      }  

      public function delete($id)
      {
          $query1 = 'SELECT COUNT(*) FROM '.$this->table1.' WHERE Id = "'.$id.'"';
          $stmt1 = $this->conn->prepare($query1);
          $stmt1->execute();
          $row = $stmt1->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['COUNT(*)'];
          if($this->id >= 1)
          {
             $query = 'UPDATE '.$this->table1.' SET IsDeleted = 1 WHERE Id = "'.$id.'"';
             $stmt = $this->conn->prepare($query);
              if($stmt->execute())
              {
                return true;
              }
              else
              {
                 return false;
              }              
          }
      
      }

      public function list($searchkey)
      {
          $query = "SELECT s.Id as StockId, i.Id, i.Name, c.Name as Category, sc.Name as SubCategory, s.ExpDate as ExpireyDate, s.BatchNo, CONCAT(s.Quantity-IFNULL(currentStock.quantity,0),' ',qt.Symbol) as Quantity, s.SellingPrice as Mrp, s.Discount, s.SellingPrice-s.Discount as Price FROM stock s INNER JOIN item i ON s.ItemId = i.Id INNER JOIN category c ON i.CategoryId = c.Id INNER JOIN subcategory sc ON i.SubCategoryId = sc.Id INNER JOIN quantitytype qt ON i.QuantityTypeId = qt.Id LEFT JOIN ( SELECT  id.StockId,  SUM(id.Quantity) as quantity FROM item i INNER JOIN stock s  on i.Id = s.ItemId INNER JOIN invoicedetails id  on s.Id = id.StockId WHERE i.Name LIKE '%".$searchkey."%' GROUP by id.StockId ) currentStock on s.Id = currentStock.StockId WHERE s.Quantity-IFNULL(currentStock.quantity,0) > 0 AND i.IsDeleted = 0 AND i.Name LIKE '%".$searchkey."%'";
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          
          return $stmt;
         
      }
     
      public function get($id)
      {

          $query = 'SELECT *  FROM '.$this->table1.' WHERE Id = "'.$id.'"';
          $stmt = $this->conn->prepare($query);
          $stmt->execute();
          $row = $stmt->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['Id'];
          $this->itemname = $row['Name'];
          $this->catid = $row['CategoryId'];
          $this->subcatid = $row['SubCategoryId']; 
          $this->quantityTypeId = $row['QuantityTypeId']; 
         
      }

      public function update($id ,$name, $catid, $subcatid, $qtyid, $details)
      {
          $query1 = 'SELECT COUNT(*) FROM '.$this->table1.' WHERE Id = "'.$id.'"';
          $stmt1 = $this->conn->prepare($query1);
          $stmt1->execute();
          $row = $stmt1->fetch(PDO::FETCH_ASSOC);
          $this->id = $row['COUNT(*)'];
         
          if($this->id >= 1)
          {
            $queryupdateItem = 'UPDATE '.$this->table1.' SET Name = "'.$name.'", CategoryId = "'.$catid.'", SubCategoryId = "'.$subcatid.'", QuantityTypeId = "'.$qtyid.'" WHERE Id = "'.$id.'"';
            $stmtupdateItem = $this->conn->prepare($queryupdateItem);
            $stmtupdateItem->execute();
            foreach ($details as &$stock)
            {   
                if($stock->id == 0)
                {
                    $queryinsertStock = 'INSERT INTO '.$this->table.' (ItemId, MfgDate, ExpDate, BatchNo, BuyingPrice, SellingPrice, Discount, Quantity, StockUpdatedOn, MinimumQuantityRequired) VALUES ("'.$id.'", "'.$stock->mfgDate.'", "'.$stock->expDate.'", "'.$stock->batchNo.'", "'.$stock->buyingPrice.'", "'.$stock->sellingPrice.'", "'.$stock->discount.'", "'.$stock->quantity.'", "'.date('Y-m-d').'", "'.$stock->minimumQuantityRequired.'")';
                    $stmtinsertStock = $this->conn->prepare($queryinsertStock);
                    $stmtinsertStock->execute(); 
                }
                else
                {
                    $queryupdateStock = 'UPDATE '.$this->table.' SET MfgDate = "'.$stock->mfgDate.'", ExpDate = "'.$stock->expDate.'", BatchNo = "'.$stock->batchNo.'", BuyingPrice = "'.$stock->buyingPrice.'", SellingPrice = "'.$stock->sellingPrice.'", Discount = "'.$stock->discount.'", Quantity = "'.$stock->quantity.'", StockUpdatedOn = "'.date('Y-m-d').'", MinimumQuantityRequired = "'.$stock->minimumQuantityRequired.'" WHERE Id = "'.$stock->id.'"';
                    $stmtupdateStock = $this->conn->prepare($queryupdateStock);
                    $stmtupdateStock->execute();   
                }    
            }
             return true;
          }   
      }
     }
?>           