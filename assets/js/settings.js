
var roleFeatures = [];
var roleFeatures1 = [];
var userRoles = [];
var userRoles1 = [];
$(document).ready(function () {
    setSettingsMenu();
});

function setSettingsMenu()
{
    if(user.isAdmin)
    {
        $('#tab_feature').removeClass('hide');
        $('#tab_role').removeClass('hide');
        $('#tab_user').removeClass('hide');
    }
}

$(document).on("click", "#tab_feature", function (e)
{
    getFeatures();
});

function getFeatures()
{
    $.get("http://localhost/iSmart/api/feature/feature.php",
      function(response, status)
      {
          $('#feature_pane').html('');
          response.forEach(feature => {
            $('#feature_pane').append(
                '<tr>' +
                    '<td>' + feature.name + '</td>' +
                    '<td class="table-action">' + 
                        // '<a href="#" onclick="editFeature(' + feature.id + ', \'' + feature.name + '\')" id="btn_editFeature" key=""' + feature.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                        // '<a href="#"  onclick="deleteFeature(' + feature.id + ', \'' + feature.name + '\')" id="btn_editFeature" key=""' + feature.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                    '</td>'+
                '</tr>');
          });
      }
    );
}

function getRoles()
{
    $.get("http://localhost/iSmart/api/role/role.php",
      function(response, status)
      {
          $('#role_pane').html('');
          response.forEach(role => {
            $('#role_pane').append(
                '<tr>' +
                    '<td>' + role.name + '</td>' +
                    '<td class="table-action">' + 
                        '<a href="#" onclick="editRole(' + role.id + ', \'' + role.name + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                        '<a href="#"  onclick="deleteRole(' + role.id + ', \'' + role.name + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                    '</td>'+
                '</tr>');
          });
      }
    );
}

function editFeature(id, name)
{
    $('#modal_feature').modal();
    $('#txt_featureUpdate').val(name);
    $("#btn_updateFeature").attr("onclick", "updateFeature(" + id + ")");
}

function updateFeature(id)
{
    debugger;
    var featureName = $('#txt_featureUpdate').val();
    if(featureName != "")
    {
        $.post("http://localhost/iSmart/api/feature/feature_update.php",
        JSON.stringify({
            id: id,
            name: featureName
        }),
        function(response, status)
        {
            if(response.status == true)
            {
                getFeatures();
                $('#modal_feature').modal('hide');
                showSuccessNotification(featureName, "Feature has been updated successfully");
            }
            
        }
        );
    }
    else{

    }
    
}



function deleteFeature(id, name)
{
    $('#modal_deletefeature').modal();
    $("#btn_deleteFeature").attr("onclick", "confirmDeleteFeature(" + id + ",'" + name + "')");   
}

function confirmDeleteFeature(id, name)
{
    $.post("http://localhost/iSmart/api/feature/feature_delete.php",
    JSON.stringify({
        id: id
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getFeatures();
            $('#modal_deletefeature').modal('hide');
            showSuccessNotification(name, "Feature has been deleted successfully");
        }
        
    }
    );
}

function onAddModalClick(){
    $('#txt_featureCreate').val("");
    $('#txt_roleCreate').val("");
    $('#txt_userFirst').val("");
    $('#txt_userLast').val("");
    $('#txt_userEmail').val("");
    $('#txt_userPhone').val("");
}

function createFeature()
{
    var featureName = $('#txt_featureCreate').val();
    if(featureName != "")
    {
        $.post("http://localhost/iSmart/api/feature/feature_create.php",
        JSON.stringify({
            name: featureName
        }),
        function(response, status)
        {
            if(response.status == true)
            {
                getFeatures();
                $('#modal_createfeature').modal('hide');
                showSuccessNotification(featureName, "Feature has been added successfully");
            }
            
        }
        );
    }
    else{

    }
}

function getAddRole()
{
    onAddModalClick();
    $('#modal_createrole').modal();
    $('#lst_features').html('');
    $('#roleFeature_pane').html('');
    $.get("http://localhost/iSmart/api/feature/feature.php",
      function(response, status)
      {
        roleFeatures = [];
        $('#lst_features').append('<option value="0">Select a feature and click the add button</option>');
          response.forEach(feature => {
            $('#lst_features').append('<option value="' + feature.id + '">' + feature.name +'</option>');
          });
      }
    );
    
}

