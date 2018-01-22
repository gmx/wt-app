var baseUrl = 'http://v2.mlejob.com/';

var uploadFormInputs = {
  "job_category_id": '',
  "job_location_id": '',
  "job_type_id": '',
  "salary_id": '',
  "education_id": '',
  "exp_id": '',
  "available": ''
};

function menuSetup(page) {
  $(page).find('.mdl-menu__item').addClass('hide');

  $(page).find('.menu-dashboard-btn').on('click', function(e) {
    e.preventDefault();

    App.load('dashboard', 'slide-left');
  });

  $(page).find('.user-log-in').on('click', function(e) {
    e.preventDefault();

    facebookConnectPlugin.login(['public_profile', 'email'], function() {
      alert('success');
    }, function() {
      alert('fail');
    })
  });

  $(page).find('.menu-logout-btn').on('click', function(e) {
    e.preventDefault();

    $.ajax({
      type: 'DELETE',
      headers: {
        "Accept": "application/json"
      },
      url: baseUrl + '/api/logout?api_token=' + localStorage.getItem('api_token'),
      success: function(data) {
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('api_token');
        localStorage.removeItem('email');
        App.load('home', 'fade');
      },
      error: function(err) {
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('api_token');
        localStorage.removeItem('email');
        App.load('home', 'fade');
      }
    });
  });

  $(page).find('.menu-register-btn').on('click', function(e) {
    e.preventDefault();

    App.load('register', 'slide-left');
  });

  $(page).find('.menu-login-btn').on('click', function(e) {
    e.preventDefault();

    App.load('login', 'slide-left');
  });

  if (localStorage.getItem('id')) {
    $(page).find('.menu-dashboard-btn, .menu-logout-btn').removeClass('hide');
  } else {
    $(page).find('.menu-login-btn, .menu-register-btn').removeClass('hide');
  }
}

function searchByQuery(page) {
  $(page).find('.search-form').on('submit', function() {
    var query = $(this).find('input').val();
    App.load(
      'job-result-list',
      {
        "loadPage": "query_search",
        "title": "Job Lists",
        "subtitle": "Latest Jobs",
        "query": query
      }
    )
  });
}

function loadMore(page) {
  $.ajax({
    type: 'GET',
    headers: {
      "Accept": "application/json"
    },
    url: $(page).find('.load-more-btn').data('url') + '&api_token=' + localStorage.getItem('api_token'),
    success: function(apiData) {
      $list = $(page).find('.job-result-list');

      for (var i in apiData.data) {
        $listItem = $list.find('.item').first().clone();
        $listItem.find('img').attr('src', 'http://mlejob.com/' + apiData.data[i].logo);
        $listItem.find('.info h4').text(apiData.data[i].job_title);
        $listItem.find('.info p').text(apiData.data[i].company_name);
        $listItem.removeClass('hide');
        $list.append($listItem);
      }
      if (apiData.next_page_url) {
        $(page).find('.load-more-btn').data('url', apiData.next_page_url);  
      } else {
        $(page).find('.load-more-btn').remove();
      }
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
}

function showImage(src,target) {
  var fr = new FileReader();
  // when image is loaded, set the src of the image where you want to display it
  fr.onload = function(e) { target.src = this.result; };
  src.addEventListener("change",function() {
    // fill fr with image data    
    fr.readAsDataURL(src.files[0]);
  });
}

String.prototype.toTitleCase = function(){
  return this.replace(/\b(\w+)/g, function(m,p){ return p[0].toUpperCase() + p.substr(1).toLowerCase() });
}