App.controller('cv-result-list', function(page, data) {
  $(page).on('appLayout', function() {
    $(page).find('.page-sub-title').text(data.title);
  });

  $(page).on('appReady', function() {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    switch (data.loadPage) {
      case 'cv_search_by_city':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/cities/' + data.id + '/resumes?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.cv-result-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData[i].photo);
                $listItem.find('.info h4').text(apiData[i].job_title);
                $listItem.find('.info p').text(apiData[i].name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              cvDetailView($list);
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
            } else if (err.status == 403) {
              navigator.notification.alert(
                'Not allowed to view cv!',
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
        break;

      case 'cv_search_by_type':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/job_types/' + data.id + '/resumes?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.cv-result-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData[i].photo);
                $listItem.find('.info h4').text(apiData[i].job_title);
                $listItem.find('.info p').text(apiData[i].name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              cvDetailView($list);
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
            } else if (err.status == 403) {
              navigator.notification.alert(
                'Not allowed to view cv!',
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
        break;

      case 'cv_search_by_category':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/categories/' + data.id + '/resumes?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.cv-result-list');
            if (apiData.length > 0) {
              for (var i in apiData) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData[i].photo);
                $listItem.find('.info h4').text(apiData[i].job_title);
                $listItem.find('.info p').text(apiData[i].name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              cvDetailView($list);

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
            } else if (err.status == 403) {
              navigator.notification.alert(
                'Not allowed to view cv!',
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
        break;

      case 'applied_cv':
        $.ajax({
          type: 'GET',
          headers: {
            "Accept": "application/json"
          },
          url: baseUrl + '/api/jobs/' + data.id + '/applied_resumes?api_token=' + localStorage.getItem('api_token'),
          success: function(apiData) {
            $list = $(page).find('.cv-result-list');
            if (apiData.data.length > 0) {
              for (var i in apiData.data) {
                $listItem = $list.find('.item').first().clone();
                $listItem.data('id', apiData.data[i].id);
                $listItem.find('img').attr('src', baseUrl + apiData.data[i].photo);
                $listItem.find('.info h4').text(apiData.data[i].job_title);
                $listItem.find('.info p').text(apiData.data[i].name);
                $listItem.removeClass('hide');
                $list.append($listItem);
              }

              cvDetailView($list);
            } else {
              navigator.notification.alert(
                'No Applied CV!',
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
    }
  });
});

function cvDetailView($list) {
  $list.find('.item').on('click', function(e) {
    e.preventDefault();

    App.load('detail', {
      "type": "resumes",
      "id": $(this).data('id')
    }, 'slide-left');
  });
}