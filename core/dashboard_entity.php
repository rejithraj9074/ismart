<?php
class dashboard{
    private $conn;

    public $sales;
    public $orders;
    public $profit;
    public $inventoryValue;

    public function __construct($db)
    {
        $this->conn = $db;
    }   

    public function dashdetails()
    {
        $querysales = 'SELECT SUM(TotalAmount) FROM invoice WHERE MONTH(InvoicedDate)=MONTH(now()) AND YEAR(InvoicedDate)=YEAR(now())';
        $stmtsales = $this->conn->prepare($querysales);
        $stmtsales->execute();
        $row = $stmtsales->fetch(PDO::FETCH_ASSOC);
        $this->sales = $row['SUM(TotalAmount)'];
        $queryorders = 'SELECT COUNT(*) FROM invoice WHERE MONTH(InvoicedDate)=MONTH(now()) AND YEAR(InvoicedDate)=YEAR(now())';
        $stmtorders = $this->conn->prepare($queryorders);
        $stmtorders->execute();
        $row = $stmtorders->fetch(PDO::FETCH_ASSOC);
        $this->orders = $row['COUNT(*)'];
        $queryprofit = 'SELECT SUM(id.Quantity*(id.Price-id.Discount-s.BuyingPrice)) as Profit FROM invoice i INNER JOIN invoicedetails id ON i.Id = id.InvoiceId INNER JOIN stock s ON id.StockId = s.Id where MONTH(InvoicedDate)=MONTH(now()) and YEAR(InvoicedDate)=YEAR(now())';
        $stmtprofit = $this->conn->prepare($queryprofit);
        $stmtprofit->execute();
        $row = $stmtprofit->fetch(PDO::FETCH_ASSOC);
        $this->profit = $row['Profit'];
        $queryinventory = ' SELECT SUM(s.SellingPrice * (s.Quantity-IFNULL(currentStock.quantity,0))) AS StockValue FROM stock s LEFT JOIN(SELECT  id.StockId,  SUM(id.Quantity) AS quantity FROM item i INNER JOIN stock s  ON i.Id = s.ItemId INNER JOIN invoicedetails id  ON s.Id = id.StockId GROUP by id.StockId) currentStock ON s.Id = currentStock.StockId';
        $stmtinventory = $this->conn->prepare($queryinventory);
        $stmtinventory->execute();
        $row = $stmtinventory->fetch(PDO::FETCH_ASSOC);
        $this->inventoryValue = $row['StockValue'];
    }

    public function topSelling()
    {
        $query = 'SELECT * FROM(SELECT it.Name, SUM(id.Quantity) AS Quantity, SUM(id.Quantity * (id.Price-id.Discount-s.BuyingPrice)) AS Profit FROM invoice i INNER JOIN invoicedetails id ON i.Id = id.InvoiceId INNER JOIN stock s ON id.StockId = s.Id INNER JOIN item it ON it.Id = s.ItemId WHERE MONTH(InvoicedDate)=MONTH(now()) AND YEAR(InvoicedDate)=YEAR(now()) GROUP by it.Id) currentStock ORDER BY Quantity DESC Limit 10';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function topProfitable()
    {
        $query = 'SELECT * FROM(SELECT it.Name, SUM(id.Quantity) AS Quantity, SUM(id.Quantity * (id.Price-id.Discount-s.BuyingPrice)) AS Profit FROM invoice i INNER JOIN invoicedetails id ON i.Id = id.InvoiceId INNER JOIN stock s ON id.StockId = s.Id INNER JOIN item it ON it.Id = s.ItemId WHERE MONTH(InvoicedDate)=MONTH(now()) AND YEAR(InvoicedDate)=YEAR(now()) GROUP by it.Id) currentStock ORDER BY Profit DESC Limit 10';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>