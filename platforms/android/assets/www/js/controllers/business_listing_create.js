App.controller('business-listing-create', function (page, data) {

  var renderGallery = function( photos ) {

    var str = photos.map(function( photo ){

      var html = '<div class="photo-wrapper" style="float: left; width: 33.3%">';
      html += '<img src="' + baseUrl + 'uploads/' + photo + '" style="width: 100%" alt="">';
      html += '</div>';

      return html;
    }).join('');
    console.log( str );
    $(page).find('.gallery-wrapper').html( str );
  };

  $(page).on('appLayout', function() {
    languageSetup(page);
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    var record = {
      photos: [],
      video: ''
    };

    componentHandler.upgradeElements(document.getElementsByClassName('input'));    

    $(page).find('form .country').on('click', function(){
      $(page).find('form .country').removeClass('mdl-button--accent')
      $(this).addClass('mdl-button--accent');
    });

    $(page).find('form .business').on('click', function(){
      $(page).find('form .business').removeClass('mdl-button--accent')
      $(this).addClass('mdl-button--accent');
    });

    $(page).find('form').on('submit', function( e ){
      var formData = new FormData( e.target );
      formData.append( 'photos', JSON.stringify( record.photos ));
      formData.append( 'video', JSON.stringify( record.video ));
      formData.append( 'country_id', $(page).find('form button.country.mdl-button--accent').data('country'));
      formData.append( 'business_type', $(page).find('form button.country.mdl-button--accent').data('business'));

      var xhr = new XMLHttpRequest();
      xhr.open( 'POST', baseUrl + 'api/business_listings?api_token=' + localStorage.getItem('api_token'), true );
      xhr.setRequestHeader('Accept', 'application/json');

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {

          if (xhr.status >= 200 && xhr.status < 400) {
            showAlert('Success', 'Business Listing Successfully submitted! Our Admin Team will shortly review and approve.', 'Done');
            var res = JSON.parse(xhr.responseText);
            App.back();

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

    $(page).find('#open-media-uploader').on('click', function(){

      App.pick('media-uploader', { type: 'photo' }, function( res ) {
        if (typeof res != 'undefined' && typeof res.filename != 'undefined') {

          // make it listed
          if (typeof record.photos == 'undefined')  {
            record.photos = [];
          }

          record.photos.push( res.filename );
          renderGallery( record.photos );
        }
      });
    });

  });

  this.transition = 'slide-left';
});

App.controller('viewer', function (page, data) {
  var photoViewer = new PhotoViewer(page, data.urls);
});