App.controller('business_listing', function (page, data) {
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
      url: baseUrl + '/api/business_listings?api_token=' + localStorage.getItem('api_token') + '&business_type=' + data.business_type + '&country=' + data.country_id,
      success: function(apiData) {
        $(page).find('.loader').addClass('hide');
        $(page).find('.create').on('click', function( e ) {
          App.load(
            'business-listing-create',
            { id: $(this).data('id'), clearInputs: true },
            'slide-left'
          );
        });
        $wrapper = $(page).find('.card-wrapper');

        if (apiData.data.length > 0) {

          for (var i in apiData.data) {
            $card = $wrapper.find('.mdl-card').first().clone();
            $card.find('a.detail-btn').data('id', apiData.data[i].id);
            $card.find('.mdl-card__title-text').text(apiData.data[i].title);
            $card.find('.mdl-card__supporting-text').text(apiData.data[i].description.substring(0, 100) + '...');
            $card.find('img').attr('src', baseUrl + 'uploads/' + JSON.parse(apiData.data[i].photos)[0]);
            $card.removeClass('hide');
            $wrapper.append($card);
          }

          $wrapper.find('a.detail-btn').on('click', function(e) {
              e.preventDefault();

              App.load(
                'business-listing-detail',
                { id: $(this).data('id'), clearInputs: true },
                'slide-left'
              );
            });
        } else {
          showAlert('Error', 'No Data', 'Done');

          App.back();
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
        } else if (err.status == 422) {
          var error = JSON.parse(err.response);

          showAlert('Error', error.message, 'Done');
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
    });
  });

  this.transition = 'slide-left';
});
