if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
}

var language = {
  'female': {
    'mm': 'မိန္းမ',
    'en': 'Female'
  },
  'male': {
    'mm': 'ေယာက္်ား',
    'en': 'Male'
  },
  'available_for_work': {
    'mm': 'အလုပ္စဝင္နိုင္မည့္ေန႔',
    'en': 'Available for Work'
  },
  'work_experience': {
    'mm': 'အေတြ႕အၾကဳံ',
    'en': 'Working Experience'
  },
  'edu_background': {
    'mm': 'ပညာအရည္အခ်င္း',
    'en': 'Education Background (eg. Degree, Certificate)'
  },
  'nrcno': {
    'mm': 'မွတ္ပုံတင္',
    'en': 'NRC No.'
  },
  'experience': {
    'mm': 'လုပ္သက္',
    'en': 'Experience'
  },
  'education': {
    'mm': 'ပညာအရည္အခ်င္း',
    'en': 'Education'
  },
  'salary': {
    'mm': 'လစာ',
    'en': 'Salary'
  },
  'job_type': {
    'mm': 'အလုပ္ခ်ိန္',
    'en': 'Job Type'
  },
  'city': {
    'mm': 'ၿမိဳ႕',
    'en': 'City'
  },
  'job_category': {
    'mm': 'အလုပ္အမ်ိဳးအစား',
    'en': 'Job Category'
  },
  'address': {
    'mm': 'လိပ္စာ',
    'eng': 'Address'
  },
  'company_address': {
    'mm': 'ကုမၸဏီလိပ္စာ',
    'en': 'Company Address'
  },
  'job_requirement': {
    'mm': 'အရည္အခ်င္းလိုအပ္ခ်က္',
    'en': 'Job Requirement'
  },
  'form_closing_date': {
    'mm': 'ေလၽွာက္လႊာပိတ္ရက္',
    'en': 'Form Closing Date'
  },
  'phone': {
    'mm': 'ဖုန္း',
    'en': 'Phone'
  },
  'company_name': {
    'mm': 'ကုမၸဏီ',
    'en': 'ကုမၸဏီအမည္'
  },
  'job_title': {
    'mm': 'ေခါင္းစဥ္',
    'en': 'Job Title'
  },
  'photo': {
    'mm': 'ဓာတ္ပုံ',
    'en': 'ဓာတ္ပုံ',
  },
  'delete': {
    'mm': 'ဖ်က္ရန္',
    'en': 'Delete'
  },
  'applied_cvs': {
    'mm': 'ေလၽွာက္ထားေသာ CV မ်ား',
    'en': 'Applied CVs'
  },
  'edit': {
    'mm': 'ျပင္ရန္',
    'en': 'Edit'
  },
  'cv_search': {
    'mm': 'CV ရွာရန္',
    'en': 'CV Search'
  },
  'cv_upload': {
    'mm': 'CV တင္ရန္',
    'en': 'CV Upload'
  },
  'job_upload': {
    'mm': 'အလုပ္ေၾကာ္ျငာတင္ရန္',
    'en': 'Job Upload'
  },
  'job_search': {
    'mm': 'အလုပ္ရွာရန္',
    'en': 'Job Search'
  },
  'user_login': {
    'mm': 'အေကာင့္ ဝင္ / ဖြင့္ ရန္',
    'en': 'User - Login'
  },
  'user_logout': {
    'mm': 'ထြက္ရန္',
    'en': 'User - Logout'
  },
  'all_jobs': {
    'mm': 'အလုပ္အားလုံး',
    'en': 'All Jobs'
  },
  'job_search_category': {
    'mm': 'အလုပ္အမ်ိဳးအစား',
    'en': 'Search By Category'
  },
  'job_search_type': {
    'mm': 'အလုပ္ခ်ိန္အမ်ိဳးအစား',
    'en': 'Search By Type'
  },
  'job_search_city': {
    'mm': 'အလုပ္ေနရာ ျမိဳ႕ရွာပါ',
    'en': 'Searcy By City'
  },
  'cv_search_category': {
    'mm': 'Search By Category',
    'en': 'Search By Category'
  },
  'cv_search_type': {
    'mm': 'Search By Job Type',
    'en': 'Search By Job Type'
  },
  'cv_search_city': {
    'mm': 'Search By City',
    'en': 'Search By City'
  },
  'new_user_register': {
    'mm': 'အေကာင့္အသစ္ဖြင့္ရန္',
    'en': 'New User - Register'
  },
  'name': {
    'mm': 'အမည္',
    'en': 'Name'
  },
  'email_or_phone': {
    'mm': 'အီးေမးလ္ (သို႔) ဖုန္းနံပါတ္',
    'en': 'Email or Phone No.'
  },
  'password': {
    'mm': 'စကားဝွက္',
    'en': 'Password'
  },
  'confirm_password': {
    'mm': 'စကားဝွက္ျပန္ရိုက္ပါ',
    'en': 'Confirm Password'
  },
  'employer': {
    'mm': 'အလုပ္ရွင္',
    'en': 'Employer'
  },
  'job_seeker': {
    'mm': 'အလုပ္ရွာေဖြသူ',
    'en': 'Job Seeker'
  },
  'existing_user': {
    'mm': 'အေကာင့္ရွိသူမ်ားဝင္ရန္',
    'en': 'Existing User - Login'
  },
  'for_job_seekers_only': {
    'mm': '(အလုပ္ရွာေဖြသူမ်ားသာ)',
    'en': '(For Job Seekers Only)'
  }
};
  // },
  // 'en': {
  //   'job_title'
  //   'photo': 'Attach Photo',
  //   'delete': 'Delete',
  //   'applied_cvs': 'Applied CVs',
  //   'edit': 'Edit',
  //   'cv_search': 'CV Search',
  //   'cv_upload': 'CV Upload',
  //   'job_upload': 'Job Upload',
  //   'job_search': 'Job Search',
  //   'user_login': 'User Login',
  //   'user_logout': 'User Logout',
  //   'all_jobs': 'All Jobs',
  //   'job_search_category': 'Search By Category',
  //   'job_search_type': 'Search By Job Type',
  //   'job_search_city': 'Search By City',
  //   'cv_search_category': 'Search By Category',
  //   'cv_search_type': 'Search By Job Type',
  //   'cv_search_city': 'Search By City',
  //   'new_user_register': 'New User - Register',
  //   'name': 'Name',
  //   'email_or_phone': 'Email or Phone No.',
  //   'password': 'Password',
  //   'confirm_password': 'Confirm Password',
  //   'employee': 'Employer',
  //   'job_seeker': 'Job Seeker',
  //   'existing_user': 'Existing User - Log In',
  //   'for_job_seekers_only': '(For Job Seekers Only)'
  // }