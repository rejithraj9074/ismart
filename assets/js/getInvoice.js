var searchedItems = [];
var selectedItems = [];

$(document).ready(function () {
    $.post("http://localhost/iSmart/api/invoice/invoice_get.php",
    JSON.stringify({
        id : Number(new URLSearchParams(window.location.search).get("id"))
    }),
    function(response, status)
    {
        $('#lst_invoice').html('');
        $('#lbl_invoiceDate').text(formatDateData(response.invDate));
        $('#lbl_invoiceNo').text(response.invNo);
        generateInvoiceItems(response.invoicedetails);
    }
    ); 
});

function generateInvoiceItems(invoiceItems)
{
    var index = 0;
    var totalMrp = 0;
    var totalDiscount = 0;
    $('#lst_invoice').html('');
    invoiceItems.forEach(item => {
        index = index+1;
        totalMrp = totalMrp + (item.price * item.qty);
        totalDiscount = totalDiscount + (item.dis * item.qty);
        $('#lst_invoice').append(
            '<tr>'+
                '<td>' + index + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.price + '</td>' +
                '<td>' + item.dis + '</td>' +
                '<td class="invoiceQuantity">' + item.qty + '</td>' +
                '<td class="text-right">' + item.total + '</td>' +
            '</tr>');
    });
    $('#lst_invoice').append('<tr><th colspan="5" class="text-right">Total MRP </th><th class="text-right" id="totalMrp">'+totalMrp+'</th></tr>')
    $('#lst_invoice').append('<tr><th colspan="5" class="text-right">Discount </th><th class="text-right" id="totalDiscount">'+totalDiscount+'</th></tr>')
    $('#lst_invoice').append('<tr><th colspan="5" class="text-right">Amount to be paid </th><th class="text-right" id="totalAmount">'+(totalMrp - totalDiscount)+'</th></tr>')
}

function printInvoice()
{
    //$('#invoicePrint').hide();
    var printContents = document.getElementById('printableArea').innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}