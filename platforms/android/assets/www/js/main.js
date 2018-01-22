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

function showAlert(title, message, buttonText) {
  var alertBox = $('#alert-box');
  alertBox.find('h5').text(title);
  alertBox.find('p').text(message);
  alertBox.find('a').text(buttonText);
  alertBox.parent().removeClass('hide');
  alertBox.find('a').on('click', function() {
    alertBox.parent().addClass('hide');
  });
}

function menuSetup(page) {
  $(page).find('.mdl-menu__item').addClass('hide');

  if (localStorage.getItem('language')) {
    if (localStorage.getItem('language') == 'en') {
      $(page).find('.menu-language-mm-btn').removeClass('hide');
    } else {
      $(page).find('.menu-language-en-btn').removeClass('hide');
    }
  } else {
    localStorage.setItem('language', 'en');
    $(page).find('.menu-language-en-btn').removeClass('hide');
  }

  $(page).find('.menu-language-en-btn').on('click', function() {
    localStorage.setItem('language', 'en');
    App.load('home', 'fade');
  });

  $(page).find('.menu-language-mm-btn').on('click', function() {
    localStorage.setItem('language', 'mm');
    App.load('home', 'fade');
  });

  $(page).find('.menu-dashboard-btn').on('click', function(e) {
    e.preventDefault();

    App.load('dashboard', 'slide-left');
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
        if(localStorage.getItem('facebook_login') == true) {
          FB.logout(function(){});
        }

        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('api_token');
        localStorage.removeItem('email');
        localStorage.removeItem('cv_count');
        App.load('home', 'fade');
      },
      error: function(err) {
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('api_token');
        localStorage.removeItem('email');
        localStorage.removeItem('cv_count');
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
  var url = $(page).find('.load-more-btn').data('url');

  if (localStorage.getItem('api_token')) {
    url += '&api_token=' + localStorage.getItem('api_token');
  }

  $.ajax({
    type: 'GET',
    headers: {
      "Accept": "application/json"
    },
    url: url,
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
}

function languageSetup(page) {
  // Home Page
  $(page).find('#job-search-page-link h4').html(language.job_search[localStorage.getItem('language')]);
  $(page).find('#job-upload-page-link h4').html(language.job_upload[localStorage.getItem('language')]);
  $(page).find('#cv-search-page-link h4').html(language.cv_search[localStorage.getItem('language')]);
  $(page).find('#cv-upload-page-link h4').html(language.cv_upload[localStorage.getItem('language')]);
  $(page).find('.user-log-in h4').html(language.user_login[localStorage.getItem('language')]);
  $(page).find('.user-log-out h4').html(language.user_logout[localStorage.getItem('language')]);

  // Dashboard Page
  $(page).find('a.edit-btn').html(language.edit[localStorage.getItem('language')]);
  $(page).find('a.view-applied-cvs-btn').html(language.applied_cvs[localStorage.getItem('language')]);
  $(page).find('a.delete-btn').html(language.delete[localStorage.getItem('language')]);

  // Login Page
  $(page).find('.login-form h5.page-sub-title').html(language.existing_user[localStorage.getItem('language')]);
  $(page).find('.login-form h6').html(language.for_job_seekers_only[localStorage.getItem('language')]);
  $(page).find('#login-form label[for="email_phone"]').html(language.email_or_phone[localStorage.getItem('language')]);
  $(page).find('#login-form label[for="password"]').html(language.password[localStorage.getItem('language')]);

  // Register Page
  $(page).find('.register-form h5.page-sub-title').html(language.new_user_register[localStorage.getItem('language')]);
  $(page).find('.register-form label[for="email"]').html(language.email_or_phone[localStorage.getItem('language')]);
  $(page).find('.register-form label[for="name"]').html(language.name[localStorage.getItem('language')]);
  $(page).find('.register-form label[for="password"]').html(language.password[localStorage.getItem('language')]);
  $(page).find('.register-form label[for="password_confirmation"]').html(language.confirm_password[localStorage.getItem('language')]);
  $(page).find('.register-form label[for="role1"] span').first().html(language.employer[localStorage.getItem('language')]);
  $(page).find('.register-form label[for="role2"] span').first().html(language.job_seeker[localStorage.getItem('language')]);

  // Job Upload Page
  $(page).find('.job-upload-page h5.page-sub-title').html(language.job_upload[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="job-photo"]').html(language.photo[localStorage.getItem('language')]);

  // CV Upload Page
  $(page).find('.cv-upload-page h5.page-sub-title').html(language.cv_upload[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="cv-photo"]').html(language.photo[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="name"]').html(language.name[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="nrcno"]').html(language.nrcno[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="edu_background"]').html(language.edu_background[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="work_experience"]').html(language.work_experience[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.available_for_work').html(language.available_for_work[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="gender1"] span').first().html(language.male[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="gender2"] span').first().html(language.female[localStorage.getItem('language')]);

  $(page).find('.upload-form label[for="job_title"]').html(language.job_title[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="company_name"]').html(language.company_name[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="phone"]').html(language.phone[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="close_date"]').html(language.form_closing_date[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="job_requirement"]').html(language.job_requirement[localStorage.getItem('language')]);
  $(page).find('.upload-form label[for="address"]').html(language.address[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.item_list_job_category').html(language.job_category[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.item_list_city').html(language.city[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.item_list_job_type').html(language.job_type[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.item_list_salary').html(language.salary[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.item_list_education').html(language.education[localStorage.getItem('language')]);
  $(page).find('.upload-form button.app-button span.item_list_experience').html(language.experience[localStorage.getItem('language')]);
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