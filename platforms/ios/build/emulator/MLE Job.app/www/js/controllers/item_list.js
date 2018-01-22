App.controller('item-list', function (page, data) {

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    $(page).find('.app-title').text(data.pageTitle);

    switch (data.loadPage) {
      case 'load_city':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/cities?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.app-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $($list).find('li').first().clone();
                $($listItem).data('id', apiData[i].id);
                $($listItem).text(apiData[i].name);
                $listItem.removeClass('hide');

                if (uploadFormInputs['job_location_id'] == apiData[i].id) {
                  $listItem.css('background-color', '#f3f3f3');
                  $listItem.css('font-weight', 'bold');
                }

                $list.append($listItem);
              }

              if (data.type == 'job') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  App.load('job-result-list',
                  {
                    "loadPage": "job_search_by_city",
                    "title": "Job Lists",
                    "subtitle": "Latest Jobs",
                    "id": $(this).data('id')
                  },
                  'slide-left');
                });
              } else if (data.type == 'cv') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  App.load('cv-result-list',
                  {
                    "loadPage": "cv_search_by_city",
                    "title": "CV Lists",
                    "id": $(this).data('id')
                  },
                  'slide-left');
                });
              } else if (data.type == 'upload_form') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  uploadFormInputs['job_location_id'] = $(this).data('id');
                  $list.find('li').css('background-color', '#FFF');
                  $list.find('li').css('font-weight', 'normal');

                  $(this).css('background-color', '#f3f3f3');
                  $(this).css('font-weight', 'bold');
                  App.back();
                });
              }
                
            } else {
              navigator.notification.alert(
                'No Data',
                function() {},
                'Alert',
                'Done'
              );
              App.back();   
            }

            $(page).find('.loader').remove();
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
            } else {
              App.load('home', 'slide-right');  
            }
          }
        })
        break;

      case 'load_type':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/job_types?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.app-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $($list).find('li').first().clone();
                $($listItem).data('id', apiData[i].id);
                $($listItem).text(apiData[i].type_name);
                $listItem.removeClass('hide');

                if (uploadFormInputs['job_type_id'] == apiData[i].id) {
                  $listItem.css('background-color', '#f3f3f3');
                  $listItem.css('font-weight', 'bold');
                }

                $list.append($listItem);
              } 

              if (data.type == 'job') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  App.load('job-result-list',
                  {
                    "loadPage": "job_search_by_type",
                    "title": "Job Lists",
                    "subtitle": "Latest Jobs",
                    "id": $(this).data('id')
                  },
                  'slide-left');
                });
              } else if (data.type == 'cv') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  App.load('cv-result-list',
                  {
                    "loadPage": "cv_search_by_type",
                    "title": "CV Lists",
                    "id": $(this).data('id')
                  },
                  'slide-left');
                });
              } else if (data.type == 'upload_form') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  uploadFormInputs['job_type_id'] = $(this).data('id');
                  $list.find('li').css('background-color', '#FFF');
                  $list.find('li').css('font-weight', 'normal');
                  $(this).css('background-color', '#f3f3f3');
                  $(this).css('font-weight', 'bold');
                  App.back();
                });
              }
            } else {
              navigator.notification.alert(
                'No Data',
                function() {},
                'Alert',
                'Done'
              );
              App.back();   
            }

            $(page).find('.loader').remove();
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
            } else {
              App.load('home', 'slide-right');  
            }
          }
        })
        break;

      case 'load_category':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/job_categories?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.app-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $($list).find('li').first().clone();
                $($listItem).data('id', apiData[i].id);
                $($listItem).text(apiData[i].category_name);
                $listItem.removeClass('hide');

                if (uploadFormInputs['job_category_id'] == apiData[i].id) {
                  $listItem.css('background-color', '#f3f3f3');
                  $listItem.css('font-weight', 'bold');
                }

                $list.append($listItem);
              } 

              if (data.type == 'job') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  App.load('job-result-list',
                  {
                    "loadPage": "job_search_by_category",
                    "title": "Job Lists",
                    "subtitle": "Latest Jobs",
                    "id": $(this).data('id')
                  },
                  'slide-left');
                });
              } else if (data.type == 'cv') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  App.load('cv-result-list',
                  {
                    "loadPage": "cv_search_by_category",
                    "title": "CV Lists",
                    "id": $(this).data('id')
                  },
                  'slide-left');
                });
              } else if (data.type == 'upload_form') {
                $list.find('li').on('click', function(e) {
                  e.preventDefault();

                  uploadFormInputs['job_category_id'] = $(this).data('id');
                  $list.find('li').css('background-color', '#FFF');
                  $list.find('li').css('font-weight', 'normal');
                  $(this).css('background-color', '#f3f3f3');
                  $(this).css('font-weight', 'bold');
                  App.back();
                });
              }
            } else {
              navigator.notification.alert(
                'No Data',
                function() {},
                'Alert',
                'Done'
              );
              App.back();   
            }

            $(page).find('.loader').remove();
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
            } else {
              App.load('home', 'slide-right');  
            }
          }
        })
        break;

      case 'load_salary':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/salaries?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.app-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $($list).find('li').first().clone();
                $($listItem).data('id', apiData[i].id);
                $($listItem).text(apiData[i].amount);
                $listItem.removeClass('hide');

                if (uploadFormInputs['salary_id'] == apiData[i].id) {
                  $listItem.css('background-color', '#f3f3f3');
                  $listItem.css('font-weight', 'bold');
                }

                $list.append($listItem);
              }
              
              $list.find('li').on('click', function(e) {
                e.preventDefault();

                uploadFormInputs['salary_id'] = $(this).data('id');
                $list.find('li').css('background-color', '#FFF');
                $list.find('li').css('font-weight', 'normal');
                $(this).css('background-color', '#f3f3f3');
                $(this).css('font-weight', 'bold');
                App.back();
              });
            } else {
              navigator.notification.alert(
                'No Data',
                function() {},
                'Alert',
                'Done'
              );
              App.back();   
            }

            $(page).find('.loader').remove();
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
            } else {
              App.load('home', 'slide-right');  
            }
          }
        })
        break;

      case 'load_degree':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/degrees?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.app-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $($list).find('li').first().clone();
                $($listItem).data('id', apiData[i].id);
                $($listItem).text(apiData[i].degree_name);
                $listItem.removeClass('hide');

                if (uploadFormInputs['education_id'] == apiData[i].id) {
                  $listItem.css('background-color', '#f3f3f3');
                  $listItem.css('font-weight', 'bold');
                }

                $list.append($listItem);
              }        

              $list.find('li').on('click', function(e) {
                e.preventDefault();

                uploadFormInputs['education_id'] = $(this).data('id');
                $list.find('li').css('background-color', '#FFF');
                $list.find('li').css('font-weight', 'normal');
                $(this).css('background-color', '#f3f3f3');
                $(this).css('font-weight', 'bold');
                App.back();
              });
            } else {
              navigator.notification.alert(
                'No Data',
                function() {},
                'Alert',
                'Done'
              );
              App.back();   
            }

            $(page).find('.loader').remove();
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
            } else {
              App.load('home', 'slide-right');  
            }
          }
        })
        break;

      case 'load_experience':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/experiences?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.app-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $($list).find('li').first().clone();
                $($listItem).data('id', apiData[i].id);
                $($listItem).text(apiData[i].exp_name);
                $listItem.removeClass('hide');

                if (uploadFormInputs['exp_id'] == apiData[i].id) {
                  $listItem.css('background-color', '#f3f3f3');
                  $listItem.css('font-weight', 'bold');
                }

                $list.append($listItem);
              }

              $list.find('li').on('click', function(e) {
                e.preventDefault();

                uploadFormInputs['exp_id'] = $(this).data('id');
                $list.find('li').css('background-color', '#FFF');
                $list.find('li').css('font-weight', 'normal');
                $(this).css('background-color', '#f3f3f3');
                $(this).css('font-weight', 'bold');
                App.back();
              });
            } else {
              navigator.notification.alert(
                'No Data',
                function() {},
                'Alert',
                'Done'
              );
              App.back();   
            }

            $(page).find('.loader').remove();
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
            } else {
              App.load('home', 'slide-right');  
            }
          }
        })
        break;

      case 'load_available':
        $(this).find('.loader').hide();
        $list = $(page).find('.app-list');

        var availableInputs = [
          'Immediately',
          'One Week Notice',
          'Two Week Notice',
          'Three Week Notice',
          'One Month Notice',
          'After Contract'
        ];

        for (var i in availableInputs) {
          $listItem = $($list).find('li').first().clone();
          $($listItem).data('id', availableInputs[i]);
          $($listItem).text(availableInputs[i]);
          $listItem.removeClass('hide');

          if (uploadFormInputs['available'] == availableInputs[i]) {
            $listItem.css('background-color', '#f3f3f3');
            $listItem.css('font-weight', 'bold');
          }

          $list.append($listItem);
        }

        $list.find('li').on('click', function(e) {
          e.preventDefault();

          uploadFormInputs['available'] = $(this).data('id');
          $list.find('li').css('background-color', '#FFF');
          $list.find('li').css('font-weight', 'normal');
          $(this).css('background-color', '#f3f3f3');
          $(this).css('font-weight', 'bold');
          App.back();
        });
        break;

      default:
        App.load('home', 'slide-right');
    }
  });

  this.transition = 'slide-left';
});