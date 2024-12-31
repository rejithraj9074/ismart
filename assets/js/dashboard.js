$(document).ready(function () {

    $.get("http://localhost/iSmart/api/dashboard/dashboard.php",
    function(response, status)
    {
      $('#thisMonthSale').html('');
      $('#thisMonthOrders').html('');
      $('#thisMonthProfit').html('');
      $('#currentInventoryValue').html('');
      $('#thisMonthSale').text(response.sales);
      $('#thisMonthOrders').text(response.orders);
      $('#thisMonthProfit').text(response.profit);
      $('#currentInventoryValue').text(response.invValue);
      generateTopSellingItems(response.topSelling);
      generateTopProfitableItems(response.topProfitable);
    }
  );
});

function generateTopSellingItems(topSelling)
{
  $('#topSelling').html('');
  topSelling.forEach(item => {
    $('#topSelling').append(
      '<tr>'+
          '<td>' + item.name + '</td>' +
          '<td>' + item.qty + '</td>' +
          '<td>' + item.profit + '</td>' +
      '</tr>');
});
}

function generateTopProfitableItems(topProfitable)
{
  $('#topProfitable').html('');
  topProfitable.forEach(item => {
    $('#topProfitable').append(
      '<tr>'+
          '<td>' + item.name + '</td>' +
          '<td>' + item.qty + '</td>' +
          '<td>' + item.profit + '</td>' +
      '</tr>');
});
}