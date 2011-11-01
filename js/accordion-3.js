function Accordion_Key_Three() {
	
	var self = this;
	var key = $('#ac3');

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
		key.bind('ac3visible', function() {
			console.log('Event: ac3visible	Object: Accordion_Key_Three');
			self.initNavigationHandler();
		});
	},

	self.initNavigationHandler = function() {
		key.delegate('nav', 'click', function(event) {
			console.log('Event: navigation 	Object: Accordion_Key_Three');
			self.toggleNavigation(event.target);
			event.preventDefault();
		});
	},

	self.cleanup = function() {
		key.bind('ac3hidden', function() {
			console.log('Event: cleanup 		Object: Accordion_Key_Three');
			key.undelegate();
		});
	}
}