function addfeaturetorole()
{
    var featureId = parseInt($('#lst_features').val());
    if(featureId != 0)
    {
        var feature = $( "#lst_features option:selected").text();
    
        if(roleFeatures.find(x=>x.id==featureId) == null)
        {
            roleFeatures.push(
                {
                    id: featureId, 
                    name: feature
                });
            refreshRoleFeatures();
        }
    }
}

function refreshRoleFeatures()
{
    $('#roleFeature_pane').html('');
    roleFeatures.forEach(feature => {
        $('#roleFeature_pane').append(
            '<tr>' +
                '<td>' + feature.name + '</td>' +
                '<td class="table-action">' +
                    '<a href="#" onclick="removeRoleFeature(' + feature.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                '</td>' +
            '</tr>'
        );
    });
}

function createRole()
{
    var data = {
        RoleName : $('#txt_roleCreate').val(),
        Features : roleFeatures
    }
    if(!validateRole(data))
    return;
    var roleFeaturesData = [];
    roleFeatures.forEach(feature => {
        roleFeaturesData.push(feature.id)
    });
    $.post("http://localhost/iSmart/api/role/role_create.php",
    JSON.stringify({
        name: $('#txt_roleCreate').val(),
        features: roleFeaturesData
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getRoles();
            var name = $('#txt_roleCreate').val();
            $('#modal_createrole').modal('hide');
            showSuccessNotification(name, "Role has been deleted successfully");
        }

        else
        {
            $('#validateRoleName').removeClass("hide");
        }
        
    }
    );
}

function validateRole(data)
{
    var isValid = true;
    if(data.RoleName == "")
    {
        $('#validateCreateRoleName').removeClass("hide");
        isValid = false;
    }
    if(data.Features.length == 0)
    {
        $('#validateCreateRoleFeature').removeClass("hide");
        isValid = false;
    }
    return isValid;
}
$(document).on("keypress", "#txt_roleCreate", function (e)
{
    $('#validateCreateRoleName').addClass("hide");
    $('#validateRoleName').addClass("hide");
});

$(document).on("click", "#lst_features", function (e)
{
    $('#validateCreateRoleFeature').addClass("hide");
});

function updateRole(id)
{
    var data = {
        RoleName : $('#txt_roleEdit').val(),
        Features : roleFeatures1
    }
    if(!validateEditRole(data))
    return;
    var roleFeaturesData = [];
    roleFeatures1.forEach(feature => {
        roleFeaturesData.push(feature.id)
    });
    $.post("http://localhost/iSmart/api/role/role_update.php",
    JSON.stringify({
        name: $('#txt_roleEdit').val(),
        features: roleFeaturesData,
        id : id
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getRoles();
            var name = $('#txt_roleEdit').val();
            $('#modal_editrole').modal('hide');
            showSuccessNotification(name, "Role has been updated successfully");
        }
        else
        {
            $('#validateRoleNameEdit').removeClass("hide");
        }
        
    }
    );
}

function validateEditRole(data)
{
    var isValid = true;
    if(data.RoleName == "")
    {
        $('#validateEditRoleName').removeClass("hide");
        isValid = false;
    }
    if(data.Features.length == 0)
    {
        $('#validateEditRoleFeature').removeClass("hide");
        isValid = false;
    }
    return isValid;
}

$(document).on("keypress", "#txt_roleEdit", function (e)
{
    $('#validateRoleNameEdit').addClass("hide");
    $('#validateEditRoleName').addClass("hide");
});

$(document).on("click", "#lst_features1", function (e)
{
    $('#validateEditRoleFeature').addClass("hide");
});

function removeRoleFeature(featureId)
{
    roleFeatures = roleFeatures.filter(x=>x.id!=featureId);
    refreshRoleFeatures();
}


function deleteRole(id, name)
{
    $('#modal_deleterole').modal();
    $("#btn_deleteRole").attr("onclick", "confirmDeleteRole(" + id + ",'" + name + "')");   
}

