function Accordion() {

	var self = this;
	var accordion = $('.accordion');

	self.selectedKey = 'ac1';

	self.init = function() {
		self.initializeKeys();
		self.initAccordion();
	},

	/* ---------------------------
		   TOGGLE ACCORDION
	--------------------------- */

	self.toggleKey = function(el) {
		var keyClassName = self.getKeyClassName(el);

		//Either Open One Key at a Time or Allow for Multiple Open Keys
		if ($(el).parent().hasClass('unique')){
			if(keyClassName != self.selectedKey){
				$(el).parent().attr('class', 'accordion unique ' + keyClassName)

				//Start Events on Open, Cleanup Closed Events
				$('#'+keyClassName).trigger(keyClassName+'visible');
				$('#'+self.selectedKey).trigger(self.selectedKey+'hidden');
				
				self.selectedKey = keyClassName;
			}
		}
		else{
			($(el).hasClass('open'))
				? $('#'+keyClassName).trigger(keyClassName+'hidden')
				: $('#'+keyClassName).trigger(keyClassName+'visible');

			$(el).toggleClass('open');
		}
	},

	// Find new class name from first class name of triggered event (i.e.: "ac2 key" returns "ac2")
	self.getKeyClassName = function(el) {
		var css = el.attr('class');
		css = css.split(' ');
		return css[0];
	},

	/* ---------------------------
		INITIALIZE DEPENDENTS
	--------------------------- */

	self.initializeKeys = function() {
		var k1 = new Accordion_Key_One();
		k1.init();
		var k2 = new Accordion_Key_Two();
		k2.init();
		var k3 = new Accordion_Key_Three();
		k3.init();
		console.log('Event: initializeKeys 	Object: Accordion');
	},

	/* ---------------------------
		   EVENT HANDLERS
	--------------------------- */

	self.initAccordion = function() {
		console.log('Event: initAccordion 	Object: Accordion');
		self.initAccordionKeyHandler();
		$('#'+self.selectedKey).trigger(self.selectedKey+'visible');
	},

	self.initAccordionKeyHandler = function() {
		accordion.delegate('a.press', 'click', function(event) {
			self.toggleKey($(event.target).parent().parent('.key'));
			event.preventDefault();
		});
	},

	self.cleanup = function() {
		accordion.undelegate();
		console.log('Event: cleanup 		Object: Accordion');
	}

}