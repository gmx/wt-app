App.controller('register', function (page) {
  $(page).on('appLayout', function() {
    languageSetup(page);
  });

  $(page).on('appReady', function () {
    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    $(page).find('form').on('submit', function() {
      if (!$(this).find('#agree_terms_of_service').attr('checked')) {
        showAlert('Alert', 'Pleace check Terms of Service!', 'Done');
      } else {
        $(page).find('form').addClass('hide');
        $(page).find('.loader').removeClass('hide');
        $.ajax({
          type: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          url: baseUrl + '/api/register',
          data: {
            name: $(this).find("input[name='name']").val(),
            email: $(this).find("input[name='email']").val(),
            password: $(this).find("input[name='password']").val(),
            password_confirmation: $(this).find("input[name='password_confirmation']").val(),
            role: $(this).find("input[name='role']:checked").val()
          },
          success: function(data) {
            localStorage.setItem('api_token', data.api_token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            App.load('home', 'fade');
          },
          error: function(err) {
            $(page).find('form').removeClass('hide');
            $(page).find('.loader').addClass('hide');
            var errorMessages = JSON.parse(err.response);
            showAlert('Alert', Object.keys(errorMessages, 'Done'));
          }
        })
      }
      return false;
    });
  });

  this.transition = 'scale-in';
});