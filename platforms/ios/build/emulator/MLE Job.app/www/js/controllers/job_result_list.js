App.controller('job-result-list', function (page, data) {

  $(page).on('appLayout', function() {
    $(page).find('.page-sub-title').text(data.title);
    $(page).find('.title').text(data.subtitle);
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    switch (data.loadPage) {
      case 'job_search_by_city':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/cities/${data.id}/jobs?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.job-result-list');
            if (apiData.data.length > 0) {
              for (var i in apiData.data) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData.data[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData.data[i].logo);
                $listItem.find('.info h4').text(apiData.data[i].job_title);
                $listItem.find('.info p').text(apiData.data[i].company_name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              jobDetailView($list);

              if (apiData.next_page_url) {
                $(page)
                  .find('.load-more-btn')
                  .data('url', apiData.next_page_url)
                  .removeClass('hide')
                  .on('click', function(e) {
                    e.preventDefault();

                    loadMore(page);
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
        });
        break;

      case 'job_search_by_type':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/job_types/${data.id}/jobs?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.job-result-list');
            if (apiData.data.length > 0) {
              for (var i in apiData.data) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData.data[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData.data[i].logo);
                $listItem.find('.info h4').text(apiData.data[i].job_title);
                $listItem.find('.info p').text(apiData.data[i].company_name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              jobDetailView($list);

              if (apiData.next_page_url) {
                $(page)
                  .find('.load-more-btn')
                  .data('url', apiData.next_page_url)
                  .removeClass('hide')
                  .on('click', function(e) {
                    e.preventDefault();

                    loadMore(page);
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
        });
        break;

      case 'job_search_by_category':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/categories/${data.id}/jobs?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.job-result-list');
            if (apiData.data.length > 0) {
              for (var i in apiData.data) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData.data[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData.data[i].logo);
                $listItem.find('.info h4').text(apiData.data[i].job_title);
                $listItem.find('.info p').text(apiData.data[i].company_name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              jobDetailView($list);

              if (apiData.next_page_url) {
                $(page)
                  .find('.load-more-btn')
                  .data('url', apiData.next_page_url)
                  .removeClass('hide')
                  .on('click', function(e) {
                    e.preventDefault();

                    loadMore(page);
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
        });
        break;

      case 'all_jobs':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/jobs?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.job-result-list');
            if (apiData.data.length > 0) {
              for (var i in apiData.data) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData.data[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData.data[i].logo);
                $listItem.find('.info h4').text(apiData.data[i].job_title);
                $listItem.find('.info p').text(apiData.data[i].company_name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              jobDetailView($list);

              if (apiData.next_page_url) {
                $(page)
                  .find('.load-more-btn')
                  .data('url', apiData.next_page_url)
                  .removeClass('hide')
                  .on('click', function(e) {
                    e.preventDefault();

                    loadMore(page);
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
        });
        break;

      case 'query_search':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/jobs/search?api_token=' + localStorage.getItem('api_token') + '&query=' + data.query,
          success: function(apiData) {
            $list = $(page).find('.job-result-list');
            if (apiData.data.length > 0) {
              for (var i in apiData.data) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData.data[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData.data[i].logo);
                $listItem.find('.info h4').text(apiData.data[i].job_title);
                $listItem.find('.info p').text(apiData.data[i].company_name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              jobDetailView($list);

              if (apiData.next_page_url) {
                $(page)
                  .find('.load-more-btn')
                  .data('url', apiData.next_page_url)
                  .removeClass('hide')
                  .on('click', function(e) {
                    e.preventDefault();

                    loadMore(page);
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
        });
        break;

      default:
        App.load('home', 'slide-right');
    }
  });

  this.transition = 'slide-left';
});

function jobDetailView($list) {
  $list.find('.item').on('click', function(e) {
    e.preventDefault();

    App.load('detail', {
      "type": "jobs",
      "id": $(this).data('id')
    }, 'slide-left');
  });
}