var productDetails;
$(document).ready(function () {
    $.post("http://localhost/iSmart/api/product/product_get.php",
    JSON.stringify({
        id : Number(new URLSearchParams(window.location.search).get("id"))
    }),
    function(response, status)
    {
        productDetails = response;
        $('#txt_ProductName').val(productDetails.name);
        getCategory();
        getQuantityType();
        listStock();

    }
    );

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
    $('#txt_ProducteditMfgDate').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "d/m/yy",
        maxDate: new Date()
    });
    var tmrw = new Date();
    tmrw.setDate(new Date().getDate()+1)
    $('#txt_ProducteditExpiryDate').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "d/m/yy",
        minDate: tmrw
    });
    
});

function setInventoryMenu()
{
    var userFeatures = user.features;
    if(user.isAdmin || (userFeatures.find(x=>x.featureid == 36) != null))
    {
        $('#btnAddStock').removeClass('hide');
        $('#txt_ProductSave').removeClass('hide');
        $('#btn_editStockList').removeClass('hide');
        $('.mnu_editStock').removeClass('hide');
        $('.mnu_deleteStock').removeClass('hide');
    }
    if(userFeatures.find(x=>x.featureid == 27) != null)
        $('.mnu_viewStock').removeClass('hide');
}

function getCategory()
{
    $.get("http://localhost/iSmart/api/category/category.php",
    function(response, status)
    {
        $('#lst_ProductCategory').html('');  
        $('#lst_ProductCategory').append('<option value="0">Choose...</option>');
        response.data.forEach(category => {
            $('#lst_ProductCategory').append('<option value="' + category.id + '">' + category.name +'</option>');
        });
        $('#lst_ProductCategory').val(productDetails.catid);
        getSubcategory();
    }
    ); 
}

function getSubcategory()
{
    var catid = $( "#lst_ProductCategory option:selected").val();
    $.post("http://localhost/iSmart/api/category/categorysubcategory.php",
    JSON.stringify({
        id : catid
    }),
    function(response, status)
    {
        $('#lst_ProductSubcategory').html('');  
        $('#lst_ProductSubcategory').append('<option value="0">Choose...</option>');
        response.data.forEach(subcategory => {
            $('#lst_ProductSubcategory').append('<option value="' + subcategory.id + '">' + subcategory.name +'</option>');
        });
        $('#lst_ProductSubcategory').val(productDetails.subcatid);
    }

    ); 
}

function getQuantityType()
{
    $.get("http://localhost/iSmart/api/category/quantitytype.php",
    function(response, status)
    {
        $('#lst_ProductQuantityType').html('');  
        //$('#lst_ProductQuantityType').append('<option value="0"></option>');
        response.data.forEach(qtytype => {
            $('#lst_ProductQuantityType').append('<option value="' + qtytype.id + '">' + qtytype.name +'</option>');
        });
        $('#lst_ProductQuantityType').val(productDetails.qtyid);
    }
    ); 
}


