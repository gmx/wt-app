App.controller('login', function (page) {
  $(page).on('appLayout', function() {
    languageSetup(page);
  });

  $(page).on('appReady', function () {
    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    // Facebook Login
    $(this).find('.mdl-button--facebook').on('click', function(e) {
      e.preventDefault();

      FB.login(function(response) {
        if (response.authResponse && response.grantedScopes == 'public_profle,email') {
          FB.api('/me', { fields: 'name, email, id' }, function(response) {
            $.ajax({
              type: 'POST',
              headers: {
                "Accept": "application/json"
              },
              url: baseUrl + '/api/fb_login',
              data: {
                email: response.email,
                name: response.name,
                facebook_id: response.id
              },
              success: function(data) {
                if (data.api_token) {
                  localStorage.setItem('api_token', data.api_token);
                  localStorage.setItem('id', data.id);
                  localStorage.setItem('name', data.name);
                  localStorage.setItem('email', data.email);
                  localStorage.setItem('role', data.role);
                  localStorage.setItem('fb_login', true);
                  localStorage.setItem('cv_count', data.cv_count);

                  App.load('home', 'fade');
                } else {
                  showAlert('Error', 'Failed to login using Facebook!', 'Done');
                }
              },
              error: function(err) {
                showAlert('Error', 'Failed to login using Facebook!', 'Done');
              }
            });
          });
        } else {
          showAlert('Error', 'Email address is required! Please allow permission to get your email.', 'Done');
        }
      }, {
        scope: 'public_profile, email',
        return_scopes: true,
        auth_type: 'rerequest'
      });
    });

    // Login
    $(this).find('#login-form').submit(function(e) {
      e.preventDefault();
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
          if (data.api_token && data.role !== 9) {
            localStorage.setItem('api_token', data.api_token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            localStorage.setItem('cv_count', data.cv_count);
            App.load('home', 'fade');
          } else {
            showAlert('Error', 'Wrong Email/Phone or Password!', 'Done');
          }
        },
        error: function(err) {
          showAlert('Error', 'Wrong Email/Phone or Password!', 'Done');
        }
      });
    });

    $(this).find('.mdl-button--facebook').on('click', function(e) {
      e.preventDefault();
    });

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));
  });

  this.transition = 'slide-left';
});