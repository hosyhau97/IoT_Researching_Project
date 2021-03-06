$(document).ready(function(){
    $('.sensor-parent').click(function(){
        $('.nav-sub-sensor').toggle();
    });
    $('.engine-parent').click(function(){
        $('.nav-sub-engine').toggle();
    });
    $('.data-sensor').click(function(){
        $('.nav-sub-data-sensor').toggle();
    });
    $('.data-engine').click(function(){
        $('.nav-sub-data-engine').toggle();
    });
    $("#logout").click(function(){
        localStorage.removeItem('token');
    });
});

function verify() {
    var token = localStorage.getItem('token');
    var check = false;
    var url = getUrl();
    $.ajax({
        url: url+"verify",
        type: 'POST',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("x-access-token", token);
        },
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            check = true;
        },
        error: function (request, message, error) {
            window.location = url;
        }
    });
    return check;
}

var x = verify();
