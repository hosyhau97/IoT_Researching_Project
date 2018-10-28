
   // get token from localStorage
    var token = localStorage.getItem('token');
    function verify(token) {
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
          window.location.href = "http://localhost:3000/home";
        },
        error: function (request, message, error) {
          var err_text = request.responseJSON.message;
          $("#error-message").text(err_text);
          console.log(request.responseJSON);
          console.log(message);
        }
      });
    }
    if (token !== null){
      verify(token);
    }
    console.log(`token1 = ${token}`);
    $.ajaxSetup({
      headers: {
        'x-access-token': token,
        'Content-type': 'application/json'
      }
    });

    //Sự kiện đăng nhập
    $("#btn-login").click(function () {
      var email = $("#email").val();
      var password = $("#password").val();

      $.ajax({
        url: "http://localhost:3000/api/auth/login",
        type: 'POST',
        async: false,
        data: JSON.stringify({
          "email": email,
          "password": password
        }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
          if (data.auth === true && data.token) {
            var token = data.token;
            var url = `http://localhost:3000/home`;
            localStorage.removeItem('token');
            localStorage.setItem("token", token);
            window.location.href = url;
          }
        },
        error: function (request, message, error) {
          var err_text = request.responseJSON.message;
          $("#error-message").text(err_text);

        }
      }); 

    })
    //Sự kiện nhấn nút quên mật khẩu
    $("#btn-forgot-password").click(function () {
      $("#btn-login").hide();
      $(".frg-password").hide();
      $(".body-fogot").show();
      $("#btn-prev").show();
      $(this).hide();
    })

    $(".btn-prev").click(function () {
      $("#btn-login").show();
      $(".frg-password").show();
      $(".body-fogot").hide();
      $("#btn-prev").hide();
      $("#btn-forgot-password").show();
    })
    $(".btn-next").click(function () {
      $(".body-fogot").hide();
      $(".control-email").hide();
      $(".active-code").show();
      $("#btn-accept").show();
    })