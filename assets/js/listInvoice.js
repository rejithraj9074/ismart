$(document).ready(function () {
     listInvoice("");
     setInvoiceMenu();
});

function setInvoiceMenu()
{
    var userFeatures = user.features;
    if(user.isAdmin || (userFeatures.find(x=>x.featureid == 37) != null))
    {
        $('#btnAddInvoice').removeClass('hide');
    }
}

function loadAddProduct()
{
    window.location = "addStock.html";
}

function listInvoice(searchKeyword)
{
    $.post("http://localhost/iSmart/api/invoice/invoice.php",
    JSON.stringify({
        searchkey : searchKeyword
    }),
    function(response, status)
    {
        if(response.data.length > 0)
        {
            $('#invoice_footer').hide(); 
            $('#lst_invoice').html('');
            response.data.forEach(invoice => {
            $('#lst_invoice').append(
                '<tr>' +
                    '<td>' + invoice.invoiceNo + '</td>' +
                    '<td>' + invoice.invoicedDate + '</td>' +
                    '<td style="text-align: right;">' + invoice.totalAmount + '</td>' +
                    '<td style="text-align: right;" class="table-action">' + 
                        '<a href="#" onclick="viewInvoice(' + invoice.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-middle mr-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>' +
                    '</td>'+
                '</tr>');
            });
        }
        else
        {   
            $('#lst_invoice').html('');
            $('#invoice_footer').show(); 
        }    
    }
  );
}

$(document).on("keyup", "#txt_invoicesearch", function (e)
{
    var searchkey = $('#txt_invoicesearch').val();
    if(searchkey.length > 2 || searchkey.length == 0)
    {
        listInvoice(searchkey);
    }
});

function loadAddInvoice()
{
    window.location = "createInvoice.html"
}

function viewInvoice(id)
{
    window.location = "getInvoice.html?id="+id;
}




    