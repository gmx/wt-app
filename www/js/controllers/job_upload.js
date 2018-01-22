App.controller('job-upload', function (page, data) {
  $(page).on('appLayout', function() {
    languageSetup(page);

    if (data && data.id) {

      $.ajax({
        type: 'GET',
        headers: { 'Accept': 'application/json' },
        url: baseUrl + '/api/jobs/' + data.id + '?api_token=' + localStorage.getItem('api_token'),
        success: function(apiData) {

          var jobFieldNames = [
            'job_title',
            'company_name',
            'address',
            'phone',
            'close_date',
            'job_requirement'
          ];

          if (apiData.logo) {
            $(page).find('#job-photo-preview').attr('src', baseUrl + apiData.logo);
          }

          for (var key in jobFieldNames) {
            $(page).find('input[name="' + jobFieldNames[key] + '"]').val(apiData[jobFieldNames[key]]);
            $(page).find('textarea[name="' + jobFieldNames[key] + '"]').val(apiData[jobFieldNames[key]]);
          }

          Object.keys(uploadFormInputs).forEach(function(key) {
            uploadFormInputs[key] = apiData[key];
          });
        },
        error: function(err) {
        if (err.status == 401) {
          showAlert('Alert', 'Session Timeout, please login again!', 'Done');

          localStorage.removeItem('role');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('api_token');
          localStorage.removeItem('email');

          App.load('home', 'fade');
        } else if (err.status == 404) {
          showAlert('Error', 'Not Found!', 'Done');

          App.back();
        } else {
          App.load('home', 'slide-right');  
        }
      }
      });
    }
  });

  $(page).on('appBack', function() {
    for (var key in uploadFormInputs) uploadFormInputs[key] = '';
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    var src = document.getElementById("job-photo");
    var target = document.getElementById("job-photo-preview");
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

      var xhr = new XMLHttpRequest(),
          jobId = data.id || '';

      if (data.id) {
        formData.append('_method', 'PUT');
      }

      xhr.open( 'POST', baseUrl + '/api/jobs/' + jobId + '?api_token=' + localStorage.getItem('api_token'), true );

      xhr.setRequestHeader('Accept', 'application/json');

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 400) {
            showAlert('Success', 'Job Uploaded', 'Done');

            App.load('dashboard', 'slide-right');
          } else if (xhr.status == 401 ) {
            showAlert('Alert', 'Session Timeout, please login again!', 'Done');

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
            showAlert('Error', errorMessages[Object.getOwnPropertyNames(errorMessages)[0]][0], 'Done');
          }
        }
      };

      xhr.send( formData );

      return false;
    });
  });

  this.transition = 'slide-left';
});
