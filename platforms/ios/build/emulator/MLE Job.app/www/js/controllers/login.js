App.controller('login', function (page) {
  $(page).on('appReady', function () {
    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    // Login
    $(this).find('#login-form').submit(function() {
      $.ajax({
        type: 'POST',
        headers: {
          "Accept": "application/json"
        },
        url: baseUrl + '/api/login',
        data: {
          email: $(this).find('#login-email').val(),
          password: $(this).find('#login-password').val()
        },
        success: function(data) {
          if (data.api_token) {
            localStorage.setItem('api_token', data.api_token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            App.load('home', 'fade');
          } else {
            navigator.notification.alert(
              'Wrong Email/Phone or Password!',
              function() {},
              'Error',
              'Done'
            );
          }
        },
        error: function(err) {
          navigator.notification.alert(
            'Wrong Email/Phone or Password!',
            function() {},
            'Error',
            'Done'
          );
        }
      });
      return false;
    });

    $(this).find('.mdl-button--facebook').on('click', function(e) {
      e.preventDefault();
    });

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));
  });

  this.transition = 'slide-left';
});