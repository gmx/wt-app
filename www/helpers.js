

(function( $ ){

	$.fn.rebindDynamic = function() {

		var that = this;
			
		return $(this).each(function(){
			return $(this).clickable().on('click', function(){
				var target = $(this).attr('data-target');
				var args   = $(this).attr('data-target-args');

				App.load( target, JSON.parse( args ), 'swap-left');

				return this;
			});
		});
	};

})( $ );

(function( $ ){

	$.fn.keypadDisplay = function( char, memo ) {

		var that = this;

		return $(this).each(function(){

			keypadDisplay( char, this );

			return this;
		});

		function evaluatekeypadInput( currentValue, input ) {
			if (input.toUpperCase() == 'C') {
				return currentValue.substring( 0, currentValue.length - 1 );
			}

			else if (input.toUpperCase() == 'A') {
				return '';
			}

			else 
				return currentValue + '' + input;
		}

		function keypadDisplay( char, led ) {
			
			var display = memo('display') || '';

			display = evaluatekeypadInput( display, char );
			memo( 'display', display );

			$(led).val( display );
			// $(led).val(formatDisplay( display ));
		}

		function stringReverse( str ) {
			return str.split('').reverse().join('');
		}

		function formatDisplay( led ) {
			// just ref
			reduce = Array.prototype.reduce;

			// make sure it is a string 
			led = stringReverse(led + '');

			var counter = 0;

			return stringReverse(reduce.call( led, function( memo, c ){

				memo += c;

				if (++counter % 3 == 0) {
					memo += ',';
				}

				return memo;

			}, ''));
		}
	}

})( $ );

(function( App ){

	App.createMemo = function( init ) {

		var pool = init || {};
		
		return function( key, value ) {
			if (key == void(0))
				return pool;

			else if (key != void(0) && value == void(0)) 
				return pool[ key ];

			else
				return pool[ key ] = value;
		};	
	}
	
})( App );

(function( App ){

	var storage = window.localStorage;

	App.storage = function( key, value ) {

		if (key != void(0) && value == void(0)) 
			return JSON.parse(storage.getItem( key ));

		else
			storage.setItem( key, JSON.stringify( value ));

	};

})( App );

(function( App ){
	
	var items = App.storage( "orderItems" ) || {};
	var tnos  = App.storage( "orderTnos" ) || {};
	var pnos  = App.storage( "orderPnos" ) || {};

	var order = {
		// TODO: really need Facades
		getItem: function( id, type ) {
			if (type == void(0) || type == 'qty') {
				if (items[ id ] == void(0))
					return 0;

				return items[ id ];
			}

			else if (type == 'tno') {
				if (tnos[ id ] == void(0))
					return 0;

				return tnos[ id ];
			}

			else if (type == 'pno') {
				if (pnos[ id ] == void(0))
					return 0;

				return pnos[ id ];
			}

		},

		all: function( type ) {
			if (type == void(0) || type == 'qty') {
				return items;
			}
		},

		setItem: function( id, count, type ) {

			if (type == void(0) || type == 'qty') {
				items[ id ] = count
				App.storage( "orderItems", items );
			}

			else if (type == 'tno') {
				tnos[ id ] = count;
				App.storage( "orderTnos", tnos );
			}

			else if (type == 'pno') {
				pnos[ id ] = count;
				App.storage( "orderPnos", pnos );
			}
		},

		addItem: function( id, count, type ) {

			if (type == void(0) || type == 'qty') {
				if (items[ id ] == void(0)) 
					items[ id ] = 0;

				items[ id ] += parseInt( count );
				App.storage( "orderItems", items );
			}

			else if (type == 'pno') {
				if (pnos[ id ] == void(0)) 
					pnos[ id ] = 0;

				pnos[ id ] += parseInt( count );
				App.storage( "orderPnos", pnos );
			}

			else if (type == 'tno') {
				if (tnos[ id ] == void(0)) 
					tnos[ id ] = 0;

				tnos[ id ] += parseInt( count );
				App.storage( "orderTnos", tnos );
			}

		},

		removeItem: function( id, count, type ) {
			if (type == void(0) || type == 'qty') {
				delete items[ id ];
				App.storage( "orderItems", items );
			}

			else if (type == 'pnos') {
				delete items[ id ];
				App.storage( "orderPnos", pnos );
			}

			else if (type == 'tnos') {
				delete items[ id ];
				App.storage( "orderTnos", tnos );
			}

		},

		removeAll: function( type ) {
			if (type == void(0) || type == 'qty') {
				items = {};
				App.storage( "orderItems", items );
			}

			else if (type == 'pno') {
				items = {};
				App.storage( "orderPnos", pnos );

			}

			else if (type == 'tno') {
				items = {};
				App.storage( "orderTnos", tnos );
			}

		}
	};	

	App.order = order;

})( App );

(function( App ){
	
	var items = App.storage( "TO" ) || [];

	var TO = {

		add: function(record) {
			items.push( record );
			App.storage( "TO", record );
		}

	};	

	App.TO = TO;

})( App );