function confirmDeleteRole(id, name)
{
    $.post("http://localhost/iSmart/api/role/role_delete.php",
    JSON.stringify({
        id: id
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getRoles();
            $('#modal_deleterole').modal('hide');
            showSuccessNotification(name, "Role has been deleted successfully");
        }
        
    }
    );
}


function editRole(id, name)
{ 
    //roleFeatures1 = [];
    $('#modal_editrole').modal();
    $('#txt_roleEdit').val(name);
    $.post("http://localhost/iSmart/api/role/rolefeature.php",
        JSON.stringify({
            id:id
        }),
        function(response, status)
        {
            if(response.data.length > 0)
            {
                $('#roleFeature_pane1').html('');
                roleFeatures1 = response.data;

                roleFeatures1.forEach(feature => {
                    $('#roleFeature_pane1').append(
                        '<tr>' +
                            '<td>' + feature.name + '</td>' +
                            '<td class="table-action">' +
                                '<a href="#" onclick="removeRoleFeature1(' + feature.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                            '</td>' +
                        '</tr>');
                });
            }
            else
            {
                roleFeatures1 = [];
                $('#roleFeature_pane1').html('');
            } 
            
        }
        );

        $.get("http://localhost/iSmart/api/feature/feature.php",
        function(response, status)
        {
            $('#lst_features1').html('');  
          //roleFeatures1 = [];
          $('#lst_features1').append('<option value="0">Select a feature and click the add button</option>');
            response.forEach(feature => {
              $('#lst_features1').append('<option value="' + feature.id + '">' + feature.name +'</option>');
            });
        }
      ); 
      $("#btn_updateRole").attr("onclick", " updateRole(" + id + ")");   
}


function addfeaturetorole1()
{
    var featureId = parseInt($('#lst_features1').val());
    if(featureId != 0)
    {
        var feature = $( "#lst_features1 option:selected").text();
    
        if(roleFeatures1.find(x=>x.id==featureId) == null)
        {
            roleFeatures1.push(
                {
                    id: featureId, 
                    name: feature
                });
            refreshRoleFeatures1();
        }
    }
}

function refreshRoleFeatures1()
{
    $('#roleFeature_pane1').html('');
    roleFeatures1.forEach(feature => {
        $('#roleFeature_pane1').append(
            '<tr>' +
                '<td>' + feature.name + '</td>' +
                '<td class="table-action">' +
                    '<a href="#" onclick="removeRoleFeature1(' + feature.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                '</td>' +
            '</tr>'
        );
    });

}

function removeRoleFeature1(featureId)
{
    roleFeatures1 = roleFeatures1.filter(x=>x.id!=featureId);
    refreshRoleFeatures1();
}

function getUsers()
{
    $.get("http://localhost/iSmart/api/user/user.php",
      function(response, status)
      {
          $('#user_pane').html('');
          response.forEach(user => {
            $('#user_pane').append(
                '<tr>' +
                    '<td>' + user.firstname + ' ' + user.lastname + '</td>' +
                    '<td class="table-action">' + 
                        '<a href="#" onclick="editUser(' + user.id + ', \'' + user.firstname + '\',\'' + user.lastname + '\',\'' + user.email + '\',\'' + user.phone + '\')" id="btn_editfeature" key=""' + user.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>' +
                        '<a href="#"  onclick="deleteUser(' + user.id + ', \'' + user.firstname + '\',\'' + user.lastname + '\')" id="btn_deleteUser" key=""' + user.id + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                    '</td>'+
                '</tr>');
          });
      }
    );
}

function createUser()
{
    var data = {
        FirstName : $('#txt_userFirst').val(),
        LastName : $('#txt_userLast').val(),
        Email : $('#txt_userEmail').val(),
        Phone : $('#txt_userPhone').val(),
        Roles : userRoles 
    }
    if(!validateUser(data))
    return;
    var userRolesData = [];
    userRoles.forEach(role => {
        userRolesData.push(role.id)
    });
    $.post("http://localhost/iSmart/api/user/user_create.php",
    JSON.stringify({
        firstname : $('#txt_userFirst').val(),
        lastname : $('#txt_userLast').val(),
        email : $('#txt_userEmail').val(),
        mobile : $('#txt_userPhone').val(),
        roles :  userRolesData 
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getUsers();
            var name1 = $('#txt_userFirst').val();
            var name2 = $('#txt_userLast').val();
            var name = name1 + name2;
            $('#modal_createuser').modal('hide');
            showSuccessNotification(name, "User has been deleted successfully");
        }
        
    }
    );
}

