App.controller('detail', function (page, data) {

  $(page).on('appLayout', function() {
    if (data.type == 'jobs') {
      $(page).find('h5.page-sub-title').text('Job Detail');
    } else if (data.type == 'resumes') {
      $(page).find('h5.page-sub-title').text('CV Detail');
    }
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));    

    var apiType = data.type;

    $.ajax({
      type: 'GET',
      headers: { 'Accept': 'application/json' },
      url: baseUrl + '/api/' + apiType + '/' + data.id + '?api_token=' + localStorage.getItem('api_token'),
      success: function(apiData) {
        $(page).find('.loader').addClass('hide');

        var resumeFieldNames = [
          'name',
          'job_title',
          'address',
          'phone',
          'edu_background',
          'work_experience',
        ];

        var jobFieldNames = [
          'job_title',
          'company_name',
          'address',
          'phone',
          'close_date',
          'job_requirement'
        ];

        if (data.type == 'jobs') {
          $(page).find('img.picture').attr('src', baseUrl + apiData.logo).removeClass('hide');

          for (var i in jobFieldNames) {
            var info = $(page).find('div.info').first().clone();
            info.find('span').text(jobFieldNames[i].replace(/_/g, ' ').toTitleCase());
            info.find('p').text(apiData[jobFieldNames[i]] || '');
            info.appendTo($(page).find('.info-wrapper'));
            info.removeClass('hide');
          }

          if ( $.inArray(parseInt(localStorage.getItem('id')), apiData.applied_user_ids) == -1 ) {
            $(page).find('.apply-job-btn').on('click', function(e) {
              e.preventDefault();

              $(page).find('.picture, .info-wrapper, .apply-job-btn').addClass('hide');
              $(page).find('.loader').removeClass('hide');

              $.ajax({
                headers: { 'Accept': 'application/json' },
                type: 'GET',
                url: baseUrl + '/api/jobs/' + apiData.id + '/apply?api_token=' + localStorage.getItem('api_token'),
                success: function() {
                  $(page).find('.picture, .info-wrapper').removeClass('hide');
                  $(page).find('.loader').addClass('hide');

                  navigator.notification.alert(
                    'Job Applied!',
                    function() {},
                    'Success',
                    'Done'
                  );
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
                  } else if (err.status == 422) {
                    var error = JSON.parse(err.response);
                    navigator.notification.alert(
                      error.message,
                      function() {},
                      'Error',
                      'Done'
                    );

                    $(page).find('.picture, .info-wrapper, .apply-job-btn').removeClass('hide');
                    $(page).find('.loader').addClass('hide');
                  } else {
                    App.load('home', 'slide-right');  
                  }
                }
              })
            }).removeClass('hide');
          }

          addJobRelationFields(page, apiData);
        } else if (data.type == 'resumes') {
          $(page).find('img.picture').attr('src', baseUrl + apiData.photo).removeClass('hide');

          for (var i in resumeFieldNames) {
            var info = $(page).find('div.info').first().clone();
            info.find('span').text(resumeFieldNames[i].replace(/_/g, ' ').toTitleCase());
            info.find('p').text(apiData[resumeFieldNames[i]] || '');
            info.appendTo($(page).find('.info-wrapper'));
            info.removeClass('hide');
          }

          addJobRelationFields(page, apiData);

          var salary = $(page).find('div.info').first().clone();
          salary.find('span').text('Salary');
          salary.find('p').text(apiData.salary ? apiData.salary.amount : '');
          salary.appendTo($(page).find('.info-wrapper'));
          salary.removeClass('hide');
        }
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
    })
  });

  this.transition = 'slide-left';
});

function addJobRelationFields(page, apiData) {
  var jobCategory = $(page).find('div.info').first().clone();
  jobCategory.find('span').text('Job Category');
  jobCategory.find('p').text(apiData.job_category ? apiData.job_category.category_name : '');
  jobCategory.appendTo($(page).find('.info-wrapper'));
  jobCategory.removeClass('hide');

  var jobLocation = $(page).find('div.info').first().clone();
  jobLocation.find('span').text('Job Location');
  jobLocation.find('p').text(apiData.job_location ? apiData.job_location.location_name : '');
  jobLocation.appendTo($(page).find('.info-wrapper'));
  jobLocation.removeClass('hide');

  var jobType = $(page).find('div.info').first().clone();
  jobType.find('span').text('Job Type');
  jobType.find('p').text(apiData.job_type ? apiData.job_type.type_name : '');
  jobType.appendTo($(page).find('.info-wrapper'));
  jobType.removeClass('hide');
}