var config = {
	
	'report': {
		'url': './',
		'extension': 'html'
	},

	'endPoints': {

		'groups': 'http://192.168.1.5:3000/groups',
		'items' : 'http://192.168.1.5:3000/items',
		/* 'users' : 'http://localhost:8000/server.php?f=users.json',*/

		'auth': {
			'method': 'POST',
			'url': 'http://192.168.1.5:3000/auth'
		},

		'order' : {

			'url'   : 'http://192.168.1.5:3000/order',
			'method': 'POST'	

		},

		'logout': {
			'method': 'POST',
			'url': 'http://192.168.1.5:3000/auth/logout'
		}
	}		

};