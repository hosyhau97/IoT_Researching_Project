
$(function () {
    var token = localStorage.getItem('token');
    var socket = io.connect();

    function verifyTokenLocalstorage() {
        var hours = 24;
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', now);
        } else {
            if (now - setupTime > hours * 60 * 60 * 1000) {
                localStorage.removeItem('token');
            }
        }
    }

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
    // END HỆ THỐNG ĐĂNG NHẬP

    /**
     * Sự kiện hệ thống đèn chiếu sáng
     */
    var on = "on";
    var off = "off";
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
            localStorage.setItem('light_1', on);
        }
        else if (message === 'off') {
            $(".light-green").attr("src", 'assets/img/pic_bulboff.gif');
            $('#toggle_light div').removeClass('on');
            $('#toggle_light div').addClass('off');
            localStorage.setItem('light_1', off);
        }
    }
    var light = localStorage.getItem('light_1');
    setServerTurnOnOffForLight(light);

    function initLightEngineValue(message) {
        var light_object = {};
        switch (message) {
            case "on":
                light_object = {
                    engine_type: "light_engine",
                    start_time: convertDateToTimestamp(new Date()),
                    end_time: null,
                    time_type: "start_time"
                }
                break;
            case "off":
                light_object = {
                    engine_type: "light_engine",
                    start_time: null,
                    end_time: convertDateToTimestamp(new Date()),
                    time_type: "start-end"
                }
                break;
            default:
                return null;
        }
        return light_object;
    }

    function setTurnOnOffForLight() {

        var check = false;
        value = $('#toggle_light input').is(":checked");
        if (value === true) {
            check = true;
            $(".light-green").attr("src", 'assets/img/pic_bulbon.gif');
            var light_object = initLightEngineValue('on');
            socket.emit('control/light/receive', { payload: { message: 'on', topic: 'control/light', light_object } });
        }
        else {
            $(".light-green").attr("src", 'assets/img/pic_bulboff.gif');
            var light_object = initLightEngineValue('off');
            socket.emit('control/light/receive', { payload: { message: 'off', topic: 'control/light', light_object } });
        }
        if (check) localStorage.setItem('light_1', on);
        else localStorage.setItem('light_1', off);
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

    function initWaterEngineValue(message) {
        var water_object = {};
        switch (message) {
            case "on":
                water_object = {
                    engine_type: "water_engine",
                    start_time: convertDateToTimestamp(new Date()),
                    end_time: null,
                    time_type: "start_time"
                }
                break;
            case "off":
                water_object = {
                    engine_type: "water_engine",
                    start_time: null,
                    end_time: convertDateToTimestamp(new Date()),
                    time_type: "start-end"
                }
                break;
            default:
                return null;
        }
        return water_object;
    }

    function setServerTurnOnOffForWartering(message) {
        if (message === 'on') {
            $(".wartering").attr("src", 'assets/img/wartering.gif')
            $('#toggle_wartering div').removeClass('off');
            $('#toggle_wartering div').addClass('on');
            localStorage.setItem('water_1', on);
        }
        else if (message === 'off') {
            $(".wartering").attr("src", 'assets/img/wartering-off.png')
            $('#toggle_wartering div').removeClass('on');
            $('#toggle_wartering div').addClass('off');
            localStorage.setItem('water_1', off);
        }
    }

    var water = localStorage.getItem('water_1');
    console.log(water);
    setServerTurnOnOffForWartering(water);

    function setTurnOnOffForWartering() {
        var check = false;
        value = $('#toggle_wartering input').is(":checked");
        if (value === true) {
            $(".wartering").attr("src", 'assets/img/wartering.gif');
            var water_object = initWaterEngineValue("on");
            check = true;
            socket.emit('control/water/receive', { payload: { message: 'on', topic: 'control/water', water_object } });
        }
        else {
            $(".wartering").attr("src", 'assets/img/wartering-off.png');
            check = false;
            var water_object = initWaterEngineValue("off");
            socket.emit('control/water/receive', { payload: { message: 'off', topic: 'control/water', water_object } });
        }
        if (check === true) localStorage.setItem("water_1", on);
        else localStorage.setItem("water_1", off);
    }

    $('#toggle_wartering').on('change', function () {
        setTurnOnOffForWartering();
    });

    /**
    * Sự kiện hệ thống quạt thông gió
    */

    function convertDateToTimestamp(date) {
        return Math.round(date.getTime() / 1000);
    }

    socket.on('control/fan', function (data) {
        var topic = data.topic;
        var message = data.message;
        console.log(`message = ${message}`);
        setServerTurnOnOffForVentilation(message);
    });

    function initFanEngineValue(message) {
        var fan_object = {};
        switch (message) {
            case "on":
                fan_object = {
                    engine_type: "fan_engine",
                    start_time: convertDateToTimestamp(new Date()),
                    end_time: null,
                    time_type: "start_time"
                }
                break;
            case "off":
                fan_object = {
                    engine_type: "fan_engine",
                    start_time: null,
                    end_time: convertDateToTimestamp(new Date()),
                    time_type: "start-end"
                }
                break;
            default:
                return null;
        }
        return fan_object;
    }

    function setServerTurnOnOffForVentilation(message) {
        if (message === 'on') {
            $(".ventilation").attr("src", 'assets/img/ventilation-on.gif');
            $('#toggle_ventilation div').removeClass('off');
            $('#toggle_ventilation div').addClass('on');
            localStorage.setItem('fan_1', on);
        }
        else if (message === 'off') {
            $(".ventilation").attr("src", 'assets/img/ventilation-off.png');
            $('#toggle_ventilation div').removeClass('on');
            $('#toggle_ventilation div').addClass('off');
            localStorage.setItem('fan_1', off);
        }
    }

    var fan = localStorage.getItem('fan_1');
    setServerTurnOnOffForVentilation(fan);

    function setTurnOnOffForVentilation() {
        var check = false;
        value = $('#toggle_ventilation input').is(":checked");
        if (value === true) {
            check = true;
            $(".ventilation").attr("src", 'assets/img/ventilation-on.gif');
            var fan_object = initFanEngineValue("on");
            socket.emit('control/fan/receive', { payload: { message: 'on', topic: 'control/fan', fan_object } });
        }
        else {
            check = false;
            $(".ventilation").attr("src", 'assets/img/ventilation-off.png');
            var fan_object = initFanEngineValue("off");
            socket.emit('control/fan/receive', { payload: { message: 'off', topic: 'control/fan', fan_object } });
        }
        if (check === true) localStorage.setItem('fan_1', on);
        else localStorage.setItem('fan_1', off);
    }
    $('#toggle_ventilation').on('change', function () {
        setTurnOnOffForVentilation();
    });
    // setTurnOnOffForVentilation();

    /**
    * Sự kiện hệ thống quạt mái che
    */

    function initRoofEngineValue(message) {
        var roof_object = {};
        switch (message) {
            case "on":
                roof_object = {
                    engine_type: "roof_engine",
                    start_time: convertDateToTimestamp(new Date()),
                    end_time: null,
                    time_type: "start_time"
                }
                break;
            case "off":
                roof_object = {
                    engine_type: "roof_engine",
                    start_time: null,
                    end_time: convertDateToTimestamp(new Date()),
                    time_type: "start-end"
                }
                break;
            default:
                return null;
        }
        return roof_object;
    }

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
            localStorage.setItem('roof_1', on);
        }
        else if (message === 'off') {
            $(".roof").attr("src", 'assets/img/roof-off.png');
            $('#toggle_roof div').removeClass('on');
            $('#toggle_roof div').addClass('off');
            localStorage.setItem('roof_1', off);
        }
    }

    var roof = localStorage.getItem('roof_1');
    setServerTurnOnOffForRoof(roof);

    function setTurnOnOffForRoof() {
        var check = false;
        value = $('#toggle_roof input').is(":checked");
        if (value === true) {
            check = true;
            $(".roof").attr("src", 'assets/img/roof-on.png');
            var roof_object = initRoofEngineValue("on");
            socket.emit('control/roof/receive', { payload: { message: 'on', topic: 'control/roof', roof_object } });
        }
        else {
            check = false;
            $(".roof").attr("src", 'assets/img/roof-off.png');
            var roof_object = initRoofEngineValue("off");
            socket.emit('control/roof/receive', { payload: { message: 'off', topic: 'control/roof', roof_object } });
        }
        if (check) localStorage.setItem('roof_1', on);
        else localStorage.setItem('roof_1', off);
    }
    $('#toggle_roof').on('change', function () {
        setTurnOnOffForRoof();
    });
});
