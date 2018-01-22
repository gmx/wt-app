App.controller('job-search', function (page) {
  $(page).on('appLayout', function() {
    languageSetup(page);
  });

  $(page).on('appReady', function () {
    searchByQuery(page);
    menuSetup(page);

    componentHandler.upgradeElements(document.getElementsByClassName('reload'));

    $(page).find('#job-search-by-city-btn').on('click', function(e) {
      e.preventDefault();

      App.load('item-list',
      {
        "loadPage": "load_city",
        "pageTitle": "Select City",
        "type": "job"
      },
      'slide-left');
    });

    $(page).find('#job-search-by-type-btn').on('click', function(e) {
      e.preventDefault();

      App.load('item-list',
      {
        "loadPage": "load_type",
        "pageTitle": "Select Job Type",
        "type": "job"
      },
      'slide-left');
    });

    $(page).find('#job-search-by-category-btn').on('click', function(e) {
      e.preventDefault();

      App.load('item-list',
      {
        "loadPage": "load_category",
        "pageTitle": "Select Category",
        "type": "job"
      },
      'slide-left');
    });

    $(page).find('#show-all-jobs-btn').on('click', function(e) {
      e.preventDefault();

      App.load('job-result-list',
      {
        "loadPage": "all_jobs",
        "title": "Job Lists",
        "subtitle": "Latest Jobs"
      },
      'slide-left');
    });
  });

  this.transition = 'slide-left';
});