function updateUser(id)
{
    var data = {
        FirstName : $('#txt_userFirst1').val(),
        LastName : $('#txt_userLast1').val(),
        Email : $('#txt_userEmail1').val(),
        Phone : $('#txt_userPhone1').val(),
        Roles : userRoles1 
    }
    if(!validateeditUser(data))
    return;
    var userRolesData = [];
    userRoles1.forEach(role => {
        userRolesData.push(role.id)
    });
    $.post("http://localhost/iSmart/api/user/user_update.php",
    JSON.stringify({
        id : id,
        firstname : $('#txt_userFirst1').val(),
        lastname : $('#txt_userLast1').val(),
        email : $('#txt_userEmail1').val(),
        mobile : $('#txt_userPhone1').val(),
        roles: userRolesData
        
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getUsers();
            var name1 = $('#txt_userFirst1').val();
            var name2 = $('#txt_userLast1').val();
            var name = name1 + name2;
            $('#modal_edituser').modal('hide');
            showSuccessNotification(name, "User has been updated successfully");
        }
        
    }
    );
}

function getAddUser()
{
    onAddModalClick();
    $('#modal_createuser').modal();
    $('#lst_roles').html('');
    $('#userRole_pane').html('');
    $.get("http://localhost/iSmart/api/role/role.php",
      function(response, status)
      {
        userRoles = [];
        $('#lst_roles').append('<option value="0">Select a role and click the add button</option>');
          response.forEach(role => {
            $('#lst_roles').append('<option value="' + role.id + '">' + role.name +'</option>');
          });
      }
    );
    
}

function addroletouser()
{
    $("#validateCreateUserRole").addClass('hide')
    var roleId = parseInt($('#lst_roles').val());
    if(roleId != 0)
    {
        var role = $( "#lst_roles option:selected").text();
    
        if(userRoles.find(x=>x.id==roleId) == null)
        {
            userRoles.push(
                {
                    id: roleId, 
                    name: role
                });
            refreshUserRoles();
        }
    }
}

function refreshUserRoles()
{
    $('#userRole_pane').html('');
    userRoles.forEach(role => {
        $('#userRole_pane').append(
            '<tr>' +
                '<td>' + role.name + '</td>' +
                '<td class="table-action">' +
                    '<a href="#" onclick="removeUserRole(' + role.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                '</td>' +
            '</tr>'
        );
    });
}

function removeUserRole(roleId)
{
    userRoles = userRoles.filter(x=>x.id!=roleId);
    refreshUserRoles();
}

function editUser(id, firstname, lastname, email, phone)
{
    $('#modal_edituser').modal();
    $('#txt_userFirst1').val(firstname);
    $('#txt_userLast1').val(lastname);
    $('#txt_userEmail1').val(email);
    $('#txt_userPhone1').val(phone);
    $.post("http://localhost/iSmart/api/user/userrole.php",
        JSON.stringify({
            id:id
        }),
        function(response, status)
        {
            if(response.data.length > 0)
            {
                $('#userRole_pane1').html('');
                userRoles1 = response.data;

                userRoles1.forEach(role => {
                    $('#userRole_pane1').append(
                        '<tr>' +
                            '<td>' + role.name + '</td>' +
                            '<td class="table-action">' +
                                '<a href="#" onclick="removeUserRole1(' + role.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                            '</td>' +
                        '</tr>');
                });
            }
            else
            {
                userRoles1 = [];
                $('#userRole_pane1').html('');
            }    
            
        }
        );

        $.get("http://localhost/iSmart/api/role/role.php",
        function(response, status)
        {
            $('#lst_roles1').html('');  
           // userRoles1 = [];
          $('#lst_roles1').append('<option value="0">Select a role and click the add button</option>');
            response.forEach(role => {
              $('#lst_roles1').append('<option value="' + role.id + '">' + role.name +'</option>');
            });
        }
      );  
      $("#btn_updateUser").attr("onclick", " updateUser(" + id + ")");    
}

