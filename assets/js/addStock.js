$(document).ready(function () {
    $('#txt_ProductMfgDate').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "d/m/yy",
        maxDate: new Date()
    });
    var tmrw = new Date();
    tmrw.setDate(new Date().getDate()+1)

    $('#txt_ProductExpiryDate').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "d/m/yy",
        minDate: tmrw
    });
    // $("#txt_ProductExpiryDate").datepicker( 'getDate' );

    $.get("http://localhost/iSmart/api/category/category.php",
    function(response, status)
    {
        $('#lst_ProductCategory').html('');  
        $('#lst_ProductCategory').append('<option value="0">Choose...</option>');
        response.data.forEach(category => {
        $('#lst_ProductCategory').append('<option value="' + category.id + '">' + category.name +'</option>');
        });
    }
    ); 

    $.get("http://localhost/iSmart/api/category/quantitytype.php",
    function(response, status)
    {
        $('#lst_ProductQuantityType').html('');  
        //$('#lst_ProductQuantityType').append('<option value="0"></option>');
        response.data.forEach(qtytype => {
        $('#lst_ProductQuantityType').append('<option value="' + qtytype.id + '">' + qtytype.name +'</option>');
        });
    }
    ); 
});

function createStock()
{
    var name = $('#txt_ProductName').val();
    var categoryId = Number($('#lst_ProductCategory').val());
    var subcategoryId = Number($('#lst_ProductSubcategory').val());
    var expDate = formatDateData($("#txt_ProductExpiryDate").datepicker( 'getDate' ));
    var mfgDate = formatDateData($("#txt_ProductMfgDate").datepicker( 'getDate' ));
    var batchNo = $('#txt_ProductBatchNo').val();
    var buyingPrice = Number($('#txt_ProductBuyingPrice').val());
    var mrp = Number($('#txt_ProductMrp').val());
    var discount = Number($('#txt_ProductDiscount').val());
    var quantity = Number($('#txt_ProductQuantity').val());
    var quantityTypeId = Number($('#lst_ProductQuantityType').val());
    var minimumQuantity = Number($('#txt_ProductMinQty').val());
    var data = {
        ProductName : name,
        CategoryId : categoryId,
        SubCategoryId : subcategoryId,
        MfgDate : mfgDate,
        ExpDate : expDate,
        BatchNo : batchNo,
        BuyPrice : buyingPrice,
        SellPrice : mrp,
        Discount : discount,
        QtyTypeId : quantityTypeId,
        Qty : quantity,
        MinQty : minimumQuantity
    }
    if(!validateStock(data))
        return;
    $.post("http://localhost/iSmart/api/product/product_create.php",
    JSON.stringify(data),
    function(response, status)
    {
        if(response.status == true)
        {
        
            var name =$('#txt_ProductName').val();
            showSuccessNotification(name, "Item has been added successfully");
            setTimeout(() => {
                window.location = "stock.html";
            }, 1000);
        }
    }
    );
}

function validateStock(data)
{
    var isValid = true;
    if(data.ProductName == "")
    {
        showError("#lbl_Error_Name");
        isValid = false;
    }
    if(data.CategoryId == 0)
    {
        showError("#lbl_Error_Category");
        isValid = false;
    }
    if(data.SubCategoryId == 0)
    {
        showError("#lbl_Error_Subcategory");
        isValid = false;
    }
    if($("#txt_ProductMfgDate").datepicker( 'getDate' ) == null)
    {
        showError("#lbl_Error_MfgDate");
        isValid = false;
    }
    if($("#txt_ProductExpiryDate").datepicker( 'getDate' ) == null)
    {
        showError("#lbl_Error_ExpDate");
        isValid = false;
    }
    if(data.BatchNo == "")
    {
        showError("#lbl_Error_BatchNo");
        isValid = false;
    }
    if(data.BuyPrice == 0)
    {
        showError("#lbl_Error_BuyingPrice");
        isValid = false;
    }
    if(data.SellPrice == 0)
    {
        showError("#lbl_Error_Mrp");
        isValid = false;
    }
    if(data.Qty == 0)
    {
        showError("#lbl_Error_Quantity");
        isValid = false;
    }
    if(data.MinQty == 0)
    {
        showError("#lbl_Error_MinimumQuantity");
        isValid = false;
    }
    return isValid;
}

