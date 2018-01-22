App.controller('home', function (page) {
  $(page).on('appLayout', function() {
    $(page).find('#services > a.box').hide();

    if (localStorage.getItem('api_token')) {
      var role = localStorage.getItem('role');

      if (role == 1) {
        $(page)
          .find('#dashboard-page-link')
          .data('target', 'dashboard')
          .css({ "background-color": "#21629C" })
          .show();

        $(page)
          .find('#cv-search-page-link')
          .data('target', 'cv-search')
          .css({ "background-color": "#5B2C6F" })
          .show();

        $(page)
          .find('#job-upload-page-link')
          .data('target', 'job-upload')
          .data('target-args', '{"clearInputs": true}')
          .css({ "background-color": "#fd5c63" })
          .show();

        $(page)
          .find('.user-log-out')
          .css({ "background-color": "#1B9E97" })
          .show();
      } else if (role == 2) {
        $(page)
          .find('#dashboard-page-link')
          .data('target', 'dashboard')
          .css({ "background-color": "#21629C" })
          .show();

        $(page)
          .find('#job-search-page-link')
          .data('target', 'job-search')
          .css({ "background-color": "#5B2C6F" })
          .show();

        $(page)
          .find('#cv-upload-page-link')
          .data('target', 'cv-upload')
          .css({ "background-color": "#fd5c63" })
          .show();

        $(page)
          .find('.user-log-out')
          .css({ "background-color": "#1B9E97" })
          .show();
      }
    } else {
      $(page)
        .find('#cv-upload-page-link, #job-upload-page-link, #job-search-page-link, .user-log-in')
        .data('target', 'login')
        .show();
      $(page).find('#cv-upload-page-link').css({ "background-color": "#21629C" });
      $(page).find('#job-search-page-link').css({ "background-color": "#5B2C6F" });
      $(page).find('#job-upload-page-link').css({ "background-color": "#fd5c63" });
      $(page).find('.user-log-in').css({ "background-color": "#1B9E97" });
    }
  });

  $(page).on('appReady', function() {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));
    // Logout
    $(this).find('.user-log-out').on('click', function(e) {
      e.preventDefault();

      $.ajax({
        type: 'DELETE',
        headers: {
          "Accept": "application/json"
        },
        url: baseUrl + 'api/logout?api_token=' + localStorage.getItem('api_token'),
        success: function(data) {
          localStorage.removeItem('role');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('api_token');
          localStorage.removeItem('email');
          App.load('home', 'fade');
        },
        error: function(err) {
          localStorage.removeItem('role');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('api_token');
          localStorage.removeItem('email');
          App.load('home', 'fade');
        }
      });
    });
  });
});