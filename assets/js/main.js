var user = JSON.parse(window.localStorage.getItem('user'));
if(user == null)
    window.location.href = "../Login.html";

$(document).ready(function () {
    $('#lbl_profile').html(user.name);
    refreshNotifications();
    if(!user.isSet)
        showResetPassword();
    else
        loadMenu();
});

function showResetPassword()
{
    $('#modal_resetpswd').modal();
}

function refreshNotifications()
{
    var notifications = JSON.parse(window.localStorage.getItem('notifications'));
    var alertsCount = notifications.data.length;
    $('#alertCount').html(alertsCount);
    if(alertsCount > 0)
    {
        $('#alertsFooter').hide();
        $('#alertList').html('');
        notifications.data.forEach(alert => {
            $('#alertList').append(
                '<a href="#" class="list-group-item">' +
                    '<div class="row g-0 align-items-center">' +
                        '<div class="col-2">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell text-warning"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>' +
                        '</div>' +
                        '<div class="col-10">' +
                            '<div class="text-dark">' + alert.title + '</div>' +
                                '<div class="text-muted small mt-1">' + alert.message + '.</div>' +
                                '<div class="text-muted small mt-1">' + alert.date + '</div>' +
                            '</div>' +
                        '</div>' +
                    '</a>'    
            );
            
        });
    }
    else
    {
        $('#alertsFooter').hide();
    }
}


function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  function showSuccessNotification(title, message)
{
    $('#alert_featureUpdate').removeClass('hide');
    setTimeout(() => {
        $('#alert_featureUpdate').addClass('hide');
    }, 1000);
    $('#alert_message').html(message);
    var notifications = JSON.parse(window.localStorage.getItem('notifications'));
    notifications.data.push({title: title, message: message, date: formatDate(new Date()), type: 1});
    window.localStorage.setItem('notifications', JSON.stringify(notifications));
    refreshNotifications();
}

function formatDateData(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function priceCalculation()
{
    var buyingPrice = Number($('#txt_ProductBuyingPrice').val());
    var mrp = Number($('#txt_ProductMrp').val());
    var discount = Number($('#txt_ProductDiscount').val());
    $('#txt_ProductPrice').val(mrp - discount);                       
    $('#txt_ProductProfit').val(mrp - discount - buyingPrice);
}

function productEditpriceCalculation()
{
    var buyingPrice = Number($('#txt_ProducteditBuyingPrice').val());
    var mrp = Number($('#txt_ProducteditMrp').val());
    var discount = Number($('#txt_ProducteditDiscount').val());
    $('#txt_ProducteditPrice').val(mrp - discount);                       
    $('#txt_ProducteditProfit').val(mrp - discount - buyingPrice);
}


function subcategory()
{
    hideError('#lbl_Error_Category');
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

    }

    ); 
}

function loadMenu()
{
    if(user.isAdmin)
    {
        $('#mnu_dashboard').removeClass('hide');
        $('#mnu_settings').removeClass('hide');
        $('#mnu_invoice').removeClass('hide');
        $('#mnu_stock').removeClass('hide');
        $('#mnu_profileSettings').removeClass('hide');
    }
    else
    {
        var userFeatures = user.features;
        if(userFeatures.find(x=>x.featureid == 3) != null)
            $('#mnu_dashboard').removeClass('hide');
        if(userFeatures.find(x=>x.featureid == 26) != null)
        {
            $('#mnu_settings').removeClass('hide');
            $('#mnu_profileSettings').removeClass('hide');
        }
        if((userFeatures.find(x=>x.featureid == 27) != null) || (userFeatures.find(x=>x.featureid == 36) != null))
            $('#mnu_stock').removeClass('hide');
        if((userFeatures.find(x=>x.featureid == 37) != null) || (userFeatures.find(x=>x.featureid == 38) != null))
            $('#mnu_invoice').removeClass('hide');
    }
}

function showError(elem)
{
    $(elem).removeClass('hide');
}

function hideError(elem)
{
    $(elem).addClass('hide');
}