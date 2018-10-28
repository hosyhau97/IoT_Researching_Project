
$(function () {
    var token = localStorage.getItem('token');
    var socket = io.connect();

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
                window.location = "http://localhost:3000/";
            }
        });
    }
    verify();
    /**
     * Sự kiện hệ thống đèn chiếu sáng
     */
    socket.on('control/light', function (data) {
        var topic = data.topic;
        var message = data.message;
        console.log(`message = ${message}`);
        setServerTurnOnOffForLight(message);
    });

    function setServerTurnOnOffForLight(message) {
        if (message === 'on') {
            $(".light-green").attr("src", 'assets/img/pic_bulbon.gif');
            $('#toggle_light div').removeClass('off');
            $('#toggle_light div').addClass('on');
        }
        else if (message === 'off') {
            $(".light-green").attr("src", 'assets/img/pic_bulboff.gif');
            $('#toggle_light div').removeClass('on');
            $('#toggle_light div').addClass('off');
        }
    }

    function setTurnOnOffForLight() {
        value = $('#toggle_light input').is(":checked");
        if (value === true) {
            $(".light-green").attr("src", 'assets/img/pic_bulbon.gif');
            socket.emit('control/light/receive', { payload: { message: 'on', topic: 'control/light' } });
        }
        else {
            $(".light-green").attr("src", 'assets/img/pic_bulboff.gif');
            socket.emit('control/light/receive', { payload: { message: 'off', topic: 'control/light' } });
        }
    }
    
    $('#toggle_light').on('change', function () {
        setTurnOnOffForLight();
    });

    /**
      * Sự kiện hệ thống tưới nước
      */

    socket.on('control/water', function (data) {
        var topic = data.topic;
        var message = data.message;
        console.log(`message = ${message}`);
        setServerTurnOnOffForWartering(message);
    });

    function setServerTurnOnOffForWartering(message) {
        if (message === 'on') {
            $(".wartering").attr("src", 'assets/img/wartering.gif')
            $('#toggle_wartering div').removeClass('off');
            $('#toggle_wartering div').addClass('on');
        }
        else if (message === 'off') {
            $(".wartering").attr("src", 'assets/img/wartering-off.png')
            $('#toggle_wartering div').removeClass('on');
            $('#toggle_wartering div').addClass('off');
        }
    }

    function setTurnOnOffForWartering() {
        value = $('#toggle_wartering input').is(":checked");
        if (value === true) {
            $(".wartering").attr("src", 'assets/img/wartering.gif')
            socket.emit('control/water/receive', { payload: { message: 'on', topic: 'control/water' } });
        }
        else {
            $(".wartering").attr("src", 'assets/img/wartering-off.png')
            socket.emit('control/water/receive', { payload: { message: 'off', topic: 'control/water' } });
        }
    }
    $('#toggle_wartering').on('change', function () {
        setTurnOnOffForWartering();
    });

    /**
    * Sự kiện hệ thống quạt thông gió
    */

    socket.on('control/fan', function (data) {
        var topic = data.topic;
        var message = data.message;
        console.log(`message = ${message}`);
        setServerTurnOnOffForVentilation(message);
    });

    function setServerTurnOnOffForVentilation(message) {
        if (message === 'on') {
            $(".ventilation").attr("src", 'assets/img/ventilation-on.gif');
            $('#toggle_ventilation div').removeClass('off');
            $('#toggle_ventilation div').addClass('on');
        }
        else if (message === 'off') {
            $(".ventilation").attr("src", 'assets/img/ventilation-off.png');
            $('#toggle_ventilation div').removeClass('on');
            $('#toggle_ventilation div').addClass('off');
        }
    }

    function setTurnOnOffForVentilation() {
        value = $('#toggle_ventilation input').is(":checked");
        if (value === true) {
            $(".ventilation").attr("src", 'assets/img/ventilation-on.gif');
            socket.emit('control/fan/receive', { payload: { message: 'on', topic: 'control/fan' } });
        }
        else {
            $(".ventilation").attr("src", 'assets/img/ventilation-off.png');
            socket.emit('control/fan/receive', { payload: { message: 'off', topic: 'control/fan' } });
        }
    }
    $('#toggle_ventilation').on('change', function () {
        setTurnOnOffForVentilation();
    });
    // setTurnOnOffForVentilation();

    /**
    * Sự kiện hệ thống quạt mái che
    */

    socket.on('control/roof', function (data) {
        var topic = data.topic;
        var message = data.message;
        console.log(`message = ${message}`);
        setServerTurnOnOffForRoof(message);
    });

    function setServerTurnOnOffForRoof(message) {
        if (message === 'on') {
            $(".roof").attr("src", 'assets/img/roof-on.png');
            $('#toggle_roof div').removeClass('off');
            $('#toggle_roof div').addClass('on');
        }
        else if (message === 'off') {
            $(".roof").attr("src", 'assets/img/roof-off.png');
            $('#toggle_roof div').removeClass('on');
            $('#toggle_roof div').addClass('off');
        }
    }

    function setTurnOnOffForRoof() {
        value = $('#toggle_roof input').is(":checked");
        if (value === true) {
            $(".roof").attr("src", 'assets/img/roof-on.png');
            socket.emit('control/roof/receive', { payload: { message: 'on', topic: 'control/roof' } });
        }
        else {
            $(".roof").attr("src", 'assets/img/roof-off.png');
            socket.emit('control/roof/receive', { payload: { message: 'off', topic: 'control/roof' } });
        }
    }
    $('#toggle_roof').on('change', function () {
        setTurnOnOffForRoof();
    });
});
