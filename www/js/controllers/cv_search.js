var getCVCount = (function( global ){

  var cvCount;

  $.get(baseUrl + '/api/stat/resumes/count', function( count ){
    cvCount = count;
  });

  return function() { return cvCount; };
})( window )

App.controller('cv-search', function (page) {
  $(page).on('appLayout', function() {
    languageSetup(page);
    $('#cv-count').html( getCVCount()  + ' Resumes in MLE Database' );
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);
    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    $(page).find('#cv-search-by-city-btn').on('click', function(e) {
      e.preventDefault();

      App.load('item-list',
      {
        "loadPage": "load_city",
        "pageTitle": "Select City",
        "type": "cv"
      },
      'slide-left');
    });

    $(page).find('#cv-search-by-type-btn').on('click', function(e) {
      e.preventDefault();

      App.load('item-list',
      {
        "loadPage": "load_type",
        "pageTitle": "Select Type",
        "type": "cv"
      },
      'slide-left');
    });

    $(page).find('#cv-search-by-category-btn').on('click', function(e) {
      e.preventDefault();

      App.load('item-list',
      {
        "loadPage": "load_assigned_category",
        "pageTitle": "Select Category",
        "type": "cv"
      },
      'slide-left');
    });
  });

  this.transition = 'slide-left';
});