function addroletouser1()
{
    $("#validateCreateUseRole").addClass('hide')
    var roleId = parseInt($('#lst_roles1').val());
    if(roleId != 0)
    {
        var role = $( "#lst_roles1 option:selected").text();
    
        if(userRoles1.find(x=>x.id==roleId) == null)
        {
            userRoles1.push(
                {
                    id: roleId, 
                    name: role
                });
            refreshUserRoles1();
        }
    }
}

function removeUserRole1(roleId)
{
    userRoles1 = userRoles1.filter(x=>x.id!=roleId);
    refreshUserRoles1();
}

function refreshUserRoles1()
{
    $('#userRole_pane1').html('');
    userRoles1.forEach(role => {
        $('#userRole_pane1').append(
            '<tr>' +
                '<td>' + role.name + '</td>' +
                '<td class="table-action">' +
                    '<a href="#" onclick="removeUserRole1(' + role.id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>' +
                '</td>' +
            '</tr>'
        );
    });

}

function deleteUser(id, firstname, lastname)
{
    var name = firstname + lastname;
    $('#modal_deleteuser').modal();
    $("#btn_deleteuser").attr("onclick", "confirmDeleteUser(" + id + ",'" + name + "')");   
}

function confirmDeleteUser(id, name)
{
    $.post("http://localhost/iSmart/api/user/user_delete.php",
    JSON.stringify({
        id: id
    }),
    function(response, status)
    {
        if(response.status == true)
        {
            getUsers();
            $('#modal_deleteuser').modal('hide');
            showSuccessNotification(name, "User has been deleted successfully");
        }
        
    }
    );
}

function PasswordReset()
{
    var newPassword = $('#NewPassword').val();
    var currentPassword = $('#CurrentPassword').val();
    var confirmPassword = $('#ConfirmPassword').val();
    var id = user.id;
    if(newPassword == confirmPassword)
    {
        $.post("http://localhost/iSmart/api/password/password_reset.php",
        JSON.stringify({
            id: id,
            currentPassword : currentPassword,
            newPassword : newPassword          
         }),
        function(response, status)
        {
            if(response.status == true)
            {
                $('#CurrentPassword').val('');
                $('#ConfirmPassword').val('');
                $('#NewPassword').val('');
                showSuccessNotification(name, "Password changed successfully");
            }
            else
            {
                $('#validateCurrentPassword').removeClass("hide");
            }
            
        }
        );
    }
    else
    {
        $('#newPassword').removeClass("hide");
    }
}

$(document).on("keypress", "#CurrentPassword", function (e)
{
    $('#validateCurrentPassword').addClass("hide");
});

$(document).on("keypress", "#ConfirmPassword", function (e)
{
    $('#newPassword').addClass("hide");
});

$(document).on("keypress", "#NewPassword", function (e)
{
    $('#newPassword').addClass("hide");
});


function validateUser(data)
{
    var isValid = true;

    if(data.FirstName == "")
    {
        showError("#validateCreateUserName");
        isValid = false;
    }
    if(data.LastName == "")
    {
        showError("#validateCreateUserName1");
        isValid = false;
    }

    if(data.Email == "")
    {
        showError("#validateCreateUserEmail");
        isValid = false;
    }
    if(data.Phone == "")
    {
        showError("#validateCreateUserMobile");
        isValid = false;
    }
    if(data.Roles.length == 0)
    {
        showError("#validateCreateUserRole");
        isValid = false;
    }
    return isValid;
}

function validateeditUser(data)
{
    var isValid = true;

    if(data.FirstName == "")
    {
        showError("#validateCreateUseName");
        isValid = false;
    }
    if(data.LastName == "")
    {
        showError("#validateCreateUseName1");
        isValid = false;
    }

    if(data.Email == "")
    {
        showError("#validateCreateUseEmail");
        isValid = false;
    }
    if(data.Phone == "")
    {
        showError("#validateCreateUsePhone");
        isValid = false;
    }
    if(data.Roles.length == 0)
    {
        showError("#validateCreateUseRole");
        isValid = false;
    }
    return isValid;
}