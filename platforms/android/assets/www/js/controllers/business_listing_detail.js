App.controller('business-listing-detail', function (page, data) {
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
      url: baseUrl + '/api/business_listings/' + data.id + '?api_token=' + localStorage.getItem('api_token'),
      success: function(apiData) {
        $(page).find('.loader').addClass('hide');

        if (apiData.photos.length > 0) {
          $(page).find('img.picture').attr('src', baseUrl + 'uploads/' + JSON.parse(apiData.photos)[0]).removeClass('hide');
          $(page).find('button.view-gallery').removeClass('hide');
          $(page).find('button.view-gallery').on('click', function(e) {
            e.preventDefault();

            var urls = [];
            var photoArray = JSON.parse(apiData.photos);

            for (i in photoArray) {
              urls.push(baseUrl + 'uploads/' + photoArray[i]);
            }

            App.load('viewer', {
              urls: urls
            });
          });
        }

        if (apiData.video) {
          var videoObject = JSON.parse(apiData.video);
          var url = 'https://www.youtube.com/embed/' + videoObject.id;
          $(page).find('iframe').attr('src', url).removeClass('hide');
        }

        var fieldNames = [
          'title',
          'description',
          'phone'
        ];

        for (var i in fieldNames) {
          var info = $(page).find('div.info').first().clone();
          info.find('span').text(fieldNames[i].replace(/_/g, ' ').toTitleCase());
          info.find('p').text(apiData[fieldNames[i]] || '');
          info.appendTo($(page).find('.info-wrapper'));
          info.removeClass('hide');
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
          showAlert('Error', 'Not Found!', 'Done');

          App.back();
        } else {
          showAlert('Alert', 'Session Timeout, please login again!', 'Done');

          localStorage.removeItem('role');
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('api_token');
          localStorage.removeItem('email');

          App.load('home', 'fade');
        }
      }
    })
  });

  this.transition = 'slide-left';
});

App.controller('viewer', function (page, data) {
  var photoViewer = new PhotoViewer(page, data.urls);
});
