function Accordion_Key_One() {
	
	var self = this;
	var key = $('#ac1');

	self.init = function() {
		self.initKeyVisibleHandler();
		self.cleanup();
	},

	/* ---------------------------
		   TOGGLE NAVIGATION
	--------------------------- */

	self.toggleNavigation = function(el) {
		key.attr('class', el.className);
	},

	/* ---------------------------
		   EVENT HANDLERS
	--------------------------- */

	self.initKeyVisibleHandler = function() {
		key.bind('ac1visible', function() {
			console.log('Event: ac1visible	Object: Accordion_Key_One');
			self.initNavigationHandler();
		});
	},

	self.initNavigationHandler = function() {
		key.delegate('nav', 'click', function(event) {
			console.log('Event: navigation 	Object: Accordion_Key_One');
			self.toggleNavigation(event.target);
			event.preventDefault();
		});
	},

	self.cleanup = function() {
		key.bind('ac1hidden', function() {
			console.log('Event: cleanup 		Object: Accordion_Key_One');
			key.undelegate();
		});
	}
}