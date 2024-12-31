$(document).ready(function () {
    $('#lbl_welcome').html(user.name);
});

function setPassword()
{
    newpswd = $('#txt_newPassword').val();
    confirmpswd = $('#txt_confirmPassword').val();
    if(newpswd == confirmpswd)
    {
        $.post("http://localhost/iSmart/api/password/password_set.php",
        JSON.stringify({
            id : user.id,
            Password : newpswd
        }),
        function(response, status)
        {
            if(response.status == true)
            {
                $('#modal_resetpswd').modal('hide');
                loadMenu();
                showSuccessNotification(name, "Password reset is success");
            }
        }
        );
    }
    else
    {
        $('#validatepswd').removeClass("hide");
    }
}
