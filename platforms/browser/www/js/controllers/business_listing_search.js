App.controller('business_listing_search', function (page, data) {
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

    $(page).find('.create').on('click', function( e ) {
      App.load(
        'business-listing-create',
        { id: $(this).data('id'), clearInputs: true },
        'slide-left'
      );
    });
    
    $.ajax({
      type: 'GET',
      headers: {
        "Accept": "application/json"
      },
      url: baseUrl + '/api/countries?api_token=' + localStorage.getItem('api_token'),
      success: function(apiData) {
        var countryListWrapper = $(page).find('.country-list');

        for (var i in apiData) {
          var labelClone = $(page).find('.country-list label').first().clone();

          labelClone.attr('for', 'country_' + i);
          if (i == 0) {
            labelClone.find('input').attr('checked', true);
          }
          labelClone.find('input').attr('id', 'country_' + i);
          labelClone.find('input').attr('value', apiData[i].id);
          labelClone.find('span').html(apiData[i].name);
          labelClone.appendTo(countryListWrapper);
          labelClone.removeClass('hide');
        }

        componentHandler.upgradeElements(document.getElementsByClassName('reload'));

        $(page).find('.loader').remove();
        $(page).find('.country-list label').first().remove();
        $(page).find('.app-section, .business-listing-search-btn').removeClass('hide');

        $(page).find('.business-listing-search-btn').on('click', function() {
          App.load('business_listing',
          {
            "country_id": $(page).find('input[name="country"]:checked').val(),
            "business_type": $(page).find('input[name="business_type"]:checked').val()
          },
          'slide-left');
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
        } else {
          App.load('home', 'slide-right');  
        }
      }
    });
  });

  this.transition = 'slide-left';
});
