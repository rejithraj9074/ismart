var searchedItems = [];
var selectedItems = [];
var invoiceId = 0;

$(document).ready(function () {
    
    $('#lst_invoice').html('');
    $('#lbl_invoiceDate').text(formatDateData(new Date()));
    $.get("http://localhost/iSmart/api/invoice/invoiceId.php",
    function(response, status)
    {
        id = response.id + 1;
        $('#lbl_invoiceNo').text("Inv"+id);
        invoiceId = response.id + 1;
    });
});

$(document).on("click", "#txt_invoiceProductsearch", function (e)
{
    $('#stock_footer').show();
    $('#txt_invoiceProductsearch').val("");
    $('#lst_stock').html('');
    $('#lst_products').removeClass('hide');
    e.preventDefault();
});

$(document).on("click", function (e)
{
    if(e.target.id != "txt_invoiceProductsearch")
        $('#lst_products').addClass('hide');
});


$(document).on("keyup", "#txt_invoiceProductsearch", function (e)
{
    var searchkey = $('#txt_invoiceProductsearch').val();
    if(searchkey.length > 2 )
    {
        invoiceListStock(searchkey);
    }
    else
    {
        $('#lst_stock').html('');
        $('#stock_footer').show();
    }
});

function invoiceListStock(searchKeyword)
{
    $.post("http://localhost/iSmart/api/product/product.php",
    JSON.stringify({
        searchkey : searchKeyword
    }),
    function(response, status)
    {
        searchedItems = response.data;
        if(searchedItems.length > 0)
        {
            $('#stock_footer').hide(); 
            $('#lst_stock').html('');      
            searchedItems.forEach(stock => {
            $('#lst_stock').append(
                '<tr onclick="addInvoiceList(' + stock.id + ')">'+
                    '<th>' + stock.itemname + '</th>' +
                    '<th>' + stock.batch + '</th>' +
                    '<th>' + stock.expdate + '</th>' +
                    '<th style="text-align: center;">' + stock.qty + '</th>' +
                    '<th style="text-align: right;">' + stock.mrp + '</th>' +
                    '<th style="text-align: right;">' + stock.dis + '</th>' +
                    '<th style="text-align: right; border-right: 1px solid black;">' + stock.price + '</th>' +
                '</tr>');
            });
        }
        else
        {   
            $('#lst_stock').html('');
            $('#stock_footer').show(); 
        }    
    }
  );
}

function addInvoiceList(id)
{
    if(selectedItems.find(x=>x.id==id) == null)
    {
        var y = searchedItems.find (x=>x.id == id );
        selectedItems.push(
            {
                stockid : y.stockid,
                id : y.id, 
                name : y.itemname,
                mrp : y.mrp,
                discount : y.dis,
                qty : 1,
                price : y.price, 
                stock : Number(y.qty.split(" ")[0])
            });
        generateInvoiceItems();
        $('#txt_invoiceProductsearch').val("");
        $('#stock_footer').show(); 
    }
    
}

function generateInvoiceItems()
{
    var index = 0;
    var totalMrp = 0;
    var totalDiscount = 0;
    $('#lst_invoice').html('');
    selectedItems.forEach(item => {
        index = index+1;
        totalMrp = totalMrp + (item.mrp * item.qty);
        totalDiscount = totalDiscount + (item.discount * item.qty);
        $('#lst_invoice').append(
            '<tr>'+
                '<td>' + index + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.mrp + '</td>' +
                '<td>' + item.discount + '</td>' +
                '<td class="invoiceQuantity"><input id="txtQty_'+item.id+'" onkeyup="invoiceCalculation(event,'+item.id+')" type="text" value="' + item.qty + '"/>  /'+item.stock+'<p class="mb-0 error hide" id="lbl_qty_'+item.id+'">*Maximum quantity exceeded.</p></td>' +
                '<td class="text-right">' + item.price + '</td>' +
            '</tr>');
    });
    $('#lst_invoice').append('<tr><th colspan="5" class="text-right">Total MRP </th><th class="text-right" id="totalMrp">'+totalMrp+'</th></tr>')
    $('#lst_invoice').append('<tr><th colspan="5" class="text-right">Discount </th><th class="text-right" id="totalDiscount">'+totalDiscount+'</th></tr>')
    $('#lst_invoice').append('<tr><th colspan="5" class="text-right">Amount to be paid </th><th class="text-right" id="totalAmount">'+(totalMrp - totalDiscount)+'</th></tr>')
}

function invoiceCalculation(e, itemId)
{
    var quantity = Number(e.target.value);
    var selectedItem = selectedItems.find(x=>x.id == itemId)
    if(selectedItem)
    {
        selectedItem.qty = quantity;
        selectedItem.price = (selectedItem.mrp * quantity) - (selectedItem.discount * quantity)
    }
    generateInvoiceItems();
    var element = $('#txtQty_'+itemId);
    element.focus();
    var v = element.val();
    element.val("");
    if(quantity > 0)
        element.val(v);
}

function saveInvoice()
{
    
    var data = {
        TotalAmount : Number($('#totalAmount').text()),
        TotalDiscount : Number($('#totalDiscount').text()),
        InvoicedDate : formatDateData(new Date()),
        InvoiceNumber : $('#lbl_invoiceNo').text(),
        Details : selectedItems
    };
    if(!validateInvoice(data))
        return;
    $('#lst_invoice').html('');
    $.post("http://localhost/iSmart/api/invoice/invoice_create.php",
    JSON.stringify(data),
    function(response, status)
    {
        if(response.status == true)
        {
            window.location = "getInvoice.html?id="+invoiceId;
        }
    }
    );
}

function validateInvoice(data)
{
    var isValid = true;
    data.Details.forEach(item=>{
        if(item.qty>item.stock)
        {
            $('#lbl_qty_'+item.id).removeClass('hide');
            isValid = false;
        }  
    });
    return isValid;
}
    
