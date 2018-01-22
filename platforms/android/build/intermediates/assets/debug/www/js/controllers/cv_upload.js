App.controller('cv-upload', function(page, data) {
  $(page).on('appLayout', function() {
    if (data.clearInputs) {
      for (var key in uploadFormInputs) uploadFormInputs[key] = '';
    }

    if (data && data.id) {

      $.ajax({
        type: 'GET',
        headers: { 'Accept': 'application/json' },
        url: baseUrl + '/api/resumes/' + data.id + '?api_token=' + localStorage.getItem('api_token'),
        success: function(apiData) {

          var resumeFieldNames = [
            'name',
            'job_title',
            'address',
            'phone',
            'nrcno',
            'edu_background',
            'work_experience',
          ];

          if (apiData.photo) {
            $(page).find('#cv-photo-preview').attr('src', baseUrl + apiData.photo);
          }

          if (apiData.sex.toLowerCase() == 'male') {
            $(page).find('input[value="Male"]').attr('checked', true);
          } else if (apiData.sex.toLowerCase() == 'female') {
            $(page).find('input[value="Female"]').attr('checked', true);
          }

          for (var key in resumeFieldNames) {
            $(page).find('input[name="' + resumeFieldNames[key] + '"]').val(apiData[resumeFieldNames[key]]);
            $(page).find('textarea[name="' + resumeFieldNames[key] + '"]').val(apiData[resumeFieldNames[key]]);
          }

          Object.keys(uploadFormInputs).forEach(function(key) {
            uploadFormInputs[key] = apiData[key];
          });
        },
        error: function(err) {
        if (err.status == 401) {
          navigator.notification.alert(
            'Session Timeout, please login again!',
            function() {},
            'Alert',
            'Done'
          );

          localStorage.removeItem('role');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('api_token');
          localStorage.removeItem('email');

          App.load('home', 'fade');
        } else if (err.status == 404) {
          navigator.notification.alert(
            'Not Found!',
            function() {},
            'Error',
            'Done'
          );

          App.back();
        } else {
          App.load('home', 'slide-right');  
        }
      }
      });
    }
  });

  $(page).on('appReady', function() {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    $(page).find('.loader').addClass('hide');
    $(page).find('form').removeClass('hide');

    var src = document.getElementById("cv-photo");
    var target = document.getElementById("cv-photo-preview");
    showImage(src,target);

    $(this).find('form').on('submit', function(e) {
      $(this).addClass('hide');
      $(page).find('.loader').removeClass('hide');

      var formData = new FormData(e.target);

      formData.append( 'job_category_id', uploadFormInputs[ 'job_category_id' ]);
      formData.append( 'job_location_id', uploadFormInputs[ 'job_location_id' ]);
      formData.append( 'job_type_id', uploadFormInputs[ 'job_type_id' ]);
      formData.append( 'salary_id', uploadFormInputs[ 'salary_id' ]);
      formData.append( 'education_id', uploadFormInputs[ 'education_id' ]);
      formData.append( 'exp_id', uploadFormInputs[ 'exp_id' ]);
      formData.append( 'available', uploadFormInputs['available'] );

      var xhr = new XMLHttpRequest(),
          resumeId = data.id || '';

      if (data.id) {
        formData.append('_method', 'PUT');
      }

      xhr.open( 'POST', baseUrl + '/api/resumes/' + resumeId + '?api_token=' + localStorage.getItem('api_token'), true );

      xhr.setRequestHeader('Accept', 'application/json');

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 400) {
            navigator.notification.alert(
              'CV Uploaded!',
              function() {},
              'Success',
              'Done'
            );

            App.load('dashboard', 'slide-right');
          } else if (xhr.status == 401 ) {
            navigator.notification.alert(
              'Session Timeout, please login again!',
              function() {},
              'Alert',
              'Done'
            );

            localStorage.removeItem('role');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            localStorage.removeItem('api_token');
            localStorage.removeItem('email');

            App.load('home', 'fade');
          } else {
            $(page).find('form').removeClass('hide');
            $(page).find('.loader').addClass('hide');

            var errorMessages = JSON.parse(xhr.responseText);
            navigator.notification.alert(
              errorMessages[Object.getOwnPropertyNames(errorMessages)[0]][0],
              function() {},
              'Error',
              'Done'
            );
          }
        }
      };

      xhr.send( formData );

      return false;
    });
  });

  this.transition = 'slide-left';
});