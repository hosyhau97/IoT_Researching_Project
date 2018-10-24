
$(document).ready(function () {
    var token = localStorage.getItem('token');

    function verify() {
        $.ajax({
            url: "http://localhost:3000/verify",
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
                console.log('success');
            },
            error: function (request, message, error) {
                var err_text = request.responseJSON.message;
                $("#error-message").text(err_text);
                console.log(request.responseJSON);
                console.log(message);
                window.location = "http://localhost:3000/";
            }
        });
    }
    //verify();
/*
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 25;
    var offset = 0;
    context.beginPath();
    context.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#EF6C00';
    context.fill();

    var canvas = document.getElementById('myCanvas1');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 25;
    var offset = 0;
    context.beginPath();
    context.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#EF6C00';
    context.fill();

    var canvas = document.getElementById('myCanvas2');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 25;
    var offset = 0;
    context.beginPath();
    context.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#EF6C00';
    context.fill();

    var canvas = document.getElementById('myCanvas3');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 25;
    var offset = 0;
    context.beginPath();
    context.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#EF6C00';
    context.fill();

    var canvas = document.getElementById('myCanvas4');
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 25;
    var offset = 0;
    context.beginPath();
    context.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#EF6C00';
    context.fill();
*/
    function setColorToCanvas(color, id) {
        var canvas = document.getElementById(id);
        var context = canvas.getContext('2d');
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = 25;
        var offset = 0;
        context.beginPath();
        context.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }
    $('#toggle_light').on('change', function () {
        setTurnOnOffForLight();
    })
    setTurnOnOffForLight();
    function setTurnOnOffForLight() {
        value = $('#toggle_light input').is(":checked");
        if(value === true){
            setColorToCanvas('#EF6C00', 'myCanvas');
            for (let i=1; i<=5;i++){
                let canvas = `myCanvas${i}`;
                setColorToCanvas('#EF6C00', canvas);
            }
        }
           
        else{
            setColorToCanvas('gray', 'myCanvas');
            for (let i=1; i<=5;i++){
                let canvas = `myCanvas${i}`;
                setColorToCanvas('gray', canvas);
            }
        }
            
    }
})