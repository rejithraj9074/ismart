$(document).ready(function () {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('notifications');
});

$(document).on("click", "#btn_Signin", function (e)
{
    var uname = $("#username").val();
    var pswd = $("#password").val();

    if(uname == "")
    {
        setErrorMessage("Username is mandatory");
        return;
    }
    else if(pswd == "")
    {
        setErrorMessage("Password is mandatory");
        return;
    }

    $.post("http://localhost/iSmart/api/user/login.php",
      JSON.stringify({
        username: uname,
        password: pswd
      }),
      function(response, status)
      {
        if(response.id == null)
            setErrorMessage(response.message);
        else   
        {
            window.localStorage.setItem('user', JSON.stringify(response));
            window.localStorage.setItem('notifications', JSON.stringify({data:[]}));
            window.location.href = "static/Home.html";
        }
      }
    );
});

$(document).on("keypress", "#username", function (e)
{
    setErrorMessage("");
});

$(document).on("keypress", "#password", function (e)
{
    setErrorMessage("");
});

function setErrorMessage(message)
{
    $('#errorMsg').html(message);
}