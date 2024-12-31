<?php
class stock
{
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    public function list($itemId)
    {
        
        $query = 'SELECT Id,st.Quantity, MinimumQuantityRequired, MfgDate, ExpDate, BatchNo, BuyingPrice, SellingPrice, Discount, (st.quantity-IFNULL(currentStock.quantity,0)) as availableStock FROM stock st LEFT JOIN (SELECT id.StockId, SUM(id.Quantity) as quantity FROM item i INNER JOIN stock s on i.Id = s.ItemId INNER JOIN invoicedetails id on s.Id = id.StockId WHERE i.Id = '.$itemId.' GROUP by id.StockId) currentStock ON st.Id = currentStock.StockId WHERE ItemId ='.$itemId;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();     
        return $stmt;

    }

}
?>     