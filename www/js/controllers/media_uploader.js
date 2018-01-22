App.controller('media-uploader', function (page, data) {

  var controller = this;

  $(page).on('appLayout', function() {
    languageSetup(page);
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    var fileInput = $(page).find('#upload-form input[type=file]');

    $(page).find('#upload-form').on('submit', function( e ){

      $(page).find('#choose-file').text( 'Upload in progress...' );

      var data = new FormData(e.target);
      var xhr = new XMLHttpRequest();
      xhr.open( 'POST', baseUrl + 'api/upload?api_token=' + localStorage.getItem('api_token'), true );
      xhr.setRequestHeader('Accept', 'application/json');

      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {

          $(page).find('#choose-file').text( 'Upload again' );

          if (xhr.status >= 200 && xhr.status < 400) {
            showAlert('Success', 'Successfully uploaded!', 'Done');
            var res = JSON.parse(xhr.responseText);
            controller.reply( res );
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
      xhr.send( data );
      return false;
    });

    fileInput.on('change', function() {
      $(page).find('#upload-form').trigger('submit');
    })

    $(page).find('#choose-file').on('click', function(){
      fileInput.trigger('click');
    });

    // $(page).find('#choose-file').on('click', function(){
    //   $(page).find('#upload-form input[type=file]').trigger('click');
    //   $(page).find('#upload-form').submit();
    // });

    // $(page).find('[name=upload-target]').on('load', function(){});

  });

  this.transition = 'slide-left';
});