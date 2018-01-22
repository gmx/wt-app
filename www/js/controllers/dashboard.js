App.controller('dashboard', function (page, data) {
  $(page).on('appBeforeBack', function() {
    App.load('home', 'slide-right');

    return false;
  });

  $(page).on('appLayout', function() {
    languageSetup(page);
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    $.ajax({
      type: 'GET',
      headers: { 'Accept': 'application/json' },
      url: baseUrl + '/api/dashboard?api_token=' + localStorage.getItem('api_token'),
      success: function(apiData) {
        $(page).find('.loader').addClass('hide');
        $wrapper = $(page).find('.card-wrapper');
        var userRole = localStorage.getItem('role');

        if (userRole == 1) {
          if (parseInt(localStorage.getItem('cv_count')) > apiData.data.length) {
            $(page).find('.add-new-btn')
                 .data('target', 'job-upload')
                 .html(language.job_upload[localStorage.getItem('language')])
                 .removeClass('hide');  
          }
        } else if (userRole == 2) {
          $(page).find('.add-new-btn')
                 .data('target', 'cv-upload')
                 .html(language.cv_upload[localStorage.getItem('language')])
                 .removeClass('hide');
        }

        if (apiData.data.length > 0) {
          for (var i in apiData.data) {
            $card = $wrapper.find('.mdl-card').first().clone();
            $card.find('.edit-btn, .delete-btn').data('id', apiData.data[i].id);

            if (userRole == 2) {
              $card.find('.mdl-card__title-text').text(apiData.data[i].name);
              $card.find('.mdl-card__supporting-text').text(apiData.data[i].job_title);
              $card.find('img').attr('src', baseUrl + apiData.data[i].photo);
            } else if (userRole == 1) {
              $card.find('.view-applied-cvs-btn').removeClass('hide').data('id', apiData.data[i].id);
              $card.find('.mdl-card__title-text').text(apiData.data[i].job_title);
              $card.find('.mdl-card__supporting-text').text(apiData.data[i].company_name);
              $card.find('img').attr('src', baseUrl + apiData.data[i].logo);
            }

            $card.removeClass('hide');
            $wrapper.append($card);
          }

          if (userRole == 1) {
            if (parseInt(localStorage.getItem('cv_count')) !== 999) {
              $wrapper.find('a.edit-btn').hide();
            } else {
              $wrapper.find('a.edit-btn').on('click', function(e) {
                e.preventDefault();

                App.load(
                  'job-upload',
                  { id: $(this).data('id'), clearInputs: true },
                  'slide-left'
                );
              });
            }

            deleteItem(page, 'jobs');
          } else if (userRole == 2) {
            $wrapper.find('a.edit-btn').on('click', function(e) {
              e.preventDefault();

              App.load(
                'cv-upload',
                { id: $(this).data('id'), clearInputs: true },
                'slide-left'
              );
            });

            deleteItem(page, 'resumes');
          }

          $(page).find('.view-applied-cvs-btn').on('click', function(e) {
            e.preventDefault();

            App.load('cv-result-list',
              {
                "loadPage": "applied_cv",
                "title": "CV Lists",
                "id": $(this).data('id')
              },
              'slide-left'
            );
          });
        }
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
          showAlert('Error', 'Not Found!', 'Done')

          App.back();
        } else if (err.status == 422) {
          var error = JSON.parse(err.response);

          showAlert('Error', error.message, 'Done')
        } else {
          App.load('home', 'slide-right');  
        }
      }
    });
  });

  this.transition = 'slide-left';
});

function deleteItem(page, type) {
  $(page).find('.delete-btn').on('click', function(e) {
    e.preventDefault();

    $.ajax({
      type: 'DELETE',
      headers: { 'Accept': 'application/json' },
      url: baseUrl + '/api/' + type + '/' + $(this).data('id') + '?api_token=' + localStorage.getItem('api_token'),
      success: function() {
        showAlert('Alert', 'Successfully deleted', 'Done');

        App.back();
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
    })
  });
}