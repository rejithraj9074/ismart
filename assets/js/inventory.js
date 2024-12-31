$(document).ready(function () {
     listStock("");
    //  setTimeout(() => {
    //     setInventoryMenu();    
    //  }, 1000);
});

function setInventoryMenu()
{
    var userFeatures = user.features;
    if(user.isAdmin || (userFeatures.find(x=>x.featureid == 36) != null))
    {
        $('#btnAddProduct').removeClass('hide');
        $('.mnu_editStock').removeClass('hide');
        $('.mnu_deleteStock').removeClass('hide');
    }
    if(userFeatures.find(x=>x.featureid == 27) != null)
        $('.mnu_viewStock').removeClass('hide');
}

function loadAddProduct()
{
    window.location = "addStock.html";
}

function listStock(searchKeyword)
{
    $.post("http://localhost/iSmart/api/product/product.php",
    JSON.stringify({
        searchkey : searchKeyword
    }),
    function(response, status)
    {
        if(response.data.length > 0)
        {
            $('#stock_footer').hide(); 
            $('#lst_stock').html('');
            response.data.forEach(stock => {
            $('#lst_stock').append(
                '<tr>' +
                    '<td>' + stock.itemname + '</td>' +
                    '<td>' + stock.category + '</td>' +
                    '<td>' + stock.subcategory + '</td>' +
                    '<td>' + stock.expdate + '</td>' +
                    '<td class="center-align">' + stock.qty + '</td>' +
                    '<td class="left-align">' + stock.mrp + '</td>' +
                    '<td class="left-align">' + stock.dis + '</td>' +
                    '<td class="left-align">' + stock.price + '</td>' +
                    '<td class="table-action">' + 
                        '<a href="#" class="mnu_editStock hide" onclick="editStock(' + stock.id + ', \'' + stock.itemname + '\')" id="btn_editFeature" key=""' + stock.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                        '<a href="#" class="mnu_viewStock hide" onclick="editStock(' + stock.id + ', \'' + stock.itemname + '\')" id="btn_editFeature" key=""' + stock.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-middle mr-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>' +
                        '<a href="#" class="mnu_deleteStock hide" onclick="deleteStock(' + stock.id + ', \'' + stock.itemname + '\')" id="btn_editFeature" key=""' + stock.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
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
  );
}

$(document).on("keyup", "#txt_productsearch", function (e)
{
    var searchkey = $('#txt_productsearch').val();
    if(searchkey.length > 2 || searchkey.length == 0)
    {
        listStock(searchkey);
    }
});

function editStock(id, name)
{
    window.location = "editStock.html?id="+id;
}

function deleteStock(id, name)
{
    $.post("http://localhost/iSmart/api/product/product_delete.php",
    JSON.stringify({
       id : id
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            listStock("");
            showSuccessNotification(name, "Item has been deleted successfully");
        }
        
    }
    );
}



    