function listStock()
{
    if(productDetails.stock.length > 0)
    {
        $('#stock_footer').hide(); 
        $('#lst_stock').html('');
        productDetails.stock.forEach(stock => {
        $('#lst_stock').append(
            '<tr>' +
                '<td class="center-align">' + stock.quantity + '</td>' +
                '<td class="center-align">' + stock.availableStock + '</td>' +
                '<td>' + stock.mfgDate + '</td>' +
                '<td>' + stock.expDate + '</td>' +
                '<td>' + stock.batchNo + '</td>' +
                '<td class="left-align">' + stock.sellingPrice + '</td>' +
                '<td class="left-align">' + stock.discount + '</td>' +
                '<td class="left-align">' + (Number(stock.sellingPrice) - Number(stock.discount)) + '</td>' +
                '<td class="table-action">' + 
                    '<a href="#" class="mnu_editStock hide" onclick="editStock(' + stock.id + ', \'' + stock.quantity + '\', \'' + stock.mfgDate + '\', \'' + stock.expDate + '\', \'' + stock.batchNo + '\',\'' + stock.sellingPrice + '\', \'' + stock.discount + '\', \'' + (Number(stock.sellingPrice) - Number(stock.discount)) + '\', \'' + stock.minimumQuantityRequired + '\', \'' + stock.buyingPrice + '\', \'' + (Number(stock.sellingPrice) - Number(stock.discount) - Number(stock.buyingPrice)) +'\')" id="btn_editStock" key=""' + stock.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                    '<a href="#" class="mnu_viewStock hide" onclick="editStock(' + stock.id + ', \'' + stock.quantity + '\', \'' + stock.mfgDate + '\', \'' + stock.expDate + '\', \'' + stock.batchNo + '\',\'' + stock.sellingPrice + '\', \'' + stock.discount + '\', \'' + (Number(stock.sellingPrice) - Number(stock.discount)) + '\', \'' + stock.minimumQuantityRequired + '\', \'' + stock.buyingPrice + '\', \'' + (Number(stock.sellingPrice) - Number(stock.discount) - Number(stock.buyingPrice)) +'\')" id="btn_editStock" key=""' + stock.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-middle mr-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>' +
                    //'<a href="#" class="mnu_deleteStock hide" onclick="deleteStock(' + stock.id + ')" id="btn_deleteStock" key=""' + stock.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                '</td>'+
            '</tr>');
        });
        setInventoryMenu();
    }
    else
    {   
        $('#lst_stock').html('');
        $('#stock_footer').show(); 
    }    
}

function getAddStock()
{
    $('#modal_addStock').modal();
}

function addStock()
{  
    var id = 0;
    var quantity =  Number($('#txt_ProductQuantity').val());
    var mfgDate = formatDateData($("#txt_ProductMfgDate").datepicker( 'getDate' ));
    var expDate = formatDateData($("#txt_ProductExpiryDate").datepicker( 'getDate' ));
    var batchNo =  $('#txt_ProductBatchNo').val();
    var sellingPrice =  Number($('#txt_ProductMrp').val());
    var discount =  Number($('#txt_ProductDiscount').val());
    var buyingPrice = Number($('#txt_ProductBuyingPrice').val());
    var minimumQuantity = Number($('#txt_ProductMinQty').val());
    var data = {
        Quantity : quantity,
        Mfg : mfgDate,
        Exp : expDate,
        Batch : batchNo,
        Sell : sellingPrice,
        Buy : buyingPrice,
        Min : minimumQuantity
    }
    if(!validateaddStock(data))
        return;
    productDetails.stock.push(
        {
            id : id,
            quantity : quantity, 
            availableStock : quantity,
            mfgDate : mfgDate,
            expDate : expDate,
            batchNo : batchNo,
            sellingPrice : sellingPrice,
            discount : discount,
            buyingPrice : buyingPrice,
            minimumQuantityRequired : minimumQuantity
        });
    $('#modal_addStock').modal('hide');  
    listStock();
}

function updateStock()
{
    var id = Number(new URLSearchParams(window.location.search).get("id"));
    var name = $('#txt_ProductName').val();
    var categoryId = Number($('#lst_ProductCategory').val());
    var subcategoryId = Number($('#lst_ProductSubcategory').val());
    var quantityTypeId = Number($('#lst_ProductQuantityType').val());
    var data = {
        Name : name,
        CategoryId : categoryId,
        SubCategoryId : subcategoryId,
        QtyTypeId : quantityTypeId,
    }
    if(!validateStock(data))
        return;
    $.post("http://localhost/iSmart/api/product/product_update.php",
        JSON.stringify({
            ItemId : id,
            ProductName : name,
            CategoryId : categoryId,
            SubCategoryId : subcategoryId,
            QtyTypeId : quantityTypeId,
            Details : productDetails.stock
            }),
            function(response, status)
            {
                if(response.status == true)
                {
                    window.location = "stock.html";
                }
            }
        
    );

}

