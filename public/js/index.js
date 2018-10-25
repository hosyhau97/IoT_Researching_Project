
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
    $('#toggle_light').on('change', controllerSystem.setTurnOnOffForLight_onClick)
    $(controllerSystem.setTurnOnOffForLight());

    $('#toggle_wartering').on('change', controllerSystem.setTurnOnOffForWartering_onClick);
    $(controllerSystem.setTurnOnOffForWartering());

    $('#toggle_ventilation').on('change', controllerSystem.setTurnOnOffForVentilation_onClick);
    $(controllerSystem.setTurnOnOffForVentilation());
})

var controllerSystem = Object.create({
    /**
     * Hệ thống quạt thông gió
     */
    setTurnOnOffForVentilation: function () {
        value = $('#toggle_ventilation input').is(":checked");
        if (value === true) {
            $(".ventilation").attr("src", 'assets/img/ventilation-on.gif')
        }
        else {
            $(".ventilation").attr("src", 'assets/img/ventilation-off.png')
        }
    },
    setTurnOnOffForVentilation_onClick: function () {
        $(controllerSystem.setTurnOnOffForVentilation());
    },
    /**
     * Hệ thống tưới nước
     */
    setTurnOnOffForWartering: function () {
        value = $('#toggle_wartering input').is(":checked");
        if (value === true) {
            $(".wartering").attr("src", 'assets/img/wartering.gif')
        }
        else {
            $(".wartering").attr("src", 'assets/img/wartering-off.png')
        }
    },
    setTurnOnOffForWartering_onClick: function () {
        $(controllerSystem.setTurnOnOffForWartering());
    },
    setTurnOnOffForLight: function () {
        value = $('#toggle_light input').is(":checked");
        if (value === true) {
            $(".light-green").attr("src", 'assets/img/pic_bulbon.gif');
        }
        else {
            $(".light-green").attr("src", 'assets/img/pic_bulboff.gif');
        }
    },
    setTurnOnOffForLight_onClick: function () {
        $(controllerSystem.setTurnOnOffForLight());
    }
})