function editStock(id, qty, mfgdate, expdate, batchno, sellprice, discount, price, minqty, buyprice, profit)
{

    $('#modal_editStock').modal();
    $('#txt_ProducteditMfgDate').val(mfgdate);
    $('#txt_ProducteditExpiryDate').val(expdate);
    $('#txt_ProducteditBatchNo').val(batchno);
    $('#txt_ProducteditBuyingPrice').val(buyprice);
    $('#txt_ProducteditMrp').val(sellprice);
    $('#txt_ProducteditDiscount').val(discount);
    $('#txt_ProducteditPrice').val(price);
    $('#txt_ProducteditQuantity').val(qty);
    $('#txt_ProducteditMinQty').val(minqty);
    $('#txt_ProducteditProfit').val(profit);
    $("#btn_editStockList").attr("onclick", " editStockList(" + id + ") ");   
}

function editStockList(id)
{
    var data = {
        Quantity : $('#txt_ProducteditQuantity').val(),
        Mfg : formatDateData($("#txt_ProducteditMfgDate").datepicker( 'getDate' )),
        Exp : formatDateData($("#txt_ProducteditExpiryDate").datepicker( 'getDate' )),
        Batch :  $('#txt_ProducteditBatchNo').val(),
        Sell : $('#txt_ProducteditMrp').val(),
        Buy : $('#txt_ProducteditBuyingPrice').val(),
        Min : $('#txt_ProducteditMinQty').val()
    }
    if(!validateeditStock(data))
        return;
    var stockUpdate = productDetails.stock.find(x=>x.id==id);
    stockUpdate.quantity = $('#txt_ProducteditQuantity').val();
    stockUpdate.mfgDate = $('#txt_ProducteditMfgDate').val();
    stockUpdate.expDate = $('#txt_ProducteditExpiryDate').val();
    stockUpdate.batchNo = $('#txt_ProducteditBatchNo').val();
    stockUpdate.sellingPrice = $('#txt_ProducteditMrp').val();
    stockUpdate.discount = $('#txt_ProducteditDiscount').val();
    stockUpdate.buyingPrice = $('#txt_ProducteditBuyingPrice').val();
    stockUpdate.minimumQuantityRequired = $('#txt_ProducteditMinQty').val();
    $('#modal_editStock').modal('hide');
    listStock();
}    

function validateStock(data)
{
    var isValid = true;
    if(data.Name == "")
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
    if(data.QtyTypeId == 0)
    {
        showError("#lbl_Error_ExpDate");
        isValid = false;
    }
    return isValid;
}

function validateaddStock(data)
{
    var isValid = true;
    if(data.Quantity == 0)
    {
        showError("#lbl_Error_Quantity");
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
    if(data.Batch == "")
    {
        showError("#lbl_Error_BatchNo");
        isValid = false;
    }
    if(data.Sell == 0)
    {
        showError("#lbl_Error_Mrp");
        isValid = false;
    }
    if(data.Buy == 0)
    {
        showError("#lbl_Error_BuyingPrice");
        isValid = false;
    }
    if(data.Min == 0)
    {
        showError("#lbl_Error_MinimumQuantity");
        isValid = false;
    }
    return isValid;
}

function validateeditStock(data)
{
    var isValid = true;

    if(data.Quantity == 0)
    {
        showError("#lbl_Eror_Quantity1");
        isValid = false;
    }
    if($("#txt_ProducteditMfgDate").datepicker( 'getDate' ) == null)
    {
        showError("#lbl_Eror_MfgDate");
        isValid = false;
    }

    if($("#txt_ProducteditExpiryDate").datepicker( 'getDate' ) == null)
    {
        showError("#lbl_Eror_ExpDate");
        isValid = false;
    }
    if(data.Batch == "")
    {
        showError("#lbl_Eror_BatchNo");
        isValid = false;
    }
    if(data.Sell == 0)
    {
        showError("#lbl_Eror_Mrp");
        isValid = false;
    }
    if(data.Buy == 0)
    {
        showError("#lbl_Eror_BuyingPrice");
        isValid = false;
    }
    if(data.Min == 0)
    {
        showError("#lbl_Eror_MinimumQuantity");
        isValid = false;
    }
    return isValid;
}